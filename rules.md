# Smaug Rules & Guidelines 📋

> Operating rules for maintaining this knowledge base

---

## Core Principles

1. **Organize by Source** - Always note if entry came from GitHub star or X.com bookmark
2. **Maintain Metadata** - Every file needs frontmatter with tags, dates
3. **Keep Indexes Updated** - When adding content, update related index files
4. **Sort by Context** - Date for temporal research, Category for topic research

---

## File Naming Conventions

### Tools (knowledge/tools/)
```
{owner}-{repo}.md

Examples:
├── vercel-labs-agent-browser.md
├── hkuds-rag-anything.md
├── blader-humanizer.md
└── k-dense-ai-claude-scientific-skills.md
```

### Articles (knowledge/articles/)
```
{descriptive-name}.md

Examples:
├── ai-agents-overview.md
├── cursor-vs-claude.md
└── mcp-tutorial.md
```

---

## Frontmatter Required Fields

### For Tools
```yaml
---
title: "exact-repo-name"
type: tool
tags: [category, subcategory, language]
stars: 12345          # GitHub stars
date_added: YYYY-MM-DD
date_created: YYYY-MM-DD  # When repo was created
via: "GitHub star"
---
```

### For Articles
```yaml
---
title: "Descriptive Title"
type: article
tags: [topic, subtopic]
date_added: YYYY-MM-DD
via: "X.com bookmark"
---
```

---

## Category Tags

Use these standard tags:

| Tag | Use For |
|-----|---------|
| ai-agents | AI agent tools |
| skills | Claude Code/OpenClaw skills |
| openclaw | OpenClaw-specific tools |
| opencode | OpenCode-specific tools |
| ui | UI frameworks/libraries |
| design | Design tools |
| devtools | Developer utilities |
| desktop | Desktop applications |
| security | Security tools |
| learning | Educational resources |
| python | Python projects |
| typescript | TypeScript projects |
| go | Go projects |
| shell | Shell scripts/skills |

---

## Index Update Checklist

When adding **new tool**:
- [ ] Create `knowledge/tools/{owner}-{repo}.md`
- [ ] Add to `STARRED_BY_DATE.md` (if GitHub star)
- [ ] Add to `STARRED_BY_CATEGORY.md` (if GitHub star)
- [ ] Add to `knowledge/tools/README.md`
- [ ] Update counts in `knowledge/README.md`

When adding **new article**:
- [ ] Create `knowledge/articles/{name}.md`
- [ ] Add to `knowledge/articles/README.md`
- [ ] Update counts in `knowledge/README.md`

---

## Processing Rules

### Bookmarks Processing
1. Fetch with: `npx smaug fetch --all`
2. Process with: `npx smaug run`
3. Auto-categorizes: tool → `knowledge/tools/`, article → `knowledge/articles/`
4. Deduplication: Don't re-process if already in `bookmarks.md`

### GitHub Stars
1. Check: `gh api users/willbnu/starred`
2. Compare with existing files in `knowledge/tools/`
3. Add missing repos manually

---

## Commit Messages

Use conventional commits:

```
feat: Add {repo} to knowledge base
fix: Update {tool} metadata
docs: Add bookmark summary
refactor: Reorganize category indexes
changelog: Record new additions
```

---

## Quality Checks

Before committing, verify:
- [ ] All new files have frontmatter
- [ ] Index files are updated
- [ ] No duplicate entries
- [ ] Filenames follow conventions
- [ ] Tags are consistent

---

## Backup & Sync

- Changes auto-commit to: `https://github.com/willfinger/smaug`
- Pull before making changes: `git pull fork main`
- Push after changes: `git push fork main`

---

## Quick Commands

```bash
# Daily workflow
cd /Users/william/smaug

# Check for new GitHub stars
gh api users/willbnu/starred --jq 'length'

# Fetch new bookmarks
npx smaug fetch --all

# Process (50 at a time)
npx smaug run --limit 50

# Commit changes
git add -A && git commit -m "feat: description"
git push fork main
```

---

## Troubleshooting

### "No new bookmarks to process"
- All fetched bookmarks already in bookmarks.md
- Or need fresh credentials in smaug.config.json

### "GitHub stars not showing"
- Check: `gh auth status`
- Token needs `repo` scope

### Processing timeout
- Reduce limit: `npx smaug run --limit 10`
- Or increase timeout in config

---

*Last Updated: 2026-02-13*
