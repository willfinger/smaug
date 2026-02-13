#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, 'knowledge');
const TOOLS_DIR = path.join(KNOWLEDGE_DIR, 'tools');
const ARTICLES_DIR = path.join(KNOWLEDGE_DIR, 'articles');

function getFileInfo(dir, filename) {
  const content = fs.readFileSync(path.join(dir, filename), 'utf8');
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const categoryMatch = content.match(/category:\s*(\w+-?\w*)/);
  const priorityMatch = content.match(/priority:\s*(\w+)/);
  const ratingMatch = content.match(/rating:\s*(\d)/);
  const tagsMatch = content.match(/tags:\s*\[([^\]]+)\]/);
  const starsMatch = content.match(/stars:\s*([\d.,]+k?)/i);
  
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch[1].split(',').map(t => t.trim().replace(/"/g, ''));
  }

  return {
    filename,
    title: titleMatch ? titleMatch[1] : filename.replace('.md', ''),
    category: categoryMatch ? categoryMatch[1] : 'other',
    priority: priorityMatch ? priorityMatch[1] : 'low',
    rating: ratingMatch ? parseInt(ratingMatch[1]) : 3,
    tags,
    stars: starsMatch ? starsMatch[1] : null
  };
}

function getAllFiles(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(f => getFileInfo(dir, f));
}

function sortByRating(a, b) {
  if (b.rating !== a.rating) return b.rating - a.rating;
  return a.title.localeCompare(b.title);
}

function generateToolsIndex() {
  const tools = getAllFiles(TOOLS_DIR);
  
  const byCategory = {};
  const byPriority = { high: [], medium: [], low: [] };
  const byRating = { 5: [], 4: [], 3: [], 2: [], 1: [] };
  const allTags = {};

  for (const tool of tools) {
    if (!byCategory[tool.category]) byCategory[tool.category] = [];
    byCategory[tool.category].push(tool);
    byPriority[tool.priority].push(tool);
    byRating[tool.rating].push(tool);
    
    for (const tag of tool.tags) {
      allTags[tag] = (allTags[tag] || 0) + 1;
    }
  }

  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort(sortByRating);
  }
  for (const pri of Object.keys(byPriority)) {
    byPriority[pri].sort(sortByRating);
  }
  for (const rat of Object.keys(byRating)) {
    byRating[rat].sort(sortByRating);
  }

  let md = '# Tools Index\n\n';
  md += `**Total:** ${tools.length} tools\n\n`;
  md += `**Last Updated:** ${new Date().toISOString().split('T')[0]}\n\n`;

  md += '## By Category\n\n';
  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length);
  for (const entry of sortedCategories) {
    md += `- **${entry[0]}** (${entry[1].length})\n`;
  }
  md += '\n';

  for (const entry of sortedCategories) {
    const cat = entry[0];
    const items = entry[1];
    md += `### ${cat} (${items.length})\n\n`;
    for (const tool of items) {
      const starStr = tool.rating >= 4 ? ' ⭐' : '';
      md += `- [${tool.title}](${tool.filename})${starStr}\n`;
    }
    md += '\n';
  }

  md += '## By Priority\n\n';
  md += `- **High** (${byPriority.high.length})\n`;
  md += `- **Medium** (${byPriority.medium.length})\n`;
  md += `- **Low** (${byPriority.low.length})\n\n`;

  if (byPriority.high.length > 0) {
    md += `### High Priority (${byPriority.high.length})\n\n`;
    for (const tool of byPriority.high) {
      md += `- [${tool.title}](${tool.filename}) - ${tool.rating}★\n`;
    }
    md += '\n';
  }

  md += '## By Rating\n\n';
  for (let i = 5; i >= 1; i--) {
    md += `- **${i} stars** (${byRating[i].length})\n`;
  }
  md += '\n';

  md += '### Top Rated (5 stars)\n\n';
  for (const tool of byRating[5]) {
    md += `- [${tool.title}](${tool.filename})\n`;
  }
  md += '\n';

  md += '## Popular Tags\n\n';
  const sortedTags = Object.entries(allTags).sort((a, b) => b[1] - a[1]).slice(0, 20);
  for (const entry of sortedTags) {
    md += `- \`${entry[0]}\` (${entry[1]})\n`;
  }
  md += '\n';

  return md;
}

function generateArticlesIndex() {
  const articles = getAllFiles(ARTICLES_DIR);
  
  const byCategory = {};
  const allTags = {};

  for (const article of articles) {
    if (!byCategory[article.category]) byCategory[article.category] = [];
    byCategory[article.category].push(article);
    
    for (const tag of article.tags) {
      allTags[tag] = (allTags[tag] || 0) + 1;
    }
  }

  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort(sortByRating);
  }

  let md = '# Articles Index\n\n';
  md += `**Total:** ${articles.length} articles\n\n`;
  md += `**Last Updated:** ${new Date().toISOString().split('T')[0]}\n\n`;

  md += '## By Category\n\n';
  for (const entry of Object.entries(byCategory)) {
    md += `- **${entry[0]}** (${entry[1].length})\n`;
  }
  md += '\n';

  for (const entry of Object.entries(byCategory)) {
    const cat = entry[0];
    const items = entry[1];
    md += `### ${cat} (${items.length})\n\n`;
    for (const article of items) {
      const starStr = article.rating >= 4 ? ' ⭐' : '';
      md += `- [${article.title}](${article.filename})${starStr}\n`;
    }
    md += '\n';
  }

  return md;
}

function generateMainReadme() {
  const tools = getAllFiles(TOOLS_DIR);
  const articles = getAllFiles(ARTICLES_DIR);
  
  const byCategory = {};
  const byPriority = { high: 0, medium: 0, low: 0 };
  const byRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const item of [...tools, ...articles]) {
    byCategory[item.category] = (byCategory[item.category] || 0) + 1;
    byPriority[item.priority]++;
    byRating[item.rating]++;
  }

  let md = '# Smaug Knowledge Base\n\n';
  md += '> Knowledge archive curated from Twitter bookmarks and other sources.\n\n';
  
  md += '## Overview\n\n';
  md += '| Metric | Count |\n';
  md += '|--------|-------|\n';
  md += `| **Total Items** | ${tools.length + articles.length} |\n`;
  md += `| Tools | ${tools.length} |\n`;
  md += `| Articles | ${articles.length} |\n`;
  md += `| Categories | ${Object.keys(byCategory).length} |\n\n`;

  md += '## Quick Navigation\n\n';
  md += '- [Tools Index](tools/README.md) - Browse all tools\n';
  md += '- [Articles Index](articles/README.md) - Browse all articles\n\n';

  md += '## By Category\n\n';
  const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  for (const entry of sortedCategories) {
    md += `- **${entry[0]}**: ${entry[1]} items\n`;
  }
  md += '\n';

  md += '## Metadata Reference\n\n';
  md += 'Each knowledge file contains the following metadata:\n\n';
  md += '```yaml\n';
  md += '---\n';
  md += 'title: "Repository Name"\n';
  md += 'type: tool | article\n';
  md += 'category: ai-ml | web-dev | dev-tools | backend | design | ...\n';
  md += 'tags: [tag1, tag2, ...]\n';
  md += 'priority: high | medium | low\n';
  md += 'rating: 1-5 stars\n';
  md += 'status: unread | read | in-progress\n';
  md += 'date_added: YYYY-MM-DD\n';
  md += 'last_updated: YYYY-MM-DD\n';
  md += '---\n';
  md += '```\n\n';

  md += '## Categories\n\n';
  md += '| Category | Description |\n';
  md += '|----------|-------------|\n';
  md += '| **ai-ml** | AI/ML tools, LLMs, automation, agents |\n';
  md += '| **web-dev** | Frontend, React, Vue, CSS, UI frameworks |\n';
  md += '| **dev-tools** | CLI, IDE, Git, developer utilities |\n';
  md += '| **backend** | APIs, servers, databases, backend frameworks |\n';
  md += '| **design** | UI/UX, Figma, colors, typography |\n';
  md += '| **mobile** | iOS, Android, Flutter, mobile apps |\n';
  md += '| **data** | Data tools, databases, analytics |\n';
  md += '| **security** | Security, auth, privacy |\n';
  md += '| **testing** | Testing frameworks, E2E, mocking |\n';
  md += '| **gaming** | Games, game development |\n';
  md += '| **productivity** | Productivity tools, notes, tasks |\n';
  md += '| **learning** | Tutorials, guides, education |\n';
  md += '| **other** | Everything else |\n\n';

  return md;
}

console.log('Generating index files...');

const toolsIndex = generateToolsIndex();
fs.writeFileSync(path.join(TOOLS_DIR, 'README.md'), toolsIndex);
console.log('  ✓ tools/README.md');

const articlesIndex = generateArticlesIndex();
fs.writeFileSync(path.join(ARTICLES_DIR, 'README.md'), articlesIndex);
console.log('  ✓ articles/README.md');

const mainReadme = generateMainReadme();
fs.writeFileSync(path.join(KNOWLEDGE_DIR, 'README.md'), mainReadme);
console.log('  ✓ knowledge/README.md');

console.log('\nIndex generation complete!');
