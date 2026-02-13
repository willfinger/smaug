#!/usr/bin/env node
/**
 * Direct processing script for Smaug bookmarks
 * Processes all bookmarks and writes to bookmarks.md + knowledge files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_DIR = path.join(__dirname, '.state');
const PENDING_FILE = path.join(STATE_DIR, 'pending-bookmarks.json');
const ARCHIVE_FILE = path.join(__dirname, 'bookmarks.md');
const KNOWLEDGE_TOOLS = path.join(__dirname, 'knowledge/tools');
const KNOWLEDGE_ARTICLES = path.join(__dirname, 'knowledge/articles');

// Ensure knowledge directories exist
fs.mkdirSync(KNOWLEDGE_TOOLS, { recursive: true });
fs.mkdirSync(KNOWLEDGE_ARTICLES, { recursive: true });

// Read pending bookmarks
const pending = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
const bookmarks = pending.bookmarks;

console.log(`\n📊 Processing ${bookmarks.length} bookmarks...\n`);

// Category matching
const categories = {
  github: {
    match: (url) => url.includes('github.com'),
    folder: KNOWLEDGE_TOOLS,
    template: 'tool'
  },
  article: {
    match: (url) => /medium\.com|substack\.com|dev\.to|blog\.|usgraphics\.com|baz\.co|aitmpl\.com/i.test(url),
    folder: KNOWLEDGE_ARTICLES,
    template: 'article'
  }
};

// Helper: slugify
function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

// Helper: get title for bookmark
function getTitle(bookmark) {
  const { text, links, author } = bookmark;

  // Check for GitHub repo
  const githubLink = links.find(l => l.expanded.includes('github.com'));
  if (githubLink) {
    const match = githubLink.expanded.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) return `${match[1]}/${match[2]}`;
  }

  // Check for article
  const articleLink = links.find(l => categories.article.match(l.expanded));
  if (articleLink && articleLink.content?.text) {
    // Try to extract title from HTML
    const titleMatch = articleLink.content.text.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) return titleMatch[1].trim();
  }

  // Use first part of tweet
  return text.substring(0, 60).split('\n')[0];
}

// Helper: get description
function getDescription(bookmark) {
  const { text, links } = bookmark;
  const cleanText = text.replace(/https?:\/\/\S+/g, '').trim();
  return cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
}

// Helper: get date from bookmark
function getDate(bookmark) {
  return bookmark.date || 'Unknown Date';
}

// Process each bookmark
const entries = [];
const knowledgeFiles = [];

for (const bookmark of bookmarks) {
  const { id, author, tweetUrl, links } = bookmark;
  const title = getTitle(bookmark);
  const description = getDescription(bookmark);
  const date = getDate(bookmark);

  // Determine category
  let category = null;
  let linkUrl = tweetUrl;

  for (const [key, cat] of Object.entries(categories)) {
    const matchedLink = links.find(l => cat.match(l.expanded));
    if (matchedLink) {
      category = cat;
      linkUrl = matchedLink.expanded;
      break;
    }
  }

  // Build entry
  const entry = {
    date,
    author,
    title,
    description,
    tweetUrl,
    linkUrl,
    category: category ? Object.keys(categories).find(k => categories[k] === category) : 'tweet',
    bookmark
  };

  entries.push(entry);

  // Create knowledge file if applicable
  if (category) {
    const slug = slugify(title);
    const filePath = path.join(category.folder, `${slug}.md`);

    let content = `---
title: "${title}"
type: ${category.template}
date_added: ${new Date().toISOString().split('T')[0]}
source: "${linkUrl}"
via: "Twitter bookmark from @${author}"
---

${description}

`;

    if (category.template === 'tool') {
      content += `## Key Features

- Add features here

## Links

- [Source](${linkUrl})
- [Original Tweet](${tweetUrl})
`;
    } else {
      content += `## Key Takeaways

- Add takeaways here

## Links

- [Article](${linkUrl})
- [Original Tweet](${tweetUrl})
`;
    }

    knowledgeFiles.push({ path: filePath, content });
  }
}

// Write knowledge files
console.log(`\n📁 Creating ${knowledgeFiles.length} knowledge files...`);
for (const file of knowledgeFiles) {
  fs.writeFileSync(file.path, file.content);
}

// Read existing bookmarks.md
let existingContent = '';
if (fs.existsSync(ARCHIVE_FILE)) {
  existingContent = fs.readFileSync(ARCHIVE_FILE, 'utf8');
}

// Group entries by date
const dateGroups = {};
for (const entry of entries) {
  if (!dateGroups[entry.date]) {
    dateGroups[entry.date] = [];
  }
  dateGroups[entry.date].push(entry);
}

// Sort dates descending
const sortedDates = Object.keys(dateGroups).sort((a, b) => {
  return new Date(b) - new Date(a);
});

// Build new bookmarks.md content
let newContent = `# Twitter Bookmarks Archive

`;

for (const date of sortedDates) {
  newContent += `\n# ${date}\n\n`;

  for (const entry of dateGroups[date]) {
    newContent += `## @${entry.author} - ${entry.title}\n`;
    newContent += `> ${entry.description}\n\n`;
    newContent += `- **Tweet:** ${entry.tweetUrl}\n`;
    if (entry.linkUrl !== entry.tweetUrl) {
      newContent += `- **Link:** ${entry.linkUrl}\n`;
    }
    if (entry.category !== 'tweet') {
      const slug = slugify(entry.title);
      const folder = entry.category === 'github' ? 'tools' : 'articles';
      newContent += `- **Filed:** [${slug}.md](./knowledge/${folder}/${slug}.md)\n`;
    }
    newContent += `\n---\n\n`;
  }
}

// Append to existing content
const finalContent = existingContent + newContent;

// Write bookmarks.md
fs.writeFileSync(ARCHIVE_FILE, finalContent);

// Clear pending file
fs.writeFileSync(PENDING_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), count: 0, bookmarks: [] }, null, 2));

console.log(`\n✅ Processing complete!`);
console.log(`   - Processed: ${entries.length} bookmarks`);
console.log(`   - Knowledge files: ${knowledgeFiles.length}`);
console.log(`   - Archive: ${ARCHIVE_FILE}`);
console.log(`\n📊 Summary by category:`);

const categoryCounts = {};
for (const entry of entries) {
  categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
}
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`   - ${cat}: ${count}`);
}

console.log();
