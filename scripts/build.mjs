import fs from 'node:fs/promises';
import path from 'node:path';

await fs.rm('dist', { recursive: true, force: true });
await fs.mkdir('dist', { recursive: true });
await fs.writeFile(path.join('dist', 'README.txt'), 'qqbridge is source-distributed; build verifies package shape.\n');
await fs.copyFile('package.json', path.join('dist', 'package.json'));
console.log('build complete: dist/package.json');
