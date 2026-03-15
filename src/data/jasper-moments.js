// Build Step content for each module
// Each module has a "Build" step that guides learners through building the onboard-agent project
// These steps complement the buildStep objects in modules.js with additional context

export const JASPER_MOMENTS = {
  1: {
    concept: 'Brainstorm your project with Claude.ai chat',
    today: [
      { feature: 'Start a Conversation', detail: 'Open claude.ai and describe the onboard-agent concept: a CLI tool that reads codebases and generates onboarding docs. Ask Claude to brainstorm features, constraints, and architecture.' },
      { feature: 'Explore the Ecosystem', detail: 'Ask Claude: "What are the differences between Claude.ai, Claude Code, and the Claude API? Which should I use for building a CLI tool?" See how it maps the three surfaces.' },
      { feature: 'Save Your Ideas', detail: 'By the end of the conversation, you should have a feature list, target audience, and technical approach. Save this — you will use it in the next module.' },
    ],
    ctaLabel: 'Open Claude.ai →',
    ctaUrl: 'https://claude.ai',
  },

  2: {
    concept: 'Draft a product spec using Projects and co-work mode',
    today: [
      { feature: 'Create a Project', detail: 'In Claude.ai, create a Project called "Onboard Agent". Add custom instructions: "You are helping me build a CLI tool called onboard-agent that reads codebases and generates onboarding docs for new engineers."' },
      { feature: 'Use Co-work Mode', detail: 'Ask Claude to write a product spec as an artifact. Switch to co-work and let it draft goals, user stories, architecture, and technical requirements autonomously.' },
      { feature: 'Iterate on the Artifact', detail: 'Review the spec artifact. Ask Claude to refine it: add architecture diagrams, clarify technical constraints, or add edge cases. Export the final version as markdown.' },
    ],
    ctaLabel: 'Create a Project in Claude.ai →',
    ctaUrl: 'https://claude.ai',
  },

  3: {
    concept: 'Scaffold the project in Claude Code',
    today: [
      { feature: 'Install Claude Code', detail: 'Run: curl -fsSL https://claude.ai/install.sh | bash (or brew install --cask claude-code on macOS).' },
      { feature: 'Scaffold the Project', detail: 'mkdir onboard-agent && cd onboard-agent && claude — then ask Claude to initialize a Node.js CLI project with package.json, src/index.js entry point, README.md, and CLAUDE.md.' },
      { feature: 'Your First Commit', detail: 'Review the proposed file diffs, approve them, then: git init && git add -A && git commit -m "Initial scaffold". You now have a real project.' },
    ],
    ctaLabel: 'Install Claude Code →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },

  4: {
    concept: 'Write a detailed CLAUDE.md for your project',
    today: [
      { feature: 'Auto-Generate', detail: 'Run /init in Claude Code to bootstrap a CLAUDE.md. Claude reads your project and drafts one automatically.' },
      { feature: 'Refine Conventions', detail: 'Add specific rules: ES modules, 2-space indent, no semicolons, descriptive function names. Use @imports to reference your product spec.' },
      { feature: 'Organize Rules', detail: 'Create .claude/rules/testing.md with testing conventions: colocate tests, use vitest, prefer integration tests. Check /memory for auto-learned preferences.' },
    ],
    ctaLabel: 'Read CLAUDE.md docs →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/memory',
  },

  5: {
    concept: 'Design and implement the system prompt',
    today: [
      { feature: 'Design in Claude.ai', detail: 'In your Onboard Agent project, design the system prompt. Ask Claude to help you iterate on tone, output structure, and constraints for the onboarding documentation agent.' },
      { feature: 'Implement in Claude Code', detail: 'Create src/prompts.js that exports a getSystemPrompt() function. Paste the prompt you designed in Claude.ai. Add src/config.js for model selection.' },
      { feature: 'Test Extended Thinking', detail: 'Try your prompt with extended thinking enabled. Compare the output quality on a complex codebase vs. standard mode.' },
    ],
    ctaLabel: 'Prompt Engineering Guide →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  6: {
    concept: 'Add MCP servers and a custom skill',
    today: [
      { feature: 'Install MCP', detail: 'Run: claude mcp add filesystem -- npx -y @anthropic-ai/mcp-filesystem /path/to/repo — Claude gains filesystem access to any configured directory.' },
      { feature: 'Create a Skill', detail: 'Build .claude/skills/analyze-repo/SKILL.md with instructions for analyzing directory trees, entry points, and dependencies. Claude auto-discovers it.' },
      { feature: 'Build the Scanner', detail: 'Ask Claude Code to implement src/scanner.js — a module that walks a directory tree and returns structured file summaries.' },
    ],
    ctaLabel: 'Browse MCP Servers →',
    ctaUrl: 'https://github.com/modelcontextprotocol/servers',
  },

  7: {
    concept: 'Add automation with headless mode',
    today: [
      { feature: 'Headless Script', detail: 'Create scripts/check-docs.sh that runs claude -p "Analyze src/ and list files missing JSDoc comments" --output-format json. No human interaction needed.' },
      { feature: 'Git Hook', detail: 'Set up a pre-commit hook that runs the doc coverage check and warns if coverage drops below 80%.' },
      { feature: 'Full Git Workflow', detail: 'Let Claude Code handle your git workflow: stage changes, write commit messages, and create the comprehensive commit for all Level 201 work.' },
    ],
    ctaLabel: 'Claude Code Workflows →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },

  8: {
    concept: 'Design tool schemas for the onboard-agent',
    today: [
      { feature: 'Draft in Co-work', detail: 'In your Claude.ai Project, use co-work mode to draft JSON tool schemas for: readFile, listDirectory, searchCode, and getDependencies.' },
      { feature: 'Implement in Code', detail: 'In Claude Code, create src/tools.js (schema definitions) and src/tool-executor.js (Node.js implementations for each tool).' },
      { feature: 'Server Tools', detail: 'Learn about server tools like web_search and web_fetch that require zero implementation — you will use these in Module 10.' },
    ],
    ctaLabel: 'Tool Use Docs →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview',
  },

  9: {
    concept: 'Implement the full agent loop',
    today: [
      { feature: 'The Agent Loop', detail: 'Build src/agent.js: send system prompt + tools → check for tool_use blocks → execute tools → send results back → repeat until done. Include a 20-iteration safety limit.' },
      { feature: 'Error Handling', detail: 'Add exponential backoff for rate limits, clear error messages for tool failures, and a cost tracker for input/output tokens.' },
      { feature: 'Test It Live', detail: 'Create a test script and run it on your own project. The agent should autonomously explore your codebase and generate onboarding documentation.' },
    ],
    ctaLabel: 'API Quickstart →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/quickstart',
  },

  10: {
    concept: 'Add web search and agent memory',
    today: [
      { feature: 'Web Search', detail: 'Add a searchDocs tool using the web_search server tool. The agent enriches onboarding docs with links to official framework documentation.' },
      { feature: 'Agent Memory', detail: 'Create src/memory.js that saves previous runs to .onboard-agent/memory.json. On repeat runs, only re-analyze changed files (using git diff).' },
      { feature: 'Cross-Repo Testing', detail: 'Test the full agent on a different local repo. It should work on any codebase, not just onboard-agent.' },
    ],
    ctaLabel: 'Content Sweep Source →',
    ctaUrl: 'https://github.com/splashjumanji/claude-mastery-academy/blob/main/scripts/content-sweep.mjs',
  },

  11: {
    concept: 'Add parallel sub-agents for faster analysis',
    today: [
      { feature: 'Fan-Out Pattern', detail: 'Refactor to use 3 parallel sub-agents: ArchitectureAgent, DependencyAgent, SetupAgent. A Synthesizer combines their outputs.' },
      { feature: 'Measure Speedup', detail: 'Add timing logs. The parallel version should be 2-3x faster than sequential. Compare total API costs.' },
      { feature: 'Custom Agent', detail: 'Create a custom sub-agent at .claude/agents/doc-reviewer.md that reviews generated documentation for accuracy.' },
    ],
    ctaLabel: 'Agent Patterns →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tools',
  },

  12: {
    concept: 'Build an eval suite with LLM-as-judge',
    today: [
      { feature: 'Grading Rubric', detail: 'In Claude.ai co-work, draft a rubric scoring: completeness, accuracy, structure, actionability, and conciseness (1-5 each).' },
      { feature: 'Eval Harness', detail: 'Build test/eval.js: run the agent on 5 test repos, grade each output with Claude against the rubric, print a summary table.' },
      { feature: 'Iterate on Quality', detail: 'Use eval results to improve your system prompt. Re-run evals to verify improvements. Treat prompts like code.' },
    ],
    ctaLabel: 'Evaluation Best Practices →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  13: {
    concept: 'Ship to production — caching, publishing, and the road ahead',
    today: [
      { feature: 'Prompt Caching', detail: 'Add cache_control: {"type": "ephemeral"} to system prompts and tools. Log cache_read_input_tokens to measure ~90% cost savings.' },
      { feature: 'Cost Report', detail: 'After each run, print: total tokens, cached tokens, estimated USD cost, and duration. Know exactly what the agent costs.' },
      { feature: 'Publish', detail: 'Polish package.json, README.md, and tag v1.0.0. Optionally publish to npm or push to GitHub. Your onboard-agent is complete.' },
    ],
    ctaLabel: 'Full API Reference →',
    ctaUrl: 'https://docs.anthropic.com/en/api/getting-started',
  },
}

export function getJasperMoment(moduleId) {
  return JASPER_MOMENTS[moduleId] || null
}
