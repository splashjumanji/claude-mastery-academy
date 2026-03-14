# Skill: Build a Course on This Framework

## When to use
Use this skill when asked to build or populate a new course on this framework.
The repo already contains the full React app. Your job is to:
1. Read `course-template/COURSE_BRIEF.md` (filled in by the user)
2. Generate all course content in `src/data/modules.js`
3. Update branding strings in the files listed below
4. Reset `public/proposals.json`

Do NOT rewrite any component files. The framework is complete — only data and branding change.

---

## Step 1 — Read the brief

Read `course-template/COURSE_BRIEF.md` in full. Extract:
- Course name, acronym, tagline, audience, tone
- Protagonist name, learner role, score metric name
- Level titles and module outline
- Statistics, key concepts, quiz questions, badges

If any section is blank, generate reasonable defaults based on the topic.

---

## Step 2 — Rewrite `src/data/modules.js`

This file exports two things: `LEVELS` (array) and `MODULES` (object keyed by module ID).

### LEVELS schema

```js
export const LEVELS = [
  {
    id: 1,                          // 1–4
    number: 1,
    label: '101',                   // '101' | '201' | '301' | '401'
    title: 'string',
    subtitle: 'string',
    color: 'from-aria-600 to-aria-800',  // Tailwind gradient — see palette below
    icon: '🌐',                     // emoji
    modules: [1, 2],                // array of module IDs in this level
  },
  // ... levels 2, 3, 4
]
```

**Level colour suggestions** (use one gradient per level):
- Level 1: `from-aria-600 to-aria-800` (blue)
- Level 2: `from-jasper-600 to-jasper-800` (purple)
- Level 3: `from-emerald-600 to-emerald-800` (green)
- Level 4: `from-amber-600 to-orange-700` (amber/orange)

### MODULES schema

```js
export const MODULES = {
  1: {
    id: 1,
    levelId: 1,
    lastUpdated: 'YYYY-MM-DD',         // today's date
    title: 'string',
    subtitle: 'string',
    icon: '📊',                        // emoji
    xpReward: 100,                      // 75–150 typical
    ariaScoreDelta: 5,                  // how much the protagonist score rises (0–15)
    estimatedMinutes: 10,
    type: 'micro_lesson_quiz',          // see Module Types below
    lessons: [ ...Lesson objects... ],
    quiz: { ...Quiz object... },        // present on all except content_editor
    dragdrop: { ...DragDrop object... }, // present when type includes 'dragdrop'
    decisionTree: { ...DecisionTree... }, // present when type is 'decision_tree_quiz'
    simulator: { ...Simulator... },      // present when type is 'pipeline_simulator_quiz'
  },
  2: { ... },
  // etc.
}
```

---

### Module Types (controls the interaction sequence)

| `type` string | Phases shown | Use when |
|---|---|---|
| `micro_lesson_quiz` | Learn → Quiz → Tool moment | Standard knowledge module |
| `micro_lesson_dragdrop_quiz` | Learn → Audit/Sort → Quiz → Tool moment | Learner must categorise items |
| `decision_tree_quiz` | Learn → Decide → Quiz → Tool moment | Scenario-based judgment calls |
| `pipeline_simulator_quiz` | Simulate → Quiz → Tool moment | Step-by-step process with choices |
| `content_editor` | Learn → Transform → Tool moment | Learner edits/improves content |

Always end with a `jasper` phase (the "tool moment") — it fires automatically.

---

### Lesson Types

Each module has a `lessons` array. Each lesson object has `id`, `heading`, `body`, and `type`.

#### `narrative` — Story beat, no data visualisation
```js
{
  id: 'l1_1',
  heading: 'Something is breaking.',
  body: '2–4 sentences. Sets the scene or introduces tension.',
  type: 'narrative',
  visual: 'dashboard-anomaly',  // optional illustration key (see below)
}
```

#### `stat_reveal` — Shows numbered statistics
```js
{
  id: 'l1_2',
  heading: 'The numbers tell the story.',
  body: '1–2 sentences of context.',
  type: 'stat_reveal',
  displayStyle: 'grid',  // 'narrative_only' | 'grid' | 'chart' | 'contrast'
  stats: [
    {
      label: 'B2B buyers using AI for research',
      value: '89%',
      direction: 'up',        // 'up' | 'down' | 'neutral'
      color: 'jasper',        // 'flame' | 'jasper' | 'aria' | 'green' | 'amber' | 'red'
      source: 'Source Name Year',
      sourceUrl: 'https://...',
    }
  ],
  insight: 'One sentence explaining what the stats mean together.',
  callout: {                  // optional
    type: 'tip',              // 'tip' | 'warning' | 'info' | 'jasper' | 'danger'
    text: 'Practical tip text.',
  },
}
```
`displayStyle` guide:
- `narrative_only` — stats listed below body text, no chart
- `grid` — stacked value + label cards
- `chart` — animated horizontal bars
- `contrast` — two hero numbers side by side (use for before/after)

#### `concept` — Explains a concept with bullet points
```js
{
  id: 'l1_3',
  heading: 'What this means for you.',
  body: '2–3 sentences.',
  type: 'concept',
  keyPoints: [
    'Plain string key point.',
    { text: 'Key point with source.', sourceLabel: 'Source Name', sourceUrl: 'https://...' },
  ],
  callout: { type: 'info', text: 'Optional callout.' },
  visual: null,
}
```

#### `platform_stats` — Reveals stats per platform one by one
```js
{
  id: 'l2_1',
  heading: 'Every platform behaves differently.',
  body: 'Context sentence.',
  type: 'platform_stats',
  platforms: [
    { name: 'ChatGPT',  stat: '60% of queries answered', icon: '🤖' },
    { name: 'Perplexity', stat: '90% citation-driven', icon: '🔍' },
  ],
  insight: 'Synthesis sentence.',
  sources: [{ name: 'Source Name', url: 'https://...' }],
}
```

#### `comparison` — Before vs after split
```js
{
  id: 'l3_1',
  heading: 'The old playbook vs the new one.',
  body: 'Context.',
  type: 'comparison',
  before: { label: 'Old approach', points: ['Point 1', 'Point 2'] },
  after:  { label: 'New approach', points: ['Point 1', 'Point 2'] },
}
```

#### `trinity_intro` — Three-pillar overview (use for frameworks with exactly 3 components)
```js
{
  id: 'l2_1',
  heading: 'Three disciplines, one system.',
  body: 'Intro sentence.',
  type: 'trinity_intro',
  disciplines: [
    {
      id: 'pillar_a',
      label: 'Pillar A',
      tagline: 'One-line description',
      color: 'aria',        // 'aria' | 'jasper' | 'emerald'
      description: '2–3 sentences.',
      layerLabel: 'Foundation',
    },
    // ... two more
  ],
}
```

---

### Quiz schema
```js
quiz: {
  xpBonus: 25,
  questions: [
    {
      id: 'q1_1',
      question: 'Question text ending with ?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1,           // 0-based index of correct option
      explanation: 'Why this is correct. 1–2 sentences.',
      source: 'Source Name',     // optional
      sourceUrl: 'https://...',  // optional
    }
  ]
}
```
Write 3–5 questions per module. Mix recall, application, and scenario questions.
Distractors should be plausible — avoid obviously wrong answers.

---

### DragDrop schema (used with `micro_lesson_dragdrop_quiz`)
```js
dragdrop: {
  title: 'Sort these tactics',
  description: 'Drag each item to its correct category.',
  items: [
    {
      id: 'j1',
      label: 'Short label for the item',
      correctBucket: 'bucket_id',   // must match a bucket id below
      explanation: 'Why it goes here.',
    }
  ],
  buckets: [
    { id: 'bucket_id',  label: 'Bucket Name', description: 'What belongs here.' },
    { id: 'bucket_id2', label: 'Bucket Name', description: '...' },
  ]
}
```
Use 6–12 items across 2–4 buckets. Aim for roughly equal distribution.

---

### DecisionTree schema (used with `decision_tree_quiz`)
```js
decisionTree: {
  title: 'Make the call',
  description: 'Read each scenario and choose the right approach.',
  scenarios: [
    {
      id: 'dt1',
      content: 'Scenario context — a realistic situation.',
      question: 'What should you do?',
      options: [
        { label: 'Option A', correct: true,  feedback: 'Correct because...' },
        { label: 'Option B', correct: false, feedback: 'Incorrect because...' },
        { label: 'Option C', correct: false, feedback: 'This misses...' },
      ]
    }
  ]
}
```
Use 3–5 scenarios. One correct answer per scenario.

---

### JasperMoment (tool moment) — `src/data/jasper-moments.js`

This file is separate from `modules.js`. It exports an object keyed by module ID.
Rewrite this file to replace "Jasper" references with the sponsor tool name from the brief.
If no sponsor, use generic "Try it yourself" messages.

```js
// src/data/jasper-moments.js
export const JASPER_MOMENTS = {
  1: {
    heading: 'See it in [Tool Name]',
    body: 'Here\'s how [Tool] helps with what you just learned.',
    cta: 'Try it in [Tool] →',
    ctaUrl: 'https://...',
  },
  // one entry per module ID
}
```

---

### Illustrations

The `visual` field on lessons references illustration keys. Existing keys:
`dashboard-anomaly`, `crocodile-mouth`, `aria-invisible`, `seo-aeo-scope`,
`dark-funnel`, `earned-media-inversion`, `entity-web`, `co-citation-pack`,
`rag-query-length`, `content-structure`, `continuous-loop`, `triple-discipline-sync`,
`wireframe-*` (various dashboard wireframes), `jasper-capabilities`, `bot-crawler`

If a lesson's concept maps to an existing illustration, use that key.
If not, set `visual: null` — the lesson renders fine without one.
To add new illustrations later, create a JSX component in `src/components/illustrations/`
and register it in `src/components/illustrations/index.jsx`.

---

## Step 3 — Update branding strings

Make these targeted replacements:

### `src/components/layout/AppShell.jsx`
- Line 30: `AISV <span ...>Academy</span>` → `[CourseAcronym] <span ...>Academy</span>`
- Line 13: nav item `label: 'Aria Report'` → `label: '[ProtagonistName] Report'`
- Line 59: text `'Aria Score'` → `'[ScoreMetricName]'`

### `src/components/screens/Welcome.jsx`
- Replace all "AISV Academy" with "[CourseAcronym] Academy"
- Replace all "Aria" (company name) with "[ProtagonistName]"
- Update the mission description, tagline, and body to match the brief
- Update the level preview cards (3-column grid) to show the new level titles

### `src/hooks/useProgress.js`
- Line 72: Badge name `'Full Stack AISV'` → `'Full Stack [CourseAcronym]'`
- Update all other badge names/descriptions to match the brief
- Storage key `'xeo_academy_progress'` → `'[acronym_lowercase]_progress'`
  (also update `'aisv_last_visit'` in `WorldMap.jsx` and `'aisv_flashcard_progress'` in `FlashCards.jsx`)

### `src/components/screens/AriaReportCard.jsx`
- Replace "Aria" with "[ProtagonistName]" throughout
- Update `src/data/aria.js` with new protagonist data matching the brief's protagonist

### `index.html`
- `<title>AISV Academy — Jasper AI</title>` → `<title>[CourseName]</title>`

---

## Step 4 — Reset proposals

Replace `public/proposals.json` with a clean empty state:

```json
{
  "proposals": [],
  "lastUpdated": "YYYY-MM-DDTHH:MM:SS.000Z"
}
```

---

## Step 5 — Verify locally

Run `npm run dev` and check:
1. Welcome screen shows the new course name and protagonist
2. Course outline shows all levels and modules
3. Click into Module 1 and play through all phases
4. Flash cards work (some cards should appear after completing a module)
5. Learning summary shows completed modules

---

## Quality guidelines

- **Tone**: match the brief's tone instruction. For non-technical audiences, avoid acronyms and technical jargon in lesson body text.
- **No em dashes**: use commas, semicolons, or new sentences instead of `—`.
- **Statistics**: only use stats listed in the brief or well-known public research. Always include source + URL.
- **Lesson length**: body text 2–4 sentences. Key points 1–2 sentences each.
- **Module length**: 4–8 lessons per module is ideal. The scroll story must not feel exhausting.
- **Quiz difficulty**: mix easy recall (1–2 per module) with application questions. Explanations must be educational, not just "correct!"
- **DragDrop items**: write short labels (3–6 words). Explanations can be longer.
- **Narrative arc**: each module should open with a tension/problem and close with resolution or insight. The protagonist should feel real — reference them by name in lesson body text.
