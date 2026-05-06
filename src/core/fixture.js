import fs from 'node:fs/promises';
import path from 'node:path';
import { QqbridgeError } from '../errors.js';

export async function readJson(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    throw new QqbridgeError(`Failed to read JSON fixture: ${filePath}`, { cause: error.message });
  }
}

export async function listJsonFiles(inputPath) {
  const stat = await fs.stat(inputPath);
  if (stat.isFile()) return [inputPath];
  const names = await fs.readdir(inputPath);
  return names.filter((name) => name.endsWith('.json')).sort().map((name) => path.join(inputPath, name));
}

export function asArrayFixture(value, key) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && Array.isArray(value[key])) return value[key];
  throw new QqbridgeError(`Fixture must be an array or contain ${key}[]`);
}
