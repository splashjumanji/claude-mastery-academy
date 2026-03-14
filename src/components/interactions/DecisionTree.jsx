import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function DecisionTree({ title, description, scenarios, onComplete }) {
  const [step, setStep] = useState(0)
  const [results, setResults] = useState([])
  const [chosen, setChosen] = useState(null)
  const [done, setDone] = useState(false)

  const current = scenarios[step]
  const score = results.filter(r => r.correct).length

  const handleChoice = (option) => {
    setChosen(option)
  }

  const handleNext = () => {
    setResults(r => [...r, { scenario: current.content, choice: chosen.label, correct: chosen.correct }])
    if (step + 1 >= scenarios.length) {
      setDone(true)
    } else {
      setStep(s => s + 1)
      setChosen(null)
    }
  }

  if (done) {
    const pct = Math.round((score / scenarios.length) * 100)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
        <div className="lesson-card mb-5">
          <div className="text-5xl mb-3">{pct === 100 ? '🎯' : pct >= 50 ? '👍' : '📚'}</div>
          <div className="text-xl font-bold mb-2 text-navy">{score} / {scenarios.length} correct</div>
          <div className="text-xeo-muted text-sm mb-5">
            {pct === 100 ? 'Perfect decisions — you know exactly how to optimize for AI systems!' : 'Review the explanations below to sharpen your strategy.'}
          </div>
          <div className="space-y-3 text-left">
            {results.map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border text-sm ${r.correct ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{r.correct ? '✅' : '❌'}</span>
                  <span className="text-xs text-xeo-muted">Scenario {i+1}</span>
                </div>
                <div className="font-semibold mb-1 text-navy">{r.scenario.slice(0, 60)}...</div>
                <div className="text-xs text-xeo-muted">You chose: <span className="font-medium text-navy">{r.choice}</span></div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => onComplete(pct)} className="btn-primary w-full py-4">Continue →</button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xeo-muted text-sm mb-4">{description}</p>

      {/* Step indicator */}
      <div className="flex gap-1.5 mb-5">
        {scenarios.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < step ? 'bg-green-500' : i === step ? 'bg-flame-600' : 'bg-xeo-border'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lesson-card mb-4"
        >
          <div className="text-xs text-flame-600 font-bold mb-2 uppercase tracking-wide">Scenario {step + 1} of {scenarios.length}</div>
          <div className="bg-aria-50 border border-aria-200 rounded-xl p-3 mb-4 text-sm font-medium text-navy leading-relaxed">
            "{current.content}"
          </div>
          <h3 className="font-bold text-base mb-4 text-navy">{current.question}</h3>

          <div className="space-y-2.5">
            {current.options.map((opt, i) => {
              const isChosen = chosen?.label === opt.label
              return (
                <button
                  key={i}
                  onClick={() => !chosen && handleChoice(opt)}
                  disabled={!!chosen}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm
                    ${isChosen
                      ? opt.correct ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50'
                      : chosen && opt.correct ? 'border-green-400 bg-green-50'
                      : chosen ? 'border-xeo-border opacity-40'
                      : 'border-xeo-border hover:border-flame-400 hover:bg-flame-50 cursor-pointer'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0
                      ${isChosen && opt.correct ? 'border-green-500 bg-green-500 text-white' :
                        isChosen && !opt.correct ? 'border-red-500 bg-red-500 text-white' :
                        chosen && opt.correct ? 'border-green-500 text-green-600' :
                        'border-xeo-muted text-xeo-muted'}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium text-navy">{opt.label}</span>
                  </div>
                  {(isChosen || (chosen && opt.correct)) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-xs text-xeo-muted leading-relaxed pl-7"
                    >
                      {opt.feedback}
                    </motion.p>
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {chosen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={handleNext} className="btn-primary w-full">
            {step + 1 < scenarios.length ? 'Next scenario →' : 'See results →'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
