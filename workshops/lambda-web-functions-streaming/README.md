# Stream twelve requests through a Lambda Web Function

One Node.js HTTP server, one verifier and a short-lived AWS deployment. Give each stream its own request ID and watch how many overlap in each process. The verifier checks the IDs and event order on every completed stream, then reports every rejection.

## Run locally

Clone the repository and open the demo directory:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/rajmayank/talks-and-workshops.git
cd talks-and-workshops
git sparse-checkout set workshops/lambda-web-functions-streaming
cd workshops/lambda-web-functions-streaming/demos
```

With Node.js 24 or later, run `node index.js` in one terminal and `node observe.mjs` from the same directory in another. The client opens one stream, then twelve at once. Stop the local server with Ctrl+C.

## Run on AWS

Use AWS CloudShell in a sandbox account, or a shell with Bash, Node.js 20 or later, jq and AWS CLI v2 with `aws lambda-web` support. The managed runtime is Node.js 24. The caller needs CloudFormation, Lambda Web Functions, S3, CloudWatch Logs and IAM permissions, including permission to pass the execution role. [AWS deployment prerequisites](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-create.html)

From the demo directory, run:

```bash
AWS_REGION=us-east-1 bash deploy.sh
node observe.mjs "$(cat .lambda-stream/url)"
```

The deploy script creates a dedicated versioned bucket, logging role, two log groups and an application-managed public HTTPS endpoint. The server returns synthetic data. The endpoint is capped at two environments and 100 requests per second. Keep the checkout until teardown because it records the exact stack ID.

Read `single.eventArrivalMs` for client-side arrival times and `byProcess` for overlap. In the article's run, four streams finished across two processes and eight got `Platform.EndpointMaxEnvThrottle`. Your split can vary. If a request in the burst fails, the verifier prints all twelve outcomes and exits with code 1.

## Clean up

Run the following from the same checkout and AWS account, even if the verifier returned 1:

```bash
bash cleanup.sh
```

The script waits for the function to disappear, empties only this stack's bucket (including object versions and delete markers), then waits for CloudFormation to delete the bucket, role and log groups. A second cleanup reports that the lab is already gone.
