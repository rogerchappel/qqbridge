import test from 'node:test';
import assert from 'node:assert/strict';
import { validateOutboundPath } from '../src/index.js';

test('validates outbound adapter actions', async () => {
  const report = await validateOutboundPath('fixtures/outbound/actions.json');
  assert.equal(report.valid, true);
  assert.equal(report.counts.actions, 2);
});
