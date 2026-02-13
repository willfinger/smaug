---
title: "Dimastatz/whisper-flow"
type: tool
category: ai-ml
tags: ["automation", "python", "ai", "design"]
priority: low
rating: 3
status: unread
date_added: 2026-01-02
last_updated: 2026-01-21

language: Python
---
Whisper-Flow is a framework designed to enable real-time transcription of audio content using OpenAI's Whisper model. Rather than processing entire files after upload ("batch mode"), Whisper-Flow accepts a continuous stream of audio chunks and produces incremental transcripts immediately.

## Key Features
- Real-time streaming audio transcription using tumbling window technique
- Incremental partial results during speech with final results when segments complete
- Sub-second latency (consistently below 500ms on M1 MacBook Air)
- Word Error Rate (WER) benchmarking with ~7% accuracy on LibriSpeech
- WebSocket support for easy integration
- Both web server and Python package implementations available

## Use Cases
- Live transcription of meetings and streaming content
- Real-time accessibility features and captioning systems
- Audio processing automation with immediate feedback
- Applications requiring sub-second transcription response times

## Links
- [GitHub](https://github.com/dimastatz/whisper-flow)
- [Original Tweet](https://x.com/tom_doerr/status/2006262985182834881)
