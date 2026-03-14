export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    return res.status(500).json({ error: 'Slack webhook not configured' })
  }

  const { reason, comment, pageUrl, moduleId } = req.body

  const reasonLabels = {
    outdated:  '📅 Out of date',
    incorrect: '❌ Incorrect',
    improve:   '💡 Could be improved',
    other:     '💬 Something else',
  }

  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '🚩 Content flag submitted', emoji: true },
    },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Reason*\n${reasonLabels[reason] ?? reason}` },
        { type: 'mrkdwn', text: `*Module*\n${moduleId ? `Module ${moduleId}` : 'Unknown'}` },
        { type: 'mrkdwn', text: `*Page*\n\`${pageUrl ?? '/'}\`` },
      ],
    },
    comment && {
      type: 'section',
      text: { type: 'mrkdwn', text: `*Comment*\n${comment}` },
    },
  ].filter(Boolean)

  const response = await fetch(webhookUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ blocks }),
  })

  if (!response.ok) {
    return res.status(502).json({ error: 'Failed to send Slack message' })
  }

  return res.status(200).json({ ok: true })
}
