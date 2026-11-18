"""Start an isolated emulator process, or explicitly choose an AWS sandbox."""

import configparser
import json
import queue
import shutil
import subprocess
import threading
import time
from contextlib import contextmanager
from pathlib import Path
from urllib.parse import urlsplit

import boto3
from botocore.config import Config


def clients(settings):
    config = Config(
        retries={"mode": "standard", "total_max_attempts": 3},
        connect_timeout=3, read_timeout=10,
        ignore_configured_endpoint_urls=True,
    )
    if settings["mode"] == "emulator":
        endpoint = settings["endpoint"]
        parsed = urlsplit(endpoint)
        if (parsed.scheme != "https" or parsed.hostname != "127.0.0.1"
                or not parsed.port or parsed.username or parsed.password
                or parsed.path not in ("", "/") or parsed.query or parsed.fragment):
            raise ValueError("The local demo requires a loopback HTTPS endpoint")
        credentials = configparser.ConfigParser()
        if not credentials.read(settings["credentials"]):
            raise RuntimeError("The emulator credentials file is missing")
        section = credentials["default"]
        session = boto3.Session(
            aws_access_key_id=section["aws_access_key_id"],
            aws_secret_access_key=section["aws_secret_access_key"],
            region_name="us-east-1",
        )
        kwargs = {"endpoint_url": endpoint, "verify": settings["ca"],
                  "config": config.merge(Config(proxies={}, inject_host_prefix=False))}
    else:
        session = boto3.Session(profile_name=settings["profile"],
                                region_name=settings["region"])
        kwargs = {"config": config, "verify": True}
    return {name: session.client(name, **kwargs) for name in ("sqs", "dynamodb", "sts")}


@contextmanager
def emulator():
    binary = shutil.which("aws-emulator")
    if not binary:
        raise RuntimeError("aws-emulator is missing. Use the Docker commands in README.md.")
    version = subprocess.check_output([binary, "--version"], text=True).strip()
    print(version, flush=True)
    if "1.0.509" not in version:
        raise RuntimeError("This experiment is pinned to AWS Emulator 1.0.509")
    process = subprocess.Popen(
        [binary, "-p", "0", "--telemetry", "off", "--idle-timeout", "120"],
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
    )
    events = queue.Queue()

    def read_output():
        for line in process.stdout:
            events.put(line)

    reader = threading.Thread(target=read_output, daemon=True)
    reader.start()
    try:
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            if process.poll() is not None:
                raise RuntimeError(f"Emulator exited during startup ({process.returncode})")
            try:
                event = json.loads(events.get(timeout=1))
            except (queue.Empty, json.JSONDecodeError):
                continue
            fields = event.get("fields", event)
            if fields.get("message") == "emulator server information":
                config_path = Path(fields["config_file"])
                settings = {
                    "mode": "emulator", "endpoint": fields["endpoint_url"],
                    "ca": fields["ca_file"],
                    "credentials": str(config_path.parent / "emulator_credentials"),
                }
                break
        else:
            raise TimeoutError("Emulator did not become ready within 30 seconds")
        yield settings
    finally:
        if process.poll() is None:
            process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait(timeout=5)
        reader.join(timeout=2)
        process.stdout.close()
