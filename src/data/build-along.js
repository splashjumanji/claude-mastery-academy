// Build-along steps for each module
// Each module guides learners through building "onboard-agent" — a CLI tool
// that reads codebases and generates onboarding docs for new engineers.

export const BUILD_ALONG_STEPS = {
  1: {
    concept: 'Brainstorm your project with Claude.ai',
    steps: [
      { title: 'Start a conversation', detail: 'Open claude.ai and describe the onboard-agent concept: a CLI tool that reads codebases and generates onboarding docs for new engineers. Ask Claude to brainstorm features, constraints, and architecture.' },
      { title: 'Explore the surfaces', detail: 'Ask Claude: "What are the differences between Claude.ai, Claude Code, and the Claude API? Which should I use for building a CLI tool?" See how it maps the three surfaces.' },
      { title: 'Save your ideas', detail: 'By the end of the conversation you should have a feature list, target audience, and technical approach. Save this — you\'ll use it in the next module.' },
    ],
    ctaLabel: 'Open Claude.ai',
    ctaUrl: 'https://claude.ai',
  },

  2: {
    concept: 'Draft a product spec using Projects and co-work mode',
    steps: [
      { title: 'Create a Project', detail: 'In Claude.ai, create a Project called "Onboard Agent". Add custom instructions: "You are helping me build a CLI tool called onboard-agent that reads codebases and generates onboarding docs for new engineers."' },
      { title: 'Use co-work mode', detail: 'Ask Claude to write a product spec as an artifact. Switch to co-work and let it draft goals, user stories, architecture, and technical requirements autonomously.' },
      { title: 'Iterate on the artifact', detail: 'Review the spec artifact. Ask Claude to refine it: add architecture diagrams, clarify technical constraints, or add edge cases. Export the final version as markdown.' },
    ],
    ctaLabel: 'Open Claude.ai',
    ctaUrl: 'https://claude.ai',
  },

  3: {
    concept: 'Scaffold the project in Claude Code',
    surfaces: {
      terminal: {
        steps: [
          { title: 'Install Claude Code', detail: 'Run: npm install -g @anthropic-ai/claude-code (requires Node.js 18+). The terminal confirms when it\'s done. You only need to do this once.', note: 'First, check if Node.js is installed by typing: node --version. If you get an error, download Node.js from nodejs.org (click the LTS version — it\'s a standard installer). After installing, close and reopen your terminal, then try the npm command again.' },
          { title: 'Create and enter your project', detail: 'Run: mkdir onboard-agent && cd onboard-agent — this creates a new folder called onboard-agent and moves you into it. Then run: claude to launch Claude Code. It reads your (empty) folder and waits.', note: 'To open a terminal: on Mac, press Cmd+Space and type "Terminal". On Windows, press the Start button and type "cmd". You\'ll see a text prompt. Type the commands exactly as shown and press Enter after each one.' },
          { title: 'Ask Claude to scaffold', detail: 'Type: "Initialise a Node.js CLI project with package.json, src/index.js, README.md, and CLAUDE.md." Claude proposes each file — review the contents and approve them one by one.' },
          { title: 'Make your first commit', detail: 'Run: git init && git add -A && git commit -m "Initial scaffold" — this initialises git version control, stages all files, and saves your first snapshot. You now have a tracked project.', note: 'Git is a tool that tracks every change you make to your code over time. Think of it like a permanent undo history. "init" starts tracking, "add" selects the files to save, and "commit" takes the snapshot with a description.' },
        ],
        ctaLabel: 'Install Claude Code',
        ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
      },
      app: {
        steps: [
          { title: 'Get Claude Code', detail: 'Download the Claude desktop app from claude.ai/download, or open claude.ai/code in your browser. Sign in with your Anthropic account. No terminal needed.' },
          { title: 'Open your project folder', detail: 'In the desktop app use File → Open Project Folder and create a new folder called onboard-agent. In the browser, start a new Claude Code session.' },
          { title: 'Ask Claude to scaffold', detail: 'Type: "Initialise a Node.js CLI project with package.json, src/index.js, README.md, and CLAUDE.md." Files appear in the panel on the right — click each one to review, then accept.' },
          { title: 'Save your work', detail: 'Click Accept on each file diff to write them to disk. Your project structure is created. Want to go further? This is a good moment to try the terminal path — it\'s only four commands.' },
        ],
        ctaLabel: 'Get Claude Desktop',
        ctaUrl: 'https://claude.ai/download',
      },
    },
  },

  4: {
    concept: 'Write a detailed CLAUDE.md for your project',
    surfaces: {
      terminal: {
        steps: [
          { title: 'Auto-generate with /init', detail: 'In Claude Code, type /init — Claude reads your project files and drafts a CLAUDE.md automatically. This is the fastest way to get a solid starting point.', note: 'In Claude Code, commands starting with / are special instructions to Claude itself (not things you\'re asking it to build). /init is telling Claude Code: "read this project and create a setup file for yourself."' },
          { title: 'Refine the conventions', detail: 'Open CLAUDE.md in your editor and customise it: add your tech stack, naming rules ("use named exports", "no semicolons"), and testing approach. Be specific — Claude follows precise rules well.', note: 'Any text editor works: VS Code, Notepad, TextEdit. CLAUDE.md is just a plain text file with some simple formatting. You\'re writing instructions for Claude, not code — plain sentences are fine.' },
          { title: 'Organise rule files', detail: 'Create .claude/rules/testing.md (you can do this with Claude Code: "Create a rules file for testing conventions"). Add: collocate tests, use vitest, prefer integration tests.' },
          { title: 'Check what Claude has learned', detail: 'Type /memory in Claude Code. It shows preferences it has picked up from your corrections — things like preferred indentation or variable naming. Review and clean up anything wrong.' },
        ],
        ctaLabel: 'CLAUDE.md docs',
        ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/memory',
      },
      app: {
        steps: [
          { title: 'Auto-generate with /init', detail: 'In the Claude Code conversation, type /init — Claude reads your project and drafts a CLAUDE.md. It appears in the file panel on the right for you to review.' },
          { title: 'Edit in the panel', detail: 'Click CLAUDE.md in the file panel to open it. Edit directly: add your tech stack, naming conventions, and rules. The same file Claude reads at the start of every session.' },
          { title: 'Add rule files', detail: 'Click New File in the panel and create .claude/rules/testing.md. Add testing rules: collocate tests, use vitest, prefer integration tests. Claude loads these files automatically when relevant.' },
          { title: 'Check learned preferences', detail: 'Type /memory in the conversation. Claude shows a summary of preferences it has learned. This is one of those moments where trying a terminal command (/memory) is worth it — it\'s just two keystrokes.' },
        ],
        ctaLabel: 'CLAUDE.md docs',
        ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/memory',
      },
    },
  },

  5: {
    concept: 'Design and implement the system prompt',
    surfaces: {
      terminal: {
        steps: [
          { title: 'Design in Claude.ai', detail: 'In your Onboard Agent project on Claude.ai, ask Claude to help design the system prompt. Describe the agent\'s job, desired output format, and constraints. Iterate until it feels right.' },
          { title: 'Implement in Claude Code', detail: 'In your terminal, run: claude to launch Claude Code in your project. Ask it to create src/prompts.js with a getSystemPrompt() function. Paste your designed prompt in.' },
          { title: 'Add model config', detail: 'Ask Claude Code to create src/config.js that exports the model name ("claude-sonnet-4-5") and any API settings. Keeping config separate makes it easy to switch models later.' },
          { title: 'Test with extended thinking', detail: 'Ask Claude to run the prompt on a sample codebase with extended thinking enabled. Compare output quality to a standard run — you\'ll see a meaningful difference on complex inputs.' },
        ],
        ctaLabel: 'Prompt engineering guide',
        ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      },
      app: {
        steps: [
          { title: 'Design in Claude.ai co-work', detail: 'In your Onboard Agent project, switch to co-work mode and ask Claude to draft the system prompt as an artifact. Iterate: "make it more concise", "add a constraint about output length."' },
          { title: 'Implement via Claude Code', detail: 'In Claude Code (desktop or browser), ask Claude to create src/prompts.js with a getSystemPrompt() function containing your prompt. The file appears in the panel for review.' },
          { title: 'Add model config', detail: 'Ask Claude to create src/config.js for model settings. You\'ll see the file diff in the panel — review it before accepting. The habit of reviewing every change matters.' },
          { title: 'Test thinking modes', detail: 'In your Claude.ai project, enable extended thinking and test your prompt on a sample codebase description. You\'ll see a "Thinking…" indicator while Claude works through the problem internally.' },
        ],
        ctaLabel: 'Prompt engineering guide',
        ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      },
    },
  },

  6: {
    concept: 'Add MCP servers and a custom skill',
    surfaces: {
      terminal: {
        steps: [
          { title: 'Install the filesystem MCP', detail: 'Run: claude mcp add filesystem -- npx -y @anthropic-ai/mcp-filesystem ~/onboard-agent — this tells Claude Code about an MCP server that can read and write files. Claude immediately gains access to your project directory.', note: 'Replace ~/onboard-agent with the actual path to your project folder. On Mac, ~ is your home folder (e.g. /Users/yourname). Type: echo ~ in your terminal to see it. On Windows, use the full path like C:\\Users\\yourname\\onboard-agent.' },
          { title: 'Create a skill', detail: 'Ask Claude Code to create .claude/skills/analyze-repo/SKILL.md with a name, description, and instructions for analysing a codebase structure. Claude discovers and uses skills automatically.' },
          { title: 'Build the scanner', detail: 'Ask Claude Code to implement src/scanner.js — a module that walks a directory tree and returns structured file summaries. It will use the MCP filesystem access you just configured.' },
        ],
        ctaLabel: 'Browse MCP servers',
        ctaUrl: 'https://github.com/modelcontextprotocol/servers',
      },
      app: {
        steps: [
          { title: 'Add the filesystem MCP', detail: 'In the Claude desktop app, go to Settings → MCP Servers → Add Server. Find the filesystem server in the list and configure it to access your onboard-agent folder. No terminal needed.' },
          { title: 'Create a skill via the panel', detail: 'In Claude Code, ask Claude to create .claude/skills/analyze-repo/SKILL.md with instructions for analysing a codebase. The file appears in the panel — add a name and description in the frontmatter at the top.' },
          { title: 'Build the scanner', detail: 'Ask Claude to implement src/scanner.js. With the MCP filesystem server connected, Claude can read and propose changes to your files through the interface — review and accept each change.' },
        ],
        ctaLabel: 'Browse MCP servers',
        ctaUrl: 'https://github.com/modelcontextprotocol/servers',
      },
    },
  },

  7: {
    concept: 'Add automation with headless mode',
    surfaces: {
      terminal: {
        steps: [
          { title: 'Create a headless script', detail: 'Create scripts/check-docs.sh and add: claude -p "Analyse src/ and list files missing JSDoc comments" --output-format json. Run it with: bash scripts/check-docs.sh — Claude runs silently and returns structured JSON.', note: 'A .sh file is a shell script — a plain text file full of commands. You can create it by asking Claude Code: "Create scripts/check-docs.sh with a headless claude command that checks documentation coverage." Then run it with: bash scripts/check-docs.sh' },
          { title: 'Add a pre-commit hook', detail: 'Create .git/hooks/pre-commit (ask Claude Code to do this for you) and have it run your doc coverage script. Now every time you commit code, Claude silently checks documentation coverage first.', note: 'Ask Claude Code: "Create a pre-commit git hook that runs our documentation coverage check." It will create the file in the right place and make it executable. You don\'t need to understand the details — just run it, then try making a commit to see it in action.' },
          { title: 'Let Claude handle git', detail: 'Ask Claude Code to stage, review, and commit all your Level 201 work with descriptive messages. Watch how it reads the diffs and writes commit messages that actually explain the changes.' },
        ],
        ctaLabel: 'Claude Code automation',
        ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
      },
      app: {
        steps: [
          { title: 'Understand headless mode', detail: 'Headless automation is where the terminal path gets powerful. In Claude Code (desktop or browser), ask Claude: "Show me what a headless script that checks documentation coverage would look like." Read through it — this is the code you\'d run from a terminal or CI system.' },
          { title: 'Practice the git workflow', detail: 'In Claude Code, ask Claude to review your recent changes and suggest a commit message. Accept the commit through the UI. This is the same workflow, just without the command line.' },
          { title: 'Consider the terminal', detail: 'This module is a good moment to try one terminal command: open Terminal (Mac) or Command Prompt (Windows), navigate to your project folder, and run: claude -p "List the files in this folder." If it works, you\'re ready for the full terminal path.' },
        ],
        ctaLabel: 'Claude Code automation',
        ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
      },
    },
  },

  8: {
    concept: 'Design tool schemas for the onboard-agent',
    steps: [
      { title: 'Draft in co-work', detail: 'In your Claude.ai Project, use co-work mode to draft JSON tool schemas for: readFile, listDirectory, searchCode, and getDependencies.' },
      { title: 'Implement in code', detail: 'In Claude Code, create src/tools.js (schema definitions) and src/tool-executor.js (Node.js implementations for each tool).' },
      { title: 'Try server tools', detail: 'Learn about server tools like web_search and web_fetch that require zero implementation — you\'ll use these in Module 10.' },
    ],
    ctaLabel: 'Tool use docs',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview',
  },

  9: {
    concept: 'Implement the full agent loop',
    steps: [
      { title: 'Build the agent loop', detail: 'Create src/agent.js: send system prompt + tools → check for tool_use blocks → execute tools → send results back → repeat until done. Include a 20-iteration safety limit.' },
      { title: 'Add error handling', detail: 'Add exponential backoff for rate limits, clear error messages for tool failures, and a cost tracker for input/output tokens.' },
      { title: 'Test it live', detail: 'Create a test script and run it on your own project. The agent should autonomously explore your codebase and generate onboarding documentation.' },
    ],
    ctaLabel: 'API quickstart',
    ctaUrl: 'https://docs.anthropic.com/en/docs/quickstart',
  },

  10: {
    concept: 'Add web search and agent memory',
    steps: [
      { title: 'Web search', detail: 'Add a searchDocs tool using the web_search server tool. The agent enriches onboarding docs with links to official framework documentation.' },
      { title: 'Agent memory', detail: 'Create src/memory.js that saves previous runs to .onboard-agent/memory.json. On repeat runs, only re-analyse changed files (using git diff).' },
      { title: 'Cross-repo testing', detail: 'Test the full agent on a different local repo. It should work on any codebase, not just onboard-agent.' },
    ],
    ctaLabel: 'API reference',
    ctaUrl: 'https://docs.anthropic.com/en/api/getting-started',
  },

  11: {
    concept: 'Add parallel sub-agents for faster analysis',
    steps: [
      { title: 'Fan-out pattern', detail: 'Refactor to use 3 parallel sub-agents: ArchitectureAgent, DependencyAgent, SetupAgent. A Synthesizer combines their outputs.' },
      { title: 'Measure the speedup', detail: 'Add timing logs. The parallel version should be 2–3× faster than sequential. Compare total API costs.' },
      { title: 'Custom sub-agent', detail: 'Create a custom sub-agent at .claude/agents/doc-reviewer.md that reviews generated documentation for accuracy.' },
    ],
    ctaLabel: 'Agent patterns',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tools',
  },

  12: {
    concept: 'Build an eval suite with LLM-as-judge',
    steps: [
      { title: 'Grading rubric', detail: 'In Claude.ai co-work, draft a rubric scoring: completeness, accuracy, structure, actionability, and conciseness (1–5 each).' },
      { title: 'Eval harness', detail: 'Build test/eval.js: run the agent on 5 test repos, grade each output with Claude against the rubric, print a summary table.' },
      { title: 'Iterate on quality', detail: 'Use eval results to improve your system prompt. Re-run evals to verify improvements. Treat prompts like code.' },
    ],
    ctaLabel: 'Evaluation best practices',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  13: {
    concept: 'Ship to production — caching, publishing, and the road ahead',
    steps: [
      { title: 'Prompt caching', detail: 'Add cache_control: {"type": "ephemeral"} to system prompts and tools. Log cache_read_input_tokens to measure ~90% cost savings.' },
      { title: 'Cost report', detail: 'After each run, print: total tokens, cached tokens, estimated USD cost, and duration. Know exactly what the agent costs.' },
      { title: 'Publish', detail: 'Polish package.json, README.md, and tag v1.0.0. Optionally publish to npm or push to GitHub. Your onboard-agent is complete.' },
    ],
    ctaLabel: 'Full API reference',
    ctaUrl: 'https://docs.anthropic.com/en/api/getting-started',
  },
}

export function getBuildAlong(moduleId) {
  return BUILD_ALONG_STEPS[moduleId] || null
}
