import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInboundPath } from '../src/index.js';

test('validates sample inbound events', async () => {
  const report = await validateInboundPath('fixtures/sample/inbound.json');
  assert.equal(report.valid, true);
  assert.equal(report.counts.events, 2);
});

test('reports invalid inbound fixture issues', async () => {
  const report = await validateInboundPath('fixtures/sample/invalid-inbound.json');
  assert.equal(report.valid, false);
  assert.ok(report.issues.some((issue) => issue.includes('timestamp')));
});
