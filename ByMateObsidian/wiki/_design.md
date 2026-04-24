---
title: LLM Wiki — design pattern
type: synthesis
created: 2026-04-24
updated: 2026-04-24
sources: []
tags: [meta, design]
---

# LLM Wiki — design pattern

This page records the design philosophy this vault implements. It's not a how-to (see `CLAUDE.md` at the vault root for that) — it's the *why*. Read it when you need to make a judgment call that the workflows in `CLAUDE.md` don't cover.

## The core idea

Most people's experience with LLMs and documents looks like RAG: upload a collection of files, the LLM retrieves relevant chunks at query time, generates an answer. The LLM is rediscovering knowledge from scratch on every question. Nothing accumulates.

This vault works differently. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between the user and the raw sources. When a new source arrives, the LLM reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, flagging contradictions, strengthening or challenging the evolving synthesis.

The wiki is a **persistent, compounding artifact**. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything that's been read.

The user never (or rarely) writes the wiki. The user's job is sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, bookkeeping.

## Three layers

1. **Raw sources** (`raw/`) — curated source documents. Immutable. The source of truth.
2. **The wiki** (`wiki/`, `index.md`) — LLM-generated, interlinked markdown. The LLM owns it.
3. **The schema** (`CLAUDE.md`) — tells the LLM how the wiki is structured and what workflows to follow. Co-evolved with the user as they figure out what works.

## Three operations

- **Ingest** — file a new source into the wiki. Typically touches 10–15 pages.
- **Query** — answer a question against the wiki, falling back to raw only if needed. Good answers can be filed back as new pages.
- **Lint** — periodic health check: contradictions, stale claims, orphans, missing pages, broken links.

## Why the index and log matter

`index.md` is **content-oriented** — a catalog of every page. The LLM reads it first on every query. At moderate scale (~hundreds of pages) this works without embedding-based RAG.

`log.md` is **chronological** — an append-only record of what happened and when. Parseable with `grep "^## \[" log.md | tail -5`. Gives the user a timeline of the wiki's evolution.

## Why this works

The tedious part of maintaining a knowledge base is not the reading or thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value.

LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

## Lineage

The pattern is in spirit close to Vannevar Bush's **Memex** (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.

Concrete present-day cousins:
- **Tolkien Gateway** and similar fan wikis — thousands of interlinked pages built by volunteers over years. This vault aims at the same shape, built by one person + one LLM.
- **NotebookLM, ChatGPT file uploads** — RAG-style. Useful, but the synthesis is re-derived on every query and never compounds.

## Optional tooling worth knowing about

- **Obsidian Web Clipper** — browser extension that converts web articles to markdown. Drop the result into `raw/`.
- **Obsidian "Download attachments for current file"** — bind to a hotkey (e.g. Ctrl+Shift+D) so images get pulled local into `raw/assets/`. Lets the LLM view images directly instead of relying on URLs.
- **Obsidian graph view** — the best way to see the shape of the wiki. Hubs, orphans, clusters all visible.
- **Marp** — markdown-based slide deck format. Useful for generating presentations directly from wiki content.
- **Dataview plugin** — runs queries over page frontmatter. If frontmatter is consistent (it should be), Dataview can generate dynamic tables.
- **qmd** — local hybrid BM25/vector search engine for markdown. Worth introducing once the index file gets unwieldy (probably past ~100 sources).

## Note on this document

This page is intentionally abstract. It describes the pattern, not the specifics. The exact directory structure, page formats, and tooling are recorded in `CLAUDE.md` and will evolve as the wiki grows. If `CLAUDE.md` and this page ever conflict, `CLAUDE.md` wins — it's the operational doc.
