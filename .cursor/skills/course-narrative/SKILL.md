---
name: course-narrative
description: Structures an interactive course as a story-driven experience with a fictional protagonist company. Use when building a new course, writing module content, adding lessons, designing scroll stories, choosing data visualisations, or following AISV Academy writing conventions.
---

# Course Narrative & Storytelling

## The protagonist method

Every course is told through a fictional company facing real challenges. The learner plays the role of a new hire trying to solve a business problem — they learn by doing, not by reading.

**AISV Academy example:** Aria is a B2B SaaS company. The learner is Aria's new CMO. Every lesson is framed around Aria's AI search visibility problem.

**When creating a new course:**
1. Define the fictional company (name, industry, size, pain point)
2. Define the learner's role inside that company
3. Every module should escalate the company's situation — early modules show the problem, later modules build the solution

---

## Module schema

```js
{
  id: 1,                          // Sequential integer
  levelId: 1,                     // Which level/tier this belongs to (1=101, 2=201, etc.)
  lastUpdated: 'YYYY-MM-DD',      // Bump this date whenever content changes
  title: 'Short, punchy title',
  subtitle: 'One-line framing of the problem or promise',
  icon: '📊',                     // Emoji representing the topic
  xpReward: 75,                   // Points earned on completion (scales up per level)
  ariaScoreDelta: 0,              // Score improvement for the protagonist (0–10)
  estimatedMinutes: 8,
  type: 'micro_lesson_quiz',      // See lesson types below
  lessons: [ /* lesson objects */ ],
  quiz: { /* quiz object */ },
}
```

**Level structure:** Group modules into 4 tiers — 101 (foundation), 201 (mechanics), 301 (strategy), 401 (advanced/future). Each tier has a theme title and subtitle.

---

## Lesson types

### `narrative`
Opens a module. Sets the scene. Written in third-person present tense about the fictional company.
```js
{ id: 'l1_1', type: 'narrative', heading: 'Something is breaking.', body: '...', visual: 'dashboard-anomaly' }
```

### `stat_reveal`
Presents data with emotional impact. Shows stats, then insight, then an optional callout.
```js
{
  id: 'l1_2', type: 'stat_reveal',
  heading: 'Meet the Crocodile Mouth',
  body: '...',
  visual: 'crocodile-mouth',
  stats: [
    { label: 'Impressions', value: '+31%', direction: 'up', color: 'green', source: 'Report Name', sourceUrl: 'https://...' },
  ],
  insight: 'The so-what sentence that explains why this data matters.',
  callout: { type: 'tip', text: 'Action the learner can take right now.' }
}
```

### `micro_lesson`
Teaches a concept with key points and optional sources.
```js
{
  id: 'l2_1', type: 'micro_lesson',
  heading: 'Concept title',
  body: 'Opening paragraph.',
  keyPoints: [
    { text: 'Point one.', sourceUrl: 'https://...', sourceLabel: 'Source Name' },
    'Point two (string shorthand, no source needed)',
  ],
  visual: 'optional-illustration-key',
}
```

### `scroll_story`
A scroll-driven narrative. Content is defined as an array of `beats` — see the `course-interactions` skill for beat types.

---

## Writing conventions

- **Voice:** Second-person present tense for instructions ("You check the dashboard…"). Third-person for Aria scenes ("Aria's team discovers…").
- **No em-dashes.** Use commas, semicolons, or full stops instead.
- **Numbers:** Always cite sample size, date, and source URL for any statistic.
- **Source labels:** Use the article or report name, not "See this post on LinkedIn" unless the content is literally a LinkedIn post. Format: `sourceLabel: 'Semrush State of Search 2025'`.
- **Headings:** Sentence case, punchy, often a fragment ("Something is breaking." / "Meet the Crocodile Mouth").
- **Length:** Micro-lessons max 3–4 key points. Body paragraphs max 3 sentences. Avoid walls of text.

---

## Data visualisation

Visualisations are React components stored in `src/components/illustrations/`. They are referenced by a string key in the `visual` field of any lesson.

**Naming convention:** kebab-case description of what the diagram shows.
- `dashboard-anomaly` — a dashboard with unexpected data
- `crocodile-mouth` — diverging lines chart
- `rag-query-length` — bar chart showing query length distribution

**When to use an illustration vs a beat:**
- Use a named illustration for a concept that benefits from a custom diagram (process flows, framework diagrams, before/after comparisons).
- Use a `stat_reveal` beat for data-heavy moments — the component handles stat cards automatically.
- Use a `callout` beat for pull-quotes, tips, or warnings.

**Commissioning new illustrations:** Create a new `.jsx` file in `src/components/illustrations/`, export it, and add it to `src/components/illustrations/index.jsx`. Then reference it by its key string.
