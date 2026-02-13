# Smaug Agent Instructions 🤖

> Instructions for AI agents working with this knowledge base

## Purpose

This file guides AI agents on how to:
1. Research and find information in the knowledge base
2. Check for updates (new bookmarks, GitHub stars)
3. Add new knowledge entries
4. Maintain organization

---

## Quick Reference

### Finding Information

| What you need | Where to look |
|---------------|---------------|
| Specific tool | `knowledge/tools/{owner}-{repo}.md` |
| Tools by category | `knowledge/STARRED_BY_CATEGORY.md` |
| Tools by date | `knowledge/STARRED_BY_DATE.md` |
| Bookmark keywords | `knowledge/BOOKMARKS_SUMMARY.md` |
| All bookmarks | `bookmarks.md` |

### Common Tasks

```bash
# Check GitHub stars
gh api users/willbnu/starred --jq '.[].full_name'

# Fetch new X.com bookmarks
cd /Users/william/smaug && npx smaug fetch --all

# Process new bookmarks
cd /Users/william/smaug && npx smaug run --limit 50
```

---

## Rules for Adding Knowledge

### 1. Tool Files (knowledge/tools/)

**Filename format**: `{owner}-{repo}.md` (lowercase)
- ✅ `vercel-labs-agent-browser.md`
- ❌ `agent-browser.md` (missing owner)

**Required frontmatter**:
```yaml
---
title: "agent-browser"
type: tool
tags: [ai-agents, browser-automation, typescript]
stars: 13966
date_added: 2026-02-13
date_created: 2026-01-11
via: "GitHub star"
---

Description of the tool...

## Key Features
- Feature 1
- Feature 2

## Links
- [GitHub](https://github.com/...)
```

### 2. Article Files (knowledge/articles/)

**Filename format**: `{descriptive-name}.md` (lowercase, hyphens)
- ✅ `ai-agents-overview.md`
- ❌ `Article-1.md`

**Required frontmatter**:
```yaml
---
title: "AI Agents Overview"
type: article
tags: [ai, agents, guide]
date_added: 2026-02-13
via: "X.com bookmark"
---

Article content...
```

---

## Updating Index Files

When adding new tools, update these files:

### 1. STARRED_BY_DATE.md
Add to appropriate month section:
```markdown
| [owner/repo](knowledge/tools/owner-repo.md) | 123 | category |
```

### 2. STARRED_BY_CATEGORY.md
Add to appropriate category section:
```markdown
| [owner/repo](knowledge/tools/owner-repo.md) | 123 | Description |
```

### 3. knowledge/tools/README.md
Add to appropriate category section (check existing format).

### 4. knowledge/README.md
Update the overview table if counts change.

---

## GitHub Stars Workflow

### Checking for New Stars

```bash
# Get current stars (30 repos)
gh api users/willbnu/starred --jq '.[].full_name'

# Compare with knowledge base
ls knowledge/tools/*-*.md | wc -l
```

### Adding New GitHub Star

1. Get repo info:
```bash
gh api repos/{owner}/{repo} --jq '{
  name: .name,
  owner: .owner.login,
  description: .description,
  stars: .stargazers_count,
  language: .language,
  url: .html_url,
  created: .created_at
}'
```

2. Create file: `knowledge/tools/{owner}-{repo}.md`

3. Update index files

4. Commit:
```bash
git add -A
git commit -m "feat: Add {owner}/{repo} to knowledge base"
```

---

## X.com Bookmarks Workflow

### Fetching New Bookmarks

```bash
cd /Users/william/smaug

# Check current state
npx smaug process --help

# Fetch ALL bookmarks (requires bird CLI from git)
npx smaug fetch --all

# Process new bookmarks
npx smaug run --limit 50
```

### Understanding Processing

- Smaug uses **OpenCode** (configured as cliTool) for AI processing
- Processes in parallel when 8+ bookmarks (parallelThreshold)
- Each bookmark gets categorized as: tool, article, or tweet
- Tools go to `knowledge/tools/`
- Articles go to `knowledge/articles/`
- Tweets stay in `bookmarks.md`

---

## Changelog Management

### Checking GitHub Changelogs

For tools, check their GitHub for recent changes:
```bash
gh api repos/{owner}/{repo}/releases --jq '.[0:3] | .[] | {tag: .tag_name, date: .published_at, name: .name}'
```

### Adding Changelog Notes

Create `CHANGELOG.md` in knowledge base:
```markdown
# Changelog

## 2026-02-13
- Added 30 GitHub starred repos
- Created category indexes
- Added bookmark keyword analysis
```

---

## Quality Guidelines

### Do ✅
- Use descriptive titles
- Include tags for searchability
- Add stars count for GitHub repos
- Link to original sources
- Use consistent filenames

### Don't ❌
- Don't add duplicate entries
- Don't forget to update index files
- Don't use generic descriptions
- Don't skip metadata frontmatter

---

## Testing Changes

After making changes:
```bash
cd /Users/william/smaug

# Check git status
git status

# Preview changes
git diff --stat

# Commit
git commit -m "feat: description of changes"
```

---

## Need Help?

1. Check `memory.md` for context
2. Check existing files for format examples
3. Check `knowledge/README.md` for overview

---
*For AI Agents - Version: 2026-02-13*
