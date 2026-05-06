import { replayInboundPath } from '../core/replay.js';

export async function runReplay(inputPath, options = {}) {
  return replayInboundPath(inputPath, options);
}
