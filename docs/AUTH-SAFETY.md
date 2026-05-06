# Auth and Safety Boundaries

qqbridge is not a QQ bot and not a credential manager. The MVP is a deterministic test kit for adapter development.

## Guarantees in this repo

- No QQ API calls are made by the CLI or library.
- No environment variables are read for tokens.
- No browser cookies, keychains, or local messaging databases are inspected.
- File writes happen only when a user passes `--output`.
- Fixtures are plain JSON so review is easy.

## If you build a real adapter

Keep it in a separate package or an explicit integration layer. Require clear user approval for credentials and sending, log outbound intent, and keep fixture replay available as the default test mode.
