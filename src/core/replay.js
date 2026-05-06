import { asArrayFixture, listJsonFiles, readJson } from './fixture.js';
import { sortByTimestamp } from './clock.js';
import { validateInboundEvent } from './inbound.js';

export async function replayInboundPath(inputPath, options = {}) {
  const files = await listJsonFiles(inputPath);
  const timeline = [];
  const issues = [];
  for (const file of files) {
    const events = asArrayFixture(await readJson(file), 'events');
    events.forEach((event, index) => {
      const eventIssues = validateInboundEvent(event, index);
      issues.push(...eventIssues.map((issue) => `${file}: ${issue}`));
      if (eventIssues.length === 0) timeline.push({ ...event, sourceFile: file });
    });
  }
  const ordered = options.preserveOrder ? timeline : sortByTimestamp(timeline);
  return ordered.map((event, sequence) => ({
    sequence: sequence + 1,
    at: event.timestamp,
    channelId: event.channel.id,
    senderId: event.sender.id,
    type: event.type,
    messageId: event.message.id,
    text: event.message.text,
    sourceFile: event.sourceFile
  })).concat(issues.length ? [{ sequence: null, type: 'replay.issues', issues }] : []);
}
