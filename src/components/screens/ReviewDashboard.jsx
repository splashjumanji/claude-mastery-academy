import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MODULES } from '../../data/modules'

const REVIEW_KEY = import.meta.env.VITE_REVIEW_KEY

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }) {
  const [value, setValue]   = useState('')
  const [error, setError]   = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!REVIEW_KEY || value === REVIEW_KEY) {
      onAuth()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => { setError(false); setShaking(false) }, 600)
    }
  }

  return (
    <div className="min-h-screen bg-xeo-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-10 w-full max-w-sm text-center"
      >
        <div className="w-14 h-14 bg-flame-50 border border-flame-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">🔒</span>
        </div>
        <h1 className="text-xl font-bold text-navy mb-1">Content Review</h1>
        <p className="text-xeo-muted text-sm mb-8">Claude Mastery Academy admin access</p>

        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [-6, 6, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <input
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Review passphrase"
            autoFocus
            className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
              error ? 'border-red-400 bg-red-50' : 'border-xeo-border focus:border-flame-500'
            }`}
          />
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-xs">
              Incorrect passphrase
            </motion.p>
          )}
          <button type="submit" className="btn-primary w-full">
            Enter
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findTrailingContext(moduleId, lessonId, currentValue) {
  if (!currentValue) return null
  const mod = MODULES[moduleId]
  if (!mod) return null
  const lessons = lessonId
    ? (mod.lessons ?? []).filter(l => l.id === lessonId)
    : (mod.lessons ?? [])
  const fields = ['body', 'heading', 'insight', 'intro']
  for (const lesson of lessons) {
    for (const field of fields) {
      const text = lesson[field]
      if (typeof text === 'string') {
        const idx = text.indexOf(currentValue)
        if (idx !== -1) {
          const tail = text.slice(idx + currentValue.length).trim()
          if (tail.length > 0) return tail.length > 120 ? tail.slice(0, 120) + '…' : tail
        }
      }
    }
  }
  return null
}

// ─── Shared sub-components ────────────────────────────────────────────────────

const TYPE_CONFIG = {
  UPDATE: { label: 'Update', bg: 'bg-amber-100',  text: 'text-amber-800',  icon: '✏️' },
  ADD:    { label: 'Add',    bg: 'bg-green-100',  text: 'text-green-800',  icon: '➕' },
  REMOVE: { label: 'Remove', bg: 'bg-red-100',    text: 'text-red-800',    icon: '🗑️' },
}

function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.UPDATE
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function CardMeta({ proposal, onPreview }) {
  const module = MODULES[proposal.moduleId]
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <TypeBadge type={proposal.type} />
          <span className="text-xs text-xeo-muted">
            Module {proposal.moduleId}
            {proposal.lessonId ? ` · ${proposal.lessonId}` : ''}
            {module ? ` — ${module.title}` : ''}
          </span>
        </div>
        <p className="font-semibold text-navy text-sm">{proposal.fieldLabel}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0 mt-0.5">
        {proposal.sourceUrl && (
          <a
            href={proposal.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-aria-600 hover:underline"
          >
            Source ↗
          </a>
        )}
        <button
          onClick={() => onPreview(proposal)}
          className="text-xs text-xeo-muted hover:text-navy border border-xeo-border rounded-lg px-2.5 py-1 transition-colors hover:bg-xeo-subtle"
        >
          View lesson
        </button>
      </div>
    </div>
  )
}

function CommentBubble({ comment }) {
  if (!comment) return null
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900 mb-4">
      <span className="font-semibold">Note: </span>{comment}
    </div>
  )
}

function ActionBar({ children }) {
  return <div className="flex flex-wrap gap-2 pt-4 border-t border-xeo-border">{children}</div>
}

// ─── Lesson Preview Panel ─────────────────────────────────────────────────────

function LessonPreview({ lesson, isTarget }) {
  const ref = useRef(null)
  useEffect(() => {
    if (isTarget && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [isTarget])

  return (
    <div
      ref={ref}
      className={`mb-4 rounded-xl p-4 border ${
        isTarget
          ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
          : 'bg-white border-xeo-border'
      }`}
    >
      {isTarget && (
        <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wider">
          ↑ Proposal targets this lesson
        </p>
      )}
      <h3 className="font-bold text-navy text-sm mb-2">{lesson.heading}</h3>
      {lesson.body && (
        <p className="text-sm text-xeo-muted leading-relaxed mb-3">{lesson.body}</p>
      )}
      {lesson.stats && lesson.stats.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {lesson.stats.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-xeo-muted">{s.label}</span>
              <span className="font-bold text-navy">{s.value}</span>
            </div>
          ))}
        </div>
      )}
      {lesson.platforms && lesson.platforms.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {lesson.platforms.map((p, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy">{p.name}</span>
              <span className="text-xeo-muted">{p.stat}</span>
            </div>
          ))}
        </div>
      )}
      {lesson.insight && (
        <div className="bg-aria-50 border border-aria-100 rounded-lg px-3 py-2 text-xs text-aria-800 mb-2">
          <span className="font-semibold">Insight: </span>{lesson.insight}
        </div>
      )}
      {lesson.callout && (
        <div className="bg-xeo-subtle border border-xeo-border rounded-lg px-3 py-2 text-xs text-xeo-muted">
          {lesson.callout.text}
        </div>
      )}
    </div>
  )
}

function PreviewPanel({ proposal, onClose }) {
  const module = MODULES[proposal.moduleId]
  const lessons = module?.lessons ?? []
  const hasTarget = !!proposal.lessonId

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-navy/20 z-30"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed right-0 top-0 h-full w-full max-w-lg bg-xeo-bg border-l border-xeo-border shadow-2xl z-40 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-xeo-bg border-b border-xeo-border px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-xeo-muted">Module {proposal.moduleId}</p>
            <h2 className="font-bold text-navy text-base">{module?.title ?? `Module ${proposal.moduleId}`}</h2>
            {!hasTarget && (
              <p className="text-xs text-xeo-muted mt-0.5">No specific lesson — showing all lessons</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/module/${proposal.moduleId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-aria-600 hover:underline border border-aria-200 rounded-lg px-2.5 py-1.5 bg-aria-50 transition-colors hover:bg-aria-100"
            >
              Open in course ↗
            </a>
            <button onClick={onClose} className="btn-ghost text-sm px-3 py-1.5">
              ✕ Close
            </button>
          </div>
        </div>

        {/* Context callout */}
        <div className="mx-5 mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 shrink-0">
          <span className="font-semibold">Proposal: </span>{proposal.fieldLabel}
        </div>

        {/* Before / After diff */}
        {(proposal.currentValue || proposal.proposedValue) && (() => {
          const trailing = proposal.currentValue
            ? findTrailingContext(proposal.moduleId, proposal.lessonId, proposal.currentValue)
            : null
          return (
            <div className="mx-5 mt-3 shrink-0 space-y-2">
              {proposal.currentValue && (
                <div>
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Before</p>
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm leading-relaxed">
                    <span className="text-navy">{proposal.currentValue}</span>
                    {trailing && <span className="text-xeo-muted opacity-50"> {trailing}</span>}
                  </div>
                </div>
              )}
              {proposal.proposedValue && (
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">After</p>
                  <div className="bg-green-50 border border-green-300 rounded-xl px-4 py-3 text-sm leading-relaxed">
                    <span className="text-navy">{safeString(proposal.proposedValue)}</span>
                    {trailing && <span className="text-xeo-muted opacity-50"> {trailing}</span>}
                  </div>
                </div>
              )}
              {trailing && (
                <p className="text-xs text-xeo-muted pb-1">Gray text shows the unchanged sentence that follows.</p>
              )}
            </div>
          )
        })()}

        {/* Lesson list */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {lessons.length === 0 ? (
            <p className="text-sm text-xeo-muted text-center mt-8">No lesson content found for this module.</p>
          ) : (
            lessons.map(lesson => (
              <LessonPreview
                key={lesson.id}
                lesson={lesson}
                isTarget={lesson.id === proposal.lessonId}
              />
            ))
          )}
        </div>
      </motion.div>
    </>
  )
}

// ─── Discard Modal ────────────────────────────────────────────────────────────

function DiscardModal({ proposal, onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  const [saving, setSaving] = useState(false)

  const handleConfirm = async () => {
    setSaving(true)
    await onConfirm(proposal.id, reason.trim() || null)
    setSaving(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card p-6 w-full max-w-md"
      >
        <h3 className="font-bold text-navy mb-1">Discard this proposal?</h3>
        <p className="text-xeo-muted text-sm mb-4">
          Adding a reason helps the research agent avoid re-suggesting this in future sweeps.
        </p>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          rows={3}
          autoFocus
          placeholder="Optional: why are you discarding this? (e.g. too technical, already covered, intentional editorial choice)"
          className="w-full border-2 border-xeo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400 resize-none mb-4 transition-colors"
        />
        <div className="flex gap-3">
          <button onClick={onClose} disabled={saving} className="btn-secondary flex-1">Cancel</button>
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            {saving ? 'Discarding…' : 'Discard'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Comment Modal ────────────────────────────────────────────────────────────

function CommentModal({ proposal, onSave, onClose }) {
  const [text, setText]             = useState(proposal.comment || '')
  const [requestRevision, setRevision] = useState(true)
  const [saving, setSaving]         = useState(false)
  const [revising, setRevising]     = useState(false)

  const canRevise = proposal.type === 'UPDATE' && !!proposal.proposedValue

  const handleSave = async () => {
    if (requestRevision && canRevise && text.trim()) {
      setRevising(true)
      try {
        const res = await fetch('/api/revise-proposal', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ proposal, comment: text }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Revision failed')
        setSaving(true)
        await onSave(proposal.id, text, data.revisedProposedValue)
      } catch (err) {
        await onSave(proposal.id, text, null)
      } finally {
        setRevising(false)
        setSaving(false)
      }
    } else {
      setSaving(true)
      await onSave(proposal.id, text, null)
      setSaving(false)
    }
  }

  const busy = saving || revising

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card p-6 w-full max-w-md"
      >
        <h3 className="font-bold text-navy mb-1">Add a comment</h3>
        <p className="text-xeo-muted text-sm mb-4">Describe what needs changing — optionally have AI revise the proposal based on your feedback.</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          autoFocus
          placeholder="Notes, corrections, context…"
          className="w-full border-2 border-xeo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-flame-500 resize-none mb-4 transition-colors"
        />

        {canRevise && (
          <label className="flex items-start gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={requestRevision}
              onChange={e => setRevision(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-xeo-border accent-flame-600"
            />
            <div>
              <p className="text-sm font-semibold text-navy">Request AI revision</p>
              <p className="text-xs text-xeo-muted mt-0.5">
                Claude will rewrite the proposed text based on your feedback. You can still edit the result before approving.
              </p>
            </div>
          </label>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} disabled={busy} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleSave} disabled={busy || !text.trim()} className="btn-primary flex-1">
            {revising ? '✦ Revising…' : saving ? 'Saving…' : requestRevision && canRevise ? '✦ Revise & save' : 'Save comment'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── UPDATE Card ──────────────────────────────────────────────────────────────

function buildUpdateCursorPrompt(proposal) {
  const mod = MODULES[proposal.moduleId]
  const modTitle = mod ? `Module ${proposal.moduleId}: "${mod.title}"` : `Module ${proposal.moduleId}`
  const lessonHint = proposal.lessonId ? ` (lesson \`${proposal.lessonId}\`)` : ''

  return [
    `# Claude Mastery Academy — Update content in ${modTitle}`,
    '',
    `## What to update`,
    `**Field:** ${proposal.fieldLabel}${lessonHint}`,
    '',
    `## Proposed replacement text`,
    proposal.proposedValue || '(see reason below)',
    '',
    `## Why`,
    proposal.reason,
    proposal.sourceUrl ? `\n## Source\n\n${proposal.sourceUrl}` : '',
    '',
    `## How to apply`,
    `Open \`src/data/modules.js\` and find ${modTitle}${lessonHint}.`,
    `Locate the content described above and replace it with the proposed text.`,
    `Keep surrounding structure (arrays, objects, commas) intact.`,
    '',
    `## Tone and style`,
    `- Audience: B2B marketing managers. Non-technical.`,
    `- Voice: Confident, clear. No jargon. No em dashes.`,
    '',
    `## After editing`,
    `Run \`npm run dev\` and preview the change locally. Then commit and push:`,
    `\`git add src/data/modules.js && git commit -m "Update ${proposal.fieldLabel}" && git push origin main\``,
    `Return to the review dashboard and click **Mark as done**.`,
  ].filter(l => l !== null).join('\n')
}

function safeString(val) {
  if (val === null || val === undefined) return ''
  if (typeof val === 'object') return val.body ?? val.heading ?? JSON.stringify(val)
  return String(val)
}

function UpdateCard({ proposal, onApprove, onComment, onDiscard, onPreview, loading }) {
  const [editedText, setEditedText] = useState(safeString(proposal.proposedValue))
  const [aiRevised, setAiRevised]   = useState(!!proposal.aiRevised)
  const editRef = useRef(null)

  const noTarget = !proposal.currentValue

  // Initialise the contentEditable on mount
  useEffect(() => {
    if (editRef.current) {
      editRef.current.textContent = safeString(proposal.proposedValue)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync if parent updates proposedValue (after AI revision)
  useEffect(() => {
    const newText = safeString(proposal.proposedValue)
    setEditedText(newText)
    setAiRevised(!!proposal.aiRevised)
    // Push updated text into the DOM without disturbing cursor for normal edits
    if (proposal.aiRevised && editRef.current) {
      editRef.current.textContent = newText
    }
  }, [proposal.proposedValue, proposal.aiRevised])

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
      <CardMeta proposal={proposal} onPreview={onPreview} />

      <div className="bg-xeo-subtle rounded-xl px-4 py-3 text-sm text-xeo-muted mb-4 leading-relaxed">
        {proposal.reason}
      </div>

      {(() => {
        const trailing = proposal.currentValue
          ? findTrailingContext(proposal.moduleId, proposal.lessonId, proposal.currentValue)
          : null
        return (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Current */}
            <div>
              <p className="text-xs font-semibold text-xeo-muted uppercase tracking-wider mb-2">Current</p>
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm leading-relaxed min-h-[88px]">
                {proposal.currentValue
                  ? <><span className="text-navy">{proposal.currentValue}</span>{trailing && <span className="text-xeo-muted opacity-50"> {trailing}</span>}</>
                  : <span className="text-xeo-muted italic">Not identified — use &quot;View lesson&quot; for context</span>}
              </div>
            </div>
            {/* Proposed */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-xeo-muted uppercase tracking-wider">
                  Proposed <span className="normal-case font-normal text-xeo-muted">(edit if needed)</span>
                </p>
                {aiRevised && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    ✦ AI revised
                  </span>
                )}
              </div>
              {/* Editable proposed box with trailing context */}
              <div
                className="bg-green-50 border-2 border-green-200 focus-within:border-green-400 rounded-xl px-4 py-3 text-sm leading-relaxed min-h-[88px] cursor-text transition-colors"
                onClick={() => editRef.current?.focus()}
              >
                {!editedText && (
                  <span className="text-xeo-muted italic pointer-events-none select-none" contentEditable={false}>
                    Click to edit proposed text…
                  </span>
                )}
                <span
                  ref={editRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={e => setEditedText(e.currentTarget.textContent ?? '')}
                  className="text-navy outline-none"
                />
                {trailing && editedText && (
                  <span className="text-xeo-muted opacity-50" contentEditable={false}> {trailing}</span>
                )}
              </div>
            </div>
          </div>
        )
      })()}

      {noTarget && (
        <div className="callout-info mb-4 text-xs">
          <strong>Cannot auto-apply</strong> — the sweep didn&apos;t identify specific text to replace. Click <em>Approve</em> to queue a brief for Cursor. At your next session, you&apos;ll be prompted to implement it automatically.
        </div>
      )}

      <CommentBubble comment={proposal.comment} />

      <ActionBar>
        {noTarget ? (
          <button
            onClick={() => onApprove(proposal, null)}
            disabled={loading}
            className="btn-primary text-sm px-5 py-2.5 disabled:opacity-40"
          >
            {loading ? 'Saving…' : '✓ Approve — Cursor will implement this'}
          </button>
        ) : (
          <button
            onClick={() => onApprove(proposal, editedText)}
            disabled={loading || !editedText.trim()}
            className="btn-primary text-sm px-5 py-2.5 disabled:opacity-40"
          >
            {loading ? 'Applying…' : '✓ Approve & Apply'}
          </button>
        )}
        <button onClick={() => onComment(proposal)} className="btn-secondary text-sm px-4 py-2.5">
          💬 Comment
        </button>
        <button
          onClick={() => onDiscard(proposal)}
          className="btn-ghost text-sm px-4 py-2.5 text-red-600 hover:bg-red-50"
        >
          Discard
        </button>
      </ActionBar>
    </motion.div>
  )
}

// ─── ADD Card ─────────────────────────────────────────────────────────────────

function buildCursorPrompt(proposal) {
  const mod = MODULES[proposal.moduleId]
  const modTitle = mod ? `Module ${proposal.moduleId}: "${mod.title}"` : `Module ${proposal.moduleId}`
  const lessons = mod?.lessons || []
  const lastLesson = lessons[lessons.length - 1]
  const lastLessonId = lastLesson?.id ?? '(unknown)'
  const lastLessonHeading = lastLesson?.heading ?? '(unknown)'

  // Derive next lesson ID from the last one (e.g. l3_4 -> l3_5)
  const nextId = lastLessonId.replace(/(\d+)$/, n => String(Number(n) + 1))

  const lessonSchema = `{
  id: '${nextId}',           // next sequential id
  heading: 'Short, compelling heading',
  body: 'Core lesson text — written for non-technical B2B marketers, 2-4 sentences.',
  type: 'micro_lesson',      // or: narrative | stat_reveal | concept_point
  keyPoints: [
    {
      icon: '✦',
      text: 'Key point 1',
      // sourceUrl: 'https://...',  // optional
      // sourceLabel: 'Source name', // optional — shown as link label
    },
  ],
  // Optional: callout for a tip or stat
  // callout: { type: 'tip' | 'stat' | 'warning', text: '...' }
}`

  return [
    `# Claude Mastery Academy — Add new lesson to ${modTitle}`,
    '',
    `## What to add`,
    proposal.proposedValue || proposal.fieldLabel,
    '',
    `## Why`,
    proposal.reason,
    proposal.sourceUrl ? `\nSource: ${proposal.sourceUrl}` : '',
    '',
    `## Where to insert it`,
    `Open \`src/data/modules.js\` and find ${modTitle}.`,
    `The last lesson is **${lastLessonId}** ("${lastLessonHeading}").`,
    `Insert the new lesson directly after it, using the ID \`${nextId}\`.`,
    '',
    `## Lesson schema to use`,
    '```js',
    lessonSchema,
    '```',
    '',
    `## Tone and style`,
    `- Audience: B2B marketing managers and content strategists. Non-technical.`,
    `- Voice: Confident and clear. No jargon. No em dashes.`,
    `- Length: 2-4 sentences for body. 3-5 key points max.`,
    `- Do not add developer-level detail (no code, no ML architecture).`,
    '',
    `## After adding the lesson`,
    `1. Run \`npm run dev\` and navigate to Module ${proposal.moduleId} to preview it locally.`,
    `2. If it looks right, commit and push to GitHub.`,
    `3. Return to the review dashboard and click "Mark as done" on this proposal.`,
  ].filter(Boolean).join('\n')
}

function AddCard({ proposal, onApprove, onComment, onDiscard, onPreview, loading }) {
  // #region agent log
  fetch('http://127.0.0.1:7468/ingest/a68a55a8-2302-4a50-9560-283578b0290e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'68bdee'},body:JSON.stringify({sessionId:'68bdee',location:'ReviewDashboard.jsx:AddCard',message:'AddCard render',data:{id:proposal.id,proposedValueType:typeof proposal.proposedValue,isObject:typeof proposal.proposedValue==='object'&&proposal.proposedValue!==null},hypothesisId:'A',runId:'run1',timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const safeProposedValue = safeString(proposal.proposedValue)
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
      <CardMeta proposal={proposal} onPreview={onPreview} />

      <div className="bg-xeo-subtle rounded-xl px-4 py-3 text-sm text-xeo-muted mb-4 leading-relaxed">
        {proposal.reason}
      </div>

      {safeProposedValue && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-navy mb-4">
          <p className="text-xs font-semibold text-green-800 mb-1.5">Proposed content:</p>
          {safeProposedValue}
        </div>
      )}

      <div className="callout-info mb-4 text-xs">
        <strong>A lesson brief has been queued for Cursor.</strong> Click <em>Approve</em> to confirm this should be built. At your next Cursor session, you&apos;ll be prompted to build it automatically — no copy-paste needed.
      </div>

      <CommentBubble comment={proposal.comment} />

      <ActionBar>
        <button
          onClick={() => onApprove(proposal, null)}
          disabled={loading}
          className="btn-primary text-sm px-5 py-2.5 disabled:opacity-40"
        >
          {loading ? 'Saving…' : '✓ Approve — Cursor will build this'}
        </button>
        <button onClick={() => onComment(proposal)} className="btn-secondary text-sm px-4 py-2.5">
          💬 Comment
        </button>
        <button
          onClick={() => onDiscard(proposal)}
          className="btn-ghost text-sm px-4 py-2.5 text-red-600 hover:bg-red-50"
        >
          Discard
        </button>
      </ActionBar>
    </motion.div>
  )
}

// ─── REMOVE Card ──────────────────────────────────────────────────────────────

function RemoveCard({ proposal, onApprove, onComment, onDiscard, onPreview, loading }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
      <CardMeta proposal={proposal} onPreview={onPreview} />

      <div className="bg-xeo-subtle rounded-xl px-4 py-3 text-sm text-xeo-muted mb-4 leading-relaxed">
        {proposal.reason}
      </div>

      {proposal.currentValue && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm mb-4">
          <p className="text-xs font-semibold text-red-700 mb-2">Content to be removed:</p>
          <p className="line-through text-red-900/60 leading-relaxed">{proposal.currentValue}</p>
        </div>
      )}

      <CommentBubble comment={proposal.comment} />

      <ActionBar>
        <button
          onClick={() => onApprove(proposal, null)}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          {loading ? 'Applying…' : '🗑️ Approve Removal'}
        </button>
        <button onClick={() => onComment(proposal)} className="btn-secondary text-sm px-4 py-2.5">
          💬 Comment
        </button>
        <button
          onClick={() => onDiscard(proposal)}
          className="btn-ghost text-sm px-4 py-2.5 text-red-600 hover:bg-red-50"
        >
          Discard
        </button>
      </ActionBar>
    </motion.div>
  )
}

// ─── Resolved Row ─────────────────────────────────────────────────────────────

const STATUS_STYLE = {
  applied:   { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  label: 'Applied',   icon: '✓' },
  approved:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  label: 'Approved',  icon: '✓' },
  discarded: { bg: 'bg-gray-50',   border: 'border-gray-200',   text: 'text-gray-500',   label: 'Discarded', icon: '×' },
}

function ResolvedRow({ proposal }) {
  const s = STATUS_STYLE[proposal.status] ?? STATUS_STYLE.discarded
  return (
    <div className={`border rounded-xl px-4 py-3 flex items-center gap-3 ${s.bg} ${s.border}`}>
      <span className={`text-sm font-bold w-4 text-center shrink-0 ${s.text}`}>{s.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <TypeBadge type={proposal.type} />
          <span className="text-xs text-xeo-muted">Module {proposal.moduleId}</span>
          <span className={`text-xs font-semibold ${s.text}`}>{s.label}</span>
        </div>
        <p className="text-sm text-navy truncate">{proposal.fieldLabel}</p>
      </div>
      {proposal.resolvedAt && (
        <span className="text-xs text-xeo-muted shrink-0">
          {new Date(proposal.resolvedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </span>
      )}
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyPending() {
  return (
    <div className="card p-16 text-center">
      <div className="text-5xl mb-4">✅</div>
      <p className="font-bold text-navy">All caught up</p>
      <p className="text-xeo-muted text-sm mt-2 max-w-xs mx-auto">
        No pending proposals. New ones appear here after the weekly content sweep runs every Monday.
      </p>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function ReviewDashboard() {
  const [authed, setAuthed]           = useState(() => {
    if (!REVIEW_KEY) return true
    return localStorage.getItem('review_authed') === 'true'
  })
  const [proposals, setProposals]     = useState([])
  const [loading, setLoading]         = useState(true)
  const [fetchError, setFetchError]   = useState(null)
  const [tab, setTab]                 = useState('pending')
  const [commentTarget, setComment]   = useState(null)
  const [discardTarget, setDiscard]   = useState(null)
  const [previewProposal, setPreview] = useState(null)
  const [applyingId, setApplyingId]   = useState(null)
  const [toast, setToast]             = useState(null)

  const handleAuth = () => {
    localStorage.setItem('review_authed', 'true')
    setAuthed(true)
  }

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4500)
  }

  const fetchProposals = useCallback(async () => {
    setLoading(true)
    setFetchError(null)
    try {
      const res = await fetch('/api/proposals')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setProposals(data.proposals ?? [])
    } catch (err) {
      setFetchError(`Could not load proposals: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { if (authed) fetchProposals() }, [authed, fetchProposals])

  // Close preview panel on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setPreview(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleApprove = async (proposal, approvedText) => {
    setApplyingId(proposal.id)
    try {
      const res = await fetch('/api/apply-change', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ proposal, approvedText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Unknown error')

      // Optimistically update local state immediately so the card disappears
      // even if the subsequent GitHub refetch returns a briefly stale response
      const resolvedAt = new Date().toISOString()
      setProposals(ps => ps.map(p =>
        p.id === proposal.id ? { ...p, status: 'applied', resolvedAt } : p
      ))

      if (data.action === 'noted') {
        showToast('Queued for Cursor — will be built at next session.')
      } else {
        showToast('Change applied — Vercel will deploy shortly.')
      }

      // Background refetch to sync any other changes, but UI is already correct
      fetchProposals()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setApplyingId(null)
    }
  }

  const handleDiscard = async (id, reason) => {
    try {
      const patch = { id, status: 'discarded' }
      if (reason) patch.discardReason = reason
      const res = await fetch('/api/proposals', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('Failed to discard')
      showToast('Proposal discarded.')
      setDiscard(null)
      setProposals(p => p.map(x => x.id === id ? { ...x, status: 'discarded', discardReason: reason, resolvedAt: new Date().toISOString() } : x))
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleSaveComment = async (id, comment, revisedProposedValue) => {
    try {
      const patch = { id, status: 'pending', comment }
      if (revisedProposedValue) patch.proposedValue = revisedProposedValue

      const res = await fetch('/api/proposals', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('Failed to save comment')

      showToast(revisedProposedValue ? '✦ AI revised the proposal.' : 'Comment saved.')
      setComment(null)
      setProposals(p => p.map(x =>
        x.id === id
          ? { ...x, comment, ...(revisedProposedValue ? { proposedValue: revisedProposedValue, aiRevised: true } : {}) }
          : x
      ))
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />

  const pending  = proposals.filter(p => p.status === 'pending')
  const resolved = proposals.filter(p => p.status !== 'pending')
  const approvedCount = resolved.filter(p => p.status === 'applied' || p.status === 'approved').length

  return (
    <div className="min-h-screen bg-xeo-bg">
      {/* Header */}
      <div className="bg-white border-b border-xeo-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-flame-50 border border-flame-200 rounded-xl flex items-center justify-center text-lg">
              📋
            </div>
            <div>
              <h1 className="text-base font-bold text-navy leading-tight">Content Review</h1>
              <p className="text-xs text-xeo-muted">Claude Mastery Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-xeo-muted hover:text-navy transition-colors">
              ← Back to course
            </a>
            <button
              onClick={() => { localStorage.removeItem('review_authed'); setAuthed(false) }}
              className="btn-ghost text-xs py-1.5 px-3"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: pending.length,   label: 'Pending review',    color: 'text-flame-600' },
            { value: approvedCount,    label: 'Approved & applied', color: 'text-green-600' },
            { value: resolved.filter(p => p.status === 'discarded').length, label: 'Discarded', color: 'text-xeo-muted' },
          ].map(stat => (
            <div key={stat.label} className="card p-4 text-center">
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-xeo-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-xeo-subtle rounded-xl p-1 w-fit">
          {[
            { id: 'pending',  label: `Pending (${pending.length})` },
            { id: 'resolved', label: `Resolved (${resolved.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t.id ? 'bg-white text-navy shadow-sm' : 'text-xeo-muted hover:text-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading && (
          <div className="card p-16 text-center text-xeo-muted text-sm">Loading proposals…</div>
        )}

        {fetchError && !loading && (
          <div className="callout-danger">
            {fetchError}. Check that <code className="font-mono text-xs">public/proposals.json</code> exists in the repository.
          </div>
        )}

        {!loading && !fetchError && tab === 'pending' && (
          <div className="space-y-6">
            {pending.length === 0 ? <EmptyPending /> : pending.map(p => {
              const isLoading = applyingId === p.id
              if (p.type === 'ADD')    return <AddCard    key={p.id} proposal={p} onApprove={handleApprove} onComment={setComment} onDiscard={setDiscard} onPreview={setPreview} loading={isLoading} />
              if (p.type === 'REMOVE') return <RemoveCard key={p.id} proposal={p} onApprove={handleApprove} onComment={setComment} onDiscard={setDiscard} onPreview={setPreview} loading={isLoading} />
              return <UpdateCard key={p.id} proposal={p} onApprove={handleApprove} onComment={setComment} onDiscard={setDiscard} onPreview={setPreview} loading={isLoading} />
            })}
          </div>
        )}

        {!loading && !fetchError && tab === 'resolved' && (
          <div className="space-y-3">
            {resolved.length === 0 ? (
              <div className="card p-16 text-center">
                <p className="text-xeo-muted text-sm">No resolved proposals yet.</p>
              </div>
            ) : (
              resolved.map(p => <ResolvedRow key={p.id} proposal={p} />)
            )}
          </div>
        )}
      </div>

      {/* Preview panel */}
      <AnimatePresence>
        {previewProposal && (
          <PreviewPanel proposal={previewProposal} onClose={() => setPreview(null)} />
        )}
      </AnimatePresence>

      {/* Discard modal */}
      <AnimatePresence>
        {discardTarget && (
          <DiscardModal
            proposal={discardTarget}
            onConfirm={handleDiscard}
            onClose={() => setDiscard(null)}
          />
        )}
      </AnimatePresence>

      {/* Comment modal */}
      <AnimatePresence>
        {commentTarget && (
          <CommentModal
            proposal={commentTarget}
            onSave={handleSaveComment}
            onClose={() => setComment(null)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className={`fixed bottom-6 right-6 max-w-sm px-5 py-3 rounded-xl shadow-lg text-white text-sm font-semibold z-50 ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
