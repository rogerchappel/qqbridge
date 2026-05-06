export function toIsoTimestamp(value, field = 'timestamp') {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) {
    return { ok: false, issue: `${field} must be an ISO-8601 timestamp` };
  }
  return { ok: true, value: new Date(value).toISOString() };
}

export function sortByTimestamp(events) {
  return [...events].sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));
}
