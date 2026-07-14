---
name: rt-address-findings
description: >-
  Work through code-review findings until the Standards and Spec axes are clean
  or consciously deferred. Use after rt-code-review, before rt-do-i-understand or
  opening a PR, when the user asks to fix review comments or review feedback.
---

# Address Findings

Close the loop between **rt-code-review** and **rt-do-i-understand**. A review that isn't acted on is decoration.

## When it fires

With a **rt-code-review** report in hand (or equivalent review comments on a PR). No findings and nothing deferred? Skip straight to **rt-do-i-understand**.

## Process

### 1. Triage findings

From the Standards and Spec reports (and any PR comment threads), classify each item:

| Class | Action |
|-------|--------|
| **Must fix** | Correctness, security, spec miss, break CI — fix before proceeding |
| **Should fix** | Standards violation, maintainability — fix unless cost is disproportionate |
| **Won't fix** | Disagree, out of scope, or lint already enforces — document rationale for **rt-pr-description** `## Deferred` |
| **Can't fix here** | Needs another ticket — note it, don't expand this PR's scope |

Work **Must fix** first, then **Should fix**. Don't batch-fix by file; batch by finding.

### 2. Fix one finding at a time

For each finding:

1. Re-read the cited hunk in the **current** file (line numbers drift)
2. Make the smallest change that resolves the finding
3. Run targeted tests for that behaviour
4. Mark the finding addressed

If a fix reveals a deeper problem, say so — don't paper over it.

### 3. Re-verify

After all **Must** and **Should** items are handled:

- Typecheck / lint on touched files
- Targeted tests for changed behaviour
- Full test suite once

### 4. Re-review when warranted

Re-run **rt-code-review** when:

- you touched more than ~30% of the original diff, or
- a **Must fix** required architectural change, or
- the user asks

Otherwise, report what you fixed and what's deferred.

### 5. Hand off

- Findings resolved → **rt-do-i-understand** → **rt-pr-description**
- Items in **Won't fix** → carry rationale forward to **rt-pr-description** `## Deferred`

## Guardrails

- Don't weaken tests to make findings disappear.
- Don't drive-by refactor beyond what a finding requires.
- Deferred items need a one-line rationale a reviewer can accept or push back on — not "later".
