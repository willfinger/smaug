---
title: "joelhooks/opencode-vibe"
type: tool
category: design
tags: ["cli", "productivity", "react", "typescript", "ai"]
priority: low
rating: 3
status: unread
date_added: 2026-01-20
last_updated: 2026-01-21


---
## Repository Info

- **Stars**: 160
- **Language**: TypeScript
- **Description**: 🏄‍♂️ Next.js 16 web UI for OpenCode - real-time chat with streaming, SSE sync, and React Server Components

## Overview

A modern Next.js 16 web interface for OpenCode, featuring real-time chat with streaming responses, Server-Sent Events synchronization, and React Server Components. This is a rebuild of the OpenCode web application with a Catppuccin-themed interface for enhanced AI coding assistance.

## Key Features

### Core Architecture
- **World Stream Architecture** - Push-based reactive state via `createWorldStream()`
- **Multi-server Discovery** - Automatically finds all running OpenCode processes using `lsof`
- **Cross-process Messaging** - Send messages from web UI that appear in your TUI
- **Real-time Streaming** - Messages stream in as the AI generates them
- **SSE Sync** - All updates pushed via Server-Sent Events for instant synchronization

### User Interface
- **Catppuccin Theme** - Beautiful Latte (light) / Mocha (dark) theme with proper syntax highlighting
- **Slash Commands** - Type `/` for actions like `/fix`, `/test`, `/refactor`
- **File References** - Type `@` to fuzzy-search and attach files as context
- **Modern UI** - Clean, intuitive interface built with Next.js 16

### Technical Features
- **React Server Components** - Leveraging Next.js 16's latest features
- **TypeScript** - Full type safety throughout the application
- **Streaming Architecture** - Optimized for real-time AI responses
- **Multi-process Communication** - Seamless integration with OpenCode backend

## Use Cases

### Primary Use Cases
1. **AI Coding Assistance** - Web-based interface for real-time AI help while coding
2. **Collaborative Development** - Cross-process messaging between web UI and TUI
3. **Code Review Enhancement** - Integrated file context and slash commands for quick actions
4. **Learning & Development** - Visual interface for understanding OpenCode capabilities
5. **Productivity Boost** - Streamlined workflow between CLI and web interfaces

### Ideal Users
- Developers already using OpenCode who prefer a web-based interface
- Teams collaborating on AI-assisted development
- Users who want visual feedback alongside CLI operations
- Developers working with streaming AI responses

## Technical Specifications

### Built With
- **Next.js 16** - React framework with Server Components
- **TypeScript** - Type-safe JavaScript
- **React Server Components** - Modern server-side rendering
- **SSE (Server-Sent Events)** - Real-time updates
- **Catppuccin** - Beautiful color theme

### Architecture Highlights
- Push-based reactive state management
- Automatic server discovery and connection
- Seamless cross-process communication
- Optimized for streaming AI responses

## Why Developers Choose This

- **Seamless Integration** - Works perfectly alongside existing OpenCode TUI
- **Real-time Experience** - Streaming responses without page refreshes
- **Beautiful Design** - Catppuccin theme for comfortable coding
- **Modern Tech Stack** - Leveraging latest Next.js features
- **Productivity Focus** - Designed to enhance, not replace, existing workflows

## Links

- [Source](https://github.com/joelhooks/opencode-vibe)
- [Original Tweet](https://x.com/joelhooks/status/2005718055075393944)
- [OpenCode](https://github.com/opencode-vibe/opencode-vibe) (Upstream repository)

