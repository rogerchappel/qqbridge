# Fixture Format

Inbound fixtures contain `events[]`; outbound fixtures contain `actions[]`.

Required inbound fields: `id`, `type`, `timestamp`, `channel`, `sender`, and `message`.
Required outbound fields: `id`, `type`, and `channel`; `send.message` also requires `message`.

Identifiers intentionally use a conservative character set so fixtures are safe for filenames, logs, and JSONL replay.
