# Orchestration

qqbridge is intentionally local-first. A safe agent workflow is:

1. Author or copy fixtures into a local directory.
2. Run `qqbridge validate <path>` before replay.
3. Run `qqbridge replay <path> --format jsonl` and pipe the events into a local adapter harness.
4. Review outbound actions with `qqbridge validate --kind outbound` before any separate tool sends them.

The CLI never opens sockets, reads QQ credentials, scrapes browser state, or sends messages. Network-capable adapters must be explicit downstream projects with their own approvals.
