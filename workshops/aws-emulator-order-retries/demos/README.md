# Order retries with AWS Emulator

A Python worker reserves two units of stock, exits before deleting its SQS message,
and processes the redelivery. Compare a broken decrement with a DynamoDB transaction
that commits an order record and stock deduction together.

This is a single-SKU reservation experiment. It does not take payments or ship orders.

## Run

Prerequisite: a running Docker engine on Linux, macOS, or Windows. From this directory:

```sh
docker build -t aws-order-retries .
docker run --rm --network none --memory 2g --memory-swap 2g aws-order-retries
```

For an incremental walkthrough, select one or more scenarios:

```sh
docker run --rm --network none --memory 2g --memory-swap 2g \
  aws-order-retries --case naive-crash
docker run --rm --network none --memory 2g --memory-swap 2g \
  aws-order-retries --case atomic-crash
docker run --rm --network none --memory 2g --memory-swap 2g \
  aws-order-retries --case duplicate-send --case concurrent
docker run --rm --network none --memory 2g --memory-swap 2g \
  aws-order-retries --case out-of-stock --case payload-conflict
```

The build downloads dependencies. The run needs no network access, AWS account, host
credentials, mounted directories, or exposed ports. The emulator and Python workers
share a container and talk over loopback HTTPS with certificate validation. Telemetry
is disabled. The emulator uses a random port and its own credentials. The worker runs
as an unprivileged container user.

Pinned: AWS Emulator **1.0.509**, Boto3/Botocore **1.42.97**, Python **3.12** in Docker.
The Dockerfile checks the downloaded emulator package's SHA-256 on arm64 and amd64.
The Python base image and transitive Python dependencies are not byte-for-byte locked.

The six scenarios assert:

| Scenario | Expected outcome |
| --- | --- |
| Naive worker crashes after decrement | Stock 10 → 8 → 6, reproducing the bug |
| Transactional worker crashes after commit | Stock 10 → 8 → 8; retry is a duplicate |
| Same order sent as two different SQS messages | One reservation; stock 8 |
| Two workers race for the same order | One reservation; stock 8 |
| Order requests 11 of 10 available units | No order record or deduction; message reaches DLQ |
| Reserved order ID is reused with a different quantity | Original reservation unchanged; conflicting message reaches DLQ |

The crash is an actual child-process exit at the commit/acknowledgment boundary.
The emulator stays alive. SQS redelivery happens after its visibility timeout;
the harness does not force message visibility or invent a second receipt.
Each scenario creates unique resources and deletes them in `finally`.
The parent stops the emulator on exit, and Docker removes the container.

## Read the code

- `worker.py`: validation, the two-write transaction, duplicate checks, acknowledgment.
- `demo.py`: fixture setup, crash injection, concurrency, and observable assertions.
- `runtime.py`: explicit SDK targeting, credentials, and emulator lifecycle.
- `run.py`: local default and explicit cloud opt-in.
- `verify_cleanup.py`: read-only verification of the resource names in a run log.

The source queue has a three-second visibility timeout and three-receive redrive
limit to make failures observable quickly. Choose real values from processing time
and retry requirements. Its retention is one day; the DLQ retains messages for 14 days.
Insufficient stock is treated as retryable, then sent to the DLQ. It is not a durable
customer-facing rejection. A fulfillment system needs a named owner and a redrive or
cancellation policy for those messages.

Keep order records for the full supported replay period. Deleting a record allows an
old order to reserve again. There is no TTL in this demo. The key assumes one merchant;
scope it by merchant/tenant when order IDs are not globally unique.

## Offline checks

These tests validate error handling and SDK request shape, not AWS or emulator behavior:

```sh
docker run --rm --network none --entrypoint python aws-order-retries -m unittest -v
```

Or use Python 3.9+ in a virtual environment and `pip install -r requirements.txt`,
then `python -m unittest -v`. Native Linux users with the pinned emulator installed
can run `python run.py` directly.

## Optional comparison with real AWS

This path creates billable DynamoDB tables and SQS queues. Use a disposable AWS
sandbox with credentials configured outside this repository. It runs the same six
scenarios and requires an explicit profile, Region, and expected account ID:

```sh
set -o pipefail
python run.py --aws-profile YOUR_SANDBOX_PROFILE \
  --region us-east-1 --account-id YOUR_12_DIGIT_ACCOUNT_ID | tee aws-run.log
python verify_cleanup.py --aws-profile YOUR_SANDBOX_PROFILE \
  --region us-east-1 --account-id YOUR_12_DIGIT_ACCOUNT_ID --log aws-run.log
```

Run this on the host with the Python dependencies installed, not in the offline
container. The profile needs DynamoDB `CreateTable`, `DescribeTable`, `DeleteTable`,
`PutItem`, `UpdateItem`, and `GetItem`; SQS `CreateQueue`, `DeleteQueue`,
`GetQueueAttributes`, `GetQueueUrl`, `SendMessage`, `ReceiveMessage`, and
`DeleteMessage`. DynamoDB [transaction permissions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis-iam.html)
use the underlying item actions. Resources use the prefix `order-lab-`. No IAM roles are created.
SDK-configured endpoint overrides are ignored in this mode, and the account check
happens before resource creation.

Cleanup failures list the exact resources to remove. A hard kill of the parent can
bypass cleanup, so inspect the printed resource prefixes after an interrupted cloud
run. The demo's broad setup permissions are not a production worker IAM policy.
Successful execution also does not prove least-privilege denial behavior.
The separate checker polls `DescribeTable` and `GetQueueUrl` until every exact name
from the log returns a not-found error, or fails after a bounded wait. It never
deletes anything and does not treat authorization failures as proof of deletion.

## Fidelity and verification

AWS's [v1.0.509 fidelity report](https://github.com/aws/aws-emulator/releases/tag/v1.0.509)
marks these related checks as passing:

- `dynamodb.transact-write-multi-table-atomicity`
- `dynamodb.conc-ddb-optimistic-transact-race-cancelled-leaves-no-partial-write`
- `sqs.visibility-timeout-natural-expiry`
- `sqs.dead-letter-queue-redrive-after-max-receive-count`

These are vendor results for related scenarios, not measurements of this demo.
The [evaluation suite](https://github.com/aws/aws-emulator-evaluation-suite) contains
the test sources. Match fidelity reports to the installed release when upgrading.

Verified on November 18, 2026: all six end-to-end scenarios passed against AWS
Emulator 1.0.509, commit `8ae1f15e1239e20a3ab2eb37bf44813feb1807c7`, in an arm64
Python 3.12 Docker container with networking disabled. All 13 offline checks also
passed in that container and under host Python 3.9. The emulator process stopped
cleanly after the scenarios deleted their resources. The amd64 package download and
checksum were verified, but the amd64 image has not been executed.

The same six scenarios also passed against real SQS and DynamoDB in `us-east-1` on
November 18, 2026, using host Python 3.9.6 and Boto3/Botocore 1.42.97. No worker code
changed between the local and AWS runs. The independent cleanup check confirmed all
12 DynamoDB tables and 12 SQS queues were absent. No IAM roles or other support
resources were created by this lab. This comparison does not establish production
throughput or least-privilege denial behavior.

Captured output is in `evidence/emulator-runs.txt`, `evidence/aws-run.txt`, and
`evidence/cleanup.txt`. The cloud account ID is omitted; result lines and resource
prefixes are preserved.
