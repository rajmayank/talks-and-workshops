#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
export AWS_REGION="${AWS_REGION:-us-east-1}" AWS_PAGER=""
state=.lambda-stream
umask 077

aws sts get-caller-identity --query Account --output text >/dev/null
if ! mkdir "$state"; then
  echo "This checkout already has lab state. Use cleanup.sh there, or start another lab in a fresh clone." >&2
  exit 1
fi

fn="stream-lab-$(node -p "require('node:crypto').randomUUID().slice(0, 13)")"
echo "Creating $fn in $AWS_REGION"
aws cloudformation create-stack --stack-name "$fn" --template-body file://support.yaml \
  --capabilities CAPABILITY_IAM --on-failure DELETE --query StackId --output text > "$state/stack.id"
stack=$(cat "$state/stack.id")
aws cloudformation wait stack-create-complete --stack-name "$stack"
outputs=$(aws cloudformation describe-stacks --stack-name "$stack" --query 'Stacks[0].Outputs' --output json)
bucket=$(jq -er '.[] | select(.OutputKey == "Bucket") | .OutputValue' <<< "$outputs")
role=$(jq -er '.[] | select(.OutputKey == "Role") | .OutputValue' <<< "$outputs")

# Package only the server. Keep the client, CloudFormation template and local state off the endpoint.
mkdir "$state/app"
cp index.js "$state/app/index.js"
if aws lambda-web get-web-function --function-name "$fn" >/dev/null 2>"$state/lookup.err"; then
  echo "Function name already in use. Run cleanup.sh to remove only the new support stack." >&2
  exit 1
elif ! grep -q ResourceNotFoundException "$state/lookup.err"; then
  cat "$state/lookup.err" >&2
  exit 1
fi
touch "$state/create-requested"
aws lambda-web deploy --create --name "$fn" --code "$state/app" \
  --bucket-name "$bucket" --execution-role-arn "$role" --auth-type ApplicationManaged
aws lambda-web update-web-function-endpoint --function-name "$fn" --endpoint-name dev \
  --scaling-config '{"maxEnvironments":2}' --throttle-config '{"rateLimit":100}' >/dev/null

for ((attempt = 0; attempt < 40; attempt++)); do
  details=$(aws lambda-web get-web-function-endpoint --function-name "$fn" --endpoint-name dev --output json)
  if jq -e '.state == "Active" and .updateStatus != "Updating" and .updateStatus != "Failed" and
      .scalingConfig.maxEnvironments == 2 and .throttleConfig.rateLimit == 100 and
      (.domainName | type == "string" and length > 0)' <<< "$details" >/dev/null; then
    jq -r '"https://" + .domainName' <<< "$details" > "$state/url"
    echo "Ready. Run: node observe.mjs \"\$(cat .lambda-stream/url)\""
    exit 0
  fi
  sleep 3
done
echo "Endpoint did not reach the requested configuration. Run bash cleanup.sh." >&2
exit 1
