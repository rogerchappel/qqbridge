import fs from 'node:fs/promises';
import { renderTextReport } from './core/report.js';

export async function emit(value, { format = 'json', output } = {}) {
  let body;
  if (format === 'text' && value && value.tool === 'qqbridge') body = renderTextReport(value);
  else if (format === 'jsonl' && Array.isArray(value)) body = `${value.map((item) => JSON.stringify(item)).join('\n')}\n`;
  else if (format === 'text' && Array.isArray(value)) body = `${value.map((item) => `${item.sequence}. [${item.at}] ${item.senderId}: ${item.text}`).join('\n')}\n`;
  else body = `${JSON.stringify(value, null, 2)}\n`;
  if (output) await fs.writeFile(output, body, 'utf8');
  else process.stdout.write(body);
}
