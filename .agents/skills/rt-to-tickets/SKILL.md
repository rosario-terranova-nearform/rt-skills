---
name: rt-to-tickets
description: Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker
---

# To Tickets

Break a plan, spec, or conversation into a set of **tickets** — tracer-bullet vertical slices, each declaring the tickets that **block** it.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests) — vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

Give each ticket its **blocking edges** — the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change — rename a column, retype a shared symbol — whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket — green is promised only there.

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must complete first
- **What it delivers**: the end-to-end behaviour this ticket makes work

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Are the blocking edges correct — does each ticket only depend on tickets that genuinely gate it?
- Should any tickets be merged or split further?

Iterate until the user approves the breakdown.

### 5. Publish the tickets to the configured tracker

Publish the approved tickets. Structure of a ticket:

[Title]
[ID]
[Description]
[Acceptance Criteria]

All tickets must go in .agents/tickets each one in a single file named `<ticket-title>.md` (spaces replaced with dashes, lowercase). The ticket's ID is the filename without the `.md` extension.

Write one `tickets.md` in the .agents/tickets root, all tickets in dependency order (blockers first), each with its "Blocked by" listing the titles it depends on. Use the file template below.

<tickets-file-template>

# Tickets: <short name of the work>

A one-line summary of what these tickets build. Reference the source spec if there is one.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

## 1. <ticket-title> (`<ticket-id>`)

**Blocked by:** none | `<ticket-title>`, ...

**Delivers:** <one sentence — the end-to-end behaviour this slice makes work>

- [ ] <acceptance criterion — verifiable, not vague>
- [ ] <acceptance criterion>

## 2. <ticket-title> (`<ticket-id>`)

...

</tickets-file-template>

### Individual ticket file template

Each `<ticket-id>.md` under `.agents/tickets/`:

```markdown
# <Title>

**ID:** `<ticket-id>`
**Blocked by:** none | `<other-ticket-id>`, ...

## Description

<What this slice does and why it exists in the breakdown. Use the project's domain vocabulary.>

## Acceptance criteria

- [ ] <verifiable outcome>
- [ ] <verifiable outcome>

## Notes

<Optional: files likely touched, risks, links to ADRs — only when useful to the implementer.>
```

### 6. Mark status as work progresses

Implementers check off acceptance criteria in the ticket file. When all criteria are met, the ticket is **done** and unblocks its dependents on the frontier.
