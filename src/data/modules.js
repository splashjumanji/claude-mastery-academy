// ============================================================
// Claude Mastery Academy — Complete Module Content Data
// ============================================================

export const LEVELS = [
  { id: 1, number: 1, label: '101', title: 'Foundations',          subtitle: 'Meet the Claude ecosystem',          color: 'from-aria-600 to-aria-800',    icon: '🧠', modules: [1, 2, 3] },
  { id: 2, number: 2, label: '201', title: 'Working Effectively',  subtitle: 'Master the tools and techniques',   color: 'from-jasper-600 to-jasper-800', icon: '⚙️', modules: [4, 5, 6, 7] },
  { id: 3, number: 3, label: '301', title: 'Agent Harnesses',      subtitle: 'Build with the Claude API',         color: 'from-emerald-600 to-emerald-800', icon: '🏗️', modules: [8, 9, 10] },
  { id: 4, number: 4, label: '401', title: 'Advanced Patterns',    subtitle: 'Scale, evaluate, and ship to prod', color: 'from-amber-600 to-orange-700',    icon: '🚀', modules: [11, 12, 13] },
]

// ─────────────────────────────────────────────
// MODULE DEFINITIONS
// ─────────────────────────────────────────────
export const MODULES = {

  // ── LEVEL 1: FOUNDATIONS ─────────────────────────────────────

  1: {
    id: 1, levelId: 1,
    lastUpdated: '2026-03-15',
    title: 'Meet Claude',
    subtitle: 'Understand the ecosystem before you dive in',
    icon: '👋',
    xpReward: 75,
    ariaScoreDelta: 5,
    estimatedMinutes: 8,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l1_1',
        heading: 'Something feels different.',
        body: 'Your first week as Head of Developer Productivity at Nexus. The engineering team ships one feature a sprint. PRs sit in review for 3 days. New hires take 4 weeks to get productive. The CTO says: "We need to 3x our velocity without 3x-ing the team." You know the answer involves AI. But which AI, where, and how?',
        type: 'narrative',
      },
      {
        id: 'l1_2',
        heading: 'Claude is not one thing.',
        body: 'Claude is an AI assistant built by Anthropic, but it comes in three distinct surfaces. Each serves a different purpose, and knowing when to use which is the first skill to master.',
        type: 'concept',
        keyPoints: [
          { text: 'Claude.ai — the conversational interface. Projects, artifacts, and co-work mode. Best for thinking, planning, and knowledge work.' },
          { text: 'Claude Code — the agentic CLI tool. Lives in your terminal, reads your codebase, edits files directly. Best for engineering work.' },
          { text: 'Claude API — the raw building block. Messages, tools, and structured output. Best for building your own AI-powered systems.', explain: '"Messages" are how you send text to Claude in code. "Tools" are actions Claude can call (like searching the web or reading a file). "Structured output" means Claude returns data in a precise, machine-readable format rather than conversational prose. Together these let you build software with Claude as its brain.' },
        ],
      },
      {
        id: 'l1_3',
        heading: 'Three surfaces, three superpowers.',
        body: 'Think of it like this: Claude.ai is your thinking partner. Claude Code is your pair programmer. The Claude API is your construction kit for building agents that work autonomously.',
        type: 'concept',
        keyPoints: [
          { text: 'Claude.ai: "Help me think through the architecture for our new auth system"' },
          { text: 'Claude Code: "Refactor this module to use the repository pattern and update all tests"' },
          { text: 'API: "Build a bot that reviews every PR, checks for security issues, and posts findings to Slack"' },
          { text: 'The surfaces complement each other. Most teams use all three.' },
        ],
      },
      {
        id: 'l1_4',
        heading: 'The model family.',
        body: 'Under the hood, Claude runs on a family of models. Each balances capability, speed, and cost differently.',
        type: 'stat_reveal',
        displayStyle: 'grid',
        stats: [
          { label: 'Claude Opus 4.6', value: 'Most capable', direction: 'up', color: 'green', detail: 'Deepest reasoning with adaptive thinking. For complex architecture, multi-step analysis, and hard debugging.' },
          { label: 'Claude Sonnet 4.6', value: 'Best balance', direction: 'up', color: 'jasper', detail: 'Strong reasoning with interleaved thinking, good speed and cost. The daily driver for most engineering tasks.' },
          { label: 'Claude Haiku 4.5', value: 'Fastest', direction: 'neutral', color: 'amber', detail: 'Lightweight, fast, and cheap. Ideal for high-volume tasks like classification, extraction, and sub-agent work.' },
        ],
        insight: 'Claude Code uses Sonnet by default. Switch to Opus with /model for maximum reasoning power, or Haiku for fast exploration tasks.',
      },
      {
        id: 'l1_5',
        heading: 'Your project starts here.',
        body: 'Throughout this course, you will build a real tool: an "onboard-agent" — a CLI that reads any codebase and generates onboarding documentation for new engineers. You will plan it in Claude.ai, spec it in co-work mode, and build it in Claude Code. By the end, you will have a deployed, working agent. The first step? Open Claude.ai and start thinking.',
        type: 'narrative',
      },
    ],
    buildStep: {
      surface: 'chat',
      surfaceLabel: 'Claude.ai Chat',
      title: 'Brainstorm the onboard-agent',
      instructions: [
        'Open claude.ai and start a new conversation.',
        'Send this prompt: "I want to build a CLI tool called onboard-agent that reads a codebase and generates onboarding documentation for new engineers. Help me think through: what should it do, who is it for, what are the key features, and what are the constraints?"',
        'Have a back-and-forth conversation. Ask Claude to refine the feature list and suggest a tech stack.',
        'Save the conversation — you will use these ideas in the next module.',
      ],
      expectedOutput: 'A clear feature list, target audience, and technical approach for your onboard-agent, developed through conversation with Claude.',
    },
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q1_1',
          question: 'Which Claude surface is best for building an automated PR review bot?',
          options: ['Claude.ai', 'Claude Code', 'The Claude API', 'Any of them equally'],
          correct: 2,
          explanation: 'An automated PR review bot needs to run without human interaction, call tools, and integrate with systems like GitHub. The Claude API gives you the programmatic control to build this kind of agent harness.',
        },
        {
          id: 'q1_2',
          question: 'What is the key difference between Claude Code and the Claude API?',
          options: [
            'Claude Code is free; the API costs money',
            'Claude Code is an interactive agent in your terminal; the API is a programmatic building block for custom systems',
            'Claude Code only works with Python; the API works with any language',
            'There is no difference — they use the same interface',
          ],
          correct: 1,
          explanation: 'Claude Code is an interactive, agentic tool you use directly in your terminal — it reads your codebase, plans changes, and edits files with your approval. The API is a programmatic interface you use to build your own custom systems and agents.',
        },
        {
          id: 'q1_3',
          question: 'Which model should Nexus default to for most daily engineering tasks?',
          options: ['Opus 4.6 (most capable)', 'Sonnet 4.6 (best balance)', 'Haiku 4.5 (fastest)', 'It does not matter'],
          correct: 1,
          explanation: 'Sonnet 4.6 is the best balance of capability, speed, and cost for daily work. Claude Code defaults to Sonnet for this reason. Opus is reserved for complex reasoning; Haiku for high-volume, simpler tasks.',
        },
      ],
    },
  },

  2: {
    id: 2, levelId: 1,
    lastUpdated: '2026-03-15',
    title: 'Claude.ai Deep Dive',
    subtitle: 'Projects, artifacts, and co-work mode',
    icon: '💬',
    xpReward: 75,
    ariaScoreDelta: 5,
    estimatedMinutes: 10,
    type: 'micro_lesson_dragdrop_quiz',
    lessons: [
      {
        id: 'l2_1',
        heading: 'Claude.ai is more than a chatbot.',
        body: 'Most people use Claude.ai like a search engine: ask a question, get an answer, close the tab. That wastes 90% of its value. The real power is in three features: Projects, Artifacts, and Co-work mode.',
        type: 'concept',
        keyPoints: [
          { text: 'Projects: persistent workspaces with custom instructions and uploaded knowledge. Claude remembers your context across conversations.' },
          { text: 'Artifacts: rich outputs (code, documents, diagrams) that live alongside the chat and can be iterated on.' },
          { text: 'Co-work: Claude works on artifacts autonomously while you continue the conversation. Parallel productivity.' },
        ],
      },
      {
        id: 'l2_2',
        heading: 'Projects are the game-changer.',
        body: 'A Claude.ai Project is a persistent workspace. You set custom instructions ("You are a senior engineer at Nexus. Our stack is React/Node/Postgres. We follow trunk-based development."), upload reference documents, and every conversation in that project inherits the context.',
        type: 'concept',
        keyPoints: [
          { text: 'Custom instructions shape every response. They persist across all conversations in the project.' },
          { text: 'Upload architecture docs, API specs, style guides. Claude reads them as context for every message.' },
          { text: 'Create separate projects for different domains: "Auth System", "API Design", "Team Onboarding".' },
          { text: 'At Nexus: one project per major system means any engineer can get instant, context-aware help.' },
        ],
      },
      {
        id: 'l2_3',
        heading: 'Artifacts make output tangible.',
        body: 'When you ask Claude to write code, a design doc, or a diagram, it creates an Artifact: a standalone piece of content you can see, copy, iterate on, and share. Artifacts turn conversations into deliverables.',
        type: 'concept',
        keyPoints: [
          { text: 'Code artifacts render with syntax highlighting and can be copied directly to your editor.' },
          { text: 'Document artifacts support markdown formatting for specs, plans, and documentation.' },
          { text: 'React component artifacts render live previews — prototype UI ideas in real-time.' },
          { text: 'Ask Claude to iterate: "Make the error handling more robust" refines the artifact in place.' },
        ],
      },
      {
        id: 'l2_4',
        heading: 'Co-work: delegation, not dictation.',
        body: 'Co-work mode lets Claude work on artifacts autonomously while you keep chatting. Ask it to write a technical Request for Comments (RFC), then discuss team priorities while it works. When it finishes, review and refine.',
        type: 'concept',
        keyPoints: [
          { text: 'Co-work is ideal for longer generation tasks: design docs, code reviews, research summaries.' },
          { text: 'You set the direction, Claude executes. Review when ready.' },
          { text: 'Tip: be specific in your delegation prompt. "Write a 500-word Request for Comments (RFC) for migrating to event-driven auth" beats "write something about auth".' },
        ],
      },
    ],
    dragdrop: {
      title: 'Match the Feature',
      description: 'Drag each scenario to the Claude.ai feature that best fits.',
      items: [
        { id: 'dd1', label: 'You want Claude to remember your team\'s coding conventions across all conversations', correctBucket: 'projects', explanation: 'Custom instructions in a Project persist across all conversations, giving Claude consistent context about your team\'s practices.' },
        { id: 'dd2', label: 'You need a live-rendered React component prototype', correctBucket: 'artifacts', explanation: 'Artifacts can render React components with live previews, letting you prototype UI ideas directly in the conversation.' },
        { id: 'dd3', label: 'You want Claude to write a design doc while you discuss sprint priorities', correctBucket: 'cowork', explanation: 'Co-work lets Claude work on a deliverable autonomously while you continue the conversation on a different topic.' },
        { id: 'dd4', label: 'You upload your API specification so Claude can answer questions about your endpoints', correctBucket: 'projects', explanation: 'Projects support file uploads that become persistent context. Upload your API spec and every conversation in that project can reference it.' },
        { id: 'dd5', label: 'You ask Claude to generate a database migration script you can copy into your codebase', correctBucket: 'artifacts', explanation: 'Code artifacts render with syntax highlighting and a copy button, making it easy to move generated code into your project.' },
      ],
      buckets: [
        { id: 'projects', label: 'Projects', description: 'Persistent workspaces with context' },
        { id: 'artifacts', label: 'Artifacts', description: 'Rich, iterable outputs' },
        { id: 'cowork', label: 'Co-work', description: 'Autonomous parallel work' },
      ],
    },
    quiz: {
      xpBonus: 20,
      questions: [
        {
          id: 'q2_1',
          question: 'What makes a Claude.ai Project different from a regular conversation?',
          options: [
            'Projects use a different AI model',
            'Projects persist custom instructions and uploaded context across all conversations within them',
            'Projects can only be used by teams, not individuals',
            'Projects allow longer messages',
          ],
          correct: 1,
          explanation: 'A Project provides persistent custom instructions and uploaded reference documents that apply to every conversation within it. This means Claude maintains consistent context about your domain without you re-explaining it each time.',
        },
        {
          id: 'q2_2',
          question: 'When should you use co-work mode instead of a regular conversation?',
          options: [
            'Always — it produces better results',
            'When you want Claude to work on a deliverable autonomously while you continue discussing other topics',
            'Only for code generation tasks',
            'When you need faster responses',
          ],
          correct: 1,
          explanation: 'Co-work mode shines when you have a substantial generation task (design doc, code review, research summary) that you want Claude to work on independently while you continue the conversation on other topics. It enables parallel productivity.',
        },
      ],
    },
    buildStep: {
      surface: 'cowork',
      surfaceLabel: 'Claude.ai Co-work',
      title: 'Draft the onboard-agent spec',
      instructions: [
        'In Claude.ai, create a new Project called "Onboard Agent". Add a custom instruction: "You are helping me build a CLI tool called onboard-agent that reads codebases and generates onboarding docs."',
        'Start a conversation in the project. Ask Claude to write a product spec artifact with: goals, user stories, technical requirements, and a simple architecture diagram.',
        'Switch to co-work mode: tell Claude to "Write a detailed product spec for onboard-agent as an artifact" and let it work autonomously.',
        'Review the artifact. Ask for refinements: "Add an architecture section showing how the CLI, file reader, and Claude API interact."',
        'Export the spec as markdown — you will use it as a reference throughout the build.',
      ],
      expectedOutput: 'A product spec artifact in your Claude.ai Project with goals, user stories, architecture, and technical requirements for onboard-agent.',
    },
  },

  3: {
    id: 3, levelId: 1,
    lastUpdated: '2026-03-15',
    title: 'Your First Claude Code Session',
    subtitle: 'From installation to your first multi-file edit',
    icon: '⌨️',
    xpReward: 100,
    ariaScoreDelta: 10,
    estimatedMinutes: 12,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l3_1',
        heading: 'Claude Code lives everywhere.',
        body: 'Claude Code started in the terminal, but now it runs everywhere: your terminal, VS Code, JetBrains, a desktop app, the web, and even Slack. It reads your codebase, understands your project structure, and edits files with your permission.',
        type: 'concept',
        keyPoints: [
          { text: 'Install: npm install -g @anthropic-ai/claude-code — requires Node.js 18+.', explain: 'npm is the Node.js package manager — a tool for installing software from the internet. The -g flag means "install globally" so Claude Code is available from any folder on your computer, not just one project. Node.js 18+ means you need a fairly recent version of Node.js already on your machine.' },
          { text: 'Run: cd your-project && claude — it reads your project and you start chatting.', explain: 'cd means "change directory" — you\'re navigating into your project folder in the terminal. The && just means "and then." So this two-part command takes you to your project and launches Claude Code in one step. Claude immediately reads your files to understand the codebase before you type anything.' },
          { text: 'Also available as: VS Code extension, JetBrains plugin, Desktop app (macOS/Windows), Web (claude.ai/code), and in Slack.' },
          { text: 'Every file edit requires your approval. You see the diff before anything changes.' },
          { text: 'Start a task on the web or iOS app, then pull it into your terminal with /teleport.' },
        ],
      },
      {
        id: 'l3_2',
        heading: 'The agentic loop.',
        body: 'Claude Code does not just answer questions. It operates in an agentic loop: it thinks about what to do, uses tools (reading files, running commands, editing code), observes the results, and decides the next step. One prompt can trigger dozens of tool calls.',
        type: 'concept',
        keyPoints: [
          { text: 'Plan → Act → Observe → Decide → Repeat. The loop starts at Plan because the initial observation has already happened — Claude received your request. From there it plans the next action, executes it using a tool, observes the result, decides what to do next, and repeats until done.' },
          { text: 'Tools include: reading files, listing directories, running terminal commands, editing files, searching code.' },
          { text: 'Claude Code plans multi-step changes and executes them in sequence.' },
          { text: 'You can interrupt at any time. Every destructive action asks for permission.' },
        ],
      },
      {
        id: 'l3_3',
        heading: 'CLAUDE.md: your project\'s brain.',
        body: 'CLAUDE.md is a markdown file in your repo root that Claude Code reads automatically at the start of every session. It is the single most important file for getting good results. Think of it as onboarding documentation for your AI teammate.',
        type: 'concept',
        keyPoints: [
          { text: 'Put it at the root of your repo (./CLAUDE.md or ./.claude/CLAUDE.md). Claude Code picks it up automatically.' },
          { text: 'Include: tech stack, naming conventions, testing approach, common patterns, do/don\'t rules.' },
          { text: 'Use @imports to reference other files: "See @README for project overview and @package.json for available npm commands."', explain: '@imports let you link to other files in your CLAUDE.md without copying their contents in. Claude Code reads those linked files automatically, keeping your main instruction file short and tidy. Think of it like footnotes that Claude actually follows.' },
          { text: 'Organize team rules in .claude/rules/*.md — each file loads automatically when relevant.', explain: '.claude/ is a folder in your project that holds Claude-specific settings. The *.md means "any file ending in .md" — Markdown, a simple text format for documents. Breaking conventions into separate files means Claude only reads what\'s relevant to the task, keeping things focused.' },
          { text: 'Use /init to bootstrap a CLAUDE.md for your project. Claude reads the codebase and drafts one for you.' },
          { text: 'Auto memory: Claude also learns from corrections you make and saves them to ~/.claude/memory.json. View with /memory.', explain: '~/ is shorthand for your personal home folder on your computer. So ~/.claude/memory.json is a file stored there, just for you. Whenever you correct Claude Code, it saves a note to itself in that file. /memory is a command you type inside Claude Code to review what it has learned about your preferences.' },
        ],
      },
      {
        id: 'l3_4',
        heading: 'Time to build.',
        body: 'You have planned the onboard-agent in Claude.ai chat and specced it in co-work mode. Now it is time to scaffold the project in Claude Code. This is the moment the project goes from ideas to code.',
        type: 'narrative',
      },
    ],
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Scaffold the onboard-agent project',
      instructions: [
        'Install Claude Code if you haven\'t: npm install -g @anthropic-ai/claude-code (requires Node.js 18+)',
        'Create and enter your project: mkdir onboard-agent && cd onboard-agent',
        'Start Claude Code: claude',
        'Tell Claude: "Initialize a Node.js CLI project called onboard-agent. Create package.json with a bin entry, a src/index.js entry point that accepts a directory path argument, and a README.md. Also create a CLAUDE.md with the project\'s purpose and conventions."',
        'Review the diffs Claude proposes and approve them.',
        'Run: git init && git add -A && git commit -m "Initial scaffold"',
      ],
      expectedOutput: 'A git repo with package.json (bin entry), src/index.js (CLI entry point), README.md, and CLAUDE.md. Running `node src/index.js ./` should print a placeholder message.',
    },
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q3_1',
          question: 'What is CLAUDE.md?',
          options: [
            'A configuration file that controls Claude Code\'s permissions',
            'A markdown file in your repo root that provides project context — Claude Code reads it automatically',
            'A template for writing prompts',
            'An API specification file',
          ],
          correct: 1,
          explanation: 'CLAUDE.md is a markdown file you place in your repository root. Claude Code reads it at the start of every session to understand your project\'s conventions, tech stack, and preferences. It\'s the most important file for getting consistently good results.',
        },
        {
          id: 'q3_2',
          question: 'What is the "agentic loop" in Claude Code?',
          options: [
            'A feedback system where users rate Claude\'s responses',
            'The cycle of Plan → Act → Observe → Decide → Repeat that Claude uses to complete complex tasks',
            'A way to run Claude Code in a continuous background process',
            'The loop that trains Claude on new data',
          ],
          correct: 1,
          explanation: 'Claude Code operates in an agentic loop: it plans what to do, takes an action (reads a file, runs a command, edits code), observes the result, decides the next step, and repeats until the task is done. A single prompt can trigger dozens of tool calls.',
        },
        {
          id: 'q3_3',
          question: 'How does Claude Code handle file edits?',
          options: [
            'It edits files silently in the background',
            'It shows you a diff and asks for approval before making any changes',
            'It only suggests edits in comments, never modifying files directly',
            'It creates a new branch automatically for every change',
          ],
          correct: 1,
          explanation: 'Every file edit in Claude Code requires your explicit approval. You see a diff of the proposed changes and can accept, reject, or ask for modifications. This keeps you in control while Claude handles the heavy lifting.',
        },
      ],
    },
  },

  // ── LEVEL 2: WORKING EFFECTIVELY ─────────────────────────────

  4: {
    id: 4, levelId: 2,
    lastUpdated: '2026-03-15',
    title: 'Context is Everything',
    subtitle: 'Tokens, attention, and managing what Claude knows',
    icon: '🧩',
    xpReward: 100,
    ariaScoreDelta: 10,
    estimatedMinutes: 10,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l4_1',
        heading: 'Why context matters more than prompting tricks.',
        body: 'The quality of Claude\'s output is determined more by the context you provide than by clever prompt phrasing. A mediocre prompt with excellent context beats a brilliant prompt with no context, every time.',
        type: 'concept',
        keyPoints: [
          { text: 'Context = everything Claude can "see": your message, system prompt, CLAUDE.md, conversation history, uploaded files.' },
          { text: 'Claude\'s context window is large (200K tokens for Sonnet) but not infinite. Managing it is a skill.' },
          { text: 'Tokens ≈ words × 1.3. A 200K context window ≈ 150,000 words, or about 300 pages.', explain: 'Tokens are the units Claude thinks in — roughly one token per word, but punctuation, spaces, and word fragments add up. The "context window" is how much Claude can hold in mind at once during a conversation. 200,000 tokens is large — it can read an entire novel and still have room for your messages.' },
          { text: 'More context is not always better. Relevant context >> large context.' },
        ],
      },
      {
        id: 'l4_2',
        heading: 'Writing a great CLAUDE.md.',
        body: 'The CLAUDE.md file is the highest-leverage context you can provide to Claude Code. A well-written one transforms output quality immediately.',
        type: 'concept',
        keyPoints: [
          { text: 'Start with the tech stack: "This is a React 18 + TypeScript + Express + PostgreSQL monorepo."' },
          { text: 'Add conventions: "Use named exports. Colocate tests. Never use abbreviations in variable names."' },
          { text: 'Include architecture: "API routes go through authMiddleware → validateInput → handler → response."' },
          { text: 'Add don\'ts: "Never use any in TypeScript. Never commit directly to main. Always run tests before suggesting done."' },
          { text: 'Use @imports: "@docs/api-spec.md" pulls in a referenced file. Keeps CLAUDE.md focused while ensuring depth.' },
          { text: 'Be specific: "Use 2-space indentation" beats "Format code properly." Claude follows specific rules well.' },
        ],
      },
      {
        id: 'l4_3',
        heading: 'Context management strategies.',
        body: 'As conversations get long, context fills up. Here are the strategies Nexus engineers learn to manage this effectively.',
        type: 'concept',
        keyPoints: [
          { text: 'Start new conversations for new tasks. Don\'t reuse a conversation about auth to discuss database schema.' },
          { text: 'Use /compact in Claude Code to summarize the conversation so far and free up context space.', explain: 'As a conversation gets longer, it fills Claude\'s memory. /compact asks Claude to replace the detailed back-and-forth with a tight summary, keeping the key facts while freeing up space. Think of it like collapsing a long email thread into a single paragraph before continuing.' },
          { text: 'In Claude.ai, use Projects to keep persistent context separate from conversation context.' },
          { text: 'For the API: system prompts are re-sent every turn. Keep them tight and relevant.', explain: 'Every time you send a message through the API, Claude receives your setup instructions again along with your new message — it can\'t remember them from before. Think of it like re-attaching the same cover letter to every email in a thread. The longer the instructions, the more each message costs, so only include what Claude genuinely needs each time.' },
        ],
      },
    ],
    quiz: {
      xpBonus: 20,
      questions: [
        {
          id: 'q4_1',
          question: 'What is the most impactful way to improve Claude Code\'s output quality?',
          options: [
            'Use the most expensive model (Opus)',
            'Write longer, more detailed prompts',
            'Provide clear, relevant context via CLAUDE.md and well-scoped conversations',
            'Retry the same prompt multiple times',
          ],
          correct: 2,
          explanation: 'Context quality is the single biggest lever for output quality. A clear CLAUDE.md with your conventions, a well-scoped conversation about a single task, and relevant files in context will consistently produce better results than prompt tricks or model upgrades.',
        },
        {
          id: 'q4_2',
          question: 'When should you start a new Claude Code conversation?',
          options: [
            'Every 10 minutes',
            'When switching to a fundamentally different task or area of the codebase',
            'Never — longer conversations are always better',
            'Only when Claude makes an error',
          ],
          correct: 1,
          explanation: 'Start a new conversation when switching to a different task. Conversation history accumulates as context, and irrelevant context from a previous task can confuse Claude on the current one. Fresh conversation = clean context = better results.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Write a real CLAUDE.md for onboard-agent',
      instructions: [
        'Open Claude Code in your onboard-agent project: cd onboard-agent && claude',
        'Run /init to let Claude auto-generate a starter CLAUDE.md by reading your project.',
        'Review the generated file, then ask Claude to refine it: "Update CLAUDE.md to include these conventions: use ES modules, 2-space indent, no semicolons, descriptive function names. Add @imports for the product spec we drafted."',
        'Create a rules directory: ask Claude to "Create .claude/rules/testing.md with our testing conventions: colocate test files, use vitest, prefer integration tests over unit tests."',
        'Run /memory to check if Claude has learned anything from your corrections so far.',
      ],
      expectedOutput: 'A detailed CLAUDE.md with tech stack, conventions, and @imports. A .claude/rules/testing.md file. Claude\'s auto-memory reflecting your preferences.',
    },
  },

  5: {
    id: 5, levelId: 2,
    lastUpdated: '2026-03-15',
    title: 'Prompt Engineering for Claude',
    subtitle: 'Patterns that consistently produce better results',
    icon: '✍️',
    xpReward: 125,
    ariaScoreDelta: 10,
    estimatedMinutes: 15,
    type: 'micro_lesson_dragdrop_quiz',
    lessons: [
      {
        id: 'l5_1',
        heading: 'Prompt engineering is task decomposition.',
        body: 'Forget "magic words." The best prompt engineering technique is breaking complex tasks into clear, specific sub-tasks. Claude excels when it knows exactly what you want, in what format, with what constraints.',
        type: 'concept',
        keyPoints: [
          { text: 'Be specific: "Write a function that validates email addresses using Request for Comments 5322 (RFC 5322) regex" beats "write an email validator."' },
          { text: 'Specify format: "Return a JSON object with fields: valid (boolean), reason (string)."' },
          { text: 'Set constraints: "Maximum 50 lines. No external dependencies. Must handle edge cases: empty string, null, unicode."' },
          { text: 'Give examples: one good input/output example is worth 100 words of description.' },
        ],
      },
      {
        id: 'l5_2',
        heading: 'System prompts set the frame.',
        body: 'In the API, the system prompt runs before every user message. In Claude.ai, Project instructions serve the same role. This is where you establish Claude\'s role, constraints, and output expectations.',
        type: 'concept',
        keyPoints: [
          { text: 'Role: "You are a senior TypeScript engineer reviewing code for security vulnerabilities."' },
          { text: 'Constraints: "Only flag issues with severity HIGH or CRITICAL. Ignore style nits."' },
          { text: 'Output format: "For each issue, provide: file, line, severity, description, suggested fix."' },
          { text: 'Keep system prompts focused. One role per prompt. Mix roles = mixed results.' },
        ],
      },
      {
        id: 'l5_3',
        heading: 'Extended thinking and chain of thought.',
        body: 'For complex reasoning — architecture decisions, debugging tricky issues, multi-step planning — ask Claude to think step by step. In the API, enable extended thinking for Claude to reason internally before responding.',
        type: 'concept',
        keyPoints: [
          { text: '"Think step by step" improves accuracy on complex tasks by 10-30% across benchmarks.' },
          { text: 'Extended thinking (API): Claude reasons in a hidden scratchpad before giving its final answer.', explain: 'When you enable extended thinking, Claude works through the problem privately first — like doing rough work before writing the final answer. You don\'t see the scratchpad, but the final response is more accurate because of it. You pay for the thinking time even though it\'s hidden.' },
          { text: 'Best for: debugging, architecture decisions, multi-file refactors, complex analysis.' },
          { text: 'Not needed for: simple generation, formatting, straightforward Q&A.' },
        ],
      },
      {
        id: 'l5_4',
        heading: 'Prefilling and structured output.',
        body: 'In the API, you can prefill the beginning of Claude\'s response to steer the format. Start the assistant message with "{" to get JSON. Start with "```python" to get Python code. This is one of the most underused techniques.',
        type: 'concept',
        keyPoints: [
          { text: 'Prefilling: set the first few characters of the assistant response to guide format.', explain: 'You can start Claude\'s reply for it by writing the first few characters. If you open with "{" Claude will continue with JSON. If you open with "```python" it will write Python code. It\'s a nudge that steers the output format reliably without needing a long instruction.' },
          { text: 'Tool use: define structured tool schemas for reliable, typed JSON output.', explain: 'Instead of asking Claude to "respond in JSON," you define a tool — like a form Claude fills in. Each field has a name and type (text, number, true/false). Claude completes it and you get back predictable, structured data that\'s easy to use in your code without extra clean-up.' },
          { text: 'API tool_use is more reliable than asking for JSON in the prompt. Use it for production systems.', explain: 'When you just ask Claude to "respond in JSON," it sometimes adds commentary, wraps the JSON in code fences, or formats it slightly wrong. The tool_use system bypasses all of that — Claude treats the tool like a form to submit, and the output is clean and consistent every time.' },
          { text: 'For Claude Code: just be explicit about the format you want. "Output as a markdown table" works well.' },
        ],
      },
    ],
    dragdrop: {
      title: 'Match the Technique to the Task',
      description: 'Drag each task to the prompt engineering technique that fits best.',
      items: [
        { id: 'dd1', label: 'Nexus needs Claude to output exactly-structured JSON for a CI pipeline', correctBucket: 'tool_use', explanation: 'For production systems that need guaranteed structured output, API tool_use with defined schemas is the most reliable approach.' },
        { id: 'dd2', label: 'An engineer wants Claude to debug why a database query returns wrong results', correctBucket: 'cot', explanation: 'Complex debugging benefits from chain-of-thought reasoning. Ask Claude to "think step by step" or enable extended thinking for systematic analysis.' },
        { id: 'dd3', label: 'You want Claude to always respond as a security-focused code reviewer', correctBucket: 'system_prompt', explanation: 'Consistent role-setting is best done via system prompts (API) or Project instructions (Claude.ai). This ensures the frame persists across messages.' },
        { id: 'dd4', label: 'You want Claude to generate Python code without any preamble text', correctBucket: 'prefilling', explanation: 'Prefilling the assistant response with "```python\\n" forces Claude to start generating code immediately without conversational preamble.' },
      ],
      buckets: [
        { id: 'system_prompt', label: 'System Prompt', description: 'Set role and constraints' },
        { id: 'cot', label: 'Chain of Thought', description: 'Step-by-step reasoning' },
        { id: 'tool_use', label: 'Tool Use', description: 'Structured schemas' },
        { id: 'prefilling', label: 'Prefilling', description: 'Steer output format' },
      ],
    },
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q5_1',
          question: 'What is the single most effective prompt engineering technique?',
          options: [
            'Using specific buzzwords that trigger better responses',
            'Breaking complex tasks into clear, specific sub-tasks with explicit format and constraints',
            'Always using the longest possible prompt',
            'Starting every prompt with "You are an expert"',
          ],
          correct: 1,
          explanation: 'Task decomposition — being specific about what you want, in what format, with what constraints — consistently outperforms any "magic words." Specificity beats cleverness every time.',
        },
        {
          id: 'q5_2',
          question: 'When should you use extended thinking (chain of thought)?',
          options: [
            'For every task — it always improves results',
            'For complex reasoning: debugging, architecture decisions, multi-step analysis',
            'Only for creative writing tasks',
            'Never — it wastes tokens',
          ],
          correct: 1,
          explanation: 'Extended thinking improves accuracy on complex reasoning tasks by 10-30%, but adds latency and cost. For simple generation or formatting tasks, it is unnecessary. Save it for debugging, architecture decisions, and multi-step analysis.',
        },
      ],
    },
    buildStep: {
      surface: 'chat',
      surfaceLabel: 'Claude.ai Chat + Claude Code',
      title: 'Design and implement the system prompt',
      instructions: [
        'In Claude.ai (within your "Onboard Agent" project), start a new conversation: "I need to design a system prompt for my onboard-agent. It should instruct Claude to act as a senior engineer who reads codebases and writes clear, structured onboarding documentation. Help me iterate on this."',
        'Work with Claude.ai to refine the prompt: what tone? What sections should the output include? What should it NOT do?',
        'Once you are happy with the system prompt, switch to Claude Code.',
        'In Claude Code, tell it: "Create src/prompts.js that exports a getSystemPrompt() function returning the system prompt for our onboarding agent." Paste the prompt you designed.',
        'Ask Claude Code to also create src/config.js with model selection (default: sonnet, flag for opus on complex repos).',
      ],
      expectedOutput: 'A polished system prompt designed in Claude.ai chat, implemented as src/prompts.js in the project. A src/config.js with model configuration.',
    },
  },

  6: {
    id: 6, levelId: 2,
    lastUpdated: '2026-03-15',
    title: 'Tools, MCP, and Extensibility',
    subtitle: 'Connect Claude to your systems',
    icon: '🔌',
    xpReward: 100,
    ariaScoreDelta: 10,
    estimatedMinutes: 12,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l6_1',
        heading: 'Claude can use tools.',
        body: 'Out of the box, Claude Code can read files, write files, run shell commands, and search codebases. But the real power comes when you extend it with custom tools via the Model Context Protocol (MCP).',
        type: 'concept',
        keyPoints: [
          { text: 'Built-in tools: read, write, list, grep, bash — Claude Code knows how to use these automatically.' },
          { text: 'MCP (Model Context Protocol): an open standard for connecting AI to external data and tools.' },
          { text: 'MCP servers provide tools (actions Claude can take) and resources (data Claude can read).' },
          { text: 'Example MCP servers: GitHub (manage PRs), PostgreSQL (query databases), Slack (post messages), filesystem.' },
        ],
      },
      {
        id: 'l6_2',
        heading: 'MCP: the integration layer.',
        body: 'MCP is an open protocol created by Anthropic that standardizes how AI tools connect to external systems. Think of it as USB-C for AI: one standard plug that works with many devices.',
        type: 'concept',
        keyPoints: [
          { text: 'Install MCP servers via claude mcp add. Claude Code discovers their tools automatically.', explain: 'MCP servers are small programs that give Claude access to external systems — like GitHub, databases, or internal tools. Running claude mcp add tells Claude Code about one of them. After that, Claude can see and use its tools without any extra setup, like installing an app and finding it ready in your dock.' },
          { text: 'The GitHub MCP server lets Claude Code manage issues, review PRs, and read repo contents.' },
          { text: 'A database MCP server lets Claude query your database directly to answer questions about data.' },
          { text: 'You can build custom MCP servers for internal systems: deployment tools, monitoring, feature flags.' },
        ],
      },
      {
        id: 'l6_3',
        heading: 'Skills: reusable capabilities.',
        body: 'Skills are Claude Code\'s extensibility system. Each skill lives in a .claude/skills/<name>/ folder with a SKILL.md file containing YAML frontmatter (name, description) and detailed instructions. Claude auto-discovers skills and uses them when relevant.',
        type: 'concept',
        keyPoints: [
          { text: 'Create: mkdir -p .claude/skills/review && edit .claude/skills/review/SKILL.md with frontmatter and instructions.', explain: 'mkdir -p creates a folder (and any needed parent folders). The && chains two commands: first create the folder, then open a file to edit. "Frontmatter" is a small block of structured metadata at the top of the file — like a label that tells Claude what the skill is called and when to use it.' },
          { text: 'Skills can include templates, examples, and scripts alongside SKILL.md for richer behavior.' },
          { text: 'Bundled skills: /batch (parallel file processing via worktrees), /debug, /loop (recurring tasks), /simplify, /claude-api.' },
          { text: '/loop 5m check if the deploy finished — runs a prompt every 5 minutes on a schedule.', explain: '/loop is a built-in Claude Code skill that repeats a task on a schedule. "5m" means every 5 minutes. This lets Claude Code monitor something — a build, a deploy, a test run — and report back automatically without you having to keep checking yourself.' },
          { text: 'Share skills via the repo. New team members inherit your best practices automatically.' },
        ],
      },
      {
        id: 'l6_4',
        heading: 'At Nexus: the extension stack.',
        body: 'Nexus installs three MCP servers (GitHub, deployment API, PostgreSQL) and creates two custom skills: /review-pr (security + style audit) and /onboard (generates onboarding docs for new repos). When an engineer asks "What is the error rate for the /auth endpoint this week?", Claude queries the database via MCP and answers with real data.',
        type: 'narrative',
      },
    ],
    quiz: {
      xpBonus: 20,
      questions: [
        {
          id: 'q6_1',
          question: 'What is MCP (Model Context Protocol)?',
          options: [
            'A proprietary Anthropic API for premium features',
            'An open standard for connecting AI tools to external data sources and systems',
            'A method for compressing Claude\'s context window',
            'A tool for managing Claude API rate limits',
          ],
          correct: 1,
          explanation: 'MCP is an open protocol that standardizes how AI tools connect to external systems. Any MCP-compatible tool can provide Claude with new capabilities — reading from databases, managing GitHub repos, posting to Slack, and more.',
        },
        {
          id: 'q6_2',
          question: 'How do skills work in Claude Code?',
          options: [
            'They require a paid subscription to create',
            'You create a SKILL.md file with frontmatter in .claude/skills/<name>/ — Claude auto-discovers and uses them',
            'They only work with MCP servers installed',
            'They are built into Claude Code and cannot be customized',
          ],
          correct: 1,
          explanation: 'Skills are folders in .claude/skills/ containing a SKILL.md file with YAML frontmatter (name, description) and instructions. Claude auto-discovers them and uses them when relevant. They can include templates, scripts, and examples alongside the SKILL.md.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Add MCP and a custom skill',
      instructions: [
        'In Claude Code, install the filesystem MCP server: claude mcp add filesystem -- npx -y @anthropic-ai/mcp-filesystem /path/to/test/repo',
        'Test it: ask Claude Code to "Use the filesystem MCP server to list all JavaScript files in the test repo and count lines of code."',
        'Create a custom skill: tell Claude to "Create a skill at .claude/skills/analyze-repo/SKILL.md that instructs Claude to analyze a directory tree, identify entry points, list dependencies, and summarize the architecture."',
        'Test the skill: start a new Claude Code session and ask it to analyze a repo — it should automatically pick up the skill.',
        'Ask Claude Code to implement src/scanner.js — a module that walks a directory tree and returns a structured summary of files, sizes, and types.',
      ],
      expectedOutput: 'Filesystem MCP server connected. Custom analyze-repo skill in .claude/skills/. A working src/scanner.js that scans a directory tree.',
    },
  },

  7: {
    id: 7, levelId: 2,
    lastUpdated: '2026-03-15',
    title: 'Workflows and Automation',
    subtitle: 'Repeatable patterns for daily engineering work',
    icon: '🔄',
    xpReward: 100,
    ariaScoreDelta: 10,
    estimatedMinutes: 10,
    type: 'decision_tree_quiz',
    lessons: [
      {
        id: 'l7_1',
        heading: 'From ad-hoc to systematic.',
        body: 'Most teams start using Claude ad-hoc: individual engineers asking questions as they arise. The leap in productivity comes when you systematize this into repeatable workflows the whole team uses.',
        type: 'concept',
        keyPoints: [
          { text: 'Feature workflow: spec → Claude generates implementation → engineer reviews diff → tests → commit.' },
          { text: 'PR review workflow: Claude reviews staged changes → flags issues → engineer addresses → merge.' },
          { text: 'Debug workflow: paste error → Claude reads relevant code → proposes fix → engineer verifies.' },
          { text: 'Documentation workflow: Claude reads the code, generates/updates docs, engineer reviews for accuracy.' },
        ],
      },
      {
        id: 'l7_2',
        heading: 'Git integration.',
        body: 'Claude Code understands git natively. Use it for the full git workflow: smart commit messages, change summaries, interactive rebasing guidance, and conflict resolution.',
        type: 'concept',
        keyPoints: [
          { text: '"Commit these changes with a descriptive message" — Claude reads the diff and writes a meaningful commit message.' },
          { text: '"Explain the last 5 commits" — Claude summarizes recent changes for context.' },
          { text: '"Help me resolve this merge conflict" — Claude reads both versions and suggests a resolution.' },
          { text: 'Hooks: use pre-commit hooks to run Claude Code in headless mode for automated checks.', explain: 'A pre-commit hook is a script that runs automatically every time you try to save a code change. Headless mode means Claude runs silently in the background with no human interaction. Together, this gives you a silent reviewer that checks for issues before any code is committed — like a checkpoint before the gate.' },
        ],
      },
      {
        id: 'l7_3',
        heading: 'Headless mode and CI/CD.',
        body: 'Claude Code can run in headless mode (no human in the loop). This unlocks CI/CD integration: automated code reviews on every PR, automated test generation, automated documentation updates.',
        type: 'concept',
        keyPoints: [
          { text: 'claude -p "Review this PR for security issues" --output-format json — runs without interaction, outputs structured results.', explain: '-p means "prompt" — you\'re giving Claude its task directly in the command, like a sticky note. --output-format json means "return results as machine-readable data instead of a conversational response." This lets other automated tools (like GitHub Actions) read and act on Claude\'s output without a human in the middle.' },
          { text: 'Use in GitHub Actions: run Claude Code as a step in your CI pipeline.', explain: 'GitHub Actions is a system that automatically runs scripts when code changes happen — like running tests on every pull request. A CI pipeline is that sequence of automated checks. By adding Claude Code as a step, it can review, document, or analyse changes in the background as part of your team\'s normal workflow, with no one having to ask.' },
          { text: 'Caution: headless mode has no human approval gate. Set clear constraints in your prompts.' },
          { text: 'Best for: code review, linting, documentation checks, test coverage analysis.' },
        ],
      },
    ],
    decisionTree: {
      title: 'Design Nexus\'s Workflows',
      description: 'Nexus engineers face common situations daily. For each one, choose the Claude workflow that makes the most sense.',
      scenarios: [
        {
          id: 'dt1',
          content: 'A junior engineer just submitted a PR with 15 changed files. The team lead is in a different time zone.',
          question: 'What Claude workflow should Nexus use?',
          options: [
            { label: 'Run Claude Code in headless mode on the PR for automated review', correct: true, feedback: 'Correct! Headless mode can provide an automated first-pass review, catching obvious issues and giving structured feedback. The team lead reviews Claude\'s findings when they come online.' },
            { label: 'Ask the junior engineer to paste each file into Claude.ai manually', correct: false, feedback: 'This would work but is manual and error-prone. The engineer would lose cross-file context. Automated headless review on the PR is more systematic and catches cross-file issues.' },
            { label: 'Wait for the team lead to review manually', correct: false, feedback: 'This defeats the purpose. Claude can provide immediate, structured feedback while the team lead is asleep — reducing the PR cycle from days to hours.' },
          ],
        },
        {
          id: 'dt2',
          content: 'The team needs to update documentation for 8 API endpoints that changed in the last sprint.',
          question: 'What is the best approach?',
          options: [
            { label: 'Use Claude Code to read the changed endpoints and generate updated docs, then have an engineer review for accuracy', correct: true, feedback: 'Correct! Claude Code can read the actual code changes and generate accurate documentation. The engineer reviews for technical accuracy rather than writing from scratch — 10x faster.' },
            { label: 'Have each engineer write docs for the endpoints they changed', correct: false, feedback: 'This works but is slow and inconsistent. Different engineers write in different styles and levels of detail. Claude ensures consistency and completeness.' },
            { label: 'Skip documentation — it always falls behind anyway', correct: false, feedback: 'With Claude, documentation can stay current with minimal effort. Skipping it is a false economy that compounds technical debt.' },
          ],
        },
      ],
    },
    quiz: {
      xpBonus: 20,
      questions: [
        {
          id: 'q7_1',
          question: 'What is Claude Code headless mode best used for?',
          options: [
            'Interactive pair programming sessions',
            'Automated tasks in CI/CD pipelines where no human is in the loop',
            'Training Claude on your codebase',
            'Running Claude Code on mobile devices',
          ],
          correct: 1,
          explanation: 'Headless mode runs Claude Code without human interaction, making it perfect for CI/CD integration: automated code reviews on PRs, documentation checks, test coverage analysis, and structured code quality reports.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Add automation and headless checks',
      instructions: [
        'In Claude Code, create a headless mode script: tell Claude to "Create scripts/check-docs.sh that runs claude -p \'Analyze src/ and list any files that are missing JSDoc comments\' --output-format json and saves the result to reports/doc-coverage.json."',
        'Test the script: chmod +x scripts/check-docs.sh && ./scripts/check-docs.sh',
        'Set up a git workflow: ask Claude to "Write a pre-commit Git hook that runs our doc coverage check and warns if coverage drops below 80%."',
        'Ask Claude Code to "Create a comprehensive commit for all our Level 201 changes with a detailed commit message" — let Claude handle the git workflow.',
      ],
      expectedOutput: 'A headless mode script (scripts/check-docs.sh) that runs Claude without interaction. A pre-commit hook for automated doc checks. All Level 201 work committed.',
    },
  },

  // ── LEVEL 3: AGENT HARNESSES ────────────────────────────────

  8: {
    id: 8, levelId: 3,
    lastUpdated: '2026-03-15',
    title: 'Understanding Agent Architecture',
    subtitle: 'The plan-act-observe loop and tool use',
    icon: '🏗️',
    xpReward: 125,
    ariaScoreDelta: 15,
    estimatedMinutes: 15,
    type: 'pipeline_simulator_quiz',
    lessons: [
      {
        id: 'l8_1',
        heading: 'What is an agent?',
        body: 'An agent is a system where an LLM drives its own execution. Instead of you orchestrating each step, the LLM decides what tool to use, interprets the result, and chooses the next action. Claude Code is itself an agent. Now you are going to build your own.',
        type: 'concept',
        keyPoints: [
          { text: 'Agent = LLM + tools + a loop. The LLM plans, calls tools, observes results, decides next steps.' },
          { text: 'This is different from a prompt chain (fixed sequence) or a pipeline (human orchestrated).' },
          { text: 'The Claude API supports two types of tools: client tools (you implement) and server tools (run on Anthropic\'s servers).' },
          { text: 'Server tools like web_search and web_fetch require no implementation — specify them and Claude uses them directly.' },
          { text: 'Client tools use the tool_use/tool_result loop. Server tools just work. Both can coexist in one agent.' },
        ],
      },
      {
        id: 'l8_2',
        heading: 'The harness pattern.',
        body: 'An "agent harness" is the code that wraps around the LLM. It sends messages, checks for tool calls in the response, executes tools, and sends results back. The harness is what turns a raw API into an autonomous agent.',
        type: 'concept',
        keyPoints: [
          { text: '1. Send a message to Claude with tool definitions (JSON schemas with name, description, input_schema).', explain: 'A tool definition is a description you send to Claude explaining what a tool does and what it needs to use it. A JSON schema is a structured format that lists each input field, its type, and whether it\'s required — like a form Claude has to fill out each time it wants to call that tool.' },
          { text: '2. Check the response: does it have stop_reason: "tool_use"?', explain: 'When Claude wants to run a tool instead of just replying, it sets a flag in its response called stop_reason to "tool_use." Checking this flag tells your code whether Claude is done talking or is asking you to run something on its behalf before it continues.' },
          { text: '3. If yes: extract tool_use blocks, execute each tool, send results back as tool_result content blocks.', explain: 'A tool_use block is Claude\'s request to run a specific tool with specific inputs. Your code pulls that out, runs the actual function, then sends the result back to Claude as a tool_result — so Claude can continue reasoning with that new information and decide its next step.' },
          { text: '4. If no tool_use: Claude is done. Return the final text response.' },
          { text: 'Also available: Anthropic-defined tools like computer_use and text_editor that extend Claude\'s built-in capabilities.' },
        ],
      },
      {
        id: 'l8_3',
        heading: 'Tool schemas: telling Claude what it can do.',
        body: 'Tools are defined as JSON schemas that tell Claude what parameters each tool accepts. Good schema design is crucial: clear names, precise descriptions, and strict types prevent tool misuse.',
        type: 'concept',
        keyPoints: [
          { text: 'Each tool has: name, description, and input_schema (JSON Schema format).' },
          { text: 'Good description: "Search the web using Exa.ai. Returns titles, URLs, and summaries for the top N results."' },
          { text: 'Bad description: "search" — Claude won\'t know when or how to use it.' },
          { text: 'Use strict types: enum for categorical inputs, required for mandatory fields.', explain: 'An enum is a list of allowed values — like a dropdown menu. If a field can only be "low", "medium", or "high", defining it as an enum stops Claude from inventing other values. Marking fields as "required" means Claude can\'t skip them, which prevents incomplete tool calls that would break your code.' },
        ],
      },
    ],
    simulator: {
      budget: 10,
      scenario: 'Nexus is building its first agent: a code review bot. Walk through the design decisions.',
      choices: [
        {
          step: 'tool_design',
          question: 'The agent needs to read PR diffs. How should the tool be designed?',
          options: [
            { label: 'A specific get_pr_diff tool that takes a PR number and returns the diff', cost: 4, strength: 3, impact: +20, feedback: 'Specific, well-typed tools are easier for Claude to use correctly. The description tells it exactly when and how to invoke this tool.' },
            { label: 'A generic run_command tool that lets Claude execute any git command', cost: 2, strength: 1, impact: -5, feedback: 'Too broad. Claude might run destructive commands, and the tool is harder to monitor and secure. Specific tools are safer and more reliable.' },
            { label: 'No tools — just paste the diff into the prompt', cost: 0, strength: 2, impact: +5, feedback: 'This works for small PRs but fails for large diffs that exceed context limits. A tool-based approach scales better.' },
          ],
        },
        {
          step: 'error_handling',
          question: 'What happens when the GitHub API returns a 500 error?',
          options: [
            { label: 'Retry with exponential backoff (3 attempts), then return a clear error to Claude', cost: 5, strength: 3, impact: +20, feedback: 'Robust error handling. The retry logic handles transient failures, and the clear error message lets Claude adapt its approach or inform the user.' },
            { label: 'Crash the process and log the error', cost: 1, strength: 1, impact: -10, feedback: 'The agent dies on any API hiccup. In production, transient errors are common. Without retries, reliability will be poor.' },
            { label: 'Silently return empty results', cost: 1, strength: 1, impact: -5, feedback: 'Claude won\'t know the tool failed and may draw wrong conclusions from empty data. Always return explicit errors.' },
          ],
        },
      ],
    },
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q8_1',
          question: 'What is the core loop of an agent harness?',
          options: [
            'Prompt → Response → Display — one-shot, no loop',
            'Send message → Check for tool_use → Execute tool → Send result → Repeat until no tool_use',
            'Read code → Generate tests → Run tests — automated pipeline',
            'User input → API call → User review → Repeat',
          ],
          correct: 1,
          explanation: 'The agent harness loop is: send a message with tool definitions → check if Claude wants to use a tool → execute the tool → send the result back → repeat until Claude gives a final text response with no tool calls. This simple loop powers all agent behavior.',
        },
        {
          id: 'q8_2',
          question: 'Why are specific, well-typed tool schemas better than generic ones?',
          options: [
            'They use less API tokens',
            'They are easier for Claude to understand and use correctly, and safer to execute',
            'Claude only works with specific tools, not generic ones',
            'Specific tools are faster to execute',
          ],
          correct: 1,
          explanation: 'Specific tools with clear names, descriptions, and typed parameters give Claude unambiguous guidance on when and how to use each tool. A generic "run any command" tool is harder for Claude to use correctly and introduces security risks. Precision in tool design = reliability in agent behavior.',
        },
      ],
    },
    buildStep: {
      surface: 'cowork',
      surfaceLabel: 'Claude.ai Co-work + Claude Code',
      title: 'Design the onboard-agent tool schemas',
      instructions: [
        'In Claude.ai (within your "Onboard Agent" project), ask: "I need to define tool schemas for my onboard-agent. The agent needs tools to: read files, list directories, search for patterns in code, and get package.json dependencies. Draft the JSON tool schemas as an artifact."',
        'Use co-work to let Claude draft all four tool schemas with names, descriptions, and input_schema fields.',
        'Review and iterate: "Make the readFile tool accept an optional encoding parameter" or "Add a maxDepth parameter to listDirectory."',
        'Switch to Claude Code: "Create src/tools.js that exports all four tool definitions as an array, and src/tool-executor.js that implements each tool using Node.js fs and child_process."',
      ],
      expectedOutput: 'Four tool schemas drafted as a co-work artifact, then implemented as src/tools.js (definitions) and src/tool-executor.js (implementations) in your project.',
    },
  },

  9: {
    id: 9, levelId: 3,
    lastUpdated: '2026-03-15',
    title: 'Building Your First Harness',
    subtitle: 'From API call to working agent in one module',
    icon: '🔧',
    xpReward: 150,
    ariaScoreDelta: 15,
    estimatedMinutes: 18,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l9_1',
        heading: 'The Messages API.',
        body: 'The Claude API uses a messages format: you send an array of messages (system prompt + conversation history + user message), and Claude responds. Each response can contain text blocks AND tool_use blocks.',
        type: 'concept',
        keyPoints: [
          { text: 'POST to https://api.anthropic.com/v1/messages with model, max_tokens, system, messages, and tools.', explain: 'POST is a standard web request type for sending data to a server. You\'re sending your conversation history (messages), your setup instructions (system), which Claude model to use, the maximum response length (max_tokens), and the list of available tools. The server runs Claude and returns its response.' },
          { text: 'response.content is an array of blocks: text blocks and/or tool_use blocks.' },
          { text: 'Each tool_use block has an id, name (which tool), and input (the arguments Claude chose).' },
          { text: 'You execute the tool and send back a tool_result message with the matching id.' },
        ],
      },
      {
        id: 'l9_2',
        heading: 'Implementing the loop.',
        body: 'The harness loop in pseudocode: while response has tool_use blocks → for each tool_use → execute the tool → collect results → send all tool_results back → get next response. When there are no tool_use blocks, you are done.',
        type: 'concept',
        keyPoints: [
          { text: 'Keep the full conversation history. Claude needs to see previous tool calls and results for context.' },
          { text: 'Handle multiple tool calls in one response. Claude can request several tools at once.' },
          { text: 'Set a maximum iteration limit (e.g., 20 loops) to prevent runaway agents.' },
          { text: 'Log every tool call and result. This is your debugging lifeline.' },
        ],
      },
      {
        id: 'l9_3',
        heading: 'Error handling that matters.',
        body: 'Production agents need robust error handling. API rate limits, tool failures, malformed responses, and context overflow are all common. Plan for them from the start.',
        type: 'concept',
        keyPoints: [
          { text: 'Rate limiting: implement exponential backoff with jitter. The API returns 429 when you hit limits.', explain: 'Rate limiting is when the API says "you\'re sending too many requests, slow down" — it signals this with a 429 error code. Exponential backoff means waiting progressively longer between retries: 1 second, then 2, then 4, then 8. "Jitter" adds a small random amount to each wait so multiple clients don\'t all retry at the exact same moment and overwhelm the server again.' },
          { text: 'Tool failures: return clear error messages to Claude so it can adapt. Never swallow errors silently.' },
          { text: 'Context overflow: summarize earlier conversation turns when context gets too long.' },
          { text: 'Malformed output: parse JSON defensively. Claude occasionally wraps JSON in markdown code blocks.', explain: 'Sometimes Claude wraps JSON in triple backticks (```json ... ```) as if it\'s presenting it in a chat. Your code expects raw JSON and breaks. Parsing "defensively" means checking for this wrapper and stripping it before reading the data — handling the imperfection gracefully rather than crashing.' },
        ],
      },
      {
        id: 'l9_4',
        heading: 'Nexus builds a code review agent.',
        body: 'The team takes everything from this module and builds a code review agent: it receives a PR number, reads the diff via the GitHub API, reviews for security issues and style violations, and posts findings as PR comments. Total build time: 3 hours. It catches its first real security bug on day two.',
        type: 'narrative',
      },
    ],
    quiz: {
      xpBonus: 30,
      questions: [
        {
          id: 'q9_1',
          question: 'How does the Claude API signal that it wants to use a tool?',
          options: [
            'It includes the text "[TOOL_CALL]" in its response',
            'The response.content array contains a tool_use block with the tool name and input arguments',
            'It sends a separate HTTP request to your tool endpoint',
            'The response includes a special header',
          ],
          correct: 1,
          explanation: 'When Claude wants to use a tool, the response.content array contains a tool_use block with: an id (for matching the result), the tool name, and the input arguments Claude chose based on the schema. Your harness executes the tool and sends back a tool_result message.',
        },
        {
          id: 'q9_2',
          question: 'Why is it important to set a maximum iteration limit on the agent loop?',
          options: [
            'To save API costs',
            'Because Claude can only process 10 tool calls per conversation',
            'To prevent runaway agents that loop indefinitely due to unexpected tool results or circular reasoning',
            'It is not important — agents always terminate naturally',
          ],
          correct: 2,
          explanation: 'Without a max iteration limit, an agent could loop indefinitely if it repeatedly calls tools that return unexpected results, or if it gets stuck in circular reasoning. A limit (e.g., 20 iterations) is a safety net that prevents runaway costs and execution.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Implement the agent loop',
      instructions: [
        'In Claude Code, tell it: "Create src/agent.js that implements the full agent loop. It should: 1) send the system prompt + user message + tool definitions to the Claude API, 2) check for tool_use blocks in the response, 3) execute each tool using tool-executor.js, 4) send results back, 5) repeat until Claude gives a final text response. Include a maxIterations limit of 20."',
        'Ask Claude to add proper error handling: "Add exponential backoff for 429 rate limit errors, clear error messages for tool failures, and a cost tracker that logs input_tokens and output_tokens."',
        'Test it: "Create a test script that runs the agent on our own onboard-agent project — it should read the codebase and generate onboarding docs."',
        'Run the test: node test/run-agent.js ./ — the agent should autonomously explore your codebase and produce documentation.',
      ],
      expectedOutput: 'A working agent loop in src/agent.js that autonomously reads your codebase using tools, with error handling and cost tracking. Running it on the onboard-agent project itself should produce onboarding documentation.',
    },
  },

  10: {
    id: 10, levelId: 3,
    lastUpdated: '2026-03-15',
    title: 'Research Agents in Practice',
    subtitle: 'Search, synthesize, report — a worked example',
    icon: '🔬',
    xpReward: 125,
    ariaScoreDelta: 15,
    estimatedMinutes: 15,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l10_1',
        heading: 'This course eats its own cooking.',
        body: 'The content sweep agent that keeps this course up to date is itself a research agent built with the Claude API. It runs every Monday as a GitHub Action, searches the web via Exa.ai, synthesizes findings with Claude, and commits proposals to the repo. You can read the source code right now.',
        type: 'concept',
        keyPoints: [
          { text: 'The pattern: Search (Exa.ai) → Synthesize (Claude) → Structure (JSON proposals) → Report (Slack/GitHub).' },
          { text: 'Source code: github.com/splashjumanji/claude-mastery-academy/blob/main/scripts/content-sweep.mjs' },
          { text: 'Runs via GitHub Actions (free for public repos). No server infrastructure needed.' },
          { text: 'Uses Haiku for individual synthesis tasks (fast, cheap) and full Claude for the final gap report.' },
        ],
      },
      {
        id: 'l10_2',
        heading: 'Building a search-synthesize agent.',
        body: 'A research agent follows a predictable pattern: define search queries, execute searches in batches, collect results, synthesize them into a structured report, and output actionable recommendations.',
        type: 'concept',
        keyPoints: [
          { text: 'Define your search queries upfront. Domain-specific queries produce better results than generic ones.' },
          { text: 'Batch searches to avoid rate limits. 3 concurrent requests with 1-second pauses between batches.' },
          { text: 'Feed all results to Claude with a structured system prompt: "You are an analyst. Here are findings. Produce a gap report."' },
          { text: 'Use a second Claude call to extract specific action items from the report.' },
        ],
      },
      {
        id: 'l10_3',
        heading: 'Agent memory and state.',
        body: 'Agents that run repeatedly need memory. Without it, they rediscover the same insights and re-suggest the same changes every week. The content sweep solves this with editorial memory.',
        type: 'concept',
        keyPoints: [
          { text: 'Store previous decisions (applied, rejected proposals) in a JSON file committed to the repo.' },
          { text: 'On each run, load the memory file and include it in the prompt: "Do not re-suggest these items."' },
          { text: 'This prevents repetition and lets the agent learn from your editorial decisions over time.' },
          { text: 'Simple but effective. No vector database needed. Just a JSON file and a well-crafted prompt.' },
        ],
      },
    ],
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q10_1',
          question: 'What is the core pattern of a research agent?',
          options: [
            'Crawl the entire web → index everything → answer any question',
            'Search → Synthesize → Structure → Report — using targeted queries and LLM synthesis',
            'Train a custom model on your domain → deploy it',
            'Use a single large prompt with all possible information included',
          ],
          correct: 1,
          explanation: 'A research agent uses targeted search queries to gather specific information, then uses an LLM (Claude) to synthesize findings into structured insights. It does not try to index everything — it asks specific questions and synthesizes the answers.',
        },
        {
          id: 'q10_2',
          question: 'How does the content sweep agent prevent suggesting the same changes every week?',
          options: [
            'It uses a vector database to track semantic similarity of past suggestions',
            'It stores previous editorial decisions in a JSON file and includes them in the prompt as "do not re-suggest" context',
            'It uses a different LLM model each week',
            'It randomizes search queries to get different results',
          ],
          correct: 1,
          explanation: 'The agent maintains editorial memory in a simple JSON file: applied changes, rejected proposals, and their reasons. This file is loaded into the prompt context each run, telling Claude what has already been decided. Simple but effective state management.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Add web search for framework docs',
      instructions: [
        'In Claude Code: "Add a new tool called searchDocs that uses the web_search server tool to find official documentation for any framework the agent encounters in the codebase. For example, if it sees React imports, it should be able to search for relevant React docs."',
        'Tell Claude: "Update src/agent.js to add a second pass: after generating the initial onboarding doc, the agent searches for official docs for each major dependency and adds a Resources section with links."',
        'Add agent memory: "Create src/memory.js that saves previous runs to .onboard-agent/memory.json. On subsequent runs, it should skip files it has already analyzed and only re-analyze changed files (use git diff)."',
        'Test the full flow on a different repo you have locally.',
      ],
      expectedOutput: 'Web search integrated for enriching docs with framework links. Agent memory prevents redundant analysis on repeat runs. Working end-to-end on real codebases.',
    },
  },

  // ── LEVEL 4: ADVANCED PATTERNS ──────────────────────────────

  11: {
    id: 11, levelId: 4,
    lastUpdated: '2026-03-15',
    title: 'Multi-Agent Systems',
    subtitle: 'Orchestrating multiple Claude instances',
    icon: '🌐',
    xpReward: 150,
    ariaScoreDelta: 15,
    estimatedMinutes: 15,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l11_1',
        heading: 'When one agent is not enough.',
        body: 'Some tasks are too complex or too broad for a single agent. Multi-agent systems decompose work across specialized Claude instances. Claude Code has this built in with sub-agents — and you can build the same patterns with the API.',
        type: 'concept',
        keyPoints: [
          { text: 'Claude Code has built-in sub-agents: Explore (Haiku, read-only, fast codebase search), Plan (read-only analysis), General (full tools).' },
          { text: 'Create custom sub-agents via /agents — define scope (user/project), model, tools, and instructions.' },
          { text: 'Run sub-agents in foreground (blocking) or background (concurrent — press Ctrl+B to background a running task).' },
          { text: 'Common patterns: isolate high-volume ops, parallel research across modules, chain agents (reviewer → optimizer).' },
          { text: 'The Agent SDK (platform.claude.com) provides a framework for building production multi-agent systems with the API.' },
        ],
      },
      {
        id: 'l11_2',
        heading: 'The fan-out pattern.',
        body: 'A supervisor agent receives a complex task, breaks it into sub-tasks, spawns multiple worker agents in parallel, collects their outputs, and synthesizes a final result. Claude Code does this natively: "Research the auth, database, and API modules in parallel using separate subagents."',
        type: 'concept',
        keyPoints: [
          { text: 'In Claude Code: just ask for parallel research. Claude spawns sub-agents automatically.' },
          { text: 'With the API: your harness spawns concurrent API calls, each with a focused system prompt.' },
          { text: 'Supervisor collects worker outputs and synthesizes the final deliverable.' },
          { text: 'Use /btw for quick side questions without polluting the main conversation context.' },
        ],
      },
      {
        id: 'l11_3',
        heading: 'At Nexus: the deployment pipeline.',
        body: 'Nexus builds a multi-agent deployment system: Agent 1 reviews the code changes. Agent 2 generates a changelog. Agent 3 runs smoke tests. A supervisor agent collects results and posts a deployment summary to Slack with a go/no-go recommendation. The team deploys 4x more frequently with higher confidence.',
        type: 'narrative',
      },
    ],
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q11_1',
          question: 'What is the fan-out pattern in multi-agent systems?',
          options: [
            'Running the same task on multiple models to compare outputs',
            'A supervisor decomposes a task into sub-tasks and delegates them to worker agents in parallel',
            'Sending the same prompt to Claude multiple times and averaging the results',
            'A technique for distributing API calls across multiple API keys',
          ],
          correct: 1,
          explanation: 'The fan-out pattern uses a supervisor agent to decompose a complex task, then delegates sub-tasks to specialized worker agents that run in parallel. The supervisor collects and synthesizes their outputs into a final result.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Add sub-agents for parallel analysis',
      instructions: [
        'In Claude Code: "Refactor the agent to use a fan-out pattern. Create three specialized sub-agent prompts: 1) ArchitectureAgent that maps the directory structure and entry points, 2) DependencyAgent that analyzes package.json and import graphs, 3) SetupAgent that identifies build commands, env variables, and getting-started steps."',
        'Tell Claude: "Update src/agent.js to run all three sub-agents concurrently using Promise.all, then pass all their outputs to a Synthesizer agent that combines them into the final onboarding document."',
        'Test parallel execution: "Add timing logs to compare sequential vs parallel. The parallel version should be 2-3x faster."',
        'Create a custom sub-agent: ask Claude to "Create a sub-agent definition at .claude/agents/doc-reviewer.md that reviews generated documentation for accuracy and completeness."',
      ],
      expectedOutput: 'Three parallel sub-agents (architecture, dependencies, setup) with a synthesizer. Measurably faster than sequential. Custom doc-reviewer agent definition.',
    },
  },

  12: {
    id: 12, levelId: 4,
    lastUpdated: '2026-03-15',
    title: 'Evaluation and Quality',
    subtitle: 'Testing agents, benchmarking quality, and setting guardrails',
    icon: '📊',
    xpReward: 125,
    ariaScoreDelta: 10,
    estimatedMinutes: 12,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l12_1',
        heading: 'You cannot improve what you cannot measure.',
        body: 'Agent outputs are non-deterministic. The same input can produce different outputs each time. This makes traditional testing insufficient. You need evaluation frameworks designed for LLM systems.',
        type: 'concept',
        keyPoints: [
          { text: 'LLM-as-judge: use a separate Claude call to grade agent outputs against a rubric. Scalable and consistent.' },
          { text: 'Test cases: build a suite of 20-50 representative inputs with expected outputs or quality criteria.' },
          { text: 'Metrics: pass rate, quality score (1-5), cost per task, latency, failure rate.' },
          { text: 'Run evals on every prompt change. Treat system prompts like code — version and test them.' },
        ],
      },
      {
        id: 'l12_2',
        heading: 'Cost tracking and optimization.',
        body: 'Every API response includes input_tokens and output_tokens counts. Track these religiously. Know what each agent task costs. Optimize the expensive ones.',
        type: 'concept',
        keyPoints: [
          { text: 'Log token counts from every API response: input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens.' },
          { text: 'Prompt caching pricing: cache writes cost 1.25x base input price. Cache reads cost 0.1x — that is a 90% saving on repeated context.', explain: 'If you send the same large instructions with every API call, caching stores them once on Anthropic\'s servers. The first storage costs a little more (1.25x), but every time you reuse it costs only 1/10 of normal (0.1x). For an agent that runs hundreds of times with the same system prompt, this adds up to enormous savings.' },
          { text: 'Cache has a 5-minute default TTL (refreshed on each use). Optional 1-hour TTL available at 2x base price.', explain: 'TTL stands for "time to live" — how long the cached version is kept before it expires. The default is 5 minutes, which resets every time it\'s used. If your agent runs less frequently, you can pay a bit more (2x) to keep the cache alive for a full hour before it needs to be rewritten.' },
          { text: 'Batch API: for non-time-sensitive workloads, get 50% cost reduction. Pass up to 100,000 requests per batch.' },
          { text: 'Use Haiku for high-volume, simpler tasks. Reserve Sonnet/Opus for complex reasoning. This alone can cut costs 5-10x.' },
        ],
      },
      {
        id: 'l12_3',
        heading: 'Guardrails.',
        body: 'Production agents need boundaries. Guardrails prevent agents from taking dangerous actions, generating inappropriate content, or exceeding cost budgets.',
        type: 'concept',
        keyPoints: [
          { text: 'Input validation: sanitize and validate all tool inputs before execution.' },
          { text: 'Output filtering: check agent responses against content policies before surfacing to users.' },
          { text: 'Cost limits: set per-task and per-day spending caps. Kill the agent if it exceeds them.' },
          { text: 'Human-in-the-loop: require human approval for high-stakes actions (deploys, data mutations, external communications).' },
        ],
      },
    ],
    quiz: {
      xpBonus: 25,
      questions: [
        {
          id: 'q12_1',
          question: 'What is the LLM-as-judge evaluation technique?',
          options: [
            'Using Claude to rewrite your test suite',
            'Using a separate Claude call to grade agent outputs against a predefined rubric',
            'Having Claude judge between competing AI models',
            'Using Claude to generate evaluation metrics',
          ],
          correct: 1,
          explanation: 'LLM-as-judge uses a separate Claude call (with a grading rubric) to evaluate agent outputs. This is scalable and more consistent than human evaluation for routine quality checks. Run it on 20-50 test cases to get a reliable quality score.',
        },
        {
          id: 'q12_2',
          question: 'Why should you treat system prompts like code?',
          options: [
            'Because they need to be compiled before use',
            'Because they should be version-controlled and tested with every change',
            'Because they use a special programming syntax',
            'Because they are stored in source files',
          ],
          correct: 1,
          explanation: 'System prompts directly control agent behavior. A small change can dramatically affect outputs (for better or worse). Version-controlling prompts and running evals on every change prevents regressions, just like running tests on code changes.',
        },
      ],
    },
    buildStep: {
      surface: 'cowork',
      surfaceLabel: 'Claude.ai Co-work + Claude Code',
      title: 'Build an eval suite',
      instructions: [
        'In Claude.ai co-work mode: "Create a grading rubric artifact for evaluating onboard-agent output quality. Score on: completeness (covers all key files), accuracy (correct descriptions), structure (clear sections and hierarchy), actionability (new engineer can follow it), and conciseness (no filler)."',
        'In Claude Code: "Create test/eval.js that: 1) runs the agent on 5 test repos (you can use public GitHub repos or create small test fixtures), 2) sends each output to Claude with the grading rubric, 3) collects scores (1-5 per dimension), and 4) prints a summary table with pass/fail per test case."',
        'Run the eval: node test/eval.js — check which dimensions need improvement.',
        'Iterate: "Based on the eval results, update the system prompt in src/prompts.js to improve the weakest scoring dimension. Then re-run evals."',
      ],
      expectedOutput: 'A grading rubric (co-work artifact) and eval harness (test/eval.js) using LLM-as-judge. Agent output scored on 5 dimensions across multiple test repos.',
    },
  },

  13: {
    id: 13, levelId: 4,
    lastUpdated: '2026-03-15',
    title: 'Scaling to Production',
    subtitle: 'Deployment, monitoring, and the road ahead',
    icon: '🚀',
    xpReward: 150,
    ariaScoreDelta: 15,
    estimatedMinutes: 12,
    type: 'micro_lesson_quiz',
    lessons: [
      {
        id: 'l13_1',
        heading: 'Production is a different game.',
        body: 'An agent that works in development can fail in production for reasons you never anticipated: rate limits, latency spikes, unexpected user inputs, API changes, and cost overruns. Production readiness means planning for all of these.',
        type: 'concept',
        keyPoints: [
          { text: 'Rate limiting: implement queuing and backoff. The API returns 429 with retry-after headers when you hit limits.' },
          { text: 'Prompt caching: add cache_control: {"type": "ephemeral"} to cache system prompts and tools. 0.1x read cost after initial write.', explain: 'This small JSON snippet attached to your instructions tells the API to store them server-side after the first call. Every subsequent call gets a 90% discount on those tokens. "Ephemeral" means it\'s short-lived (5 minutes by default) rather than permanent — you\'re caching for the current burst of activity, not forever.' },
          { text: 'Batch API: for non-time-sensitive workloads — 50% cost reduction, up to 100K requests per batch, results within 24 hours.' },
          { text: 'Monitoring: log every agent run (inputs, outputs, tool calls, duration, cost, success/failure).' },
          { text: 'Streaming: required when max_tokens > 21,333. Use .stream() with .get_final_message() for simple integration.', explain: 'Normally the API waits until Claude finishes writing before sending back anything. Streaming sends words as they\'re generated — like a live transcript. It\'s required for very long responses because otherwise the connection would time out. .stream() and .get_final_message() are SDK helper methods that handle the streaming plumbing for you.' },
        ],
      },
      {
        id: 'l13_2',
        heading: 'The deployment checklist.',
        body: 'Before any agent goes to production at Nexus, it passes this checklist.',
        type: 'concept',
        keyPoints: [
          { text: '✅ Eval suite with 20+ test cases passing at >85% quality score.' },
          { text: '✅ Error handling: retries with backoff, graceful degradation, clear error messages.' },
          { text: '✅ Cost tracking: per-task cost logged, daily budget cap enforced.' },
          { text: '✅ Guardrails: input validation, output filtering, human-in-the-loop for high-stakes actions.' },
          { text: '✅ Monitoring: structured logs for every run, alerting on failure rate spikes.' },
          { text: '✅ Prompt versioning: system prompts stored in version control, eval runs on every change.' },
        ],
      },
      {
        id: 'l13_3',
        heading: 'Where it is all heading.',
        body: 'The Claude ecosystem evolves fast. New models, new capabilities, and new patterns emerge regularly. Staying current is itself a skill. The weekly content sweep that keeps this course updated is your built-in signal.',
        type: 'concept',
        keyPoints: [
          { text: 'Computer use: Claude can control a screen — click, type, navigate. Opens up entirely new agent types.' },
          { text: 'Hooks: 15+ lifecycle events (PreToolUse, PostToolUse, SessionStart, etc.) let you intercept and extend Claude Code behavior with scripts.', explain: 'Hooks are trigger points in Claude Code\'s execution where your own scripts can run. PreToolUse fires just before Claude uses a tool — you could log it, inspect it, or block it. PostToolUse fires after. SessionStart fires when Claude Code opens. This gives you fine-grained control over what Claude does without modifying Claude itself.' },
          { text: 'Agent SDK: Anthropic\'s official framework for building production agent harnesses with built-in patterns.' },
          { text: 'Sub-agents: built-in Claude Code support for parallel work, custom agent types, foreground/background execution.' },
          { text: 'Model improvements: each new Claude version brings better reasoning, tool use, and cost efficiency.' },
        ],
      },
      {
        id: 'l13_4',
        heading: 'Nexus, transformed.',
        body: 'Six months in. Nexus ships 3x faster. PR cycle time is down from 3 days to 6 hours. New engineers are productive in 5 days instead of 4 weeks. Three production agents run reliably: code review, content sweep, and customer triage. The CTO presents the "Nexus playbook" as a model for the whole company. Your Velocity Score tells the story.',
        type: 'narrative',
      },
    ],
    quiz: {
      xpBonus: 30,
      questions: [
        {
          id: 'q13_1',
          question: 'What is prompt caching, and why does it matter for production agents?',
          options: [
            'Storing Claude\'s responses for repeated queries',
            'Caching the system prompt and tool definitions across API calls to save up to 90% on input token costs',
            'A technique for making prompts shorter',
            'Storing prompts in a database for version control',
          ],
          correct: 1,
          explanation: 'Prompt caching lets you cache large, static parts of your API request (system prompts, tool definitions) so they are not re-processed on every call. For agents that make many calls with the same system prompt, this can reduce input token costs by up to 90%.',
        },
        {
          id: 'q13_2',
          question: 'What should happen before any agent goes to production?',
          options: [
            'Just test it manually a few times and deploy',
            'Pass a comprehensive checklist: eval suite, error handling, cost tracking, guardrails, monitoring, and prompt versioning',
            'Get approval from Anthropic',
            'Register the agent in a global agent registry',
          ],
          correct: 1,
          explanation: 'Production agents need: an eval suite (20+ test cases), robust error handling, cost tracking and budget caps, guardrails (input validation, output filtering), monitoring and alerting, and version-controlled system prompts with evals on every change.',
        },
      ],
    },
    buildStep: {
      surface: 'code',
      surfaceLabel: 'Claude Code',
      title: 'Ship it — caching, npm publish, docs',
      instructions: [
        'In Claude Code: "Add prompt caching to src/agent.js. Add cache_control: {type: \"ephemeral\"} to the system prompt and tool definitions so they are cached across tool loop iterations. Log cache_read_input_tokens to measure savings."',
        'Add a cost summary: "After each run, print a report: total input tokens, output tokens, cached tokens, estimated cost in USD, and run duration."',
        'Prepare for publishing: "Update package.json with a proper description, keywords, bin entry pointing to src/index.js, and a #!/usr/bin/env node shebang. Create a comprehensive README.md with installation, usage examples, configuration, and architecture overview."',
        'Final commit: "Create a polished commit with all production readiness changes. Tag it as v1.0.0."',
        'Optional: publish to npm with npm publish, or push to GitHub and share with your team.',
      ],
      expectedOutput: 'Prompt caching reducing costs by ~90% on repeated calls. A cost report after each run. A polished, publishable npm package with README and v1.0.0 tag. Your onboard-agent is complete.',
    },
  },

}

export function getModulesForLevel(levelId) {
  return LEVELS.find(l => l.id === levelId)?.modules.map(id => MODULES[id]) || []
}

export function getModuleById(id) {
  return MODULES[id] || null
}
