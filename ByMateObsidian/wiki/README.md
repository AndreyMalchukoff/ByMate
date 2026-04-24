---
title: wiki/ — LLM-generated knowledge
---

# wiki/

**Claude's territory.** Every page in here is written and maintained by the LLM. The user reads, navigates, asks questions — but the writing is Claude's job.

## Subfolders

- **`entities/`** — anything with a name: people, companies, products, places, projects.
- **`concepts/`** — ideas, frameworks, mechanisms, recurring themes that aren't tied to a single named thing.
- **`sources/`** — one summary page per ingested source in `raw/`. Bibliographic anchor + 5–15 bullet takeaways + entity/concept links.
- **`syntheses/`** — cross-cutting analyses, comparisons, theses. Often produced from a query the user asked that turned out to be worth keeping.

## Conventions

- Wikilinks (`[[page-name]]`) for every reference to another page — that's what powers the graph view.
- Inline citations: link the source page right next to the claim, e.g. *"Revenue grew 40% ([[bymate-q3-report]])."*
- YAML frontmatter on every page (see `CLAUDE.md` for the schema).
- ASCII kebab-case filenames so links don't break across tools.

## Don't add files here yourself

If you want a page that doesn't exist, ask Claude to create it. The whole point of the pattern is that Claude does the bookkeeping — index updates, cross-references, log entries. Manual additions skip all of that and create drift.

(Exception: edit-in-place fixes — typos, small clarifications — are fine. Just tell Claude what you changed so the log stays honest.)
