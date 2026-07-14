---
name: rt-pr-description
description: >-
  Write a pull-request title and body from the branch diff, originating tickets/spec,
  and the author's understanding attestation. Use when opening a PR, updating PR text,
  or when the user asks for a PR description after implementation and review.
---

# PR Description

Turn a finished branch into a PR a human reviewer can merge without re-deriving context. The description travels with the change; it is not a changelog of commits.

## When it fires

After implementation is done and **rt-code-review** findings are addressed (or explicitly deferred). Pull in the **rt-do-i-understand** attestation if one exists — paste it into the body under `## Author's understanding`, don't paraphrase.

No diff yet? Stop and get one. Abstract descriptions get abstract reviews.

## Process

### 1. Gather inputs

Read these in parallel where possible:

| Source | What to extract |
|--------|-----------------|
| `git log <base>..HEAD --oneline` | scope, ticket refs, narrative arc |
| `git diff <base>...HEAD` | what actually changed — files, behaviour, risks |
| `.agents/tickets/` | originating ticket(s), acceptance criteria |
| Issue/PR URL the user passed | full body + acceptance criteria |
| **rt-do-i-understand** output | author's attestation block (verbatim) |
| **rt-code-review** output | anything still open or consciously deferred |

**Base branch:** use the repo's default branch (`main` / `master`) unless the user or project docs say otherwise. Three-dot diff: `git diff <base>...HEAD`.

### 2. Pick the title

One line, imperative mood, scoped to the behavioural change:

- ✅ `Add rate-limit headers to checkout API`
- ✅ `Fix null deref when cart expires mid-checkout`
- ❌ `Updates` / `WIP` / `Misc fixes`

Prefix with ticket ID when the tracker uses one: `[RT-142] Add rate-limit headers to checkout API`.

### 3. Write the body

Use this structure. Omit sections with nothing to say; never pad.

```markdown
## Summary

<2–4 sentences: what problem this solves, what it does, why this approach. A reviewer who reads only this should know whether to keep reading.>

## Changes

<Bullet list grouped by concern, not by commit. Each bullet names a behaviour or contract change, not a file touched.>

## Test plan

- [ ] <concrete step a reviewer or CI can verify>
- [ ] <edge case or regression specifically exercised>

## Risks / rollout

<Only when non-obvious: migrations, feature flags, backwards-compat breaks, perf, auth. Say "None identified" when true.>

## Author's understanding

<Paste the rt-do-i-understand attestation block verbatim if available. If not, omit this section — don't fabricate one.>

## Deferred

<Findings from rt-code-review explicitly not fixed in this PR, with one-line rationale each. Omit if empty.>
```

**Summary** answers: what was broken or missing → what this PR does → why not some other way (one sentence max on the last).

**Changes** is not a file list. Group by user-visible or API-visible behaviour. Link ticket IDs inline.

**Test plan** must be checkboxes a human can tick. Prefer commands (`pnpm test path/to.test.ts`) over "tests pass". Include manual steps only when automation can't cover it.

### 4. Sanity-check before publishing

- [ ] Title matches the largest behavioural change in the diff
- [ ] Every acceptance criterion from the originating ticket appears in Summary, Changes, or Test plan
- [ ] Test plan covers the riskiest hunk (auth, money, migration, concurrency) if present
- [ ] No secrets, tokens, or internal URLs that shouldn't be public
- [ ] Author's understanding block is verbatim or section is absent
- [ ] Deferred items match what rt-code-review actually flagged

### 5. Open or update the PR

**Creating:**

```bash
git push -u origin HEAD
gh pr create --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

**Updating** an existing PR: `gh pr edit --title "..." --body "..."` or edit via the hosting UI.

Return the PR URL when done.

## Tone

Factual and short. Write for a busy reviewer who didn't sit in the interview. No filler ("This PR implements the following changes"), no AI throat-clearing, no restating every diff hunk.

## Examples

**Feature PR — title:**
`[RT-88] Expose checkout rate-limit headers on 429 responses`

**Bugfix PR — summary opener:**
`Carts expiring during checkout left a null session reference; the confirm step then 500'd. This PR guards the session lookup and returns the existing "session expired" UX instead.`

**Test plan — good:**
```
- [ ] `pnpm test src/checkout/session.test.ts` — covers expired-session path
- [ ] Hit `/checkout/confirm` with an expired session cookie → see redirect to /cart, not 500
```

**Test plan — bad:**
```
- [ ] Tests pass
- [ ] Manually verified it works
```
