"""Reserve one SKU per order; acknowledge SQS only after a durable decision."""

import json
from dataclasses import dataclass

from botocore.exceptions import ClientError


class InvalidOrder(ValueError):
    pass


class OrderConflict(ValueError):
    pass


@dataclass(frozen=True)
class Order:
    order_id: str
    sku: str
    quantity: int

    @classmethod
    def parse(cls, body):
        try:
            data = json.loads(body)
        except (TypeError, ValueError) as exc:
            raise InvalidOrder("Expected a JSON order") from exc
        if not isinstance(data, dict) or set(data) != {"order_id", "sku", "quantity"}:
            raise InvalidOrder("Expected order_id, sku, and quantity only")
        for name in ("order_id", "sku"):
            if not isinstance(data[name], str) or not 1 <= len(data[name]) <= 128:
                raise InvalidOrder(f"{name} must be a nonempty string of at most 128 characters")
        # bool is an int subclass in Python, but True is not an order quantity.
        if type(data["quantity"]) is not int or not 1 <= data["quantity"] <= 1000:
            raise InvalidOrder("quantity must be an integer from 1 to 1000")
        return cls(**data)

    def item(self):
        return {
            "order_id": {"S": self.order_id},
            "sku": {"S": self.sku},
            "quantity": {"N": str(self.quantity)},
            "state": {"S": "RESERVED"},
        }


def transaction(order, orders_table, inventory_table):
    return [
        {"Put": {
            "TableName": orders_table,
            "Item": order.item(),
            "ConditionExpression": "attribute_not_exists(order_id)",
        }},
        {"Update": {
            "TableName": inventory_table,
            "Key": {"sku": {"S": order.sku}},
            "UpdateExpression": "SET available = available - :qty",
            "ConditionExpression": "available >= :qty",
            "ExpressionAttributeValues": {":qty": {"N": str(order.quantity)}},
        }},
    ]


def reserve(ddb, order, orders_table, inventory_table):
    try:
        ddb.transact_write_items(
            TransactItems=transaction(order, orders_table, inventory_table)
        )
        return "reserved"
    except ClientError as exc:
        if exc.response["Error"]["Code"] != "TransactionCanceledException":
            raise
        # A canceled transaction might be a duplicate, a stock rejection, or a
        # transient conflict. Only an existing matching reservation proves success.
        existing = ddb.get_item(
            TableName=orders_table,
            Key={"order_id": {"S": order.order_id}},
            ConsistentRead=True,
        ).get("Item")
        if not existing:
            raise
        if any(existing.get(key) != value for key, value in order.item().items()):
            raise OrderConflict("Order ID already belongs to a different reservation") from exc
        return "duplicate"


def reserve_naively(ddb, order, inventory_table):
    """Deliberately broken baseline: sufficient stock does not prevent duplicates."""
    ddb.update_item(
        TableName=inventory_table,
        Key={"sku": {"S": order.sku}},
        UpdateExpression="SET available = available - :qty",
        ConditionExpression="available >= :qty",
        ExpressionAttributeValues={":qty": {"N": str(order.quantity)}},
    )
    return "reserved"


def process_message(sqs, ddb, message, queue_url, orders_table, inventory_table,
                    *, naive=False, after_commit=None):
    order = Order.parse(message["Body"])
    if naive:
        outcome = reserve_naively(ddb, order, inventory_table)
    else:
        outcome = reserve(ddb, order, orders_table, inventory_table)
    if after_commit is not None:
        after_commit()  # The experiment kills the worker at this boundary.
    sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message["ReceiptHandle"])
    return outcome
