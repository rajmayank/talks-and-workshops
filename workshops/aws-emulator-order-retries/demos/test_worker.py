"""Offline SDK-boundary checks. These do not certify emulator or AWS fidelity."""

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import boto3
from botocore.exceptions import ClientError, ReadTimeoutError
from botocore.stub import ANY, Stubber
from botocore.validate import validate_parameters

from runtime import clients
from worker import InvalidOrder, Order, OrderConflict, process_message, transaction


class WorkerTests(unittest.TestCase):
    def setUp(self):
        session = boto3.Session(aws_access_key_id="test-only", aws_secret_access_key="test-only",
                                region_name="us-east-1")
        self.ddb = session.client("dynamodb")
        self.sqs = session.client("sqs")
        self.ds, self.ss = Stubber(self.ddb), Stubber(self.sqs)
        self.ds.activate()
        self.ss.activate()
        self.addCleanup(self.ds.deactivate)
        self.addCleanup(self.ss.deactivate)
        self.order = Order("order-1", "tea", 2)
        self.message = {"Body": json.dumps(self.order.__dict__), "ReceiptHandle": "latest-receipt"}
        self.url = "https://sqs.us-east-1.amazonaws.com/000000000000/test"

    def process(self, **kwargs):
        return process_message(self.sqs, self.ddb, self.message, self.url,
                               "orders", "inventory", **kwargs)

    def cancel(self, existing=None):
        self.ds.add_client_error("transact_write_items", service_error_code="TransactionCanceledException")
        self.ds.add_response("get_item", {"Item": existing} if existing else {}, {
            "TableName": "orders", "Key": {"order_id": {"S": "order-1"}}, "ConsistentRead": True,
        })

    def ack(self):
        self.ss.add_response("delete_message", {}, {
            "QueueUrl": self.url, "ReceiptHandle": "latest-receipt",
        })

    def exhausted(self):
        self.ds.assert_no_pending_responses()
        self.ss.assert_no_pending_responses()

    def test_rejects_invalid_orders_before_any_aws_call(self):
        for body in ("oops", "[]", "{}", json.dumps({**self.order.__dict__, "quantity": True}),
                     json.dumps({**self.order.__dict__, "quantity": 0}),
                     json.dumps({**self.order.__dict__, "quantity": 1.5}),
                     json.dumps({**self.order.__dict__, "quantity": 1001}),
                     json.dumps({**self.order.__dict__, "sku": ""}),
                     json.dumps({**self.order.__dict__, "extra": "ignored?"})):
            with self.subTest(body=body), self.assertRaises(InvalidOrder):
                self.message["Body"] = body
                self.process()

    def test_transaction_fits_sdk_model_and_guards_both_mutations(self):
        items = transaction(self.order, "orders", "inventory")
        model = self.ddb.meta.service_model.operation_model("TransactWriteItems")
        validate_parameters({"TransactItems": items}, model.input_shape)
        self.assertEqual(len(items), 2)
        self.assertEqual(items[0]["Put"]["ConditionExpression"], "attribute_not_exists(order_id)")
        self.assertEqual(items[1]["Update"]["ConditionExpression"], "available >= :qty")
        self.assertEqual(items[1]["Update"]["ExpressionAttributeValues"], {":qty": {"N": "2"}})

    def test_committed_reservation_is_acknowledged(self):
        self.ds.add_response("transact_write_items", {}, {"TransactItems": ANY})
        self.ack()
        self.assertEqual(self.process(), "reserved")
        self.exhausted()

    def test_matching_reservation_is_acknowledged_as_duplicate(self):
        self.cancel(self.order.item())
        self.ack()
        self.assertEqual(self.process(), "duplicate")
        self.exhausted()

    def test_cancel_without_reservation_is_not_acknowledged(self):
        self.cancel()
        with self.assertRaises(ClientError):
            self.process()
        self.exhausted()

    def test_changed_payload_is_not_acknowledged(self):
        self.cancel(Order("order-1", "tea", 3).item())
        with self.assertRaises(OrderConflict):
            self.process()
        self.exhausted()

    def test_nonterminal_record_is_not_acknowledged(self):
        self.cancel({**self.order.item(), "state": {"S": "PENDING"}})
        with self.assertRaises(OrderConflict):
            self.process()
        self.exhausted()

    def test_permission_failure_is_not_disguised_as_duplicate(self):
        self.ds.add_client_error("transact_write_items", service_error_code="AccessDeniedException")
        with self.assertRaises(ClientError):
            self.process()
        self.exhausted()

    def test_unknown_commit_outcome_is_not_acknowledged(self):
        with patch.object(self.ddb, "transact_write_items", side_effect=ReadTimeoutError(endpoint_url="https://example.invalid")):
            with self.assertRaises(ReadTimeoutError):
                self.process()
        self.exhausted()

    def test_crash_hook_runs_after_commit_and_before_ack(self):
        self.ds.add_response("transact_write_items", {})
        def crash():
            raise SystemExit(70)
        with self.assertRaises(SystemExit):
            self.process(after_commit=crash)
        self.exhausted()

    def test_failed_ack_can_be_retried_without_another_reservation(self):
        self.ds.add_response("transact_write_items", {})
        self.ss.add_client_error("delete_message", service_error_code="RequestThrottled")
        with self.assertRaises(ClientError):
            self.process()
        self.cancel(self.order.item())
        self.ack()
        self.assertEqual(self.process(), "duplicate")
        self.exhausted()


class RuntimeTests(unittest.TestCase):
    def test_rejects_remote_local_mode_endpoint(self):
        with self.assertRaises(ValueError):
            clients({"mode": "emulator", "endpoint": "https://example.com:9297"})

    def test_local_clients_use_explicit_credentials_and_certificate(self):
        with tempfile.TemporaryDirectory() as directory:
            credentials = Path(directory) / "credentials"
            credentials.write_text("[default]\naws_access_key_id=emulator-test-key\naws_secret_access_key=test-secret\n")
            with patch.dict("os.environ", {"AWS_ACCESS_KEY_ID": "wrong-key", "AWS_SECRET_ACCESS_KEY": "wrong-secret",
                                          "AWS_ENDPOINT_URL": "https://example.invalid"}):
                api = clients({"mode": "emulator", "endpoint": "https://127.0.0.1:9297",
                               "credentials": str(credentials), "ca": str(Path(directory) / "ca.pem")})
            for client in api.values():
                self.assertEqual(client.meta.endpoint_url, "https://127.0.0.1:9297")
                self.assertEqual(client._request_signer._credentials.access_key, "emulator-test-key")
                self.assertEqual(client._endpoint.http_session._verify, str(Path(directory) / "ca.pem"))


if __name__ == "__main__":
    unittest.main()
