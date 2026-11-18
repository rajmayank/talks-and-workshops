import argparse

from demo import CASES, run
from runtime import emulator


def main():
    parser = argparse.ArgumentParser(description="Exercise order retries against AWS Emulator")
    parser.add_argument("--case", action="append", choices=CASES,
                        help="Run a selected scenario; repeat to select several (default: all)")
    parser.add_argument("--aws-profile", help="Explicit opt-in to real AWS, with billable resources")
    parser.add_argument("--region", choices=("us-east-1", "us-west-2"))
    parser.add_argument("--account-id", help="Expected sandbox AWS account ID")
    args = parser.parse_args()
    if args.aws_profile:
        if not args.region or not args.account_id:
            parser.error("Real AWS requires --aws-profile, --region, and --account-id")
        run({"mode": "aws", "profile": args.aws_profile, "region": args.region,
             "account_id": args.account_id}, args.case)
    else:
        if args.region or args.account_id:
            parser.error("--region and --account-id require --aws-profile")
        with emulator() as settings:
            run(settings, args.case)


if __name__ == "__main__":
    main()
