---
name: course-research
description: Guides initial deep research for a new course topic, including how to structure a research brief, evaluate sources, set statistics standards, calibrate for audience, and hand off research findings to module content. Use when starting a new course, researching a topic area, auditing source quality, or running a gap analysis between research and course content.
---

# Course Research

## Research brief template

Before researching, define:

```
Topic:          e.g. "AI Search Visibility for B2B marketers"
Audience:       e.g. "B2B marketing managers, non-technical, 5–15 years experience"
Depth levels:   101 (what is it), 201 (how it works), 301 (strategy), 401 (advanced/future)
Out of scope:   e.g. "Developer implementation, technical SEO, paid media"
Key questions:  3–5 questions the course must answer for the learner to succeed
```

---

## Source quality hierarchy

Prioritise in this order:

1. **Primary data** — original studies, proprietary datasets, direct survey results (e.g. Semrush State of Search 2025)
2. **Practitioner case studies** — published results from real campaigns with named companies and measurable outcomes
3. **Industry reports** — annual reports from recognised research firms (Gartner, Forrester, Nielsen)
4. **Expert commentary** — named practitioners with verifiable credentials writing in their area of expertise
5. **Vendor content** — usable for product capabilities only, not for market statistics

**Reject:** Anonymous sources, undated statistics, "studies show" without citation, AI-generated statistics without primary source.

---

## Statistics standards

Every statistic included in course content must have:
- The specific number (not "most" or "many")
- The sample size or methodology (if available)
- The publication date (reject anything older than 3 years for fast-moving topics)
- A working source URL

**Format in modules.js:**
```js
{ text: '70–80% of B2B discovery searches now go unanswered by traditional organic results.',
  sourceUrl: 'https://www.example.com/report',
  sourceLabel: 'Forrester B2B Search Report 2025' }
```

---

## Audience calibration

**Default audience for AISV Academy:** B2B marketing managers. Non-technical. Focused on outcomes, not implementation.

When calibrating for your audience, ask:
- Would this person need to know *how* something works, or just *what* it does and *why* it matters?
- Would a developer or engineer be the right person to implement this? If yes, exclude the technical detail.
- Is this jargon they would already use, or does it need defining?

**Include:** Business outcomes, strategic implications, measurement approaches, competitive consequences.
**Exclude:** Developer APIs, code examples, infrastructure choices, model architecture details.

---

## Research-to-module hand-off

Structure your research output so it maps directly to the course:

```
## Module X — [Topic]
**Core argument:** One sentence stating what the learner should believe after this module.
**Key statistics:** 3–5 stats with sources
**Key concepts:** 3–5 concepts the learner must understand
**Common misconceptions:** 2–3 things learners typically get wrong
**Practical application:** What should the learner be able to do differently?
**Sources:** Full list with URLs
```

---

## Gap analysis

After the course is drafted, compare research findings against final module content:

1. List every major claim or concept from your research
2. Find where each appears in the course (module + lesson ID)
3. Flag items with no home — these are gaps
4. For each gap, decide: add to existing lesson, add new lesson, or out of scope
5. Document the out-of-scope decisions so future sweeps don't re-suggest them

**Gap analysis output format:**
```
| Research finding | Module | Status | Notes |
|---|---|---|---|
| 90% of ChatGPT citations come from outside top 10 | Module 5, l5_2 | Covered | |
| Agentic AI buying decisions | Not covered | Gap | Candidate for Module 11 |
| LangChain orchestration | Not covered | Out of scope | Too technical for audience |
```
