const SAFE_ID = /^[A-Za-z0-9._:-]{1,128}$/;

export function isSafeId(value) {
  return typeof value === 'string' && SAFE_ID.test(value);
}

export function requireSafeId(value, field, issues) {
  if (!isSafeId(value)) {
    issues.push(`${field} must be a non-empty safe id using letters, numbers, dot, underscore, colon, or dash`);
  }
}
