---
name: rt-brainstorm
description: >-
  Explore a fuzzy problem or opportunity before any plan exists — optionally
  ground it in competitor/user/market evidence, then generate multiple
  candidate directions, discuss tradeoffs, and converge on one direction to
  hand off. Use when the user has an itch, a problem, or an opportunity but
  no request yet, or asks what competitors/users are doing as part of
  shaping that. Not for already-scoped features or bugs — go straight to
  rt-interview or rt-to-tickets for those.
disable-model-invocation: true
---

# Brainstorm

Divergent exploration of a problem space, evidence included. This is the step **before** there is a plan to stress-test. **rt-interview** takes one chosen direction and interrogates it into decisions; brainstorm exists because that direction doesn't exist yet — and because a good direction is often grounded in what's actually happening outside the codebase, not just what's discussable in the room.

This skill **gathers evidence and generates options. It does not decide what to build.** Product prioritization is explicitly a human call in this flow — this skill widens and grounds the option set, it never narrows it to a winner on its own authority.

## When it fires

The user has a problem, a pain point, an opportunity, or a vague "we should do something about X" — not a feature request and not a bug report. Also fires for a pure evidence question ("what are competitors doing here," "what do users keep asking for") when it's clearly in service of shaping a direction.

If a concrete request already exists, skip this and go straight to **rt-interview** (open decisions) or **rt-to-tickets** (none).

Don't fire on "explain how X works" or general informational questions unrelated to shaping a direction.

## Process

### 1. Frame the problem, not the solution

Restate what the user brought as a problem or opportunity, not as a solution. If they arrived with a solution already ("let's add a Slack bot"), ask what problem it solves before generating alternatives — a premature solution forecloses the divergent step this skill exists for.

### 2. Gather evidence (optional — skip if the user wants to brainstorm from what's already known)

If external grounding would help, gather it before generating directions:

- **Competitive**: what are named or inferred competitors doing in this space?
- **User signal**: what do support tickets, reviews, forum threads, or user interviews say?
- **Usage**: what does existing product usage data say? Only if the user can supply or grant access to it — never fabricate metrics.

Use whatever sources fit — web search for competitors and public sentiment, internal tools (support tickets, analytics, docs) for first-party signal. Prefer primary sources over aggregator takes.

**Every claim needs a source.** If a claim can't be traced to something concrete, don't present it as a finding — flag it as a hunch, clearly labeled, or leave it out. If sources disagree or the evidence is thin, say so rather than smoothing it over.

Report findings plainly before moving on — this is a fact-finding pass, not yet a set of options:

```markdown
## Evidence

### Competitive landscape
- <Competitor> does <X> — source: <link/reference>

### User signal
- <theme>, seen in <N tickets/reviews/threads> — representative example: <paraphrased>

### Gaps and caveats
- <what couldn't be established, or where sources conflicted>
```

No recommendations here. Evidence feeds directions in the next step; it doesn't pick one.

### 3. Generate multiple candidate directions

Produce **3–5 genuinely different directions**, not variations on one idea. Different means different tradeoffs, not different wording. Ground each in the evidence gathered, if any. For each:

- **What it is**: one or two sentences
- **Why it addresses the problem** (tie to evidence where you have it)
- **Cost/complexity signal**: rough — small / medium / large, not an estimate
- **What it gives up**: the thing you don't get if you pick this one

Resist collapsing to the obvious answer immediately. Include at least one direction that reframes the problem (do less, do it elsewhere, don't build it) alongside the build-it options.

### 4. Discuss, don't decide

Walk the user through the directions one at a time — same one-thing-at-a-time discipline as **rt-interview**. Ask what resonates, what's wrong about each, what's missing. This is a conversation, not a menu to click through in silence.

Do not silently pick a favorite and steer toward it. If asked for a recommendation, give one explicitly labeled as a recommendation, with reasoning — then let the user decide.

### 5. Converge on one direction

Stop generating once the user has picked or synthesized a direction from what's on the table. Write a short **direction brief**:

```markdown
# Direction: <name>

## Problem
<what this addresses, in the user's terms>

## Evidence
<key findings that informed this, with sources — omit if none gathered>

## Chosen direction
<the one direction, 2-4 sentences>

## Directions considered and set aside
- <direction> — set aside because <reason>
- <direction> — set aside because <reason>

## Open questions
<anything still undecided that rt-interview should resolve>
```

This is deliberately **not** a spec. It has no acceptance criteria, no design decisions locked in — those belong to **rt-interview** and **rt-to-tickets**.

### 6. Hand off

- Direction has open design decisions → **rt-interview**
- Direction is already concrete enough → **rt-to-tickets** directly

## Guardrails

- Never rank, prioritize, or recommend a single feature to build as the deciding word — that's a human call this flow deliberately doesn't automate.
- Never present a hunch as evidence. Label speculation as speculation.
- Cite sources for every evidentiary claim; no invented statistics or invented user quotes.
- Don't reproduce lengthy verbatim text from reviews, articles, or tickets — paraphrase, same as any other sourced claim.
- Never write tickets or acceptance criteria from here — that's **rt-to-tickets**' job, downstream of decisions this skill doesn't make.
- If the user already knows what they want, don't force divergence for its own sake — a quick confirmation ("sounds like the direction's already set — want to skip to rt-interview?") is fine.
