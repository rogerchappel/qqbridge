import { listJsonFiles, readJson, asArrayFixture } from './fixture.js';
import { validateInboundEvent } from './inbound.js';
import { validateOutboundAction } from './outbound.js';
import { createReport } from './report.js';
import { SAFETY } from './types.js';

export async function validateInboundPath(inputPath) {
  const files = await listJsonFiles(inputPath);
  const issues = [];
  let events = 0;
  for (const file of files) {
    const fixture = asArrayFixture(await readJson(file), 'events');
    fixture.forEach((event, index) => issues.push(...validateInboundEvent(event, index).map((issue) => `${file}: ${issue}`)));
    events += fixture.length;
  }
  return createReport({ subject: 'inbound', files, valid: issues.length === 0, issues, counts: { events }, safety: SAFETY });
}

export async function validateOutboundPath(inputPath) {
  const files = await listJsonFiles(inputPath);
  const issues = [];
  let actions = 0;
  for (const file of files) {
    const fixture = asArrayFixture(await readJson(file), 'actions');
    fixture.forEach((action, index) => issues.push(...validateOutboundAction(action, index).map((issue) => `${file}: ${issue}`)));
    actions += fixture.length;
  }
  return createReport({ subject: 'outbound', files, valid: issues.length === 0, issues, counts: { actions }, safety: SAFETY });
}
