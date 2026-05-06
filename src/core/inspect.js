import { validateInboundPath, validateOutboundPath } from './validate.js';

export async function inspectPath(inputPath) {
  const inbound = await validateInboundPath(inputPath);
  return {
    ...inbound,
    hint: inbound.valid ? 'Use replay to stream these events into an adapter harness.' : 'Fix validation issues before replay.'
  };
}

export async function inspectSuite({ inboundPath, outboundPath }) {
  const inbound = inboundPath ? await validateInboundPath(inboundPath) : null;
  const outbound = outboundPath ? await validateOutboundPath(outboundPath) : null;
  return {
    tool: 'qqbridge',
    valid: [inbound, outbound].filter(Boolean).every((report) => report.valid),
    inbound,
    outbound
  };
}
