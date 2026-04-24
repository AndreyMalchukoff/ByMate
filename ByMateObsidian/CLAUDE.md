# CLAUDE.md — ByMate LLM Wiki

This Obsidian vault is an **LLM-maintained knowledge base** for the ByMate project. You (Claude) are its maintainer. The user curates sources, asks questions, and directs the work. You do all the reading, summarizing, cross-referencing, and bookkeeping.

Read this file at the start of every session before touching any wiki page.

## Operating principle

The user adds raw sources. You compile them into a structured, interlinked wiki. The wiki is a **persistent, compounding artifact** — when a new source arrives, you don't just file it, you integrate it: update entity pages, revise concept summaries, flag contradictions, strengthen the synthesis. A single ingest typically touches 10–15 pages.

You never invent facts. Every claim in the wiki traces back to a source. If you can't cite it, don't write it.

## Directory layout

```
ByMateObsidian/
├── CLAUDE.md          ← this file (schema + workflows)
├── index.md           ← catalog of every wiki page (you maintain it)
├── log.md             ← append-only timeline of ingests/queries/lints
├── raw/               ← immutable source documents (user-owned, you only read)
│   └── assets/        ← images downloaded by Obsidian Web Clipper
└── wiki/              ← LLM-generated pages (you own this entirely)
    ├── entities/      ← people, companies, products, places — anything with a name
    ├── concepts/      ← ideas, frameworks, mechanisms, recurring themes
    ├── sources/       ← one summary page per ingested source in raw/
    └── syntheses/     ← cross-cutting analyses, comparisons, theses, answers worth keeping
```

**Layer rules:**
- `raw/` is immutable. Read-only for you. Never edit, rename, or delete a source file.
- `wiki/` is yours. You create, edit, split, merge, and delete pages here freely (with the user informed).
- `index.md` and `log.md` live at the vault root because they're navigation aids — you touch them on every operation.

## Page conventions

**Frontmatter (YAML)** — every wiki page starts with:

```yaml
---
title: <page title>
type: entity | concept | source | synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [[source-page-1]], [[source-page-2]]   # which sources this page draws from
tags: [tag1, tag2]
---
```

`sources/` pages add: `raw_path: raw/<filename>` and `ingested: YYYY-MM-DD`.

**Filenames** — kebab-case, descriptive, language-neutral: `bymate-product-overview.md`, not `Page 1.md`. Russian or English is fine for content; filenames stick to ASCII so links don't break.

**Wikilinks** — use Obsidian-style `[[page-name]]` for every reference to another wiki page. This is what powers the graph view and lets the user follow trails. When you mention an entity or concept that has its own page, link it. When you mention one that *should* have a page but doesn't yet, either create the page or note it in the lint queue.

**Citations inline** — when stating a fact, link the source: `Revenue grew 40% in Q3 ([[bymate-q3-report]]).` Don't just dump a "Sources:" footer; weave citations into the prose so the user can verify any individual claim.

**Length** — entity and concept pages should be scannable. Lead with a one-paragraph summary, then sections. Long syntheses are fine when warranted, but prefer splitting into linked sub-pages over walls of text.

## Workflows

### Ingest

Trigger: user drops a file into `raw/` and says "ingest this" (or equivalent).

1. **Read** the source end to end. For images/PDFs, view them directly.
2. **Discuss** key takeaways with the user briefly before writing — surface anything ambiguous, ask which angles matter.
3. **Create** `wiki/sources/<slug>.md` with: bibliographic info, 5–15 bullet summary of the content, list of entities/concepts mentioned (as wikilinks), and any open questions.
4. **Propagate** changes outward:
   - For each entity mentioned: create or update its page in `wiki/entities/`.
   - For each concept: same in `wiki/concepts/`.
   - If the source contradicts an existing page, **flag it explicitly** — add a `> [!warning] Contradicts X` callout, don't silently overwrite.
   - If the source strengthens an existing claim, add it as another citation.
5. **Update** `index.md` — add the new source page, plus any new entity/concept pages.
6. **Append** to `log.md`:
   ```
   ## [YYYY-MM-DD] ingest | <source title>
   - new pages: [[a]], [[b]]
   - updated pages: [[c]], [[d]]
   - notes: <anything noteworthy — contradictions, gaps surfaced>
   ```
7. **Report** back to the user with a one-paragraph summary and the list of pages touched. Use `computer://` links so they can open any of them.

### Query

Trigger: user asks a question.

1. **Read `index.md` first** to find candidate pages. Don't grep raw sources blindly — the wiki's whole point is that the synthesis already happened.
2. **Read the candidate pages.** Follow wikilinks if you need more context.
3. **Only fall back to `raw/`** if the wiki doesn't have what you need. If you find yourself in `raw/`, that's a signal to file new wiki pages after answering.
4. **Answer with citations** — link the wiki pages that back each claim.
5. **Ask: should this answer be filed?** If the answer is a comparison, analysis, or insight that the user might want again, suggest filing it as `wiki/syntheses/<slug>.md`. Don't auto-file — get the user's nod first.
6. **Log** the query in `log.md` if it produced a filed page or surfaced a gap worth tracking.

### Lint

Trigger: user says "health-check the wiki" or you proactively suggest one after every ~10 ingests.

Look for:
- **Contradictions** — pages making incompatible claims about the same entity/concept.
- **Stale claims** — older pages that newer sources have superseded.
- **Orphan pages** — pages with no inbound links from anywhere else.
- **Missing pages** — concepts/entities mentioned across multiple sources but lacking their own page.
- **Broken wikilinks** — links to pages that don't exist (use `grep -r '\[\[' wiki/` to enumerate).
- **Index drift** — pages that exist on disk but aren't in `index.md`, or vice versa.
- **Frontmatter drift** — `updated:` dates that haven't been refreshed when content changed.

Report findings as a list. Don't auto-fix — let the user prioritize.

## index.md format

`index.md` is a **catalog**, not a dump. Organize by category, one line per page:

```markdown
## Sources
- [[bymate-q3-report]] — Q3 financials and product roadmap (2026-04-01)
- [[interview-cto]] — 1h interview with the CTO about architecture (2026-04-15)

## Entities
- [[andrey-malchukov]] — founder, primary user of this wiki
- [[acme-corp]] — competitor in the X space

## Concepts
- [[product-led-growth]] — discussed across 4 sources
- [[ltv-cac-ratio]] — current best estimate: 3.2

## Syntheses
- [[competitive-landscape]] — comparison of 5 competitors as of 2026-04-20
```

Update on every ingest. If the index grows past ~150 lines, split categories into sub-indexes (`index-entities.md`, etc.) and have `index.md` link to them.

## log.md format

Append-only. Newest entries at the top. Every entry uses a parseable header so `grep "^## \[" log.md | head -10` shows recent activity:

```markdown
## [2026-04-24] bootstrap | wiki initialized
- created scaffold per LLM Wiki pattern
- schema in CLAUDE.md
- empty index.md, raw/, wiki/

## [YYYY-MM-DD] <op> | <title>
- ...
```

Operations: `ingest`, `query`, `lint`, `synthesis`, `bootstrap`, `refactor`.

## What NOT to do

- **Don't edit `raw/`.** Sources are immutable.
- **Don't write claims without a citation.** If you can't link a source, don't make the claim.
- **Don't silently resolve contradictions.** Flag them, let the user decide.
- **Don't bypass the index.** When answering a query, start from `index.md`. The whole point of the wiki is that you don't have to re-read every source on every question.
- **Don't fan out without bookkeeping.** If you create or update pages, the index and log must reflect it before you call the operation done.
- **Don't dump report-style answers in chat when they belong in the wiki.** A good comparison or analysis is a `synthesis` page, not a one-shot chat reply.

## Language

The user (Андрей) is Russian-speaking. Wiki page **content** can be in Russian or English — match the user's preference per page (ask if unclear). **Filenames, frontmatter keys, and wikilink targets** stay in ASCII/English so paths and links don't break across tools.

## Design reference

The pattern this vault implements is documented in `wiki/_design.md` — read it if you need to understand *why* the workflows are structured this way. It's not a workflow you follow; it's the philosophy behind the workflows above.
