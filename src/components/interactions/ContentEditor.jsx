import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FIX_LABELS = {
  question_heading:  { label: 'Question heading', color: 'text-aria-700',    bg: 'bg-aria-50' },
  answer_first:      { label: 'Answer-first',      color: 'text-green-700',   bg: 'bg-green-50' },
  has_stats:         { label: 'Statistics',         color: 'text-jasper-700',  bg: 'bg-jasper-50' },
  right_length:      { label: '40-60 words',        color: 'text-emerald-700', bg: 'bg-emerald-50' },
}

const PROBLEM_LABELS = {
  no_direct_answer: { label: 'No direct answer', color: 'text-red-600' },
  vague_heading:    { label: 'Vague heading',    color: 'text-orange-600' },
  too_long:         { label: 'Too long',          color: 'text-amber-700' },
  no_stats:         { label: 'No statistics',    color: 'text-red-600' },
  not_answer_first: { label: 'Not answer-first', color: 'text-orange-600' },
}

function wordCount(text) {
  return text.trim().split(/\s+/).length
}

function CitationScore({ score }) {
  const color = score < 30 ? 'bg-red-500' : score < 60 ? 'bg-amber-500' : 'bg-green-500'
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-xeo-muted font-semibold">Citation Score</span>
      <div className="flex-1 progress-bar">
        <motion.div
          className={`progress-fill ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <span className="text-sm font-bold w-8 text-right">{score}%</span>
    </div>
  )
}

export function ContentEditor({ title, instruction, originalContent, fixedContent, onComplete }) {
  const [view, setView] = useState('before')
  const [activeAnnotation, setActiveAnnotation] = useState(null)
  const [step, setStep] = useState('intro')

  const beforeScore = 8
  const afterScore = 78

  if (step === 'intro') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <div className="lesson-card mb-5">
          <div className="text-3xl mb-3">✍️</div>
          <h2 className="text-xl font-bold mb-2 text-navy">{title}</h2>
          <p className="text-xeo-muted text-sm mb-5">{instruction}</p>
          <CitationScore score={beforeScore} />
          <p className="text-xs text-xeo-muted mt-3">Aria's current blog post scores {beforeScore}% for AI citation readiness. Let's transform it.</p>
        </div>
        <button onClick={() => setStep('compare')} className="btn-primary w-full py-4">See the transformation →</button>
      </motion.div>
    )
  }

  if (step === 'compare') {
    const content = view === 'before' ? originalContent : fixedContent
    const score = view === 'before' ? beforeScore : afterScore

    return (
      <div className="max-w-2xl mx-auto">
        {/* Toggle */}
        <div className="flex gap-2 mb-4 card p-1.5">
          {['before', 'after'].map(v => (
            <button
              key={v}
              onClick={() => { setView(v); setActiveAnnotation(null) }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                view === v ? 'bg-flame-600 text-white' : 'text-xeo-muted hover:text-navy'
              }`}
            >
              {v === 'before' ? '❌ Before' : '✅ After'}
            </button>
          ))}
        </div>

        <div className="mb-3">
          <CitationScore score={score} />
        </div>

        {/* Content display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-5 mb-4"
          >
            <h3 className="font-bold text-base mb-4 text-navy border-b border-xeo-border pb-3">{content.title}</h3>

            {content.sections.map((section, i) => {
              const isActive = activeAnnotation === section.id
              return (
                <div
                  key={section.id}
                  className={`mb-4 p-3 rounded-xl cursor-pointer transition-all border ${
                    isActive ? 'border-flame-300 bg-flame-50' : 'border-transparent hover:border-xeo-border'
                  }`}
                  onClick={() => setActiveAnnotation(isActive ? null : section.id)}
                >
                  <div className="flex items-start gap-2 flex-wrap mb-2">
                    <h4 className="font-semibold text-sm text-navy">{section.heading}</h4>
                    {/* Problem/fix tags */}
                    <div className="flex flex-wrap gap-1">
                      {view === 'before' && section.problems?.map(p => {
                        const def = PROBLEM_LABELS[p]
                        return def ? (
                          <span key={p} className={`text-xs px-1.5 py-0.5 rounded bg-red-50 border border-red-200 ${def.color}`}>
                            ⚠ {def.label}
                          </span>
                        ) : null
                      })}
                      {view === 'after' && section.fixes?.map(f => {
                        const def = FIX_LABELS[f]
                        return def ? (
                          <span key={f} className={`text-xs px-1.5 py-0.5 rounded border border-xeo-border ${def.bg} ${def.color}`}>
                            ✓ {def.label}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                  <p className="text-xs text-xeo-muted leading-relaxed">{section.text}</p>
                  {view === 'after' && (
                    <div className="text-xs text-xeo-muted mt-1">{wordCount(section.text)} words</div>
                  )}

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-xeo-border"
                      >
                        <div className="text-xs text-xeo-muted leading-relaxed">
                          💡 {section.annotation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* FAQ section (after only) */}
            {view === 'after' && fixedContent.faqSection && (
              <div
                className={`mt-4 p-3 rounded-xl cursor-pointer transition-all border ${
                  activeAnnotation === 'faq' ? 'border-jasper-300 bg-jasper-50' : 'border-dashed border-xeo-border hover:border-jasper-400'
                }`}
                onClick={() => setActiveAnnotation(activeAnnotation === 'faq' ? null : 'faq')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-sm text-navy">{fixedContent.faqSection.heading}</h4>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-jasper-50 text-jasper-700 border border-jasper-200">
                    ✓ FAQPage Schema
                  </span>
                </div>
                {fixedContent.faqSection.items.map((item, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-xs font-semibold text-navy">Q: {item.q}</div>
                    <div className="text-xs text-xeo-muted mt-0.5">A: {item.a}</div>
                  </div>
                ))}
                <AnimatePresence>
                  {activeAnnotation === 'faq' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-jasper-200 text-xs text-jasper-700"
                    >
                      💡 {fixedContent.faqSection.annotation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-xs text-xeo-muted text-center mb-4">
          {view === 'before' ? 'Click any section to see why it hurts citation rates' : 'Click any section to see why this improves citation rates'}
        </div>

        {view === 'after' ? (
          <button onClick={() => onComplete()} className="btn-primary w-full py-4">Continue →</button>
        ) : (
          <button onClick={() => setView('after')} className="btn-primary w-full py-4">
            See the optimized version →
          </button>
        )}
      </div>
    )
  }

  return null
}
