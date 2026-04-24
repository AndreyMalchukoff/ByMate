---
title: raw/ — source documents
---

# raw/

**Immutable source documents.** This is the source of truth.

Drop anything here that you want compiled into the wiki: PDFs, web articles (use Obsidian Web Clipper), interview transcripts, meeting notes, screenshots, datasets, photos, voice memos transcribed to text.

## Rules

- Files here are **read-only** for Claude. Claude reads them, never edits or renames them.
- Use any filename you want. Claude doesn't care about your naming — it just needs to find the file.
- Images downloaded by the Obsidian "Download attachments" hotkey land in `assets/` automatically.

## Workflow

1. You drop a source here.
2. You tell Claude: *"ingest the new file in raw/"* (or be more specific if there are several).
3. Claude reads it, discusses takeaways with you, files a summary in `wiki/sources/`, and propagates updates across the rest of the wiki.

## What lives here vs. what doesn't

**Yes:** raw materials you want analyzed.
**No:** Claude's outputs (those go in `wiki/`), exploratory chat (that's just conversation), the wiki schema (that's `CLAUDE.md`).
