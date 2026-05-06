export function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token.startsWith('--')) {
      const [key, inline] = token.slice(2).split('=', 2);
      if (inline !== undefined) args[key] = inline;
      else if (argv[index + 1] && !argv[index + 1].startsWith('--')) args[key] = argv[++index];
      else args[key] = true;
    } else args._.push(token);
  }
  return args;
}

export function pickInput(args, fallback = 'fixtures/sample') {
  return args.input || args._[1] || fallback;
}
