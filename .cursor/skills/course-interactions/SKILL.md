---
name: course-interactions
description: Designs and implements interactive, game-like learning components in the AISV Academy course format. Use when adding interactivity to a module, choosing between interaction types, writing quiz questions, designing drag-and-drop activities, building scroll stories, or deciding which format fits a learning objective.
---

# Course Interactions

## When to use which interaction

| Learning objective | Best interaction |
|---|---|
| Check recall / comprehension | `Quiz` |
| Categorise items into groups | `DragDrop` |
| Match pairs (term to definition) | `MatchingGame` |
| Show a step-by-step process | `PipelineSimulator` |
| Narrative-driven scroll experience | `ScrollStory` |
| Teach a concept with key points | `MicroLesson` |
| Simulate making a decision | `DecisionTree` |
| Brand/product capability wrap-up | `JasperMoment` |
| Simulate editing content | `ContentEditor` |

---

## MicroLesson

Teaches a concept. Lives inside a module's `lessons` array.

```js
{
  id: 'l2_1',
  type: 'micro_lesson',
  heading: 'The Three Disciplines',
  body: 'Opening paragraph — max 3 sentences.',
  keyPoints: [
    { text: 'First point with a source.', sourceUrl: 'https://...', sourceLabel: 'Report Name' },
    'Second point — string shorthand when no source is needed.',
  ],
  visual: 'optional-illustration-key',
}
```

---

## Quiz

Placed at the end of a module. Multiple choice, one correct answer.

```js
quiz: {
  questions: [
    {
      id: 'q1_1',
      question: 'The question text.',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 2,        // 0-indexed
      explanation: 'Why the correct answer is correct.',
    }
  ]
}
```

**Writing good quiz questions:**
- Test understanding, not memorisation of exact phrasing
- Make distractors plausible — avoid obviously wrong options
- The explanation should teach, not just restate the answer
- Aim for 3–4 questions per module

---

## DragDrop

Learner drags items into categories. Tests classification.

```js
{
  type: 'drag_drop',
  instruction: 'Sort these tactics into the right category.',
  categories: [
    { id: 'cat_a', label: 'Category A' },
    { id: 'cat_b', label: 'Category B' },
  ],
  items: [
    { id: 'j1', text: 'Item description', correctCategory: 'cat_a', explanation: 'Why it belongs here.' },
    { id: 'j2', text: 'Item description', correctCategory: 'cat_b', explanation: 'Why it belongs here.' },
  ]
}
```

---

## MatchingGame

Learner pairs left-column items with right-column items.

```js
{
  type: 'matching',
  instruction: 'Match each term to its definition.',
  pairs: [
    { id: 'p1', left: 'Term or concept', right: 'Its definition or example' },
    { id: 'p2', left: 'Term or concept', right: 'Its definition or example' },
  ]
}
```

---

## PipelineSimulator

Step-through interactive pipeline. Learner advances through stages.

```js
{
  type: 'pipeline_simulator',
  title: 'Pipeline name',
  steps: [
    { id: 's1', label: 'Step name', description: 'What happens at this step.', icon: '🔍' },
    { id: 's2', label: 'Step name', description: 'What happens at this step.', icon: '⚙️' },
  ]
}
```

---

## ScrollStory

A scroll-driven sequence of beats. Each beat is a screen-height moment.

```js
{
  type: 'scroll_story',
  beats: [
    { type: 'intro',         heading: 'Title', body: 'Text' },
    { type: 'stat_reveal',   heading: 'Title', body: 'Context', stats: [ /* StatCard objects */ ] },
    { type: 'concept_point', text: 'A single key idea.', visual: 'illustration-key', sourceUrl: '...', sourceLabel: '...' },
    { type: 'callout',       calloutType: 'tip', text: 'Actionable advice.' },
    { type: 'visual_moment', visual: 'illustration-key', caption: 'Caption text.' },
  ]
}
```

**Beat type guidance:**
- `intro` — opens the story, sets the scene
- `stat_reveal` — data moment with StatCard components
- `concept_point` — single insight, optionally anchored to an illustration and source
- `callout` — tip, warning, or quote pulled out for emphasis
- `visual_moment` — illustration takes centre stage with a caption

---

## JasperMoment

End-of-module brand/product wrap-up. Adaptable to any product or company.

```js
{
  type: 'jasper_moment',
  headline: 'How [Product] helps with [topic]',
  features: [
    { icon: '⚡', title: 'Feature name', body: 'One-sentence description.' },
  ],
  resource: {
    label: 'Report or resource name',
    url: 'https://...',
  },
  cta: 'Try it in [Product]',
  ctaUrl: 'https://...',
}
```

---

## DecisionTree

Branching scenario — learner makes choices and sees outcomes.

```js
{
  type: 'decision_tree',
  scenario: 'Opening situation description.',
  nodes: [
    {
      id: 'root',
      question: 'What do you do?',
      options: [
        { label: 'Option A', nextId: 'node_a' },
        { label: 'Option B', nextId: 'node_b' },
      ]
    },
    { id: 'node_a', outcome: 'Result of Option A.', isEnd: true },
    { id: 'node_b', outcome: 'Result of Option B.', isEnd: true },
  ]
}
```

---

## ContentEditor

Simulates editing a piece of content. Learner applies a technique.

```js
{
  type: 'content_editor',
  instruction: 'Rewrite this paragraph to answer a question directly.',
  originalContent: 'The original text to improve.',
  hints: ['Hint 1', 'Hint 2'],
  exampleSolution: 'A model answer showing one good approach.',
}
```
