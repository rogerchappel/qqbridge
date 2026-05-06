import { validateInboundPath, validateOutboundPath } from '../core/validate.js';

export async function runValidate(inputPath, { kind = 'inbound' } = {}) {
  return kind === 'outbound' ? validateOutboundPath(inputPath) : validateInboundPath(inputPath);
}
