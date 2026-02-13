---
title: "karpathy-nanogpt"
type: tool
category: ai-ml
tags: ["python", "ai", "node"]
priority: low
rating: 3
status: unread
date_added: 2026-01-20
last_updated: 2026-01-21
stars: 0
language: Python
---
The simplest, fastest repository for training/finetuning medium-sized GPTs. This is a rewrite of minGPT that prioritizes functionality over education, offering a streamlined approach to training GPT models with minimal code complexity.

## Key Features

- Minimal codebase - Only ~300 lines for training loop and ~300 lines for GPT model definition
- Plain and readable implementation that's easy to hack and modify
- Can reproduce GPT-2 (124M) on OpenWebText training in ~4 days on a single 8XA100 40GB node
- Supports both training from scratch and finetuning pretrained checkpoints
- Character-level and token-level training options
- Configurable training parameters through simple config files
- Compatible with various hardware (GPU, CPU, Apple Silicon MPS)

## Use Cases

Perfect for researchers and developers who want to:
- Understand GPT architecture by studying a clean, minimal implementation
- Train custom GPT models on their own datasets
- Fine-tune existing GPT-2 models for specific tasks
- Experiment with different training parameters and architectures
- Learn deep learning fundamentals through practical implementation
- Reproduce research results with a well-documented baseline

## Links

- [GitHub](https://github.com/karpathy/nanoGPT)
- [Note] This repo is deprecated - nanochat is the recommended alternative
