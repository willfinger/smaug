#!/usr/bin/env node
/**
 * Enhanced knowledge file processor
 * Fetches actual content from sources and uses LLM for rich descriptions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_TOOLS = path.join(__dirname, 'knowledge/tools');
const KNOWLEDGE_ARTICLES = path.join(__dirname, 'knowledge/articles');

// Read all knowledge files
function readKnowledgeFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const filePath = path.join(dir, entry.name);
      const content = fs.readFileSync(filePath, 'utf8');

      // Extract source URL
      const sourceMatch = content.match(/source: "([^"]+)"/);
      const typeMatch = content.match(/type: (tool|article)/);
      const titleMatch = content.match(/title: "([^"]+)"/);

      if (sourceMatch) {
        files.push({
          path: filePath,
          name: entry.name,
          source: sourceMatch[1],
          type: typeMatch ? typeMatch[1] : 'unknown',
          title: titleMatch ? titleMatch[1] : entry.name.replace('.md', ''),
          existingContent: content
        });
      }
    }
  }

  return files;
}

// Get all knowledge files
const tools = readKnowledgeFiles(KNOWLEDGE_TOOLS);
const articles = readKnowledgeFiles(KNOWLEDGE_ARTICLES);

console.log(`\n📚 Found ${tools.length} tools and ${articles.length} articles to enhance\n`);

// Prepare enhancement data
const enhancementData = {
  tools: tools.map(t => ({
    path: t.path,
    source: t.source,
    title: t.title,
    type: 'github'
  })),
  articles: articles.map(a => ({
    path: a.path,
    source: a.source,
    title: a.title,
    type: 'article'
  }))
};

// Save for subagents
const enhanceFile = path.join(__dirname, '.state', 'enhance-queue.json');
fs.writeFileSync(enhanceFile, JSON.stringify(enhancementData, null, 2));

console.log(`✓ Enhancement queue saved to .state/enhance-queue.json`);
console.log(`  - GitHub repos: ${tools.length}`);
console.log(`  - Articles: ${articles.length}\n`);

console.log(`📝 Next: Run enhancement with LLM\n`);
console.log(`Enhancement data prepared. Use Task tool to spawn subagents for enhancement.\n`);

// Output first few items for verification
console.log(`Sample items to enhance:\n`);
tools.slice(0, 3).forEach((t, i) => {
  console.log(`  ${i + 1}. ${t.title}`);
  console.log(`     Source: ${t.source}`);
});
