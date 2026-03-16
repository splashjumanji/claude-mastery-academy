import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBuildAlong } from '../../data/build-along'

// Surface selector pill
function SurfacePill({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        active
          ? 'bg-flame-600 border-flame-600 text-white shadow-sm'
          : 'bg-xeo-subtle border-xeo-border text-xeo-muted hover:text-navy hover:border-navy/20'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export function BuildAlong({ moduleId, onComplete, plainLanguage = false }) {
  const step = getBuildAlong(moduleId)

  // Surface preference — terminal or app — persisted to localStorage
  const [surface, setSurface] = useState(() => localStorage.getItem('buildAlongSurface') || 'terminal')

  const selectSurface = (s) => {
    setSurface(s)
    localStorage.setItem('buildAlongSurface', s)
  }

  // Skip straight through if no build-along data for this module
  if (!step) {
    onComplete()
    return null
  }

  // Modules without surface split use a flat steps array
  const hasSurfaces = !!step.surfaces
  const currentSurface = hasSurfaces ? step.surfaces[surface] : null
  const steps = hasSurfaces ? (currentSurface?.steps ?? []) : (step.steps ?? [])
  const ctaLabel = hasSurfaces ? currentSurface?.ctaLabel : step.ctaLabel
  const ctaUrl   = hasSurfaces ? currentSurface?.ctaUrl   : step.ctaUrl

  // Non-developer + terminal = show extra notes on steps that have them
  const showNotes = plainLanguage && surface === 'terminal'

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
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-flame-600 flex items-center justify-center text-white shadow-sm shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-flame-600 text-xs font-bold uppercase tracking-widest mb-0.5">Build Along</div>
              <div className="text-sm font-semibold text-navy">Now try it yourself in Claude</div>
            </div>
          </div>

          <p className="text-sm font-semibold text-navy leading-snug mb-4">{step.concept}</p>

          {/* Surface selector — only for modules with dual paths */}
          {hasSurfaces && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-xeo-muted font-medium shrink-0">Working in:</span>
              <SurfacePill
                label="Terminal"
                icon="⌨️"
                active={surface === 'terminal'}
                onClick={() => selectSurface('terminal')}
              />
              <SurfacePill
                label="Desktop / Web"
                icon="🖥️"
                active={surface === 'app'}
                onClick={() => selectSurface('app')}
              />
            </div>
          )}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={surface}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 space-y-5"
          >
            {steps.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-flame-100 border border-flame-200 flex items-center justify-center text-xs font-bold text-flame-700 shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-navy mb-0.5">{item.title}</div>
                  <div className="text-xs text-xeo-muted leading-relaxed">{item.detail}</div>
                  {/* Extra hand-holding note for non-developers on terminal path */}
                  {showNotes && item.note && (
                    <div className="mt-2 text-xs text-navy/50 leading-relaxed border-l-2 border-amber-200 pl-3 bg-amber-50/50 py-1.5 rounded-r-lg">
                      💡 {item.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        {ctaUrl && (
          <div className="px-6 pb-6">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-sm text-center flex items-center justify-center gap-2"
            >
              {ctaLabel}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )}
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
