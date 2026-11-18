"""Read-only check of the exact resource names printed by a cloud demo run."""

import argparse
import re
import time
from pathlib import Path

from botocore.exceptions import ClientError

from runtime import clients


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--aws-profile", required=True)
    parser.add_argument("--region", required=True, choices=("us-east-1", "us-west-2"))
    parser.add_argument("--account-id", required=True)
    parser.add_argument("--log", required=True, type=Path)
    args = parser.parse_args()
    prefixes = sorted(set(re.findall(
        r"^Creating disposable resources: (order-lab-[0-9a-f]{12})$",
        args.log.read_text(), re.MULTILINE)))
    if not prefixes:
        parser.error("The log contains no demo resource prefixes")
    api = clients({"mode": "aws", "profile": args.aws_profile, "region": args.region})
    if api["sts"].get_caller_identity()["Account"] != args.account_id:
        raise RuntimeError("Caller account does not match the selected target")
    pending = [(kind, f"{prefix}-{suffix}") for prefix in prefixes
               for kind, suffix in (("table", "orders"), ("table", "stock"),
                                    ("queue", "incoming"), ("queue", "failed"))]
    deadline = time.monotonic() + 120
    while pending:
        remaining = []
        for kind, name in pending:
            try:
                if kind == "table":
                    api["dynamodb"].describe_table(TableName=name)
                else:
                    api["sqs"].get_queue_url(QueueName=name)
            except ClientError as exc:
                code = exc.response["Error"]["Code"]
                expected = ({"ResourceNotFoundException"} if kind == "table" else
                            {"AWS.SimpleQueueService.NonExistentQueue", "QueueDoesNotExist"})
                if code not in expected:
                    raise
            else:
                remaining.append((kind, name))
        pending = remaining
        if pending and time.monotonic() >= deadline:
            raise RuntimeError("Still present: " + ", ".join(name for _, name in pending))
        if pending:
            time.sleep(3)
    count = len(prefixes) * 2
    print(f"Cleanup verified in {args.region}: {count} tables absent; {count} queues absent.")
    print("Checked exact names from the run log. No resources deleted by this checker.")


if __name__ == "__main__":
    main()
