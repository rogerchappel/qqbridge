import test from 'node:test';
import assert from 'node:assert/strict';
import { replayInboundPath } from '../src/index.js';

test('replays valid events as a deterministic timeline', async () => {
  const timeline = await replayInboundPath('fixtures/sample/inbound.json');
  assert.equal(timeline.length, 2);
  assert.equal(timeline[0].sequence, 1);
  assert.equal(timeline[0].text, 'hello from a local QQ fixture');
});
