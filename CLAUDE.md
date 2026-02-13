# Smaug - AI Coding Assistant Guide

> How AI assistants should work with this knowledge base

## Project Overview

Smaug is a personal knowledge management system that:
- Archives X.com (Twitter) bookmarks to markdown
- Collects GitHub starred repositories
- Organizes tools and articles with AI-powered categorization

## Key Information

### For the AI Assistant

**Location**: `/Users/william/smaug/`

**Important Files**:
- `memory.md` - Context about what's in the knowledge base
- `agent.md` - Instructions for adding/updating knowledge
- `rules.md` - Naming conventions and quality guidelines
- `bookmarks.md` - 2,669 X.com bookmarks
- `knowledge/` - Tools and articles

**Configuration**: `smaug.config.json`
- Uses OpenCode for AI processing
- Source: X.com bookmarks
- Parallel threshold: 8 bookmarks

### For the User

The user is interested in:
- AI Agents and Claude Code
- Cursor and OpenClaw
- MCP (Model Context Protocol)
- Design tools (Figma, Framer)
- Developer experience tools

---

## Common Tasks

### 1. Finding Information
```
User: "Find tools for X"
→ Check knowledge/STARRED_BY_CATEGORY.md
→ Search knowledge/tools/
→ Check BOOKMARKS_SUMMARY.md for keywords
```

### 2. Adding New GitHub Star
```
User: "Add this repo to knowledge base"
→ gh api repos/{owner}/{repo} (get info)
→ Create knowledge/tools/{owner}-{repo}.md
→ Update index files
→ Commit and push
```

### 3. Fetching New Bookmarks
```
User: "Check for new bookmarks"
→ cd /Users/william/smaug
→ npx smaug fetch --all
→ npx smaug run --limit 50
→ Commit and push
```

---

## Tools Available

AI assistants have access to:
- File read/write/edit
- Bash (git, npm, node)
- GitHub CLI (gh)
- Grep, glob for search

---

## Key Files Reference

| File | Purpose |
|------|---------|
| memory.md | What this knowledge base contains |
| agent.md | How to add/update knowledge |
| rules.md | Naming conventions, quality rules |
| bookmarks.md | All 2,669 X.com bookmarks |
| STARRED_BY_CATEGORY.md | 30 GitHub stars by category |
| STARRED_BY_DATE.md | 30 GitHub stars by date |
| BOOKMARKS_SUMMARY.md | Bookmark keyword analysis |

---

## Contact

- **Repository**: https://github.com/willfinger/smaug
- **Version**: v0.3.1
- **User**: willbnu (GitHub)
- **Account**: willfinger (fork)

---

*For AI Assistants - 2026-02-13*
