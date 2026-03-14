// ─────────────────────────────────────────────────────────────────────────────
// Claude Mastery Academy — Weekly Content Evolution Sweep
// Runs every Monday 8am UTC via GitHub Actions.
// Uses Exa.ai for web search + Anthropic Claude for synthesis.
// Posts action items + full report to Slack.
// ─────────────────────────────────────────────────────────────────────────────

const MODULES = [
  { id: 1,  title: 'Meet Claude',                    topics: 'Claude model family, capabilities, context windows, Claude.ai vs Claude Code vs API, when to use which surface' },
  { id: 2,  title: 'Your First Deep Conversation',   topics: 'Claude.ai Projects, custom instructions, artifacts, co-work mode, prompt patterns for chat' },
  { id: 3,  title: 'Your First Claude Code Session',  topics: 'Claude Code setup, CLAUDE.md, permission model, multi-file editing, agentic loop basics' },
  { id: 4,  title: 'Context is Everything',           topics: 'context windows, tokens, attention, CLAUDE.md best practices, context management strategies' },
  { id: 5,  title: 'Prompt Engineering for Claude',   topics: 'task decomposition, iterative refinement, system prompts, prefilling, structured output' },
  { id: 6,  title: 'Tools, MCP, and Extensibility',   topics: 'Claude Code tools, Model Context Protocol, MCP servers, external data sources, custom slash commands' },
  { id: 7,  title: 'Workflows and Automation',        topics: 'repeatable workflows, git integration, CI/CD hooks, Claude.ai Projects as knowledge bases' },
  { id: 8,  title: 'Understanding Agent Architecture', topics: 'agent harness, plan-act-observe-decide loop, ReAct pattern, tool-use, Claude API messages and tools' },
  { id: 9,  title: 'Building Your First Harness',     topics: 'Claude API direct usage, tool schema design, error handling, retries, research agent case study' },
  { id: 10, title: 'Research Agents in Practice',      topics: 'search-synthesize-report agents, Exa.ai integration, content-sweep worked example, agent memory and state' },
  { id: 11, title: 'Multi-Agent Systems',              topics: 'fan-out patterns, pipeline orchestration, supervisor agents, sub-agent delegation, parallel execution' },
  { id: 12, title: 'Evaluation and Quality',           topics: 'testing agent outputs, LLM-as-judge, benchmarking cost and quality, guardrails, prompt versioning' },
  { id: 13, title: 'Scaling to Production',            topics: 'deployment patterns, caching, rate limiting, cost management, monitoring, future of agentic AI' },
]

const SEARCH_QUERIES = [
  'Claude Code new features updates 2026',
  'Claude API structured output tool use best practices 2026',
  'Anthropic Claude model improvements capabilities 2026',
  'Model Context Protocol MCP servers developments 2026',
  'AI coding assistant agent harness architecture 2026',
  'Claude Code CLAUDE.md project configuration 2026',
  'multi-agent orchestration patterns LLM 2026',
  'LLM agent evaluation testing benchmarks 2026',
  'Claude artifacts co-work mode new features 2026',
  'agentic AI production deployment patterns 2026',
  'prompt engineering techniques Claude LLM 2026',
  'Exa AI search API integration agent workflows 2026',
  'AI agent cost optimization rate limiting caching 2026',
]

// ─── Search (Exa.ai) ─────────────────────────────────────────────────────────

async function exaSearch(query) {
  const res = await fetch('https://api.exa.ai/search', {
    method:  'POST',
    headers: {
      'x-api-key':    process.env.EXA_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      type:       'auto',
      numResults: 5,
      contents: {
        text:       true,
        highlights: { maxCharacters: 2000 },
        summary:    true,
      },
    }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Exa error ${res.status}: ${errText}`)
  }
  const data = await res.json()

  const snippets = (data.results ?? [])
    .map(r => {
      const content = r.highlights?.join('\n') ?? r.text?.slice(0, 500) ?? ''
      return `Source: ${r.title}\nURL: ${r.url}\nDate: ${r.publishedDate ?? 'unknown'}\nSummary: ${r.summary ?? ''}\n${content}`
    })
    .join('\n\n')

  return snippets
}

// ─── Claude ───────────────────────────────────────────────────────────────────

async function claude(systemPrompt, userPrompt, maxTokens = 1500) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:  'POST',
    headers: {
      'x-api-key':         process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-haiku-4-5',
      max_tokens: maxTokens,
      messages:   [{ role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }],
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic error ${res.status}: ${err}`)
  }
  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}

// Fetch resolved proposals from GitHub to use as memory context for the sweep
async function fetchResolvedProposals() {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) return []
  try {
    const res = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/public/proposals.json`,
      { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } },
    )
    if (!res.ok) return []
    const data = await res.json()
    const parsed = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
    return (parsed.proposals ?? []).filter(p => p.status !== 'pending')
  } catch {
    return []
  }
}

// Format resolved proposals into a memory block for the sweep prompts
function buildMemoryContext(resolved) {
  if (!resolved.length) return ''
  const applied = resolved.filter(p => p.status === 'applied' || p.status === 'approved')
  const discarded = resolved.filter(p => p.status === 'discarded')
  const lines = []
  if (applied.length) {
    lines.push('PREVIOUSLY APPLIED CHANGES (already in the course — do not re-suggest):')
    applied.forEach(p => lines.push(`- Module ${p.moduleId}: ${p.fieldLabel}`))
  }
  if (discarded.length) {
    lines.push('\nPREVIOUSLY DISCARDED PROPOSALS (intentionally rejected — do not re-suggest):')
    discarded.forEach(p => {
      const reason = p.discardReason ? ` Reason: ${p.discardReason}` : ''
      const comment = p.comment ? ` Note: ${p.comment}` : ''
      lines.push(`- Module ${p.moduleId}: ${p.fieldLabel}${reason}${comment}`)
    })
  }
  return lines.length ? `\n\nEDITORIAL MEMORY (decisions from previous sweeps — respect these):\n${lines.join('\n')}` : ''
}

async function synthesiseReport(allFindings, memoryContext, courseIndex) {
  const moduleList = MODULES.map(m => `Module ${m.id}: ${m.title} — covers: ${m.topics}`).join('\n')
  return claude(
    'You are a curriculum analyst for a course about Claude (the AI assistant by Anthropic), covering Claude.ai, Claude Code, the Claude API, and agent harnesses. The audience is developers and technical leads. Content should be practical, accurate, and actionable for builders. Analyse research findings and identify gaps, accuracy issues, and new content opportunities relative to the existing course structure.',
    `Current course:\n${moduleList}${memoryContext}${courseIndex}\n\n---\nLatest research findings:\n${allFindings}\n\n---\nProduce a structured gap report with these sections:\n1. SUMMARY (2-3 sentences)\n2. ACCURACY ISSUES (outdated claims — cite specific modules)\n3. FEATURE UPDATES (new Claude/API capabilities not yet covered)\n4. DEPTH GAPS (shallowly covered topics now expanded by research)\n5. COVERAGE GAPS (topics not yet in the course)\n6. ECOSYSTEM CHANGES (MCP, tooling, community developments)\n\nBe specific. Cite sources. Reference module numbers. Do not re-suggest anything listed in EDITORIAL MEMORY above. Before proposing any new content, check the CURRENT COURSE CONTENT INDEX — do not suggest adding content that is already taught in another module.`,
    1500,
  )
}

async function extractActionItems(reportText, memoryContext, courseIndex) {
  const text = await claude(
    'You extract concrete, actionable tasks from a content gap report for a technical course. Only output genuine action items that require a content change.',
    `From this gap report extract only items requiring a content change. One per line, exactly:\n[UPDATE] Module N — what to change and why\n[ADD] Module N — what to add and why\n[REMOVE] Module N — what to remove and why\n${memoryContext ? `\nAlso do not re-suggest anything in this editorial memory:\n${memoryContext}\n` : ''}${courseIndex ? `\nDo not suggest adding content that already exists in the course:\n${courseIndex}\n` : ''}\nIf there are genuinely no action items, respond exactly: NO_ACTIONS\n\nReport:\n${reportText}`,
    600,
  )
  if (text.trim() === 'NO_ACTIONS') return []
  return text.split('\n').filter(l => /^\[(UPDATE|ADD|REMOVE)\]/.test(l.trim()))
}

// ─── Structured Proposals ────────────────────────────────────────────────────

let modulesJsCache = null
async function fetchModulesJs() {
  if (modulesJsCache) return modulesJsCache
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) return null
  try {
    const res = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/src/data/modules.js`,
      { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } },
    )
    if (!res.ok) return null
    const data = await res.json()
    modulesJsCache = Buffer.from(data.content, 'base64').toString('utf-8')
    return modulesJsCache
  } catch {
    return null
  }
}

function extractModuleContext(fileText, moduleId) {
  if (!fileText) return null
  const marker = `  ${moduleId}: {`
  const start = fileText.indexOf(marker)
  if (start === -1) return null
  const nextModuleMatch = fileText.slice(start + marker.length).search(/\n  \d+: \{/)
  const end = nextModuleMatch === -1 ? start + 4000 : start + marker.length + nextModuleMatch
  return fileText.slice(start, end).slice(0, 3000)
}

async function buildCourseIndex(modulesJs) {
  if (!modulesJs) return ''
  const excerpt = modulesJs.slice(0, 8000)
  const index = await claude(
    'You summarise course content into a compact index. For each module, list the key claims, concepts, and techniques actually taught. Be specific. One short paragraph per module.',
    `Extract a content index from this course data file. List each module by ID and summarise its actual key claims and concepts in 2-3 sentences.\n\nCourse data (excerpt):\n${excerpt}`,
    800,
  )
  return index ? `\n\nCURRENT COURSE CONTENT INDEX (check this before suggesting any addition or update — do not propose content already covered here):\n${index}` : ''
}

async function structureOneProposal(item, allFindings, modulesJs) {
  const type = item.startsWith('[UPDATE]') ? 'UPDATE' : item.startsWith('[ADD]') ? 'ADD' : 'REMOVE'
  const moduleList = MODULES.map(m => `Module ${m.id}: ${m.title} — covers: ${m.topics}`).join('\n')

  const moduleIdMatch = item.match(/Module (\d+)/)
  const moduleId = moduleIdMatch ? parseInt(moduleIdMatch[1]) : null
  const moduleContext = moduleId ? extractModuleContext(modulesJs, moduleId) : null

  const contextSection = moduleContext
    ? `\n\nActual course content for Module ${moduleId} (from modules.js — use this to find verbatim text):\n\`\`\`\n${moduleContext}\n\`\`\``
    : ''

  const typeGuidance = type === 'UPDATE'
    ? `IMPORTANT: Only use type "UPDATE" if you can find and quote a specific existing sentence or statistic in the course content above that should be replaced. If the action item is actually adding a new lesson, a new section, or a substantial block of new content that does not yet exist, change the type to "ADD" instead.`
    : type === 'ADD'
      ? `Use type "ADD". currentValue must be null.`
      : `Use type "REMOVE". Quote the exact text to remove in currentValue.`

  const raw = await claude(
    'You convert a content action item into a structured JSON proposal. Output ONLY valid JSON — no markdown, no explanation.',
    `Course modules:\n${moduleList}\n\nAction item: ${item}\n\nResearch context (first 2000 chars):\n${allFindings.slice(0, 2000)}${contextSection}\n\n${typeGuidance}\n\nConvert to a JSON object with these exact fields:\n{\n  "type": <"UPDATE", "ADD", or "REMOVE">,\n  "moduleId": <integer>,\n  "lessonId": <string like "l3_2" or null>,\n  "fieldLabel": <short human-readable label, e.g. "Stat value in lesson 3_2">,\n  "currentValue": <for UPDATE/REMOVE: copy the EXACT sentence or phrase from the course content above that this change targets; null for ADD; null if no matching text can be found>,\n  "proposedValue": <the new text to use, or null for REMOVE>,\n  "reason": <1-2 sentences explaining why>,\n  "sourceUrl": <URL string or null>\n}\nReturn only the JSON.`,
    1000,
  )

  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  let parsed
  try {
    const result = JSON.parse(cleaned)
    parsed = Array.isArray(result) ? result[0] : result
  } catch {
    return null
  }

  const rawProposed = parsed.proposedValue
  const safeProposed = rawProposed === null || rawProposed === undefined
    ? null
    : typeof rawProposed === 'object'
      ? (rawProposed.body ?? rawProposed.heading ?? JSON.stringify(rawProposed))
      : String(rawProposed)

  return {
    id:            `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...parsed,
    proposedValue: safeProposed,
    status:        'pending',
    comment:       '',
    createdAt:     new Date().toISOString(),
    resolvedAt:    null,
    rawActionItem: item,
  }
}

async function structureProposals(actionItems, allFindings, modulesJs) {
  const proposals = []
  for (const item of actionItems) {
    try {
      const proposal = await structureOneProposal(item, allFindings, modulesJs)
      if (proposal) proposals.push(proposal)
      await new Promise(r => setTimeout(r, 400))
    } catch (err) {
      console.error('[structureProposals] Failed for item:', item, err.message)
    }
  }
  return proposals
}

async function appendProposalsToGitHub(newProposals) {
  const REPO  = process.env.GITHUB_REPO
  const TOKEN = process.env.GITHUB_TOKEN
  const PATH  = 'public/proposals.json'

  const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
    headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json' },
  })

  let current = { proposals: [], lastUpdated: null }
  let sha = null

  if (getRes.ok) {
    const data = await getRes.json()
    current = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
    sha = data.sha
  }

  current.proposals  = [...(current.proposals ?? []), ...newProposals]
  current.lastUpdated = new Date().toISOString()

  const body = {
    message: `Content sweep: ${newProposals.length} new proposal${newProposals.length !== 1 ? 's' : ''}`,
    content: Buffer.from(JSON.stringify(current, null, 2)).toString('base64'),
  }
  if (sha) body.sha = sha

  const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
    method:  'PUT',
    headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!putRes.ok) {
    const err = await putRes.text()
    throw new Error(`GitHub PUT proposals error: ${putRes.status}: ${err}`)
  }
}

// ─── Pending lesson brief files ───────────────────────────────────────────────

function buildLessonBrief(proposal, modulesJs) {
  const mod = MODULES.find(m => m.id === proposal.moduleId)
  const modTitle = mod ? `Module ${proposal.moduleId}: "${mod.title}"` : `Module ${proposal.moduleId}`

  let lastLessonId = '(unknown)'
  let nextId = `l${proposal.moduleId}_?`
  if (modulesJs) {
    const pattern = new RegExp(`id:\\s*'l${proposal.moduleId}_(\\d+)'`, 'g')
    const matches = [...modulesJs.matchAll(pattern)]
    if (matches.length) {
      const highest = Math.max(...matches.map(m => parseInt(m[1])))
      lastLessonId = `l${proposal.moduleId}_${highest}`
      nextId = `l${proposal.moduleId}_${highest + 1}`
    }
  }

  return `# Pending Lesson Brief: ${proposal.fieldLabel}

**Proposal ID:** ${proposal.id}
**Module:** ${modTitle}
**Insert after lesson:** \`${lastLessonId}\`
**New lesson ID to use:** \`${nextId}\`

---

## What to add

${proposal.proposedValue || proposal.fieldLabel}

## Why

${proposal.reason}
${proposal.sourceUrl ? `\n## Source\n\n${proposal.sourceUrl}` : ''}

---

## Lesson schema

\`\`\`js
{
  id: '${nextId}',
  heading: 'Short, compelling heading',
  body: 'Core lesson text, 2-4 sentences for a technical audience.',
  type: 'micro_lesson',
  keyPoints: [
    {
      icon: '✦',
      text: 'Key point 1',
      // sourceUrl: 'https://...',
      // sourceLabel: 'Source name',
    },
  ],
  // Optional: callout: { type: 'tip' | 'stat' | 'warning', text: '...' }
}
\`\`\`

---

## Tone and style

- **Audience:** Developers and technical leads working with Claude.
- **Voice:** Practical and direct. Code-aware. No em dashes.
- **Length:** 2-4 sentences for body text. 3-5 key points max.

---

## Steps

1. Open \`src/data/modules.js\` and find ${modTitle}.
2. Add the new lesson object directly after \`${lastLessonId}\`, using ID \`${nextId}\`.
3. Run \`npm run dev\` and navigate to Module ${proposal.moduleId} to preview it locally.
4. If it looks good, commit and push: \`git add . && git commit -m "Add lesson ${nextId}: [heading]" && git push origin main\`
5. Return to the review dashboard and click **Mark as done** on this proposal.
   Or delete this file to remove it from the pending queue.
`
}

async function writePendingLessonFile(proposal, modulesJs) {
  const REPO  = process.env.GITHUB_REPO
  const TOKEN = process.env.GITHUB_TOKEN
  const path  = `pending-lessons/${proposal.id}.md`
  const content = buildLessonBrief(proposal, modulesJs)

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method:  'PUT',
    headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Add pending lesson brief: ${proposal.fieldLabel}`,
      content: Buffer.from(content).toString('base64'),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`[writePendingLessonFile] Failed for ${proposal.id}: ${res.status}: ${err}`)
  }
}

// ─── Slack ────────────────────────────────────────────────────────────────────

function slackReportSections(reportText) {
  const SECTION_HEADERS = ['SUMMARY', 'ACCURACY ISSUES', 'FEATURE UPDATES', 'DEPTH GAPS', 'COVERAGE GAPS', 'ECOSYSTEM']
  const EMOJI_MAP = { 'SUMMARY': '📋', 'ACCURACY': '⚠️', 'FEATURE': '🆕', 'DEPTH': '🔍', 'COVERAGE': '➕', 'ECOSYSTEM': '🔧' }

  const blocks = []
  let current = ''

  const flush = () => {
    if (current.trim()) {
      blocks.push({ type: 'section', text: { type: 'mrkdwn', text: current.trim().slice(0, 3000) } })
      current = ''
    }
  }

  for (const line of reportText.split('\n')) {
    const header = SECTION_HEADERS.find(h => new RegExp(`^[0-9.]*\\s*${h}`, 'i').test(line.trim()))
    if (header) {
      flush()
      blocks.push({ type: 'divider' })
      const emoji = Object.keys(EMOJI_MAP).find(k => header.startsWith(k))
      blocks.push({ type: 'section', text: { type: 'mrkdwn', text: `*${EMOJI_MAP[emoji] ?? '•'} ${header}*` } })
    } else if (line.trim()) {
      current += line + '\n'
      if (current.length > 2800) flush()
    }
  }
  flush()
  return blocks
}

async function postToSlack(actionItems, reportText, runDate) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const summaryBlocks = [
    { type: 'header', text: { type: 'plain_text', text: '📚 Claude Mastery Academy: Content review needed', emoji: true } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `Week of ${runDate} · ${actionItems.length} item${actionItems.length !== 1 ? 's' : ''} to action` }] },
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: actionItems.map(item => {
          const emoji = item.startsWith('[UPDATE]') ? '✏️' : item.startsWith('[ADD]') ? '➕' : '🗑️'
          return `${emoji} ${item}`
        }).join('\n'),
      },
    },
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: '_Full research report in thread below_ 👇' } },
  ]

  const summaryRes = await fetch(webhookUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ blocks: summaryBlocks }),
  })
  if (!summaryRes.ok) return

  const reportBlocks = [
    { type: 'header', text: { type: 'plain_text', text: `🔍 Full Research Report — ${runDate}`, emoji: true } },
    ...slackReportSections(reportText),
    { type: 'divider' },
    { type: 'context', elements: [{ type: 'mrkdwn', text: '— Generated automatically by Claude Mastery Academy weekly content sweep' }] },
  ]

  for (let i = 0; i < reportBlocks.length; i += 48) {
    await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ blocks: reportBlocks.slice(i, i + 48) }),
    })
    if (i + 48 < reportBlocks.length) await new Promise(r => setTimeout(r, 500))
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.EXA_API_KEY) {
    console.error('EXA_API_KEY not configured')
    process.exit(1)
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured')
    process.exit(1)
  }

  try {
    const runDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    console.log(`[content-sweep] Starting sweep for ${runDate}`)

    // 1. Run searches in batches of 3
    const rawFindings = []
    for (let i = 0; i < SEARCH_QUERIES.length; i += 3) {
      const batch = SEARCH_QUERIES.slice(i, i + 3)
      console.log(`[content-sweep] Searching batch ${Math.floor(i/3) + 1}/${Math.ceil(SEARCH_QUERIES.length/3)}`)
      const results = await Promise.all(batch.map(exaSearch))
      rawFindings.push(...results)
      if (i + 3 < SEARCH_QUERIES.length) await new Promise(r => setTimeout(r, 1000))
    }

    const allFindings = SEARCH_QUERIES.map((q, i) => `### ${q}\n${rawFindings[i]}`).join('\n\n')

    // 2. Load editorial memory from resolved proposals
    const resolved = await fetchResolvedProposals()
    const memoryContext = buildMemoryContext(resolved)

    // 3. Build cross-module content index for deduplication
    const modulesJs = await fetchModulesJs()
    const courseIndex = await buildCourseIndex(modulesJs)

    // 4. Synthesise full gap report
    console.log('[content-sweep] Synthesising report...')
    const report = await synthesiseReport(allFindings, memoryContext, courseIndex)

    // 5. Extract action items
    const actionItems = await extractActionItems(report, memoryContext, courseIndex)
    console.log(`[content-sweep] Found ${actionItems.length} action items`)

    // 6. Structure proposals for the review dashboard (optional — requires GITHUB_TOKEN)
    let proposalsAdded = 0
    let pendingLessonsCreated = 0
    if (actionItems.length > 0 && process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      const proposals = await structureProposals(actionItems, allFindings, modulesJs)
      if (proposals.length > 0) {
        await appendProposalsToGitHub(proposals)
        proposalsAdded = proposals.length

        const addProposals = proposals.filter(p => p.type === 'ADD')
        for (const p of addProposals) {
          await writePendingLessonFile(p, modulesJs)
          pendingLessonsCreated++
        }
      }
    }

    // 7. Post to Slack (only if there are action items)
    if (actionItems.length > 0) await postToSlack(actionItems, report, runDate)

    console.log(`[content-sweep] Complete: ${actionItems.length} actions, ${proposalsAdded} proposals, ${pendingLessonsCreated} pending lessons`)
  } catch (err) {
    console.error('[content-sweep] Error:', err)
    process.exit(1)
  }
}

main()
