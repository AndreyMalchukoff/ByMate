# Log

Append-only timeline of operations on this wiki. Newest entries on top. Each entry uses a parseable header so `grep "^## \[" log.md | head -10` shows recent activity.

Operations: `bootstrap`, `ingest`, `query`, `lint`, `synthesis`, `refactor`.

---

## [2026-04-24] bootstrap | wiki initialized
- Created scaffold per LLM Wiki pattern (see [[_design]])
- Schema and workflows in `CLAUDE.md` at vault root
- Empty `index.md`; `raw/` ready for sources
- Subdirectories: `wiki/entities/`, `wiki/concepts/`, `wiki/sources/`, `wiki/syntheses/`, `raw/assets/`
- Next step: drop a first source into `raw/` and ask for an ingest
