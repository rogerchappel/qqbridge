import { MESSAGE_KINDS } from './types.js';
import { requireSafeId } from './ids.js';

export function validateMessage(message, path = 'message') {
  const issues = [];
  if (!message || typeof message !== 'object' || Array.isArray(message)) {
    return [`${path} must be an object`];
  }
  requireSafeId(message.id, `${path}.id`, issues);
  if (!MESSAGE_KINDS.has(message.kind)) {
    issues.push(`${path}.kind must be one of ${[...MESSAGE_KINDS].join(', ')}`);
  }
  if (typeof message.text !== 'string' || message.text.length === 0) {
    issues.push(`${path}.text must be a non-empty string`);
  }
  if (message.text && message.text.length > 4000) {
    issues.push(`${path}.text must be 4000 characters or fewer`);
  }
  if (message.attachments !== undefined) {
    if (!Array.isArray(message.attachments)) {
      issues.push(`${path}.attachments must be an array when present`);
    } else {
      message.attachments.forEach((attachment, index) => {
        if (!attachment || typeof attachment !== 'object') issues.push(`${path}.attachments[${index}] must be an object`);
        else {
          requireSafeId(attachment.id, `${path}.attachments[${index}].id`, issues);
          if (typeof attachment.name !== 'string' || attachment.name.length === 0) issues.push(`${path}.attachments[${index}].name must be non-empty`);
          if (typeof attachment.mimeType !== 'string' || !attachment.mimeType.includes('/')) issues.push(`${path}.attachments[${index}].mimeType must look like a MIME type`);
        }
      });
    }
  }
  return issues;
}
