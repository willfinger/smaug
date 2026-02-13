#!/usr/bin/env node
/**
 * Efficient parallel processing script for Smaug bookmarks
 * Uses 40 subagents processing ~50 bookmarks each
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_DIR = path.join(__dirname, '.state');
const PENDING_FILE = path.join(STATE_DIR, 'pending-bookmarks.json');

// Read pending bookmarks
const pending = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
const bookmarks = pending.bookmarks;
const total = bookmarks.length;

console.log(`\n📊 Processing ${total} bookmarks efficiently...\n`);

// Use larger batches: 40 subagents processing ~50 bookmarks each
const NUM_SUBAGENTS = 40;
const BOOKMARKS_PER_AGENT = Math.ceil(total / NUM_SUBAGENTS);

console.log(`   Subagents: ${NUM_SUBAGENTS}`);
console.log(`   Bookmarks per agent: ~${BOOKMARKS_PER_AGENT}\n`);

// Prepare chunks for subagents
const chunks = [];
for (let i = 0; i < NUM_SUBAGENTS; i++) {
  const start = i * BOOKMARKS_PER_AGENT;
  const end = Math.min(start + BOOKMARKS_PER_AGENT, total);
  const chunkBookmarks = bookmarks.slice(start, end);

  if (chunkBookmarks.length === 0) break;

  chunks.push({
    chunkNum: i,
    bookmarks: chunkBookmarks,
    startIdx: start,
    endIdx: end - 1,
    count: chunkBookmarks.length
  });
}

// Write chunk data
const chunksFile = path.join(STATE_DIR, 'chunks.json');
fs.writeFileSync(chunksFile, JSON.stringify(chunks, null, 2));

console.log(`\n✓ Prepared ${chunks.length} chunks for parallel processing\n`);
console.log(`Chunk summary:`);
chunks.forEach(c => {
  console.log(`  Chunk ${c.chunkNum}: bookmarks ${c.startIdx}-${c.endIdx} (${c.count} items)`);
});

console.log(`\n📝 Save this for spawning subagents:\n`);
console.log(`==================================================`);
console.log(`// Paste these Task calls into Claude Code:\n`);

chunks.forEach(chunk => {
  const prompt = `Process chunk ${chunk.chunkNum}: Write to .state/chunk-${chunk.chunkNum}.md

Process these ${chunk.count} Twitter bookmarks and write markdown entries to .state/chunk-${chunk.chunkNum}.md

BOOKMARKS (process in order - oldest first):
${JSON.stringify(chunk.bookmarks, null, 2)}

For each bookmark:
1. Determine best title (not generic - use repo name, article headline, or key insight)
2. Categorize: github.com → ./knowledge/tools/, articles → ./knowledge/articles/, others → bookmarks.md only
3. Write entry format:

---
DATE: {bookmark.date}
## @{author} - {descriptive_title}
> {tweet_text (max 200 chars)}

- **Tweet:** {tweet_url}
- **Link:** {expanded_url}
- **Filed:** [{filename}](./knowledge/{type}/{slug}.md) (if filed)
- **What:** {1-2 sentence description}

For GitHub repos, also create ./knowledge/tools/{repo-name}.md with:
---
title: "{repo-name}"
type: tool
date_added: {YYYY-MM-DD}
source: "{github_url}"
via: "Twitter bookmark from @{author}"
---
{description}

For articles, create ./knowledge/articles/{slug}.md with similar frontmatter.

DO NOT write to bookmarks.md - only to .state/chunk-${chunk.chunkNum}.md and knowledge files.
`;
  console.log(`Task(subagent_type="general-purpose", model="haiku", prompt="${prompt.replace(/\n/g, ' ').substring(0, 200)}...")`);
});

console.log(`\n==================================================`);
console.log(`\nAfter all subagents complete, merge chunks into bookmarks.md in descending date order.`);
