---
title: "jesseduffield/lazygit"
type: tool
category: design
tags: ["go", "ai"]
priority: medium
rating: 4
status: unread
date_added: 2026-01-20
last_updated: 2026-01-21


---
Lazygit is exceptionally good software.

It's like software's greatest hits. Clear, quick, easy to command, drive-by-keyboard if you want, contrasty, glanceable, peacefully powerful, the list goes on....

## Repository Info

- **Stars**: 70,912
- **Language**: Go
- **Description**: Simple terminal UI for git commands

## Key Features

### Core Functionality
- **Stage individual lines** - Press space to stage specific lines, `v` for range selection, `a` for entire hunks
- **Interactive Rebase** - Press `i` to start interactive rebasing with squash, fixup, drop, edit operations
- **Cherry-pick** - Press `shift+c` to copy, `shift+v` to paste (cherry-pick) commits
- **Bisect** - Press `b` in commits view to start git bisect
- **Working Tree Management** - `shift+d` to nuke (reset) working tree changes
- **Commit Amendment** - `shift+a` on any commit to amend with staged changes
- **Filter Views** - Use `/` to filter any view (branches, commits, etc.)
- **Custom Commands** - Flexible system for creating custom git operations
- **Worktrees** - Press `w` to create worktrees from branches
- **Custom Patches** - Build custom patches from commits and manipulate them
- **Rebase from Marked Base** - `shift+b` to mark a base commit for rebasing
- **Undo/Redo** - `z` for undo, `ctrl+z` for redo (uses reflog)
- **Commit Graph** - Visual commit graph with author colors
- **Commit Comparison** - `shift+w` to compare any two commits/branches

### Advanced Features
- **Git Flow Support** - Built-in support for Gitflow workflow
- **Custom Pagers** - Configure custom pager programs
- **Directory Navigation** - Option to change directory to selected repo on exit
- **Keyboard-driven Interface** - Full keyboard control with comprehensive keybindings

## Installation

Multiple installation methods available:
- **Binary releases** for Windows, macOS, and Linux
- **Package managers**: Homebrew, MacPorts, Scoop, Chocolatey, Winget
- **Linux distributions**: Debian, Ubuntu, Fedora, Arch, NixOS, openSUSE
- **Go**: `go install github.com/jesseduffield/lazygit@latest`
- **Manual**: Clone and build from source

## Use Cases

1. **Git Operations Simplification** - Replace complex git commands with intuitive UI
2. **Code Review Workflow** - Easily stage changes, create commits, and manage branches
3. **Feature Development** - Interactive rebasing and cherry-picking for clean feature branches
4. **Bug Hunting** - Bisect functionality for finding problematic commits
5. **Team Collaboration** - Worktrees for parallel development without stashing
6. **Learning Git** - Visual interface to understand git operations better

## Why Developers Love It

- **Keyboard-driven** - No mouse required, pure keyboard control
- **Contextual UI** - Shows relevant information based on current state
- **Performance** - Fast and responsive terminal interface
- **Extensible** - Custom commands for specialized workflows
- **Cross-platform** - Works consistently across all major operating systems

## Links

- [Source](https://github.com/jesseduffield/lazygit)
- [Original Tweet](https://x.com/jasonfried/status/1985430767670083800)
- [Documentation](https://github.com/jesseduffield/lazygit/wiki)
- [Keybindings](https://github.com/jesseduffield/lazygit/blob/master/docs/keybindings/Keybindings.md)
- [Configuration](https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md)

