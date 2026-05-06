export function helpText() {
  return `qqbridge — local-first OpenClaw QQ adapter test kit

Usage:
  qqbridge validate <path> [--kind inbound|outbound] [--format json|text]
  qqbridge replay <path> [--format json|jsonl|text]
  qqbridge inspect <path> [--output report.json]
  qqbridge schema [inbound|outbound]
  qqbridge safety

No command performs QQ network calls. Fixtures are local JSON only.\n`;
}
