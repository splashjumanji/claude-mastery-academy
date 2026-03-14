// ─────────────────────────────────────────────────────────────────────────────
// Content Review Proposals API
// GET  /api/proposals — returns current proposals from public/proposals.json
// PATCH /api/proposals — updates a proposal's status and/or comment
// ─────────────────────────────────────────────────────────────────────────────

const FILE_PATH = 'public/proposals.json'

function githubHeaders() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

async function getFile() {
  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${FILE_PATH}`,
    { headers: githubHeaders() },
  )
  if (res.status === 404) return { content: { proposals: [], lastUpdated: null }, sha: null }
  if (!res.ok) throw new Error(`GitHub GET error: ${res.status}`)
  const data = await res.json()
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
  return { content, sha: data.sha }
}

async function putFile(content, sha, message) {
  const body = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${FILE_PATH}`,
    { method: 'PUT', headers: githubHeaders(), body: JSON.stringify(body) },
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT error: ${res.status}: ${err}`)
  }
  return res.json()
}

async function deletePendingLessonFile(proposalId) {
  const REPO  = process.env.GITHUB_REPO
  const TOKEN = process.env.GITHUB_TOKEN
  const path  = `pending-lessons/${proposalId}.md`

  // First check if the file exists and get its SHA
  const getRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    { headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json' } },
  )
  if (!getRes.ok) return // file doesn't exist — nothing to clean up

  const { sha } = await getRes.json()

  await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    {
      method:  'DELETE',
      headers: { Authorization: `token ${TOKEN}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Remove pending lesson brief: ${proposalId}`, sha }),
    },
  )
}

export default async function handler(req, res) {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return res.status(500).json({ error: 'GITHUB_TOKEN or GITHUB_REPO not configured' })
  }

  // ── GET ─────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const { content } = await getFile()
      return res.status(200).json(content)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  // ── PATCH ────────────────────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { id, status, comment, proposedValue, discardReason } = req.body ?? {}
    if (!id || !status) return res.status(400).json({ error: 'id and status are required' })

    const validStatuses = ['pending', 'approved', 'discarded', 'applied']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` })
    }

    try {
      const { content, sha } = await getFile()
      const proposals = content.proposals ?? []
      const idx = proposals.findIndex(p => p.id === id)
      if (idx === -1) return res.status(404).json({ error: 'Proposal not found' })

      const resolved = ['approved', 'discarded', 'applied'].includes(status)
      proposals[idx] = {
        ...proposals[idx],
        status,
        ...(comment !== undefined && { comment }),
        ...(proposedValue !== undefined && { proposedValue, aiRevised: true }),
        ...(discardReason !== undefined && { discardReason }),
        resolvedAt: resolved ? new Date().toISOString() : proposals[idx].resolvedAt,
      }
      content.proposals = proposals
      content.lastUpdated = new Date().toISOString()

      const commitMsg = proposedValue
        ? `Review: AI-revised proposal ${id.slice(0, 8)}`
        : `Review: ${status} proposal ${id.slice(0, 8)}`
      await putFile(content, sha, commitMsg)

      // Clean up pending-lessons/ brief file when an ADD proposal is resolved
      if (resolved && proposals[idx].type === 'ADD') {
        await deletePendingLessonFile(id).catch(() => {}) // best-effort
      }

      return res.status(200).json({ ok: true, proposal: proposals[idx] })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
