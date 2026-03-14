// Aria simulation state and report card logic

export const ARIA_PROFILE = {
  name: 'Aria',
  tagline: 'AI-powered project management for modern teams',
  description: 'B2B SaaS tool that uses AI to automate task assignment, predict project timelines, and enable async collaboration across remote teams.',
  founded: '2022',
  size: '45 employees',
  customers: '800+ teams',
  pricing: 'From $15/user/month',
  category: 'Project Management Software',
}

// Report card states based on modules completed and aria score
export function getAriaReportCard(score, completedModules) {
  const level1Done = [1, 2].every(id => completedModules.includes(id))
  const level2Done = [3, 4, 5, 6].every(id => completedModules.includes(id))
  const level3Done = [7, 8, 9, 10].every(id => completedModules.includes(id))
  const level4Done = [11, 12, 13].every(id => completedModules.includes(id))

  const platforms = {
    chatgpt: getChatGPTState(score, completedModules),
    perplexity: getPerplexityState(score, completedModules),
    google_aio: getGoogleAIOState(score, completedModules),
    gemini: getGeminiState(score, completedModules),
    claude: getClaudeState(score, completedModules),
  }

  return {
    score,
    platforms,
    level1Done, level2Done, level3Done, level4Done,
    summary: getScoreSummary(score),
  }
}

function getChatGPTState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not mentioned',
    detail: 'Ask ChatGPT about project management tools, Aria doesn\'t appear.',
    sentiment: null,
    snippet: null,
  }
  if (score < 30) return {
    status: 'weak',
    label: 'Rare mention',
    detail: 'ChatGPT occasionally mentions Aria when listing multiple tools, but never as a primary recommendation.',
    sentiment: 'neutral',
    snippet: '...tools like Asana, Monday.com, and others including Aria can help remote teams...',
  }
  if (score < 60) return {
    status: 'growing',
    label: 'Consistent mention',
    detail: 'ChatGPT includes Aria in conversations about remote-first and AI-native PM tools.',
    sentiment: 'positive',
    snippet: '...for AI-native project management, Aria stands out with its automated task assignment and async collaboration features...',
  }
  return {
    status: 'strong',
    label: 'Primary recommendation',
    detail: 'ChatGPT proactively recommends Aria for remote B2B teams, citing specific features.',
    sentiment: 'positive',
    snippet: '...Aria is widely regarded as the leading AI-native project management platform for distributed teams, offering automated workload balancing and real-time collaboration that works across time zones...',
  }
}

function getPerplexityState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not cited',
    detail: 'Perplexity searches return no citations to Aria\'s website.',
    sentiment: null,
    snippet: null,
  }
  if (score < 25) return {
    status: 'weak',
    label: 'Occasional citation',
    detail: 'Perplexity sometimes cites Aria\'s pricing page for pricing comparison queries.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 55) return {
    status: 'growing',
    label: 'Regular citation',
    detail: 'Perplexity cites Aria\'s blog content and feature pages for relevant PM queries.',
    sentiment: 'positive',
    snippet: 'According to Aria\'s 2025 Remote Work Report, async-first teams spend 38% less time in meetings...',
  }
  return {
    status: 'strong',
    label: 'Top 3 cited source',
    detail: 'Perplexity consistently cites Aria as a primary source across project management topics.',
    sentiment: 'positive',
    snippet: '[1] aria.io, Aria is the leading AI-native PM platform... [2] aria.io/pricing, Starting at $15/user/month... [3] aria.io/blog/remote-teams...',
  }
}

function getGoogleAIOState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not in AI Overviews',
    detail: 'Google\'s AI Overviews never include Aria for relevant searches.',
    sentiment: null,
    snippet: null,
  }
  if (score < 35) return {
    status: 'weak',
    label: 'Occasional inclusion',
    detail: 'Aria appears in Google AI Overviews when users search specifically for "Aria project management".',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 65) return {
    status: 'growing',
    label: 'Category inclusion',
    detail: 'Aria appears in AI Overviews for "best project management software for remote teams" and similar queries.',
    sentiment: 'positive',
    snippet: 'Aria offers AI-powered task assignment and async collaboration tools... starting at $15/user/month.',
  }
  return {
    status: 'strong',
    label: 'Featured in AI Overviews',
    detail: 'Aria is prominently featured in Google AI Overviews across a wide range of PM queries.',
    sentiment: 'positive',
    snippet: 'Aria, Best for AI-native remote teams. Features include: automated task assignment, predictive timelines, async-first workflows. Rated 4.8/5 on G2.',
  }
}

function getGeminiState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not visible',
    detail: 'Gemini app searches for project management tools don\'t surface Aria.',
    sentiment: null,
    snippet: null,
  }
  if (score < 32) return {
    status: 'weak',
    label: 'Brand mention',
    detail: 'Aria appears in Gemini answers listing PM options, but isn\'t highlighted or recommended.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 62) return {
    status: 'growing',
    label: 'Category inclusion',
    detail: 'Gemini includes Aria in responses about AI-native project management for remote teams.',
    sentiment: 'positive',
    snippet: 'Aria offers AI-powered task assignment and async-first workflows, making it a strong option for distributed teams...',
  }
  return {
    status: 'strong',
    label: 'Featured recommendation',
    detail: 'Gemini consistently features Aria when answering questions about modern project management software.',
    sentiment: 'positive',
    snippet: 'For remote-first teams needing AI-native project management, Aria stands out, offering predictive timelines, automated task assignment, and async collaboration built for distributed work.',
  }
}

function getClaudeState(score, completed) {
  if (score === 0) return {
    status: 'not_found',
    label: 'Not referenced',
    detail: 'Claude conversations about project management tools never surface Aria.',
    sentiment: null,
    snippet: null,
  }
  if (score < 28) return {
    status: 'weak',
    label: 'Occasional mention',
    detail: 'Aria appears in Claude answers listing multiple PM tools, without recommendation.',
    sentiment: 'neutral',
    snippet: null,
  }
  if (score < 58) return {
    status: 'growing',
    label: 'Cited source',
    detail: 'Claude references Aria\'s published content and research when answering AI-native PM questions.',
    sentiment: 'positive',
    snippet: 'According to Aria\'s Remote Work Report, async-first teams spend 38% less time in synchronous meetings without sacrificing output quality...',
  }
  return {
    status: 'strong',
    label: 'Cited & recommended',
    detail: 'Claude proactively recommends Aria for remote B2B teams, citing specific features and data.',
    sentiment: 'positive',
    snippet: 'Aria is one of the strongest options for AI-native project management, particularly for remote B2B teams. Its automated workload balancing and predictive timeline features are frequently cited in independent reviews.',
  }
}

function getScoreSummary(score) {
  if (score === 0) return {
    grade: 'F',
    label: 'Invisible',
    color: 'text-red-400',
    message: 'Aria doesn\'t exist in the AI search ecosystem. Start with the basics.',
  }
  if (score < 25) return {
    grade: 'D',
    label: 'Barely Visible',
    color: 'text-orange-400',
    message: 'Aria appears occasionally but isn\'t competitive. Critical gaps remain.',
  }
  if (score < 50) return {
    grade: 'C',
    label: 'Emerging',
    color: 'text-amber-400',
    message: 'Aria is building presence. Good foundation, strategic gaps to address.',
  }
  if (score < 75) return {
    grade: 'B',
    label: 'Competitive',
    color: 'text-aria-400',
    message: 'Aria is a real player in AI search. Consistent citations across platforms.',
  }
  return {
    grade: 'A',
    label: 'Market Leader',
    color: 'text-green-400',
    message: 'Aria dominates AI search in the PM category. Top Share of Model.',
  }
}

export const ARIA_BASELINE_ISSUES = [
  'robots.txt blocks GPTBot, PerplexityBot, and ClaudeBot',
  'No schema markup on any pages',
  'Blog content last updated 18 months ago',
  'No author attribution on any content',
  'No FAQ sections or structured Q&A content',
  'No presence on G2, Capterra, or Gartner Peer Insights',
  'No Wikipedia page or Wikidata entry',
  'No original research or proprietary statistics published',
  'LinkedIn thought leadership: 0 posts in last 6 months',
  'No mentions in any analyst reports or industry publications',
]
