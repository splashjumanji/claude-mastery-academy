# AISV Academy — Course Builder Skills

This folder contains four skill files that teach Claude or Cursor how to build, research, and maintain courses in the AISV Academy format. Once set up, you can ask Claude to help you write lessons, design interactions, research a topic, or suggest content updates — and it will follow the same conventions used to build AISV Academy.

---

## The four skills

| Skill file | What it teaches Claude |
|---|---|
| `course-narrative.md` | How to structure a course as a story, write lessons, and choose data visualisations |
| `course-interactions.md` | All nine interactive component types — quizzes, drag-and-drop, matching games, etc. |
| `course-research.md` | How to research a topic, evaluate sources, and structure findings for a course |
| `course-evolution.md` | How to run weekly content sweeps, review proposals, and keep course content up to date |

---

## Option 1: Using with Claude.ai (recommended for most people)

Claude.ai is the easiest way to use these skills. You set it up once and every conversation in that project automatically has access.

**Step 1 — Create a Claude Project**
1. Go to [claude.ai](https://claude.ai) and sign in
2. In the left sidebar, click **Projects**, then **New project**
3. Name it something like "AISV Course Builder"

**Step 2 — Upload the skill files**
1. Inside your new project, look for **Project knowledge** or a paperclip/upload icon
2. Upload all four `.md` files from this folder:
   - `course-narrative.md`
   - `course-interactions.md`
   - `course-research.md`
   - `course-evolution.md`

**Step 3 — Start a conversation**
That's it. Every conversation you start inside this project will automatically use these skills. Try asking:
> "Using the course narrative skill, help me write the first two lessons for a module about email marketing automation."

---

## Option 2: Using with Cursor

If you're using Cursor and have access to the full code repo, the skills are already installed — no setup needed.

When you open the repo in Cursor, it automatically discovers the skills in `.cursor/skills/`. You can trigger them by describing what you want to do:
> "Add a new quiz to Module 5 following the course interactions format."
> "Help me research the topic of AI email personalisation using the course research skill."

**If you're starting a new project from scratch:**
1. Copy the entire `.cursor/skills/` folder into your new project's root directory
2. Restart Cursor — the skills will be available immediately

---

## Option 3: Using with Claude Code (terminal)

If you use Claude Code (the command-line tool), add these lines to your `CLAUDE.md` file:

```
@.cursor/skills/course-narrative/SKILL.md
@.cursor/skills/course-interactions/SKILL.md
@.cursor/skills/course-research/SKILL.md
@.cursor/skills/course-evolution/SKILL.md
```

Claude Code will load the skills at the start of every session.

---

## Sharing these skills with someone else

**If they have access to the repo:** They already have everything. Just point them to this file.

**If they don't have the repo:**
1. Open the `course-skills/` folder
2. Send them the four `.md` files (email, Slack, Google Drive — any way you like)
3. They follow Option 1 above (Claude.ai Project) to get set up

That's it. No technical setup, no code, no installations needed for the Claude.ai path.

---

## Example prompts to get started

Once set up, here are some things you can ask Claude:

**Building a new course:**
> "I want to build a course about [topic] for [audience]. Using the course narrative skill, help me design the protagonist scenario and first two modules."

**Writing an interaction:**
> "Using the course interactions skill, write a drag-and-drop activity that teaches the difference between [concept A] and [concept B]."

**Researching a topic:**
> "Using the course research skill, help me evaluate these three sources for a module on [topic] and identify any statistics I'm missing."

**Reviewing content:**
> "Using the course evolution skill, I have this proposed update to review: [paste proposal]. Help me decide whether to approve or discard it."
