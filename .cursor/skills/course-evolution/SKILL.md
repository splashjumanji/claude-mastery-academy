---
name: course-evolution
description: Guides ongoing content maintenance for a live course — weekly research sweeps, structuring content proposals, running the review workflow, applying approved changes, and building editorial memory so rejected ideas are not re-suggested. Use when running a content sweep, reviewing proposals, applying updates, or setting up the automated evolution pipeline.
---

# Course Evolution

## Overview

Content evolves on a weekly cycle:

```
Research sweep → Proposals → Review dashboard → Approve/Discard → Auto-apply
```

---

## Weekly research sweep

The sweep is a Vercel cron job at `api/content-sweep.js`, running every Monday at 08:00 UTC.

It:
1. Searches for recent developments using Tavily (web search API)
2. Synthesises findings with Anthropic Claude
3. Extracts action items — specific, audience-appropriate updates
4. Structures each action item into a proposal object
5. Appends proposals to `public/proposals.json` via the GitHub API
6. Posts a summary to Slack

**To trigger manually:** Vercel dashboard → your project → Functions → `api/content-sweep` → Run now.

---

## Audience filter (critical)

Every sweep prompt must include:

> "The audience is B2B marketing managers — non-technical, focused on strategy and business outcomes. Exclude developer-level detail, API references, infrastructure choices, and model architecture. Include statistics, strategic implications, measurement changes, and competitive dynamics."

Proposals that violate this filter should be discarded with reason "Too technical for audience" so they are not re-suggested.

---

## Proposal schema

Each proposal in `public/proposals.json`:

```json
{
  "id": "uuid",
  "type": "UPDATE",          // UPDATE | ADD | REMOVE
  "status": "pending",       // pending | applied | discarded
  "moduleId": 5,
  "lessonId": "l5_2",        // null if module-level
  "fieldLabel": "Human-readable description of what's being changed",
  "currentValue": "The exact verbatim text being replaced (for UPDATE)",
  "proposedValue": "The new text",
  "reason": "Why this change improves the course",
  "createdAt": "ISO timestamp",
  "discardReason": null       // Set when discarding
}
```

**Type guidance:**
- `UPDATE` — improving or correcting existing content. Must have a non-null `currentValue`.
- `ADD` — new content that does not exist yet. `currentValue` is null.
- `REMOVE` — content that should be deleted. `currentValue` is the text to remove.

---

## Review dashboard

Access at `/review` (password protected via `VITE_REVIEW_KEY` environment variable).

**UPDATE proposals** show a before/after diff. Options:
- **Approve & Apply** — auto-applies the change to `modules.js` via `api/apply-change`, marks proposal as applied
- **Comment / Request revision** — opens a comment modal; optionally triggers Claude to revise the proposed text
- **Discard** — prompts for an optional reason, marks proposal as discarded

**ADD proposals** cannot be auto-applied (new lessons require manual implementation). Options:
- **Copy Cursor prompt** — copies a prompt to implement the new content in Cursor
- **Mark as done** — after manually implementing, marks proposal as applied

**REMOVE proposals** — auto-applies by deleting the matched text.

---

## Applying changes

`api/apply-change.js` handles UPDATE and REMOVE proposals:

1. Reads `modules.js` from GitHub
2. Attempts a direct string replacement of `currentValue` with the approved text
3. Also tries with JS-escaped apostrophes (`'` → `\'`) to handle encoding mismatches
4. If the replacement succeeds, commits updated `modules.js` to GitHub
5. Updates proposal status to `applied` in `proposals.json`

If the replacement fails ("target text not found"), use "Mark as done" if the change is already live, or discard if it is no longer relevant.

**After any manual content change:** bump `lastUpdated` on the relevant module in `modules.js` to today's date. This triggers the "Updated" badge on the Course Outline for returning learners.

---

## Editorial memory

Resolved proposals are fed back into the next sweep as context, preventing the same suggestions from recurring.

The sweep reads `proposals.json` and includes in its prompt:

> "Previously discarded proposals (do not re-suggest): [list with discard reasons]"
> "Previously applied proposals (already live, do not flag as missing): [list]"

**Discard reasons to use consistently:**
- "Too technical for audience"
- "Already covered in module X"
- "Out of scope for this course"
- "Factually disputed — awaiting better source"
- "Stylistic preference — current version is intentional"

---

## Environment variables required

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | LLM for synthesis and proposal structuring |
| `TAVILY_API_KEY` | Web search for recent developments |
| `GITHUB_TOKEN` | Read/write `modules.js` and `proposals.json` |
| `GITHUB_REPO` | e.g. `username/repo-name` |
| `SLACK_WEBHOOK_URL` | Post sweep summaries to Slack |
| `VITE_REVIEW_KEY` | Password for `/review` dashboard |
