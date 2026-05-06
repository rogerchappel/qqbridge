#!/usr/bin/env bash
set -euo pipefail
node ../bin/qqbridge.js validate ../fixtures/sample/inbound.json --format text
node ../bin/qqbridge.js replay ../fixtures/sample/inbound.json --format jsonl
