#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const KNOWLEDGE_DIR = path.join(__dirname, 'knowledge');
const TOOLS_DIR = path.join(KNOWLEDGE_DIR, 'tools');
const ARTICLES_DIR = path.join(KNOWLEDGE_DIR, 'articles');

// Category definitions with keyword patterns
const CATEGORIES = {
  'ai-ml': ['ai', 'llm', 'gpt', 'claude', 'copilot', 'machine learning', 'agent', 'automation', 'ai-powered', 'openai', 'anthropic'],
  'web-dev': ['react', 'vue', 'nextjs', 'frontend', 'web', 'html', 'css', 'tailwind', 'shadcn', 'typescript', 'javascript', 'jsx', 'tsx'],
  'dev-tools': ['cli', 'terminal', 'mcp', 'developer tools', 'git', 'vim', 'vscode', 'ide', 'extension', 'cursor', 'editor'],
  'backend': ['api', 'server', 'backend', 'database', 'node', 'python', 'rust', 'go', 'express', 'fastapi'],
  'design': ['design', 'ui', 'figma', 'color', 'theme', 'typography', 'ux', 'component'],
  'mobile': ['ios', 'android', 'flutter', 'swift', 'mobile', 'app', 'swiftui'],
  'data': ['data', 'database', 'analytics', 'visualization', 'postgresql', 'mysql', 'mongodb'],
  'security': ['security', 'auth', 'privacy', 'encryption', 'authentication'],
  'testing': ['test', 'testing', 'e2e', 'mock', 'playwright', 'cypress'],
  'gaming': ['game', 'gaming'],
  'productivity': ['productivity', 'notes', 'task', 'todo', 'calendar', 'kanban'],
  'learning': ['tutorial', 'guide', 'learning', 'education', 'course'],
  'other': []
};

// Common tags
const COMMON_TAGS = [
  'claude-code', 'mcp', 'cli', 'automation', 'productivity',
  'react', 'typescript', 'rust', 'python', 'go', 'swift',
  'web-dev', 'ai', 'llm', 'agent', 'design', 'testing',
  'open-source', 'free', 'paid', 'self-hosted'
];

function detectCategory(content) {
  const contentLower = content.toLowerCase();
  let bestCategory = 'other';
  let maxMatches = 0;

  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (category === 'other') continue;
    const matches = keywords.filter(kw => contentLower.includes(kw)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }

  return bestCategory;
}

function detectTags(content, title) {
  const contentLower = content.toLowerCase();
  const titleLower = title.toLowerCase();
  const detectedTags = new Set();

  for (const tag of COMMON_TAGS) {
    if (contentLower.includes(tag) || titleLower.includes(tag)) {
      detectedTags.add(tag);
    }
  }

  // Detect language from content
  const languages = ['typescript', 'javascript', 'rust', 'python', 'go', 'swift', 'java', 'cpp', 'ruby', 'php'];
  for (const lang of languages) {
    if (contentLower.includes(lang)) {
      detectedTags.add(lang);
    }
  }

  // Detect frameworks
  const frameworks = ['react', 'vue', 'nextjs', 'tailwind', 'shadcn', 'node', 'express', 'fastapi', 'django', 'rails'];
  for (const fw of frameworks) {
    if (contentLower.includes(fw)) {
      detectedTags.add(fw);
    }
  }

  return Array.from(detectedTags).slice(0, 5);
}

function extractStars(content) {
  const match = content.match(/stars:\s*([\d.,]+k?)/i);
  if (match) {
    return match[1];
  }
  return null;
}

function detectRating(content, stars) {
  const contentLower = content.toLowerCase();
  if (contentLower.includes('awesome') || contentLower.includes('excellent') || contentLower.includes('must-have') || contentLower.includes('essential')) {
    return 5;
  }
  if (contentLower.includes('great') || contentLower.includes('powerful') || contentLower.includes('useful')) {
    return 4;
  }
  if (stars) {
    const numStars = parseInt(stars.replace(/[k.,]/g, ''));
    if (numStars >= 10000) return 5;
    if (numStars >= 5000) return 4;
    if (numStars >= 1000) return 3;
  }
  return 3;
}

function detectPriority(content, rating) {
  const contentLower = content.toLowerCase();
  if (contentLower.includes('must-have') || contentLower.includes('essential') || rating === 5) {
    return 'high';
  }
  if (contentLower.includes('interesting') || contentLower.includes('useful') || rating >= 4) {
    return 'medium';
  }
  return 'low';
}

function parseExistingMetadata(content) {
  const metadata = {};
  
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  if (titleMatch) metadata.title = titleMatch[1];

  const dateMatch = content.match(/date_added:\s*([\d-]+)/);
  if (dateMatch) metadata.date_added = dateMatch[1];

  const starsMatch = content.match(/stars:\s*([\d.,]+k?)/i);
  if (starsMatch) metadata.stars = starsMatch[1];

  const langMatch = content.match(/language:\s*(\w+)/);
  if (langMatch) metadata.language = langMatch[1];

  return metadata;
}

function enhanceFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const existing = parseExistingMetadata(content);
  
  const bodyContent = content.substring(content.indexOf('---', 3) + 3);
  const category = detectCategory(content);
  const tags = detectTags(content, existing.title || '');
  const stars = existing.stars || extractStars(content);
  const rating = detectRating(content, stars);
  const priority = detectPriority(content, rating);
  
  const newFrontmatter = `---
title: "${existing.title || 'Untitled'}"
type: ${content.includes('type: article') ? 'article' : 'tool'}
category: ${category}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
priority: ${priority}
rating: ${rating}
status: unread
date_added: ${existing.date_added || new Date().toISOString().split('T')[0]}
last_updated: ${new Date().toISOString().split('T')[0]}
${stars ? `stars: ${stars}` : ''}
${existing.language ? `language: ${existing.language}` : ''}
---
`;

  const frontmatterEnd = content.indexOf('---', 3) + 3;
  const newContent = newFrontmatter + content.substring(frontmatterEnd).trimStart();

  fs.writeFileSync(filePath, newContent + '\n');
  
  return {
    title: existing.title,
    category,
    tags,
    priority,
    rating
  };
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const results = [];

  console.log(`\nProcessing ${files.length} files in ${dir}...`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const result = enhanceFile(filePath);
      results.push({ file, ...result });
      console.log(`  ✓ ${file} -> ${result.category} (${result.rating}★)`);
    } catch (error) {
      console.error(`  ✗ ${file}: ${error.message}`);
    }
  }

  return results;
}

function generateStats(results) {
  const stats = {
    byCategory: {},
    byPriority: { high: 0, medium: 0, low: 0 },
    byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    allTags: {}
  };

  for (const r of results) {
    stats.byCategory[r.category] = (stats.byCategory[r.category] || 0) + 1;
    stats.byPriority[r.priority]++;
    stats.byRating[r.rating] = (stats.byRating[r.rating] || 0) + 1;
    
    for (const tag of r.tags) {
      stats.allTags[tag] = (stats.allTags[tag] || 0) + 1;
    }
  }

  return stats;
}

console.log('=== Smaug Knowledge Enhancement ===');

const toolsResults = processDirectory(TOOLS_DIR);
const articlesResults = processDirectory(ARTICLES_DIR);

const allResults = [...toolsResults, ...articlesResults];
const stats = generateStats(allResults);

if (!fs.existsSync(path.join(__dirname, '.state'))) {
  fs.mkdirSync(path.join(__dirname, '.state'), { recursive: true });
}

fs.writeFileSync(
  path.join(__dirname, '.state', 'enhancement-stats.json'),
  JSON.stringify({ tools: toolsResults, articles: articlesResults, stats }, null, 2)
);

console.log('\n=== Enhancement Complete ===');
console.log(`Total files processed: ${allResults.length}`);
console.log(`Tools: ${toolsResults.length}`);
console.log(`Articles: ${articlesResults.length}`);
console.log('\nStats saved to .state/enhancement-stats.json');
