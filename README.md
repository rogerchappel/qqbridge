# qqbridge

A local-first OpenClaw QQ adapter test kit: fixtures in, validated replay out, zero QQ network calls by default.

qqbridge is for developers and agents who need to shape, test, and review QQ channel adapter payloads safely before any real integration exists.

## Install

```sh
npm install
npm link
qqbridge --help
```

## Quickstart

```sh
qqbridge validate fixtures/sample/inbound.json
qqbridge replay fixtures/sample/inbound.json --format jsonl
qqbridge validate fixtures/outbound/actions.json --kind outbound --format text
qqbridge safety
```

## What it does

- Validates inbound QQ-like channel event fixtures.
- Validates outbound adapter action payloads.
- Replays local channel events as deterministic JSONL.
- Prints bundled schema sketches for fixture authors.
- Documents a hard safety boundary: no credentials, no hidden network, no telemetry.

## CLI

```sh
qqbridge validate <path> [--kind inbound|outbound] [--format json|text]
qqbridge replay <path> [--format json|jsonl|text]
qqbridge inspect <path> [--output report.json]
qqbridge schema [inbound|outbound]
qqbridge safety
```

## Safety

This is not a QQ client. The CLI never sends messages, reads tokens, scrapes cookies, or contacts QQ. See [docs/AUTH-SAFETY.md](docs/AUTH-SAFETY.md).

## Attribution

The idea was inspired by an adjacent public `openclaw-qqbot` signal noted in the PRD. qqbridge is a fresh local-first test kit and does not copy that implementation.

## Release readiness

Run the same checks that CI uses before opening a release PR:

```sh
npm run release:readiness
npm run release:check
```

`release:readiness` validates repository metadata, the package files allowlist, package smoke coverage, and CI placeholder cleanup. `release:check` runs the project build, test, smoke, and package dry-run checks where configured.

## Contributing

Keep changes small and fixture-driven. Add tests for new message shapes and run:

```sh
npm test
npm run check
npm run build
npm run smoke
npm run package:smoke
npm run release:check
bash scripts/validate.sh
```

MIT © Roger Chappel
