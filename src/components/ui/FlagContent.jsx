import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useParams } from 'react-router-dom'
import { submitFlag } from '../../lib/flag'

const REASONS = [
  { id: 'outdated',   label: 'Out of date',      icon: '📅' },
  { id: 'incorrect',  label: 'Incorrect',         icon: '❌' },
  { id: 'improve',    label: 'Could be improved', icon: '💡' },
  { id: 'other',      label: 'Something else',    icon: '💬' },
]

const HINT_KEY = 'aisv_flag_hint_seen'

export function FlagContent() {
  const location = useLocation()
  const { id: moduleId } = useParams()

  const [open,     setOpen]     = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [reason,   setReason]   = useState(null)
  const [comment,  setComment]  = useState('')
  const [status,   setStatus]   = useState('idle') // idle | saving | done | error

  useEffect(() => {
    if (!localStorage.getItem(HINT_KEY)) {
      const t = setTimeout(() => setShowHint(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const dismissHint = () => {
    localStorage.setItem(HINT_KEY, '1')
    setShowHint(false)
  }

  const openModal = () => {
    dismissHint()
    setOpen(true)
  }

  const reset = () => {
    setReason(null)
    setComment('')
    setStatus('idle')
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!reason) return
    setStatus('saving')
    try {
      await submitFlag({
        moduleId: moduleId ? Number(moduleId) : null,
        pageUrl:  location.pathname,
        reason,
        comment,
      })
      setStatus('done')
      setTimeout(reset, 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* First-visit hint callout */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="fixed bottom-20 right-6 z-40 w-72 bg-navy text-white rounded-2xl shadow-xl px-4 py-3"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-navy rotate-45 rounded-sm" />
            <p className="text-xs leading-relaxed text-white/90">
              If you spot anything that's incorrect, out of date, or could be improved, tap the{' '}
              <span className="font-semibold text-white">🚩 flag</span> below to let us know.
            </p>
            <button
              onClick={dismissHint}
              className="mt-2.5 text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              Got it →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating flag button */}
      <button
        onClick={openModal}
        title="Flag this content"
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white border border-xeo-border
          shadow-md flex items-center justify-center text-base
          hover:border-amber-400 hover:shadow-lg transition-all duration-200 group"
      >
        <span className="group-hover:scale-110 transition-transform duration-150">🚩</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={reset}
            />
            <motion.div
              className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-2xl shadow-xl border border-xeo-border overflow-hidden"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <div className="px-5 py-4 border-b border-xeo-border flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-navy">Flag this content</div>
                  <div className="text-xs text-xeo-muted">Help us keep the course accurate</div>
                </div>
                <button onClick={reset} className="text-xeo-muted hover:text-navy transition-colors text-lg leading-none">×</button>
              </div>

              <div className="p-5 space-y-4">
                {status === 'done' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm font-semibold text-navy">Thanks for the flag!</div>
                    <div className="text-xs text-xeo-muted mt-1">We'll review this soon.</div>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {REASONS.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setReason(r.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all
                            ${reason === r.id
                              ? 'border-flame-500 bg-flame-50 text-flame-700'
                              : 'border-xeo-border hover:border-flame-300 text-navy'}`}
                        >
                          <span>{r.icon}</span>
                          <span>{r.label}</span>
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Add a note (optional)…"
                      rows={3}
                      className="w-full text-xs border border-xeo-border rounded-xl px-3 py-2.5 resize-none
                        focus:outline-none focus:border-flame-400 text-navy placeholder:text-xeo-muted transition-colors"
                    />

                    {status === 'error' && (
                      <p className="text-xs text-red-500">Something went wrong — please try again.</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={!reason || status === 'saving'}
                      className={`btn-primary w-full py-2.5 text-sm ${!reason || status === 'saving' ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {status === 'saving' ? 'Saving…' : 'Submit flag'}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
