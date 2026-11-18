FROM python:3.12-slim-bookworm

# Package version 1.0.509-1 corresponds to the v1.0.509 source release.
RUN emulator_arch="$(dpkg --print-architecture)" \
    && apt-get update && apt-get install -y --no-install-recommends ca-certificates curl \
    && case "$emulator_arch" in \
      arm64) checksum=e969f7f8625b12b18835f1e8b3c50b9572055df15f66ecf4903eea8ac3adff4d ;; \
      amd64) checksum=11cc826b6119142bbaa774cd8b5a9de20f29cdbb7a2183974efcbc18a5fa068a ;; \
      *) exit 1 ;; \
    esac \
    && curl -fLsS "https://downloads.aws.com/aws-emulator/packages/aws-emulator/LTS/aws-emulator_1.0.509-1_${emulator_arch}.deb" -o /tmp/emulator.deb \
    && echo "$checksum  /tmp/emulator.deb" | sha256sum -c - \
    && apt-get install -y --no-install-recommends /tmp/emulator.deb \
    && rm -f /tmp/emulator.deb \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 demo

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY worker.py runtime.py demo.py run.py test_worker.py ./
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
USER demo
ENTRYPOINT ["python", "run.py"]
