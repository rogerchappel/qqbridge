import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

function run(args) {
  return spawnSync(process.execPath, ['bin/qqbridge.js', ...args], { encoding: 'utf8' });
}

test('CLI prints help', () => {
  const result = run(['--help']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /local-first/);
});

test('CLI validates inbound fixture', () => {
  const result = run(['validate', 'fixtures/sample/inbound.json']);
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).valid, true);
});
