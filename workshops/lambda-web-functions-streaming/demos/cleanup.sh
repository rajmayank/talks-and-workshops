#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
export AWS_PAGER=""
state=.lambda-stream
if [[ -f "$state/cleaned" ]]; then
  echo "This lab was already cleaned up."
  exit 0
fi
if [[ ! -s "$state/stack.id" ]]; then
  echo "No stack ID recorded in this checkout. Check the deploy output before proceeding." >&2
  exit 1
fi

stack=$(cat "$state/stack.id")
if [[ ! "$stack" =~ ^arn:[[:alnum:]-]+:cloudformation:([a-z0-9-]+):([0-9]{12}):stack/(stream-lab-[0-9a-f]{8}-[0-9a-f]{4})/[0-9a-f-]+$ ]]; then
  echo "Unrecognized lab stack ID." >&2
  exit 1
fi
export AWS_REGION="${BASH_REMATCH[1]}"
account=${BASH_REMATCH[2]}
fn=${BASH_REMATCH[3]}
if [[ "$(aws sts get-caller-identity --query Account --output text)" != "$account" ]]; then
  echo "Switch to the AWS account used to deploy this lab." >&2
  exit 1
fi

status=$(aws cloudformation describe-stacks --stack-name "$stack" --query 'Stacks[0].StackStatus' --output text)
if [[ "$status" != DELETE_COMPLETE && "$status" != DELETE_IN_PROGRESS ]]; then
  if [[ -f "$state/create-requested" ]]; then
    lookup_error="$state/lookup.err"
    if aws lambda-web get-web-function --function-name "$fn" >/dev/null 2>"$lookup_error"; then
      aws lambda-web delete-web-function --function-name "$fn"
    elif ! grep -q ResourceNotFoundException "$lookup_error"; then
      cat "$lookup_error" >&2
      exit 1
    fi
    for ((attempt = 0; attempt < 50; attempt++)); do
      if ! aws lambda-web get-web-function --function-name "$fn" >/dev/null 2>"$lookup_error"; then
        if grep -q ResourceNotFoundException "$lookup_error"; then break; fi
        cat "$lookup_error" >&2
        exit 1
      fi
      sleep 3
    done
    if (( attempt == 50 )); then echo "Function deletion still pending. Rerun cleanup.sh." >&2; exit 1; fi
  fi

  # Resolve the private bucket from this exact stack. Versioned buckets also contain delete markers.
  bucket=$(aws cloudformation describe-stack-resource --stack-name "$stack" --logical-resource-id Code \
    --query StackResourceDetail.PhysicalResourceId --output text)
  if [[ "$bucket" != "$fn"-code-* ]]; then echo "Unexpected lab bucket." >&2; exit 1; fi
  while true; do
    versions=$(aws s3api list-object-versions --bucket "$bucket" --expected-bucket-owner "$account" \
      --max-keys 1000 --no-paginate --output json)
    jq '{Objects: [(.Versions[]?, .DeleteMarkers[]?) | {Key, VersionId}]}' \
      <<< "$versions" > "$state/versions.json"
    if jq -e '.Objects | length == 0' "$state/versions.json" >/dev/null; then break; fi
    aws s3api delete-objects --bucket "$bucket" --expected-bucket-owner "$account" \
      --delete "file://$state/versions.json" --output json | jq -e '(.Errors // []) | length == 0' >/dev/null
  done
  aws cloudformation delete-stack --stack-name "$stack"
fi
aws cloudformation wait stack-delete-complete --stack-name "$stack"
touch "$state/cleaned"
echo "Cleanup verified for $fn. The function and its support stack are gone."
