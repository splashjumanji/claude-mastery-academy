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
    steps: [
      { title: 'Install Claude Code', detail: 'Run: npm install -g @anthropic-ai/claude-code — or follow the docs link below for your platform.' },
      { title: 'Scaffold the project', detail: 'Run: mkdir onboard-agent && cd onboard-agent && claude — then ask Claude to initialise a Node.js CLI project with package.json, src/index.js, README.md, and CLAUDE.md.' },
      { title: 'Make your first commit', detail: 'Review the proposed file diffs, approve them, then: git init && git add -A && git commit -m "Initial scaffold". You now have a real project.' },
    ],
    ctaLabel: 'Install Claude Code',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },

  4: {
    concept: 'Write a detailed CLAUDE.md for your project',
    steps: [
      { title: 'Auto-generate', detail: 'Run /init in Claude Code to bootstrap a CLAUDE.md. Claude reads your project and drafts one automatically.' },
      { title: 'Refine conventions', detail: 'Add specific rules: ES modules, 2-space indent, no semicolons, descriptive function names. Use @imports to reference your product spec.' },
      { title: 'Organise rules', detail: 'Create .claude/rules/testing.md with testing conventions: collocate tests, use vitest, prefer integration tests. Check /memory for auto-learned preferences.' },
    ],
    ctaLabel: 'CLAUDE.md docs',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/memory',
  },

  5: {
    concept: 'Design and implement the system prompt',
    steps: [
      { title: 'Design in Claude.ai', detail: 'In your Onboard Agent project, design the system prompt. Ask Claude to help you iterate on tone, output structure, and constraints for the onboarding documentation agent.' },
      { title: 'Implement in Claude Code', detail: 'Create src/prompts.js that exports a getSystemPrompt() function. Paste the prompt you designed in Claude.ai. Add src/config.js for model selection.' },
      { title: 'Test extended thinking', detail: 'Try your prompt with extended thinking enabled. Compare the output quality on a complex codebase vs. standard mode.' },
    ],
    ctaLabel: 'Prompt engineering guide',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  6: {
    concept: 'Add MCP servers and a custom skill',
    steps: [
      { title: 'Install MCP', detail: 'Run: claude mcp add filesystem -- npx -y @anthropic-ai/mcp-filesystem /path/to/repo — Claude gains filesystem access to any configured directory.' },
      { title: 'Create a skill', detail: 'Build .claude/skills/analyze-repo/SKILL.md with instructions for analysing directory trees, entry points, and dependencies. Claude auto-discovers it.' },
      { title: 'Build the scanner', detail: 'Ask Claude Code to implement src/scanner.js — a module that walks a directory tree and returns structured file summaries.' },
    ],
    ctaLabel: 'Browse MCP servers',
    ctaUrl: 'https://github.com/modelcontextprotocol/servers',
  },

  7: {
    concept: 'Add automation with headless mode',
    steps: [
      { title: 'Headless script', detail: 'Create scripts/check-docs.sh that runs: claude -p "Analyse src/ and list files missing JSDoc comments" --output-format json — no human interaction needed.' },
      { title: 'Git hook', detail: 'Set up a pre-commit hook that runs the doc coverage check and warns if coverage drops below 80%.' },
      { title: 'Full git workflow', detail: 'Let Claude Code handle your git workflow: stage changes, write commit messages, and create the comprehensive commit for all Level 201 work.' },
    ],
    ctaLabel: 'Claude Code workflows',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
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
