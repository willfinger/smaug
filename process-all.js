#!/usr/bin/env node
/**
 * Process all pending bookmarks with Claude Code
 * Reads pending-bookmarks.json and processes in batches using parallel subagents
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_DIR = path.join(__dirname, '.state');
const PENDING_FILE = path.join(STATE_DIR, 'pending-bookmarks.json');

// Read pending bookmarks
const pending = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
const bookmarks = pending.bookmarks;
const total = bookmarks.length;

console.log(`\n📊 Processing ${total} bookmarks...\n`);

// Calculate batch size (~5 per batch)
const BATCH_SIZE = 5;
const numBatches = Math.ceil(total / BATCH_SIZE);

console.log(`   Batch size: ${BATCH_SIZE}`);
console.log(`   Total batches: ${numBatches}\n`);

// Prepare batches for subagents
const batches = [];
for (let i = 0; i < numBatches; i++) {
  const start = i * BATCH_SIZE;
  const end = Math.min(start + BATCH_SIZE, total);
  const batchBookmarks = bookmarks.slice(start, end);
  batches.push({
    batchNum: i,
    bookmarks: batchBookmarks,
    startIdx: start,
    endIdx: end
  });
}

// Write batch info to a file that subagents can read
const batchesFile = path.join(STATE_DIR, 'batches.json');
fs.writeFileSync(batchesFile, JSON.stringify(batches, null, 2));

console.log(`✓ Prepared ${batches.length} batch files`);
console.log(`\nTo process, run in Claude Code:`);
console.log(`\n   cd /Users/william/smaug`);
console.log(`   node -e "const batches=require('./.state/batches.json'); batches.forEach(b => console.log('Batch', b.batchNum, ': bookmarks', b.startIdx, '-', b.endIdx))"`);
console.log(`\nThen spawn subagents for each batch using Task tool.\n`);
