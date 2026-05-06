#!/usr/bin/env bash
set -euo pipefail
node bin/qqbridge.js --help >/dev/null
node bin/qqbridge.js validate fixtures/sample/inbound.json --format json >/tmp/qqbridge-inbound.json
node bin/qqbridge.js validate fixtures/outbound/actions.json --kind outbound --format json >/tmp/qqbridge-outbound.json
node bin/qqbridge.js replay fixtures/sample/inbound.json --format jsonl >/tmp/qqbridge-replay.jsonl
node -e "const fs=require('fs'); const r=JSON.parse(fs.readFileSync('/tmp/qqbridge-inbound.json','utf8')); if(!r.valid) process.exit(1);"
test "$(wc -l < /tmp/qqbridge-replay.jsonl | tr -d ' ')" -eq 2
echo "smoke passed"
