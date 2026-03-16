// Nexus simulation state and report card logic

export const ARIA_PROFILE = {
  name: 'Nexus',
  tagline: 'Ship faster with AI-augmented engineering workflows',
  description: 'Mid-stage startup building a developer productivity platform. 12-person engineering team, series A funded, struggling with technical debt and slow shipping velocity.',
  founded: '2023',
  size: '12 engineers',
  customers: 'Internal engineering team',
  pricing: 'N/A (internal tool)',
  category: 'Developer Productivity',
}

// Report card states based on modules completed and velocity score
export function getAriaReportCard(score, completedModules) {
  const level1Done = [1, 2, 3].every(id => completedModules.includes(id))
  const level2Done = [4, 5, 6, 7].every(id => completedModules.includes(id))
  const level3Done = [8, 9, 10].every(id => completedModules.includes(id))
  const level4Done = [11, 12, 13].every(id => completedModules.includes(id))

  const platforms = {
    claude_ai: getClaudeAIState(score, completedModules),
    claude_code: getClaudeCodeState(score, completedModules),
    claude_api: getAPIHarnessState(score, completedModules),
    workflows: getWorkflowState(score, completedModules),
    team: getTeamAdoptionState(score, completedModules),
  }

  return {
    score,
    platforms,
    level1Done, level2Done, level3Done, level4Done,
    summary: getScoreSummary(score),
  }
}

function getClaudeAIState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not started',
    detail: 'The team hasn\'t explored Claude.ai beyond basic questions.',
    sentiment: null,
    snippet: null,
  }
  if (score < 30) return {
    status: 'weak',
    label: 'Experimenting',
    detail: 'A few engineers use Claude.ai for ad-hoc questions, but there\'s no structured approach.',
    sentiment: 'neutral',
    snippet: 'Some devs paste code into Claude chat occasionally, but no projects or system prompts.',
  }
  if (score < 60) return {
    status: 'growing',
    label: 'Adopted',
    detail: 'The team uses Claude.ai Projects with custom instructions. Artifacts are used for design docs.',
    sentiment: 'positive',
    snippet: 'Team has 4 Claude Projects set up: code review, architecture planning, documentation, and debugging.',
  }
  return {
    status: 'strong',
    label: 'Embedded',
    detail: 'Claude.ai is the team\'s default thinking partner. Projects, co-work, and artifacts are part of daily workflow.',
    sentiment: 'positive',
    snippet: 'Every engineer has their own Projects. Co-work sessions are used for real-time architecture reviews. Knowledge accumulates.',
  }
}

function getClaudeCodeState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not installed',
    detail: 'Nobody on the team has tried Claude Code yet.',
    sentiment: null,
    snippet: null,
  }
  if (score < 25) return {
    status: 'weak',
    label: 'Tryout phase',
    detail: 'One or two engineers have installed Claude Code but only use it for simple edits.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 55) return {
    status: 'growing',
    label: 'Regular use',
    detail: 'Most of the team uses Claude Code daily. CLAUDE.md files exist for key projects.',
    sentiment: 'positive',
    snippet: 'Engineers report 2x faster feature implementation. Custom workflows and slash commands in use.',
  }
  return {
    status: 'strong',
    label: 'Power users',
    detail: 'Claude Code is central to the dev workflow. Custom MCP servers, hooks, and CI integration in place.',
    sentiment: 'positive',
    snippet: 'Every repo has a CLAUDE.md. Pre-commit hooks run Claude for code review. MCP servers connect to internal tools.',
  }
}

function getAPIHarnessState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'No API usage',
    detail: 'The team hasn\'t built anything with the Claude API.',
    sentiment: null,
    snippet: null,
  }
  if (score < 35) return {
    status: 'weak',
    label: 'First experiments',
    detail: 'One prototype agent exists, but it\'s fragile and not in production.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 65) return {
    status: 'growing',
    label: 'First harness deployed',
    detail: 'The team has a working agent harness in production. Error handling and tool schemas are solid.',
    sentiment: 'positive',
    snippet: 'Research agent runs weekly content sweeps. Tool schemas are well-designed. Structured output is reliable.',
  }
  return {
    status: 'strong',
    label: 'Production-grade',
    detail: 'Multiple agent harnesses run reliably in production with monitoring, evaluation, and cost controls.',
    sentiment: 'positive',
    snippet: 'Three production agents: content sweep, code review, and customer support triage. All monitored and benchmarked.',
  }
}

function getWorkflowState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Ad-hoc only',
    detail: 'No repeatable AI workflows. Each engineer does their own thing.',
    sentiment: null,
    snippet: null,
  }
  if (score < 32) return {
    status: 'weak',
    label: 'Basic patterns',
    detail: 'Some shared prompts exist in Slack, but nothing systematic.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 62) return {
    status: 'growing',
    label: 'Standardized',
    detail: 'Team has documented workflows for common tasks. CLAUDE.md conventions are shared.',
    sentiment: 'positive',
    snippet: 'Standard workflows for: feature implementation, bug fixes, code review, and documentation updates.',
  }
  return {
    status: 'strong',
    label: 'Automated',
    detail: 'Workflows are automated end-to-end. CI/CD hooks trigger Claude for reviews, tests, and deployments.',
    sentiment: 'positive',
    snippet: 'Every PR gets an automated Claude review. Deployment pipelines include agent-based smoke tests. New engineers onboard 50% faster.',
  }
}

function getTeamAdoptionState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'No adoption',
    detail: 'Nobody on the team is using Claude consistently.',
    sentiment: null,
    snippet: null,
  }
  if (score < 28) return {
    status: 'weak',
    label: 'Early adopters only',
    detail: '2-3 engineers use Claude regularly. The rest are skeptical or haven\'t tried it.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 58) return {
    status: 'growing',
    label: 'Team-wide',
    detail: 'Most of the team uses Claude daily. Best practices are shared. Productivity gains are measurable.',
    sentiment: 'positive',
    snippet: 'Sprint velocity up 40%. PR cycle time down from 3 days to 1.5 days. Engineers report higher satisfaction.',
  }
  return {
    status: 'strong',
    label: 'Culture shift',
    detail: 'Claude is embedded in team culture. New hires learn it in onboarding. The team is a reference for the company.',
    sentiment: 'positive',
    snippet: 'Other teams ask Nexus engineering for their "AI playbook." CTO cites them as the model for AI-augmented development across the org.',
  }
}

function getScoreSummary(score) {
  if (score === 0) return {
    grade: 'F',
    label: 'Not Started',
    color: 'text-red-400',
    message: 'Nexus hasn\'t begun its AI transformation. Start with the foundations.',
  }
  if (score < 25) return {
    grade: 'D',
    label: 'Experimenting',
    color: 'text-orange-400',
    message: 'Nexus is dabbling with Claude but hasn\'t committed. Critical gaps remain.',
  }
  if (score < 50) return {
    grade: 'C',
    label: 'Building',
    color: 'text-amber-400',
    message: 'Nexus has good foundations. Workflows are forming. Strategic investment needed.',
  }
  if (score < 75) return {
    grade: 'B',
    label: 'Accelerating',
    color: 'text-aria-400',
    message: 'Nexus is shipping faster with Claude embedded across workflows. Real productivity gains.',
  }
  return {
    grade: 'A',
    label: 'Transformed',
    color: 'text-green-400',
    message: 'Nexus is an AI-augmented engineering team. Production agents, automated workflows, measurable velocity gains.',
  }
}

export const ARIA_BASELINE_ISSUES = [
  'No CLAUDE.md files in any repository',
  'No team-wide Claude.ai Projects or shared instructions',
  'Engineers have no shared prompting conventions or context management strategy',
  'No custom MCP servers or tool integrations',
  'No structured prompting conventions or templates',
  'No agent harnesses or API usage in production',
  'No evaluation framework for AI-generated code',
  'Code review is fully manual; 3-day average PR cycle time',
  'New engineer onboarding takes 4 weeks with no AI assistance',
  'No documentation of AI workflows or best practices',
]
