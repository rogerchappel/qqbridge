import { validateInboundPath, validateOutboundPath } from '../src/index.js';

const inbound = await validateInboundPath('fixtures/sample/inbound.json');
const outbound = await validateOutboundPath('fixtures/outbound/actions.json');
if (!inbound.valid || !outbound.valid) {
  console.error(JSON.stringify({ inbound, outbound }, null, 2));
  process.exit(1);
}
console.log('fixture validation passed');
