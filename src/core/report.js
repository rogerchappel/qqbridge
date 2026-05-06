export function createReport({ subject, files, valid, issues, counts, safety }) {
  return {
    tool: 'qqbridge',
    subject,
    valid,
    files,
    counts,
    issues,
    safety,
    generatedAt: new Date().toISOString()
  };
}

export function renderTextReport(report) {
  const lines = [
    `qqbridge ${report.subject} report`,
    `valid: ${report.valid}`,
    `files: ${report.files.length}`,
    `issues: ${report.issues.length}`
  ];
  for (const [key, value] of Object.entries(report.counts || {})) lines.push(`${key}: ${value}`);
  if (report.issues.length) lines.push('', ...report.issues.map((issue) => `- ${issue}`));
  lines.push('', `safety: ${report.safety.networkDefault}; ${report.safety.credentials}`);
  return `${lines.join('\n')}\n`;
}
