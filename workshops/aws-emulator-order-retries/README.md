# Order retries with AWS Emulator

A Python inventory worker reserves stock, crashes before acknowledging its SQS
message, and processes the redelivery. The naive implementation deducts twice;
a DynamoDB transaction preserves one reservation per order ID.

This companion lab contains the complete runnable project for **Test Order Retries
with AWS Emulator, SQS, and DynamoDB**. It assumes basic Python and a running Docker
engine. It reserves inventory only; it does not take payments or ship orders.

## Run locally

From the repository root:

```sh
cd workshops/aws-emulator-order-retries/demos
docker build -t aws-order-retries .
docker run --rm --network none --memory 2g --memory-swap 2g aws-order-retries
```

The build downloads dependencies. The run is offline and needs no AWS account,
host credentials, mounted directories, or exposed ports. AWS Emulator 1.0.509
and Python communicate inside the container over loopback HTTPS.

All six scenarios passed against the emulator and real AWS in `us-east-1` on
November 18, 2026. The deliberately broken case passes when it reproduces the bug.
The real-AWS run's twelve DynamoDB tables and twelve SQS queues were deleted and
independently checked for absence. These are functional checks, not capacity or
least-privilege security tests.

## Project guide

- [Run instructions, scenarios, permissions, and limits](demos/README.md)
- [Worker and transaction](demos/worker.py)
- [Crash, duplicate, concurrency, and dead-letter queue assertions](demos/demo.py)
- [Read-only cleanup checker](demos/verify_cleanup.py)
- [Emulator output](demos/evidence/emulator-runs.txt)
- [AWS output](demos/evidence/aws-run.txt) and [cleanup output](demos/evidence/cleanup.txt)

The demo defaults to the emulator. Running against real AWS requires an explicit
profile, Region, and expected account ID, and creates billable resources. Follow
the cloud instructions and cleanup check in the demo README.
