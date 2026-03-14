import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DISCIPLINE_COLORS = {
  SEO: { bg: 'bg-aria-100',    border: 'border-aria-400',    text: 'text-aria-700'    },
  AEO: { bg: 'bg-jasper-100',  border: 'border-jasper-400',  text: 'text-jasper-700'  },
  GEO: { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700' },
}

const DISCIPLINE_SUBTITLES = {
  SEO: 'Gets you found',
  AEO: 'Gets you cited',
  GEO: 'Gets you trusted',
}

const DISCIPLINES = ['SEO', 'AEO', 'GEO']

export function MatchingGame({ prompt, pairs, onComplete }) {
  const [selected, setSelected]   = useState(null)
  const [answers, setAnswers]     = useState({})
  const [wrongs, setWrongs]       = useState({})
  const [finished, setFinished]   = useState(false)

  const handleScenario = (idx) => {
    if (answers[idx]) return
    setSelected(selected === idx ? null : idx)
  }

  const handleDiscipline = (disc) => {
    if (selected === null) return
    const correct = pairs[selected].discipline === disc
    if (correct) {
      const newAnswers = { ...answers, [selected]: disc }
      setAnswers(newAnswers)
      setSelected(null)
      if (Object.keys(newAnswers).length === pairs.length) {
        setTimeout(() => setFinished(true), 600)
      }
    } else {
      setWrongs(w => ({ ...w, [selected]: true }))
      setTimeout(() => setWrongs(w => { const n = { ...w }; delete n[selected]; return n }), 500)
    }
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
        <div className="lesson-card mb-5">
          <div className="text-5xl mb-3">🎯</div>
          <div className="text-xl font-bold mb-2 text-navy">Perfect match!</div>
          <div className="text-xeo-muted text-sm mb-5">You correctly categorised all {pairs.length} scenarios.</div>
          <div className="space-y-2 text-left">
            {pairs.map((p, i) => {
              const c = DISCIPLINE_COLORS[p.discipline] || {}
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${c.border} ${c.bg}`}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border} shrink-0 mt-0.5`}>
                    {p.discipline}
                  </span>
                  <span className="text-sm text-navy">{p.scenario}</span>
                </div>
              )
            })}
          </div>
        </div>
        <button onClick={onComplete} className="btn-primary w-full py-4">Continue →</button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Instructions */}
      <p className="text-xeo-muted text-sm mb-1">{prompt}</p>
      <p className="text-xs text-xeo-muted mb-5">
        Click a scenario to reveal the discipline options, then select the correct one.
      </p>

      {/* Scenario cards */}
      <div className="space-y-2">
        {pairs.map((p, idx) => {
          const answered   = answers[idx]
          const isSelected = selected === idx
          const isWrong    = wrongs[idx]
          const c          = DISCIPLINE_COLORS[answered] || {}

          return (
            <motion.div
              key={idx}
              animate={isWrong ? { x: [-8, 8, -8, 0] } : {}}
              transition={{ duration: 0.25 }}
            >
              {/* Scenario row */}
              <button
                onClick={() => handleScenario(idx)}
                disabled={!!answered}
                className={`w-full text-left p-4 border-2 transition-all duration-150 text-sm
                  ${isSelected
                    ? 'rounded-t-xl rounded-b-none border-b-0 border-flame-500 bg-flame-50'
                    : answered
                      ? `rounded-xl cursor-default ${c.border} ${c.bg}`
                      : isWrong
                        ? 'rounded-xl border-red-400 bg-red-50'
                        : 'rounded-xl border-xeo-border hover:border-flame-400 hover:bg-flame-50 cursor-pointer'
                  }`}
              >
                <div className="flex items-start gap-3">
                  {answered ? (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${c.bg} ${c.text} border ${c.border}`}>
                      {answered}
                    </span>
                  ) : (
                    <span className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold
                      ${isSelected
                        ? 'border-flame-500 bg-flame-100 text-flame-700'
                        : 'border-xeo-muted text-xeo-muted'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                  )}
                  <span className="text-navy">{p.scenario}</span>
                </div>
              </button>

              {/* Inline discipline picker — expands below selected card */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="border-2 border-t-0 border-flame-500 rounded-b-xl bg-white px-3 pt-3 pb-3">
                      <p className="text-[11px] text-xeo-muted font-medium mb-2 uppercase tracking-wide">
                        Which discipline does this represent?
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {DISCIPLINES.map(disc => {
                          const dc = DISCIPLINE_COLORS[disc]
                          return (
                            <motion.button
                              key={disc}
                              onClick={(e) => { e.stopPropagation(); handleDiscipline(disc) }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              className={`p-3 rounded-lg border-2 text-center cursor-pointer transition-opacity
                                ${dc.border} ${dc.bg}`}
                            >
                              <div className={`text-sm font-black ${dc.text}`}>{disc}</div>
                              <div className={`text-[10px] mt-0.5 ${dc.text} opacity-70`}>
                                {DISCIPLINE_SUBTITLES[disc]}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div className="text-xs text-xeo-muted text-center mt-4">
        {Object.keys(answers).length} / {pairs.length} matched
      </div>
    </div>
  )
}
