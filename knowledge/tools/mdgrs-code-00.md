---
title: "Rehook - Webhook Dispatcher"
type: tool
category: dev-tools
tags: ["go", "ai", "design"]
priority: low
rating: 3
status: unread
date_added: 2026-01-20
last_updated: 2026-01-21

language: Go
---
Rehook is a lightweight webhook dispatcher created by jstemmer that filters incoming requests from external services and triggers appropriate actions based on configurable rules. This utility serves as a bridge between various external services and your internal systems, enabling automated workflows and integrations through webhook events.

## Key Features

- **Request Filtering** - Configurable filters to route incoming webhook requests based on headers, body content, or other criteria
- **Action Dispatching** - Execute custom actions or forward requests to different endpoints
- **Simple Configuration** - Straightforward setup for handling webhook integrations
- **Service Integration** - Connect multiple external services through a single endpoint
- **Lightweight** - Minimal resource overhead for webhook processing
- **Extensible** - Design allows for custom filters and actions
- **Error Handling** - Built-in error handling for failed webhook deliveries
- **Security** - Basic security features for validating webhook requests

## Use Cases

- **Multi-Service Integration** - Centralize webhook handling for multiple SaaS integrations
- **Event Processing Pipeline** - Create custom workflows from external service events
- **API Gateway Extension** - Add webhook handling capabilities to existing API infrastructure
- **GitHub Integration** - Handle GitHub webhooks for repository events
- **Slack Bot Integration** - Process Slack events and trigger actions
- **CI/CD Pipeline** - Connect external services to build and deployment systems
- **Notification System** - Route notifications from various services to appropriate channels
- **Microservice Communication** - Enable inter-service communication through webhooks

## Links

- [GitHub Repository](https://github.com/jstemmer/rehook)
- [Alternative: surfly/webhook-dispatcher](https://github.com/surfly/webhook-dispatcher)
- [Alternative: collinmcneese/github-webhook-dispatcher](https://github.com/collinmcneese/github-webhook-dispatcher)
- [Related: Go webhook handling guides](https://www.redpanda.com/blog/build-webhook-dispatcher-real-time-streaming-data)
