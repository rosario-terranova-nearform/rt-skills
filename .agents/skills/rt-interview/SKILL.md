---
name: rt-interview
description: Interview the user relentlessly about a plan or design. Use when the user wants to stress-test a plan before building
---

# Interview

Interview the user relentlessly about every aspect of a plan or design until reaching a shared understanding. This is the step between a chosen direction — from **rt-brainstorm**, or an already-concrete request — and a set of tickets (**rt-to-tickets**): it turns open decisions into resolved ones before anything gets broken into slices.

## When it fires

A request or direction exists, but design decisions are still open — which approach, what shape, what tradeoffs. Skip straight to **rt-to-tickets** when scope is already clear; don't interview for its own sake.

## Process

### 1. Walk the design tree

Walk down each branch of the plan or design, resolving dependencies between decisions one-by-one. For each question, give a recommended answer and say why — the user can take it or override it.

### 2. Ask one at a time

Ask the questions **one at a time**, waiting for feedback on each before continuing. Asking multiple questions at once is bewildering and buries the follow-up that actually matters.

### 3. Separate facts from decisions

If a _fact_ can be found by exploring the codebase, look it up rather than asking the user. The _decisions_, though, are the user's — put each one to them and wait for their answer.

### 4. Confirm shared understanding

Do not enact the plan until the user confirms shared understanding has been reached. A short recap of the decisions made is fine; don't silently assume agreement just because they stopped objecting.

## Hand off

- Open questions resolved → **rt-to-tickets**
- Mid-interview it becomes clear the direction itself is wrong, not just its details → back to **rt-brainstorm**

## Guardrails

- Don't batch questions — one at a time, always.
- Don't answer decisions on the user's behalf, even with a strong opinion of your own; recommend, then wait.
- Don't proceed to **rt-to-tickets** without an explicit confirmation that understanding is shared.
