import { motion } from 'framer-motion'
import { getBuildAlong } from '../../data/build-along'

export function BuildAlong({ moduleId, onComplete }) {
  const step = getBuildAlong(moduleId)

  // If no build-along data for this module, skip straight through
  if (!step) {
    onComplete()
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header card */}
      <div className="card overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-flame-50 to-transparent px-6 py-5 border-b border-xeo-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-flame-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <div className="text-flame-600 text-xs font-bold uppercase tracking-widest">Build Along</div>
              <div className="text-sm font-semibold text-navy">Now try it yourself in Claude</div>
            </div>
          </div>
          <p className="text-sm font-semibold text-navy leading-snug">{step.concept}</p>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          {step.steps.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-flame-100 border border-flame-200 flex items-center justify-center text-xs font-bold text-flame-700 shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <div className="text-sm font-semibold text-navy mb-0.5">{item.title}</div>
                <div className="text-xs text-xeo-muted leading-relaxed">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <a
            href={step.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3 text-sm text-center flex items-center justify-center gap-2"
          >
            {step.ctaLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Done button */}
      <button
        onClick={onComplete}
        className="w-full py-4 text-sm font-semibold text-xeo-muted hover:text-navy border border-xeo-border rounded-2xl transition-colors hover:border-navy/30"
      >
        Done — mark complete →
      </button>
    </motion.div>
  )
}
