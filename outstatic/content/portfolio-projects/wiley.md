---
title: 'Wiley'
status: 'published'
author:
  name: 'Chris Esplin'
  picture: 'https://avatars.githubusercontent.com/u/878947?v=4'
slug: 'wiley'
description: ''
coverImage: '/images/wiley-logo-black.svg'
publishedAt: '2026-10-15T00:00:00.000Z'
---

### Project Summary

[Wiley](https://wileyphone.com/) is a modern home phone service built for families who want their kids to stay connected without handing them a smartphone. Wiley pairs physical VoIP desk phones with a parent-managed web portal so families get the simplicity of a landline with modern safety controls.

We architected and built the Wiley parent portal, onboarding and device provisioning pipeline, and internal operations tooling. Parents can pick a local phone number, configure approved-only contact lists, block spam callers, set daily quiet hours, manage speed dials on physical phone keys, review call history and voicemail, register E911 addresses, and manage recurring subscriptions.

The hardest part of the project was bridging consumer-grade UX with enterprise telecom infrastructure—making PBX domains, physical hardware provisioning, carrier number ordering, E911 compliance, and recurring billing feel effortless for a parent setting up a phone at the kitchen table.

### Technology

Wiley is built with Next.js, React, TypeScript, and Tailwind CSS on Firebase (Firestore and Firebase App Hosting), using TanStack Query, TanStack Table, AWS SES, PostHog, and AI-assisted support workflows powered by the Vercel AI SDK and Google Gemini.

Under the hood, the application orchestrates multiple telecom and billing systems: Altaworx/NetSapiens (`ns-api`) for PBX domains, answering rules, timeframes, and call detail records; Bandwidth for number search, ordering, and E911 management; Grandstream Zero Touch Provisioning (ZTP) for physical phone and speed-dial configuration; and Rev.io for subscription billing and invoicing.
