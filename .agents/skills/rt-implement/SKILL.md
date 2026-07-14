---
name: rt-implement
description: >-
  Implement a ticket or spec end-to-end: read acceptance criteria, make the
  smallest correct change, verify with targeted then full tests, and mark the
  ticket done. Use when building a feature, fixing a bug, or working the next
  item on the ticket frontier.
---

# Implement

Ship one tracer-bullet ticket completely — every layer the slice cuts through, verifiable on its own. Not "most of the feature."

## When it fires

With a concrete work unit: a ticket file under `.agents/tickets/`, an issue URL, or a spec path the user points at. Vague "build the auth system" → send back to **rt-interview** or **rt-to-tickets** first.

## Process

### 1. Pick the work unit

If `.agents/tickets/tickets.md` exists, work the **frontier**: tickets whose blockers are all done. Pick one; if several are ready, prefer the one that unblocks the most downstream work.

Read the ticket file fully: title, description, acceptance criteria, blocked-by edges.

### 2. Orient in the codebase

Before writing code:

- Find the files this slice will touch; read surrounding conventions (naming, error shapes, test patterns).
- Check ADRs, `CODEOWNERS`, and existing implementations of similar behaviour — extend, don't reinvent.
- If the ticket assumes something false about the codebase, stop and tell the user before building on it.

### 3. Plan the smallest correct diff

Match the ticket's vertical slice. One logical change set:

- schema → API → UI → tests, as the ticket demands
- not "all the UI, tests later"

If you discover the ticket is too big for one pass, say so and propose a split — don't silently expand scope.

### 4. Implement incrementally

- Make the change easy, then make the easy change (prefactor only when the ticket calls for it or the alternative is a mess).
- Follow existing project style; don't drive-by refactor unrelated code.
- Add or update tests that prove each acceptance criterion — not coverage theatre.
- Handle unhappy paths the ticket names; don't invent requirements the spec doesn't have.

### 5. Verify continuously

Run these in order of cost; don't wait until the end:

1. **Typecheck / lint** on touched files (or project equivalent) after substantive edits
2. **Targeted tests** for the behaviour you just changed — single file or `-t` filter
3. **Full test suite** once before calling the ticket done

If something fails, fix it before moving on. Don't disable checks to go green.

### 6. Close the ticket

When every acceptance criterion is met and tests pass:

- Check off criteria in the ticket file
- Update `tickets.md` if it tracks status
- Summarize what shipped: behaviour delivered, tests run, anything the next ticket needs to know

### 7. Hand off

One ticket done ≠ feature done. Say explicitly:

- **More tickets on the frontier?** → pick the next one or ask the user
- **All tickets done?** → hand off to **rt-code-review**, then **rt-address-findings**, then **rt-do-i-understand**, then **rt-pr-description**

Do **not** commit or open a PR unless the user asks — but leave the branch in a commit-ready state (staged or clearly described changes).

## Guardrails

- Repo standards override your defaults; read them before editing.
- No secrets in code, logs, or test fixtures.
- No `git add .` — stage named files only.
- Scope creep is a failure mode: if it's not in the ticket, it's a new ticket.
