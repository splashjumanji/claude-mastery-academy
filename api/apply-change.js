// ─────────────────────────────────────────────────────────────────────────────
// Apply Change API
// POST /api/apply-change
// Applies an approved content proposal to modules.js via GitHub API.
// Strategy:
//   UPDATE — first tries direct string replacement (reliable, fast).
//             Falls back to Claude rewrite if no unique match found.
//   REMOVE — uses Claude to surgically remove the identified content.
//   ADD    — marks as acknowledged; actual implementation happens in Cursor.
// ─────────────────────────────────────────────────────────────────────────────

export const config = { maxDuration: 60 }

const MODULES_PATH  = 'src/data/modules.js'
const PROPOSALS_PATH = 'public/proposals.json'

function githubHeaders() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

async function getFile(path) {
  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`,
    { headers: githubHeaders() },
  )
  if (!res.ok) throw new Error(`GitHub GET ${path} error: ${res.status}`)
  const data = await res.json()
  const text = Buffer.from(data.content, 'base64').toString('utf-8')
  return { text, sha: data.sha }
}

async function putFile(path, text, sha, message) {
  const body = {
    message,
    content: Buffer.from(text).toString('base64'),
    sha,
  }
  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`,
    { method: 'PUT', headers: githubHeaders(), body: JSON.stringify(body) },
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT ${path} error: ${res.status}: ${err}`)
  }
  return res.json()
}

async function claude(systemPrompt, userPrompt, maxTokens = 8000) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
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

async function markProposalApplied(proposalId) {
  const commitMsg = `Mark proposal ${proposalId.slice(0, 8)} as applied`
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { text, sha } = await getFile(PROPOSALS_PATH)
      const data = JSON.parse(text)
      const idx = data.proposals?.findIndex(p => p.id === proposalId) ?? -1
      if (idx === -1) return
      data.proposals[idx].status = 'applied'
      data.proposals[idx].resolvedAt = new Date().toISOString()
      data.lastUpdated = new Date().toISOString()
      await putFile(PROPOSALS_PATH, JSON.stringify(data, null, 2), sha, commitMsg)
      return // Success
    } catch (err) {
      const is409 = err.message?.includes('409')
      console.warn(`[markProposalApplied] attempt ${attempt} failed (${err.message})`)
      if (!is409 || attempt === 3) {
        console.error('[markProposalApplied] Giving up after', attempt, 'attempts:', err.message)
        return
      }
      await new Promise(r => setTimeout(r, 300 * attempt))
    }
  }
}

async function writePendingUpdateBrief(proposal) {
  const REPO  = process.env.GITHUB_REPO
  const TOKEN = process.env.GITHUB_TOKEN
  if (!REPO || !TOKEN) return

  const path    = `pending-lessons/${proposal.id}.md`
  const modLine = `Module ${proposal.moduleId}${proposal.lessonId ? `, lesson \`${proposal.lessonId}\`` : ''}`
  const content = `# Pending Update Brief: ${proposal.fieldLabel}

**Proposal ID:** ${proposal.id}
**Location:** ${modLine}

---

## What to update

**Field:** ${proposal.fieldLabel}

## Proposed text

${proposal.proposedValue || '(see reason below)'}

## Why

${proposal.reason}
${proposal.sourceUrl ? `\n## Source\n\n${proposal.sourceUrl}` : ''}

---

## How to apply

Open \`src/data/modules.js\` and find ${modLine}.
Locate the content described above and replace or add the proposed text.
Keep surrounding structure (arrays, objects, commas) intact.

## Tone and style

- Audience: B2B marketing managers. Non-technical.
- Voice: Confident, clear. No jargon. No em dashes.

## After editing

Run \`npm run dev\` to preview, then:
\`git add src/data/modules.js && git commit -m "Update ${proposal.fieldLabel}" && git pull origin main --no-rebase && git push origin main\`

Return to the review dashboard and click **Mark as done** on this proposal.
Or delete this file to clear it from the pending queue.
`

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method:  'PUT',
    headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Queue pending update brief: ${proposal.fieldLabel}`,
      content: Buffer.from(content).toString('base64'),
    }),
  })
  if (!res.ok) console.error(`[writePendingUpdateBrief] ${res.status}: ${await res.text()}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return res.status(500).json({ error: 'GITHUB_TOKEN or GITHUB_REPO not configured' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  const { proposal, approvedText } = req.body ?? {}
  if (!proposal?.id) return res.status(400).json({ error: 'proposal is required' })

  // ADD proposals — or UPDATE proposals with no currentValue being approved
  // for Cursor implementation — are queued as pending-lessons/ briefs and
  // acknowledged without touching modules.js directly.
  const isManualMarkDone =
    proposal.type === 'ADD' ||
    (proposal.type === 'UPDATE' && !proposal.currentValue && !approvedText)

  if (isManualMarkDone) {
    // For UPDATE proposals with no currentValue, write a pending-lessons/ brief
    // so Cursor can pick it up automatically at the next session
    if (proposal.type === 'UPDATE' && !proposal.currentValue) {
      await writePendingUpdateBrief(proposal).catch(() => {})
    }
    await markProposalApplied(proposal.id)
    return res.status(200).json({
      ok: true,
      action: 'noted',
      message: 'Brief queued for Cursor. No automatic file edit was made.',
    })
  }

  try {
    const { text: modulesJs, sha: modulesSha } = await getFile(MODULES_PATH)
    const finalText = approvedText || proposal.proposedValue || ''

    let editedJs = null

    // ── Strategy 1: Direct string replacement (UPDATE only) ──────────────────
    if (proposal.type === 'UPDATE' && proposal.currentValue) {
      // Helper: try a direct string replace; returns the edited file or null
      const tryReplace = (search, replace) => {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const matches = (modulesJs.match(new RegExp(escaped, 'g')) ?? []).length
        if (matches === 1) return modulesJs.replace(new RegExp(escaped), replace)
        return null
      }

      // Try 1: exact match
      editedJs = tryReplace(proposal.currentValue, finalText)

      // Try 2: JS-escaped apostrophes — modules.js uses single-quoted strings, so
      // apostrophes inside them appear as \' in the raw file.
      if (!editedJs) {
        const jsEscape = s => s.replace(/'/g, "\\'")
        editedJs = tryReplace(jsEscape(proposal.currentValue), jsEscape(finalText))
      }

      // Try 3: Fuzzy punctuation matching — handles proposals captured before the
      // em-dash removal pass. Builds a regex that tolerates em/en dashes, smart
      // quotes, and their common replacement characters (comma, semicolon, hyphen).
      if (!editedJs) {
        const buildFuzzyRegex = (s) => {
          let p = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          p = p.replace(/[—–]/g, '[—–,;.\\- ]?')  // em/en dash may have been replaced
          p = p.replace(/['']/g, "[''']")            // smart vs straight apostrophes
          p = p.replace(/[""]/g, '[""]')             // smart vs straight quotes
          return new RegExp(p)
        }
        const fuzzyRe = buildFuzzyRegex(proposal.currentValue)
        const matches = modulesJs.match(new RegExp(fuzzyRe.source, 'g')) ?? []
        if (matches.length === 1) {
          const jsEscapeText = finalText.replace(/'/g, "\\'")
          editedJs = modulesJs.replace(fuzzyRe, jsEscapeText)
        }
      }
    }


    // ── Guard: UPDATE where currentValue not found in file ───────────────────
    // Do NOT fall back to Claude full-file rewrite — it's too slow and times out.
    // If the proposed text is already present the change was already applied; mark it so.
    if (!editedJs && proposal.type === 'UPDATE' && proposal.currentValue) {
      const jsEscape = s => s.replace(/'/g, "\\'")
      if (finalText && (modulesJs.includes(finalText) || modulesJs.includes(jsEscape(finalText)))) {
        await markProposalApplied(proposal.id)
        return res.status(200).json({
          ok: true,
          action: 'already-applied',
          message: 'Change was already present in modules.js — proposal marked as applied.',
        })
      }
      return res.status(400).json({
        error:
          'Cannot auto-apply: the target text was not found in modules.js. ' +
          'It may have already been applied in a previous run. ' +
          'If the change is already live in the course, use "Mark as done" on the card instead.',
      })
    }

    // ── Strategy 2: Claude rewrite (REMOVE proposals only) ───────────────────
    if (!editedJs) {
      const changeDescription = proposal.type === 'REMOVE'
        ? `REMOVE the following content from Module ${proposal.moduleId}${proposal.lessonId ? ` lesson ${proposal.lessonId}` : ''}:\n- Field: ${proposal.fieldLabel}\n- Content to remove: "${proposal.currentValue}"\n- Reason: ${proposal.reason}`
        : `UPDATE Module ${proposal.moduleId}${proposal.lessonId ? ` lesson ${proposal.lessonId}` : ''}:\n- Field: ${proposal.fieldLabel}\n- Find: "${proposal.currentValue}"\n- Replace with: "${finalText}"\n- Reason: ${proposal.reason}`

      const raw = await claude(
        `You are a precise code editor. You will receive a JavaScript file and a specific content change to apply.
Apply ONLY the requested change and nothing else. Do not add comments, reformat, or alter anything else.
Return the complete modified file. Return ONLY the raw JavaScript — no markdown fences.`,
        `FILE:\n${modulesJs}\n\nCHANGE:\n${changeDescription}`,
        8000,
      )

      // Strip any accidental markdown fences
      editedJs = raw.replace(/^```(?:javascript|js)?\n?/m, '').replace(/\n?```$/m, '').trim()

      // Safety check: the output must be non-trivially similar in size
      if (Math.abs(editedJs.length - modulesJs.length) > modulesJs.length * 0.2) {
        return res.status(500).json({
          error: 'Claude output failed sanity check (file size changed too much). Please apply manually.',
        })
      }
    }

    const commitMsg = proposal.type === 'REMOVE'
      ? `Remove: ${proposal.fieldLabel} (Module ${proposal.moduleId})`
      : `Update: ${proposal.fieldLabel} (Module ${proposal.moduleId})`

    await putFile(MODULES_PATH, editedJs, modulesSha, commitMsg)
    await markProposalApplied(proposal.id)

    return res.status(200).json({ ok: true, action: 'applied' })
  } catch (err) {
    console.error('[apply-change] Error:', err)
    return res.status(500).json({ error: err.message })
  }
}
