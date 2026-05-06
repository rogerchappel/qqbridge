import { SAFETY } from '../core/types.js';

export function safetySummary() {
  return {
    tool: 'qqbridge',
    network: SAFETY.networkDefault,
    credentials: SAFETY.credentials,
    writes: SAFETY.writes,
    boundary: 'qqbridge is a deterministic fixture harness, not a QQ client. Real network adapters must live behind explicit user code.'
  };
}
