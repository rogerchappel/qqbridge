import { parseArgs, pickInput } from './cli-args.js';
import { helpText } from './help.js';
import { emit } from './output.js';
import { runValidate } from './commands/validate.js';
import { runReplay } from './commands/replay.js';
import { runInspect } from './commands/inspect.js';
import { loadSchema } from './commands/schema.js';
import { safetySummary } from './commands/safety.js';
import { formatError } from './errors.js';

export async function main(argv) {
  const args = parseArgs(argv);
  const command = args._[0] || (args.help ? 'help' : 'help');
  try {
    if (command === 'help' || command === '--help' || command === '-h') return process.stdout.write(helpText());
    if (command === 'validate') return emit(await runValidate(pickInput(args), { kind: args.kind }), args);
    if (command === 'replay') return emit(await runReplay(pickInput(args), { preserveOrder: Boolean(args['preserve-order']) }), args);
    if (command === 'inspect') return emit(await runInspect(pickInput(args)), args);
    if (command === 'schema') return emit(await loadSchema(args._[1]), args);
    if (command === 'safety') return emit(safetySummary(), args);
    throw new Error(`Unknown command: ${command}\n\n${helpText()}`);
  } catch (error) {
    throw new Error(formatError(error));
  }
}
