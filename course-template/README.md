# Course Framework — Handoff Guide

This folder contains everything needed to rebuild this course on a new topic using Claude Code.

## What the framework includes (already built)

- React/Vite app with React Router
- Scroll-story lesson format with 8 lesson types
- 5 interaction types: Quiz, Drag-and-Drop, Decision Tree, Pipeline Simulator, Content Editor
- Progress system with XP, levels, and badges (localStorage)
- Pop quiz / flash card mode
- Learning summary with print-to-PDF
- Content review dashboard (for ongoing AI-driven content updates)
- Automated content sweep (weekly research agent — Vercel cron)
- Vercel deployment config

## How to build a new course

### Step 1 — Fill in the brief

Open `COURSE_BRIEF.md` and fill in every section. The more detail you provide, the better.
Estimated time: 30–60 minutes for a well-thought-out brief.

### Step 2 — Open Cursor (or Claude Code)

In a new Cursor session on this repo, paste the following prompt:

```
Read course-template/SKILL.md and then course-template/COURSE_BRIEF.md.
Build the full course as described. Follow every instruction in the SKILL.md exactly.
Do not stop until all modules, branding, and proposals.json are complete.
```

Claude Code will:
- Generate all module and lesson content in `src/data/modules.js`
- Rewrite `src/data/jasper-moments.js` for the new tool (or remove if no sponsor)
- Update branding in AppShell, Welcome, useProgress, index.html
- Reset proposals.json

### Step 3 — Preview locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 and play through the course.

### Step 4 — Deploy

Push to GitHub. If connected to Vercel, it deploys automatically.
Or run `vercel --prod` from the project root.

---

## Folder structure (what to know)

```
src/
  data/
    modules.js          ← ALL course content lives here
    jasper-moments.js   ← Tool moment content (one per module)
    aria.js             ← Protagonist report card data
  components/
    screens/            ← Pages (WorldMap, ModulePlayer, FlashCards, etc.)
    interactions/       ← Quiz, DragDrop, DecisionTree, PipelineSimulator, ScrollStory
    illustrations/      ← SVG illustrations (optional, linked via visual: 'key' in lessons)
    layout/
      AppShell.jsx      ← Nav, header, XP bar
  hooks/
    useProgress.js      ← XP, levels, badges, localStorage
  styles/
    index.css           ← Design tokens and component classes
api/
  content-sweep.js      ← Weekly AI research agent (Vercel cron)
  apply-change.js       ← Auto-applies approved content proposals
  proposals.js          ← CRUD for content proposals
public/
  proposals.json        ← Content proposals store (reset to [] for new course)
```

---

## Environment variables needed (for Vercel)

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | GitHub personal access token (for content sweep auto-commits) |
| `GITHUB_REPO` | `username/repo-name` |
| `ANTHROPIC_API_KEY` | Claude API (for content sweep and proposal revision) |
| `TAVILY_API_KEY` | Web research API (for content sweep) |
| `SLACK_WEBHOOK_URL` | Slack notifications (optional, for content sweep alerts) |

---

## If you want a clean repo (no AISV content at all)

The simplest path:
1. Fork or duplicate the repo on GitHub
2. Run the course builder as above — it overwrites all content
3. The framework code is untouched

You do not need to manually delete AISV content first.
The builder will overwrite `modules.js`, `jasper-moments.js`, `aria.js`, and branding strings.
