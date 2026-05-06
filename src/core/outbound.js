import { requireSafeId } from './ids.js';
import { validateMessage } from './message.js';
import { OUTBOUND_TYPES } from './types.js';

export function validateOutboundAction(action, index = 0) {
  const path = `actions[${index}]`;
  const issues = [];
  if (!action || typeof action !== 'object' || Array.isArray(action)) return [`${path} must be an object`];
  requireSafeId(action.id, `${path}.id`, issues);
  if (!OUTBOUND_TYPES.has(action.type)) issues.push(`${path}.type must be one of ${[...OUTBOUND_TYPES].join(', ')}`);
  if (!action.channel || typeof action.channel !== 'object') issues.push(`${path}.channel must be an object`);
  else {
    requireSafeId(action.channel.id, `${path}.channel.id`, issues);
    if (action.channel.kind !== 'qq') issues.push(`${path}.channel.kind must be qq`);
  }
  if (action.type === 'send.message') issues.push(...validateMessage(action.message, `${path}.message`));
  if (action.type === 'send.reaction') {
    requireSafeId(action.messageId, `${path}.messageId`, issues);
    if (typeof action.emoji !== 'string' || action.emoji.length === 0) issues.push(`${path}.emoji must be non-empty`);
  }
  if (action.type === 'delete.message') requireSafeId(action.messageId, `${path}.messageId`, issues);
  return issues;
}
