import { toIsoTimestamp } from './clock.js';
import { requireSafeId } from './ids.js';
import { validateMessage } from './message.js';
import { INBOUND_TYPES } from './types.js';

export function validateInboundEvent(event, index = 0) {
  const path = `events[${index}]`;
  const issues = [];
  if (!event || typeof event !== 'object' || Array.isArray(event)) return [`${path} must be an object`];
  requireSafeId(event.id, `${path}.id`, issues);
  if (!INBOUND_TYPES.has(event.type)) issues.push(`${path}.type must be one of ${[...INBOUND_TYPES].join(', ')}`);
  const time = toIsoTimestamp(event.timestamp, `${path}.timestamp`);
  if (!time.ok) issues.push(time.issue);
  if (!event.channel || typeof event.channel !== 'object') issues.push(`${path}.channel must be an object`);
  else {
    requireSafeId(event.channel.id, `${path}.channel.id`, issues);
    if (event.channel.kind !== 'qq') issues.push(`${path}.channel.kind must be qq`);
  }
  if (!event.sender || typeof event.sender !== 'object') issues.push(`${path}.sender must be an object`);
  else requireSafeId(event.sender.id, `${path}.sender.id`, issues);
  issues.push(...validateMessage(event.message, `${path}.message`));
  return issues;
}
