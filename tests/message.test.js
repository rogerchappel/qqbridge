import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage } from '../src/index.js';

test('accepts a normalized text message', () => {
  assert.deepEqual(validateMessage({ id: 'msg-1', kind: 'text', text: 'hi' }), []);
});

test('rejects unsafe message ids and empty text', () => {
  const issues = validateMessage({ id: 'bad id', kind: 'text', text: '' });
  assert.equal(issues.length, 2);
});
