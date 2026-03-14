// Claude Moment content for each module
// Each module ends with a "Try It" moment linking to relevant Claude tools and docs

export const JASPER_MOMENTS = {
  1: {
    concept: 'Understanding the Claude ecosystem: Claude.ai, Claude Code, and the API',
    today: [
      { feature: 'Claude.ai', detail: 'Start a conversation with Claude at claude.ai. Try creating a Project with custom instructions to see how context shapes Claude\'s responses.' },
      { feature: 'Claude Code', detail: 'Install Claude Code via your terminal: npm install -g @anthropic-ai/claude-code. Open a project and try asking it to explain a complex file.' },
      { feature: 'API Console', detail: 'Visit console.anthropic.com to get an API key. The Workbench lets you experiment with prompts and model settings without writing code.' },
    ],
    ctaLabel: 'Start with Claude.ai →',
    ctaUrl: 'https://claude.ai',
  },

  2: {
    concept: 'Claude.ai deep dive: Projects, artifacts, and co-work mode',
    today: [
      { feature: 'Create a Project', detail: 'In Claude.ai, create a new Project. Add custom instructions like "You are a senior engineer at Nexus. Be direct, use code examples, cite best practices." See how it changes every response.' },
      { feature: 'Artifacts', detail: 'Ask Claude to generate a React component or write a technical design doc. It will create an Artifact you can iterate on in-place, like a collaborative editor.' },
      { feature: 'Co-work Mode', detail: 'Use co-work to let Claude work on artifacts autonomously while you continue the conversation. Great for longer writing or code generation tasks.' },
    ],
    ctaLabel: 'Try Projects in Claude.ai →',
    ctaUrl: 'https://claude.ai',
  },

  3: {
    concept: 'Claude Code: your AI pair programmer in the terminal',
    today: [
      { feature: 'First Session', detail: 'Open your terminal in a project folder and run `claude`. Try: "Explain the architecture of this project" to see how it reads your codebase.' },
      { feature: 'CLAUDE.md', detail: 'Create a CLAUDE.md file in your repo root. Add project conventions, architecture notes, and preferred patterns. Claude Code reads this automatically.' },
      { feature: 'Multi-file Editing', detail: 'Ask Claude Code to implement a feature that touches multiple files. Watch how it plans, executes, and shows you diffs for approval.' },
    ],
    ctaLabel: 'Install Claude Code →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },

  4: {
    concept: 'Context mastery: tokens, attention, and managing what Claude knows',
    today: [
      { feature: 'CLAUDE.md Best Practices', detail: 'Write a CLAUDE.md for one of your projects. Include: tech stack, naming conventions, testing approach, and common patterns. Compare Claude Code\'s output with and without it.' },
      { feature: 'System Prompts', detail: 'In the API Workbench, experiment with system prompts. Try adding role context, constraints, and output format requirements. Measure how it changes response quality.' },
    ],
    ctaLabel: 'Read CLAUDE.md docs →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/memory',
  },

  5: {
    concept: 'Prompt engineering patterns that work with Claude',
    today: [
      { feature: 'Structured Output', detail: 'Try asking Claude for JSON output with a specific schema. Use the API\'s tool_use feature to enforce structured responses reliably.' },
      { feature: 'Chain of Thought', detail: 'Compare results with and without "Think step by step" in your prompts. Try extended thinking for complex reasoning tasks.' },
      { feature: 'Prefilling', detail: 'In the API, try prefilling the assistant response with the beginning of a JSON object or code block to guide output format.' },
    ],
    ctaLabel: 'Explore the Prompt Engineering guide →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  6: {
    concept: 'MCP, tools, and making Claude work with your systems',
    today: [
      { feature: 'MCP Servers', detail: 'Browse the MCP server directory and install one: filesystem, GitHub, or database. See how Claude Code gains new capabilities when connected to external data.' },
      { feature: 'Custom Commands', detail: 'Create a /commands directory in your project with markdown files. Claude Code will pick them up as custom slash commands you can invoke.' },
    ],
    ctaLabel: 'Browse MCP servers →',
    ctaUrl: 'https://github.com/modelcontextprotocol/servers',
  },

  7: {
    concept: 'Repeatable workflows and automation with Claude',
    today: [
      { feature: 'Git Integration', detail: 'Try using Claude Code for your full git workflow: ask it to stage changes, write commit messages, and explain diffs. Set up pre-commit hooks that leverage Claude.' },
      { feature: 'Claude.ai as a Knowledge Base', detail: 'Set up a Claude.ai Project for each major system at Nexus. Upload architecture docs, API specs, and runbooks. The project becomes the team\'s always-available domain expert.' },
    ],
    ctaLabel: 'See Claude Code workflows →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview',
  },

  8: {
    concept: 'Agent architecture: the plan-act-observe loop and tool use',
    today: [
      { feature: 'API Tool Use', detail: 'In the API Workbench, define a simple tool (like a calculator or weather lookup). Send a message that requires the tool and observe how Claude decides to use it.' },
      { feature: 'Extended Thinking', detail: 'Enable extended thinking on a complex reasoning task. Read Claude\'s thinking process to understand how it plans multi-step tool use.' },
    ],
    ctaLabel: 'Read the tool use docs →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview',
  },

  9: {
    concept: 'Building your first agent harness with the Claude API',
    today: [
      { feature: 'Messages API', detail: 'Write a simple Node.js script that calls the Claude API. Add a tool definition and implement the harness loop: send message → check for tool_use → execute tool → send result → repeat.' },
      { feature: 'Error Handling', detail: 'Implement retry logic with exponential backoff. Test what happens when you send malformed tool results back to Claude. Build a robust harness from the start.' },
    ],
    ctaLabel: 'See the API quickstart →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/quickstart',
  },

  10: {
    concept: 'Research agents: search, synthesize, report',
    today: [
      { feature: 'This Course\'s Own Sweep', detail: 'This course runs a weekly content sweep agent that uses Exa.ai for search and Claude for synthesis. Check the scripts/content-sweep.mjs file in the GitHub repo to see a production example.' },
      { feature: 'Exa.ai Integration', detail: 'Sign up for Exa.ai and try the search API. It returns structured results with highlights and summaries, perfect for feeding into Claude for synthesis.' },
    ],
    ctaLabel: 'See the content sweep source →',
    ctaUrl: 'https://github.com/splashjumanji/claude-mastery-academy/blob/main/scripts/content-sweep.mjs',
  },

  11: {
    concept: 'Multi-agent systems: orchestrating multiple Claude instances',
    today: [
      { feature: 'Fan-out Pattern', detail: 'Build a simple fan-out: one supervisor agent that decomposes a task and spawns 3 sub-agent API calls in parallel. Compare results and latency vs. a single sequential call.' },
      { feature: 'Pipeline Pattern', detail: 'Chain two agents: one that researches a topic and produces structured notes, and another that takes those notes and writes a blog post. See how structured handoff improves quality.' },
    ],
    ctaLabel: 'Read about agent patterns →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-tools',
  },

  12: {
    concept: 'Evaluating agent quality: testing, benchmarking, and guardrails',
    today: [
      { feature: 'LLM-as-Judge', detail: 'Write a simple evaluation harness: run your agent on 10 test cases, then use a separate Claude call to grade each output against a rubric. Calculate pass rates and quality scores.' },
      { feature: 'Cost Tracking', detail: 'Log input_tokens and output_tokens from every API response. Build a simple dashboard or CSV export. Know exactly what your agents cost per task.' },
    ],
    ctaLabel: 'Read about evaluation →',
    ctaUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },

  13: {
    concept: 'Scaling to production: deployment, monitoring, and the future of agentic AI',
    today: [
      { feature: 'Prompt Caching', detail: 'Enable prompt caching for your agent harness to reduce latency and cost on repeated system prompts and tool definitions. Measure the difference.' },
      { feature: 'Batch API', detail: 'If you have high-volume offline processing, try the Batch API for 50% cost savings. Great for content generation, evaluation runs, and data processing.' },
      { feature: 'Stay Current', detail: 'Follow anthropic.com/news and the Claude Code changelog. The ecosystem moves fast; this course\'s weekly content sweep will flag major updates automatically.' },
    ],
    ctaLabel: 'See the full API reference →',
    ctaUrl: 'https://docs.anthropic.com/en/api/getting-started',
  },
}

export function getJasperMoment(moduleId) {
  return JASPER_MOMENTS[moduleId] || null
}
