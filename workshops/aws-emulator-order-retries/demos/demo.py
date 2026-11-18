"""Executable assertions against real SDK endpoints, never an in-memory fake."""

import json
import multiprocessing
import os
import sys
import time
import uuid
from threading import Barrier
from concurrent.futures import ThreadPoolExecutor
from contextlib import contextmanager

from botocore.exceptions import ClientError

from runtime import clients
from worker import OrderConflict, process_message


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def receive(sqs, queue_url, timeout=20):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        messages = sqs.receive_message(
            QueueUrl=queue_url, MaxNumberOfMessages=1, WaitTimeSeconds=1,
            MessageSystemAttributeNames=["ApproximateReceiveCount"],
        ).get("Messages", [])
        if messages:
            return messages[0]
    raise TimeoutError("No message arrived before the scenario deadline")


@contextmanager
def resources(settings):
    api = clients(settings)
    ddb, sqs = api["dynamodb"], api["sqs"]
    prefix = "order-lab-" + uuid.uuid4().hex[:12]
    if settings["mode"] == "aws":
        print(f"Creating disposable resources: {prefix}", flush=True)
    tables, queues = [], []
    try:
        for suffix, key in (("orders", "order_id"), ("stock", "sku")):
            name = f"{prefix}-{suffix}"
            ddb.create_table(
                TableName=name, BillingMode="PAY_PER_REQUEST",
                AttributeDefinitions=[{"AttributeName": key, "AttributeType": "S"}],
                KeySchema=[{"AttributeName": key, "KeyType": "HASH"}],
            )
            tables.append(name)
        for name in tables:
            ddb.get_waiter("table_exists").wait(
                TableName=name, WaiterConfig={"Delay": 1, "MaxAttempts": 60})
        dlq = sqs.create_queue(QueueName=f"{prefix}-failed", Attributes={
            "MessageRetentionPeriod": "1209600"})["QueueUrl"]
        queues.append(dlq)
        arn = sqs.get_queue_attributes(QueueUrl=dlq, AttributeNames=["QueueArn"])["Attributes"]["QueueArn"]
        queue_url = sqs.create_queue(QueueName=f"{prefix}-incoming", Attributes={
            "VisibilityTimeout": "3", "MessageRetentionPeriod": "86400",
            "RedrivePolicy": json.dumps({"deadLetterTargetArn": arn, "maxReceiveCount": "3"}),
        })["QueueUrl"]
        queues.append(queue_url)
        ddb.put_item(TableName=tables[1], Item={"sku": {"S": "tea"}, "available": {"N": "10"}})
        yield api, tables[0], tables[1], queue_url, dlq
    finally:
        failed = []
        for url in reversed(queues):
            try:
                sqs.delete_queue(QueueUrl=url)
            except Exception as exc:
                failed.append(url)
                print(f"Cleanup failed for {url}: {type(exc).__name__}", file=sys.stderr)
        for name in reversed(tables):
            try:
                ddb.delete_table(TableName=name)
                ddb.get_waiter("table_not_exists").wait(
                    TableName=name, WaiterConfig={"Delay": 1, "MaxAttempts": 60})
            except Exception as exc:
                failed.append(name)
                print(f"Cleanup failed for {name}: {type(exc).__name__}", file=sys.stderr)
        if failed and sys.exc_info()[0] is None:
            raise RuntimeError("Remove these demo resources manually: " + ", ".join(failed))


def stock(ddb, table):
    return int(ddb.get_item(TableName=table, Key={"sku": {"S": "tea"}},
                            ConsistentRead=True)["Item"]["available"]["N"])


def send(sqs, url, order_id="order-1", quantity=2):
    return sqs.send_message(QueueUrl=url, MessageBody=json.dumps({
        "order_id": order_id, "sku": "tea", "quantity": quantity,
    }))["MessageId"]


def crash_after_commit():
    os._exit(70)  # Kill only this child; the emulator and its state remain alive.


def crashing_worker(settings, orders, inventory, queue_url, naive):
    api = clients(settings)
    message = receive(api["sqs"], queue_url)
    process_message(api["sqs"], api["dynamodb"], message, queue_url, orders, inventory,
                    naive=naive, after_commit=crash_after_commit)


def crash_case(settings, naive):
    with resources(settings) as (api, orders, inventory, queue_url, _):
        sqs, ddb = api["sqs"], api["dynamodb"]
        message_id = send(sqs, queue_url)
        child = multiprocessing.get_context("spawn").Process(
            target=crashing_worker,
            args=(settings, orders, inventory, queue_url, naive),
        )
        child.start()
        child.join(timeout=45)
        if child.is_alive():
            child.terminate()
            child.join(timeout=5)
            raise TimeoutError("Crash worker did not exit")
        check(child.exitcode == 70, f"Expected injected crash; exit={child.exitcode}")
        check(stock(ddb, inventory) == 8, "First reservation did not commit")
        again = receive(sqs, queue_url)
        check(again["MessageId"] == message_id, "Expected redelivery of the original message")
        check(int(again["Attributes"]["ApproximateReceiveCount"]) >= 2, "Expected a retry")
        result = process_message(sqs, ddb, again, queue_url, orders, inventory, naive=naive)
        expected = 6 if naive else 8
        check(stock(ddb, inventory) == expected, f"Expected remaining stock {expected}")
        check(result == ("reserved" if naive else "duplicate"), f"Unexpected outcome: {result}")
        print(f"PASS {'naive' if naive else 'atomic'} crash: stock=10 -> 8 -> {expected}; {result}", flush=True)


def duplicate_send_case(settings):
    with resources(settings) as (api, orders, inventory, queue_url, _):
        sqs, ddb = api["sqs"], api["dynamodb"]
        first_id = send(sqs, queue_url)
        first = receive(sqs, queue_url)
        process_message(sqs, ddb, first, queue_url, orders, inventory)
        second_id = send(sqs, queue_url)
        check(first_id != second_id, "Expected distinct SQS messages")
        second = receive(sqs, queue_url)
        check(process_message(sqs, ddb, second, queue_url, orders, inventory) == "duplicate",
              "New message ID bypassed the business key")
        check(stock(ddb, inventory) == 8, "Duplicate submission deducted stock")
        print("PASS duplicate sends: different message IDs; stock=8", flush=True)


def concurrency_case(settings):
    with resources(settings) as (api, orders, inventory, queue_url, _):
        sqs, ddb = api["sqs"], api["dynamodb"]
        send(sqs, queue_url)
        send(sqs, queue_url)
        messages = [receive(sqs, queue_url), receive(sqs, queue_url)]
        ready = Barrier(2)

        def attempt(message):
            local = clients(settings)
            ready.wait(timeout=10)
            # A concurrent transaction can be canceled before the winner commits.
            # Leave it unacknowledged, then retry via SQS after visibility expires.
            try:
                return process_message(local["sqs"], local["dynamodb"], message,
                                       queue_url, orders, inventory)
            except ClientError as exc:
                if exc.response["Error"]["Code"] != "TransactionCanceledException":
                    raise
                return "retry"

        with ThreadPoolExecutor(max_workers=2) as pool:
            outcomes = list(pool.map(attempt, messages))
        for _ in range(outcomes.count("retry")):
            message = receive(sqs, queue_url)
            result = process_message(sqs, ddb, message, queue_url, orders, inventory)
            check(result == "duplicate", "Concurrent loser did not converge to duplicate")
        check(outcomes.count("reserved") == 1, f"Expected one winning worker: {outcomes}")
        check(stock(ddb, inventory) == 8, "Concurrent requests deducted stock twice")
        print("PASS concurrent workers: one reservation; stock=8", flush=True)


def rejection_case(settings, conflict=False):
    with resources(settings) as (api, orders, inventory, queue_url, dlq):
        sqs, ddb = api["sqs"], api["dynamodb"]
        if conflict:
            send(sqs, queue_url)
            process_message(sqs, ddb, receive(sqs, queue_url), queue_url, orders, inventory)
        send(sqs, queue_url, quantity=3 if conflict else 11)
        # Failed processing does not delete the message. SQS owns retry and redrive.
        deadline = time.monotonic() + 45
        failed = False
        while time.monotonic() < deadline:
            message = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=1,
                                          WaitTimeSeconds=1).get("Messages", [])
            if message:
                try:
                    process_message(sqs, ddb, message[0], queue_url, orders, inventory)
                except (ClientError, OrderConflict) as exc:
                    if conflict:
                        check(isinstance(exc, OrderConflict), "Expected payload conflict")
                    else:
                        check(isinstance(exc, ClientError) and
                              exc.response["Error"]["Code"] == "TransactionCanceledException",
                              "Expected stock condition to cancel the transaction")
                    failed = True
                else:
                    raise AssertionError("Invalid reservation was acknowledged")
            dead = sqs.receive_message(QueueUrl=dlq, MaxNumberOfMessages=1,
                                       WaitTimeSeconds=1).get("Messages", [])
            if dead:
                check(failed, "Message reached DLQ without an observed processing failure")
                check(stock(ddb, inventory) == (8 if conflict else 10), "Rejected order changed stock")
                item = ddb.get_item(TableName=orders, Key={"order_id": {"S": "order-1"}},
                                    ConsistentRead=True).get("Item")
                check(bool(item) == conflict, "Canceled transaction left an incorrect order record")
                if conflict:
                    check(item["quantity"] == {"N": "2"}, "Conflict overwrote the original reservation")
                print(f"PASS {'payload conflict' if conflict else 'insufficient stock'}: unchanged stock; DLQ", flush=True)
                return
        raise TimeoutError("SQS did not move the rejected message to the DLQ")


CASES = ("naive-crash", "atomic-crash", "duplicate-send", "concurrent",
         "out-of-stock", "payload-conflict")


def run(settings, selected=None):
    identity = clients(settings)["sts"].get_caller_identity()
    expected = "000000000000" if settings["mode"] == "emulator" else settings["account_id"]
    check(identity["Account"] == expected, "Caller account does not match the selected target")
    print(f"Target: {settings['mode']}; account={identity['Account']}", flush=True)
    scenarios = {
        "naive-crash": lambda: crash_case(settings, naive=True),
        "atomic-crash": lambda: crash_case(settings, naive=False),
        "duplicate-send": lambda: duplicate_send_case(settings),
        "concurrent": lambda: concurrency_case(settings),
        "out-of-stock": lambda: rejection_case(settings),
        "payload-conflict": lambda: rejection_case(settings, conflict=True),
    }
    chosen = selected or CASES
    for name in chosen:
        scenarios[name]()
    print(f"{len(chosen)} scenario(s) passed. Demo resources deleted.", flush=True)
