export async function submitFlag({ moduleId, pageUrl, reason, comment }) {
  const res = await fetch('/api/flag', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ moduleId, pageUrl, reason, comment }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error ?? 'Failed to submit flag')
  }

  return { ok: true }
}
