---
title: "Continuous Claude v2"
type: tool
category: ai-ml
tags: ["mcp", "rust", "python", "ai", "agent"]
priority: low
rating: 3
status: unread
date_added: 2026-01-02
last_updated: 2026-01-21
stars: 1400
language: Python
---
Continuous Claude v2 is a Python framework that solves the context management and session continuity challenges in Claude Code workflows. It enables sophisticated multi-session workflows, agent orchestration, and efficient token management through persistent state, ledger-based tracking, and isolated context windows.

## Key Features

- **Session Continuity** - Maintain state via ledgers and handoffs across sessions
- **Ledger System** - Persistent state tracking with structured reasoning history
- **Handoff Protocol** - Resume work from previous sessions without context loss
- **MCP Execution Isolation** - Run MCP code without polluting main context
- **Agent Orchestration** - Coordinate multiple subagents with isolated context windows
- **Hooks System** - Lifecycle hooks at SessionStart, PreToolUse, PostToolUse, etc.
- **Token Efficiency** - Compact ledgers and smart context loading
- **Artifact Index** - Track artifacts and outcomes across sessions
- **Braintrust Integration** - Session tracing and compound learnings

## Use Cases

- Building production Claude Code applications
- Multi-session feature development with state carryover
- Orchestrating multiple AI agents for complex tasks
- Research and experimentation workflows
- Token-efficient long-running agent systems

## Links

- [GitHub](https://github.com/parcadei/Continuous-Claude-v2)
- [Original Tweet](https://x.com/parcadei/status/2005755875701776624)
