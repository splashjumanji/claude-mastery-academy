// ─────────────────────────────────────────────────────────────────────────────
// AISV Academy — Revise Proposal
// Takes a proposal + reviewer comment and returns an AI-revised proposedValue.
// ─────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { proposal, comment } = req.body ?? {}

  if (!proposal || !comment?.trim()) {
    return res.status(400).json({ error: 'proposal and comment are required' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })
  }

  try {
    const systemPrompt =
      'You are a content editor for AISV Academy, an AI search visibility course. ' +
      'You revise proposed content updates based on reviewer feedback. ' +
      'Return ONLY the revised proposed text — no JSON, no markdown fences, no explanation.'

    const userPrompt = [
      `Type: ${proposal.type}`,
      `Module: ${proposal.moduleId}${proposal.lessonId ? ` / ${proposal.lessonId}` : ''}`,
      `Field: ${proposal.fieldLabel}`,
      ``,
      `Current content in course:`,
      proposal.currentValue || '(not specified)',
      ``,
      `Proposed change:`,
      proposal.proposedValue || '(none)',
      ``,
      `Reason for change:`,
      proposal.reason || '(none)',
      ``,
      `Reviewer feedback (apply this):`,
      comment,
      ``,
      `Rewrite the proposed text incorporating the reviewer's feedback. ` +
      `Keep it concise and factual. Return only the revised text, nothing else.`,
    ].join('\n')

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5',
        max_tokens: 600,
        messages:   [{ role: 'user', content: `${systemPrompt}\n\n${userPrompt}` }],
      }),
    })

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text()
      throw new Error(`Anthropic error ${anthropicRes.status}: ${err}`)
    }

    const data = await anthropicRes.json()
    const revisedProposedValue = (data.content?.[0]?.text ?? '').trim()

    return res.status(200).json({ revisedProposedValue })
  } catch (err) {
    console.error('[revise-proposal] Error:', err)
    return res.status(500).json({ error: err.message })
  }
}
