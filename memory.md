# Smaug Memory 🐉

> Context for AI agents working with this knowledge base

## What This Is

Smaug is a personal knowledge base that archives:
- **X.com (Twitter) bookmarks** - 2,669 items
- **GitHub starred repos** - 30 items
- **Tools** - 237 total (from bookmarks + stars)
- **Articles** - 19 items

## Repository Structure

```
smaug/
├── bookmarks.md                 # All 2,669 X.com bookmarks
├── knowledge/
│   ├── README.md             # Main index
│   ├── STARRED_BY_DATE.md    # GitHub stars sorted by date
│   ├── STARRED_BY_CATEGORY.md # GitHub stars by category
│   ├── BOOKMARKS_SUMMARY.md  # Bookmark keyword analysis
│   ├── tools/                # 237 tool files
│   │   └── README.md        # Tool index
│   └── articles/            # 19 article files
│       └── README.md        # Article index
├── .state/                  # Processing state
├── src/                     # Smaug code (Node.js)
├── smaug.config.json        # Configuration
└── package.json             # v0.3.1
```

## Key Files for AI Agents

### 1. STARRED_BY_DATE.md
All 30 GitHub stars sorted when you starred them:
- February 2026: 4 repos
- January 2026: 11 repos
- December 2025: 4 repos
- Older: 11 repos

### 2. STARRED_BY_CATEGORY.md
Organized by category:
- 🤖 AI Agents: 8 repos
- 💎 Skills (Claude Code): 8 repos
- 🦞 OpenClaw/OpenCode: 4 repos
- 🎨 UI/Design: 3 repos
- 🛠️ DevTools: 4 repos

### 3. BOOKMARKS_SUMMARY.md
Analysis of 2,669 bookmarks:
- Top keywords: AI (440), Claude (326), Cursor (220), MCP (214)
- Top authors: @figma (58), @tom_doerr (55), @UiSavior (41)

## Configuration

`smaug.config.json`:
- `source`: "bookmarks" (or "likes", "both")
- `claudeModel`: "sonnet" (for processing)
- `cliTool`: "opencode" (uses OpenCode for AI)
- `parallelThreshold`: 8 (parallel processing kicks in at 8+ bookmarks)
- `folders`: X.com bookmark folder mappings

## How to Update

### Fetch New Bookmarks
```bash
cd /Users/william/smaug
npx smaug fetch --all          # Fetch all bookmarks
npx smaug fetch --all --max-pages 5  # Limit pages
```

### Process New Bookmarks
```bash
npx smaug run                  # Full job (fetch + process)
npx smaug run --limit 50       # Process 50 at a time
npx smaug process              # Process already-fetched
```

### Add New GitHub Stars
1. Check your stars: `gh api users/willbnu/starred`
2. For each new repo, create `knowledge/tools/{owner}-{repo}.md`
3. Update index files (STARRED_BY_DATE.md, STARRED_BY_CATEGORY.md)

## Metadata Schema

Every tool/article file should have:

```yaml
---
title: "Tool Name"
type: tool | article
tags: [category, subcategory, language]
stars: 12345        # GitHub stars (for repos)
date_added: 2026-02-13
date_created: 2026-01-11  # Repo creation date
via: "GitHub star" | "X.com bookmark"
---
```

## Top Tools (by GitHub stars)

| Repo | Stars | Category |
|------|-------|----------|
| vercel-labs/agent-browser | 13,966 | ai-agents |
| hkuds/RAG-Anything | 13,049 | ai-agents |
| eigent-ai/eigent | 12,375 | desktop |
| vercel-labs/json-render | 10,513 | ui |
| k-dense-ai/claude-scientific-skills | 8,615 | skills |

## User Interests

Based on bookmarks analysis:
- **Primary**: AI Agents, Claude Code, Cursor, MCP
- **Secondary**: Design tools (Figma, Framer), Developer experience
- **Tertiary**: Local-first tools, Open source projects

## For Future AI Agents

When helping the user:
1. Check BOOKMARKS_SUMMARY.md for their interests
2. Check STARRED_BY_CATEGORY.md for relevant tools
3. Search knowledge/tools/ for specific tools
4. Use bookmarks.md for specific bookmarks

---
*Last Updated: 2026-02-13*
*Version: Smaug v0.3.1*
