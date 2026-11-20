---
title: 'Trikin Capital'
status: 'published'
author:
  name: 'Chris Esplin'
  picture: 'https://avatars.githubusercontent.com/u/878947?v=4'
slug: 'trikin-capital'
description: ''
coverImage: '/images/trikin-logo-black.svg'
publishedAt: '2026-11-01T00:00:00.000Z'
---

### Project Summary

[Trikin Capital](https://trikin.co/) purchases residential leasing commission receivables from real estate brokerages and their sponsored agents. When a leasing agent closes an apartment placement, property managers often take weeks or months to pay the brokerage. Trikin purchases the agent's fee receivable, pays the purchase price directly to the agent, and receives the assigned proceeds when the brokerage collects from the property manager.

We built the full operational platform powering Trikin Capital across three audiences: leasing agents requesting receivable purchases, brokerage administrators verifying commissions and assigning payment rights, and Trikin's internal underwriting and operations team.

Because the platform handles real financial commitments governed by strict legal and underwriting agreements, every step—commission verification, exposure-limit checks, dual-approval workflows, e-signature, purchase confirmations, and remittance tracking—is enforced directly in software rather than left to manual spreadsheets.

### Technology

Trikin Capital is built with Next.js, React, TypeScript, and Tailwind CSS, running on Cloudflare Workers via OpenNext with Drizzle ORM and Cloudflare D1 as the canonical database.

The architecture is centered on financial correctness and auditability: all monetary amounts are stored and calculated in integer cents and basis points, evidence tables (verifications, signatures, rule evaluations, approval decisions, and purchase confirmations) are strictly append-only, and every transaction lifecycle is driven by explicit state machines with scope-checked authorization on every privileged path.
