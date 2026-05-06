import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export async function loadSchema(kind = 'inbound') {
  const safeKind = kind === 'outbound' ? 'outbound' : 'inbound';
  const schemaPath = path.resolve(root, '..', 'schemas', `${safeKind}.schema.json`);
  return JSON.parse(await fs.readFile(schemaPath, 'utf8'));
}
