import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StrengthDots({ strength }) {
  const color = strength === 3 ? 'bg-green-500' : strength === 2 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <span className="flex gap-0.5 shrink-0">
      {[1, 2, 3].map(i => (
        <span key={i} className={`w-2 h-2 rounded-full ${i <= strength ? color : 'bg-xeo-border'}`} />
      ))}
    </span>
  )
}

export function PipelineSimulator({ lessons, simulator, onComplete }) {
  const [phase, setPhase] = useState('intro')       // intro | pipeline | simulator | results
  const [pipelineStep, setPipelineStep] = useState(0)
  const [choices, setChoices] = useState([])
  const [totalImpact, setTotalImpact] = useState(0)
  const [lessonStep, setLessonStep] = useState(0)
  const [picks, setPicks] = useState({})            // { step: optionIndex }
  const [remainingBudget, setRemainingBudget] = useState(simulator?.budget ?? 10)

  const currentLesson = lessons[lessonStep]
  const budget = simulator?.budget ?? 10

  const canAffordOption = (step, opt) => {
    const choice = simulator.choices.find(c => c.step === step)
    const prevIdx = picks[step]
    const prevCost = prevIdx !== undefined ? choice.options[prevIdx].cost : 0
    return opt.cost <= remainingBudget + prevCost
  }

  const handlePick = (step, optIdx, opt) => {
    const choice = simulator.choices.find(c => c.step === step)
    const prevIdx = picks[step]
    const prevCost = prevIdx !== undefined ? choice.options[prevIdx].cost : 0
    setPicks(p => ({ ...p, [step]: optIdx }))
    setRemainingBudget(b => b + prevCost - opt.cost)
  }

  const allDecisionsMade = simulator.choices.every(c => picks[c.step] !== undefined)

  const handleReset = () => {
    setPicks({})
    setRemainingBudget(simulator?.budget ?? 10)
    setChoices([])
    setTotalImpact(0)
    setPhase('simulator')
  }

  const handleSubmit = () => {
    const allChoices = simulator.choices.map(choice => ({
      ...choice.options[picks[choice.step]],
      step: choice.step,
      question: choice.question,
    }))
    const total = allChoices.reduce((sum, c) => sum + (c.impact || 0), 0)
    setChoices(allChoices)
    setTotalImpact(total)
    setPhase('results')
  }

  const finalScore = Math.max(0, Math.min(100, 50 + totalImpact))

  // ── INTRO LESSONS ──────────────────────────────────────────
  if (phase === 'intro') {
    const lesson = currentLesson
    const isLastLesson = lessonStep === lessons.length - 1

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-1 mb-6">
          {lessons.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= lessonStep ? 'bg-flame-600' : 'bg-xeo-border'}`} />
          ))}
          <div className="h-1.5 flex-1 rounded-full bg-xeo-border" />
          <div className="h-1.5 flex-1 rounded-full bg-xeo-border" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lessonStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="lesson-card mb-5"
          >
            <h2 className="text-xl font-bold mb-4 text-navy">{lesson.heading}</h2>
            <p className="text-xeo-muted mb-5 leading-relaxed">{lesson.body}</p>

            {lesson.keyPoints && (
              <ul className="space-y-2 mb-4">
                {lesson.keyPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-flame-600 shrink-0 mt-0.5">›</span>
                    {typeof p === 'string' ? (
                      <span className="text-navy">{p}</span>
                    ) : (
                      <span className="text-navy">
                        {p.text}{' '}
                        <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-flame-500 underline text-xs">[source]</a>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {lesson.callout && (
              <div className={`mt-2 mb-4 border rounded-xl p-4 text-sm leading-relaxed ${
                lesson.callout.type === 'tip'     ? 'bg-green-50 border-green-200 text-green-800' :
                lesson.callout.type === 'jasper'  ? 'bg-jasper-50 border-jasper-200 text-jasper-800' :
                lesson.callout.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                lesson.callout.type === 'insight' ? 'bg-flame-50 border-flame-200 text-flame-800' :
                'bg-aria-50 border-aria-200 text-aria-800'
              }`}>
                {lesson.callout.text}
              </div>
            )}

            {lesson.steps && (
              <div className="space-y-2">
                {lesson.steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3 p-3 bg-xeo-subtle rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-flame-600 flex items-center justify-center text-xs font-bold text-white shrink-0">{step.id}</div>
                    <div>
                      <div className="text-sm font-semibold text-navy">{step.label}</div>
                      <div className="text-xs text-xeo-muted">{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {lesson.platforms && (
              <div className="space-y-3">
                {lesson.platforms.map((p, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-xeo-border flex items-center justify-center text-xs font-bold">{p.icon}</div>
                      <span className="font-semibold text-sm text-navy">{p.name}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {[['Mechanism', p.mechanism], ['Citations', p.citations], ['Top factor', p.topFactor], ['Caveat', p.caveat]].map(([k, v]) => (
                        <div key={k} className="text-xs flex gap-2">
                          <span className="text-xeo-muted shrink-0 w-16">{k}</span>
                          <span className="text-navy">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          {lessonStep > 0 ? (
            <button onClick={() => setLessonStep(s => s - 1)} className="btn-ghost">← Back</button>
          ) : <div />}
          <button onClick={() => isLastLesson ? setPhase('pipeline') : setLessonStep(s => s + 1)} className="btn-primary">
            {isLastLesson ? 'Run the simulation →' : 'Next →'}
          </button>
        </div>
      </div>
    )
  }

  // ── PIPELINE VISUALIZATION ──────────────────────────────────
  if (phase === 'pipeline') {
    const steps = lessons.find(l => l.steps)?.steps || []
    return (
      <div className="max-w-2xl mx-auto">
        <div className="lesson-card mb-5">
          <h2 className="text-lg font-bold mb-2 text-navy">The RAG Pipeline — Step by Step</h2>
          <p className="text-xeo-muted text-sm mb-5">Click through each step to understand how a query becomes an AI-generated answer.</p>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: i <= pipelineStep ? 1 : 0.3 }}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer
                  ${i === pipelineStep ? 'bg-flame-50 border border-flame-200' : 'bg-xeo-subtle'}`}
                onClick={() => i === pipelineStep && setPipelineStep(s => Math.min(s + 1, steps.length - 1))}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                  ${i < pipelineStep ? 'bg-green-500 text-white' : i === pipelineStep ? 'bg-flame-600 text-white' : 'bg-xeo-border text-xeo-muted'}`}>
                  {i < pipelineStep ? '✓' : step.id}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{step.label}</div>
                  {i <= pipelineStep && <div className="text-xs text-xeo-muted">{step.detail}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setPhase('intro')} className="btn-ghost">← Back</button>
          <button onClick={() => setPhase('simulator')} className="btn-primary">
            Now try it yourself →
          </button>
        </div>
      </div>
    )
  }

  // ── SIMULATOR ──────────────────────────────────────────────
  if (phase === 'simulator') {
    const budgetPct = (remainingBudget / budget) * 100
    const budgetColor = budgetPct > 50 ? 'bg-green-500' : budgetPct > 20 ? 'bg-amber-400' : 'bg-red-400'

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card p-4 border-aria-200 bg-aria-50 mb-4">
          <div className="text-xs text-aria-600 font-bold mb-1">QUERY SCENARIO</div>
          <p className="text-sm text-navy italic">"{simulator.scenario}"</p>
        </div>

        {/* Budget bar */}
        <div className="lesson-card mb-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-navy">Content Investment Budget</span>
            <span className={`text-xs font-bold ${budgetPct > 50 ? 'text-green-600' : budgetPct > 20 ? 'text-amber-600' : 'text-red-600'}`}>
              {remainingBudget} / {budget} pts remaining
            </span>
          </div>
          <div className="h-2 bg-xeo-border rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${budgetColor} transition-colors duration-300`}
              animate={{ width: `${budgetPct}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </div>
          <p className="text-xs text-xeo-muted mt-1.5">Allocate across all three decisions. You can't invest fully in everything — choose where it matters most.</p>
        </div>

        {/* All decisions at once */}
        <div className="space-y-3 mb-5">
          {simulator.choices.map((choice, ci) => {
            const pickedIdx = picks[choice.step]
            return (
              <motion.div
                key={choice.step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.08 }}
                className="lesson-card"
              >
                <h3 className="text-sm font-bold mb-3 text-navy">{choice.question}</h3>
                <div className="space-y-2">
                  {choice.options.map((opt, oi) => {
                    const isSelected = pickedIdx === oi
                    const affordable = canAffordOption(choice.step, opt)
                    const strengthLabel = opt.strength === 3 ? 'Strong' : opt.strength === 2 ? 'Moderate' : 'Weak'
                    return (
                      <button
                        key={oi}
                        disabled={!affordable && !isSelected}
                        onClick={() => handlePick(choice.step, oi, opt)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm
                          ${isSelected
                            ? 'border-navy bg-navy/5'
                            : (!affordable && !isSelected)
                              ? 'border-xeo-border opacity-40 cursor-not-allowed'
                              : 'border-xeo-border hover:border-flame-400 hover:bg-flame-50 cursor-pointer'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                            ${isSelected ? 'border-navy bg-navy' : 'border-xeo-border'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <span className={`flex-1 ${isSelected ? 'font-semibold text-navy' : 'text-navy/80'}`}>{opt.label}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <StrengthDots strength={opt.strength} />
                            <span className="text-xs text-xeo-muted w-14 text-right">{strengthLabel}</span>
                            <span className={`text-xs font-bold w-12 text-right ${isSelected ? 'text-navy' : 'text-xeo-muted'}`}>
                              💰 {opt.cost} pts
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allDecisionsMade}
          className={`btn-primary w-full ${!allDecisionsMade ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {allDecisionsMade ? 'See results →' : `Select all ${simulator.choices.length} decisions to continue`}
        </button>
      </div>
    )
  }

  // ── RESULTS ─────────────────────────────────────────────────
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
      <div className="lesson-card mb-5">
        <div className="text-4xl mb-3">{finalScore >= 70 ? '🎯' : finalScore >= 50 ? '📈' : '📚'}</div>
        <div className="text-xl font-bold mb-1 text-navy">Aria's Citation Probability</div>
        <div className="text-5xl font-black text-gradient my-4">{finalScore}%</div>
        <div className="text-xeo-muted text-sm mb-5">
          {finalScore >= 70 ? "Strong! Your decisions maximized Aria's citation probability." :
           finalScore >= 50 ? 'Decent start. A few key decisions could have improved this significantly.' :
           'Aria is unlikely to be cited. Review the choices that hurt the most.'}
        </div>

        <div className="space-y-2 text-left">
          {choices.map((c, i) => (
            <div key={i} className={`p-3 rounded-xl border text-sm
              ${c.impact > 0 ? 'border-green-200 bg-green-50' : c.impact < 0 ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold text-xs ${c.impact > 0 ? 'text-green-600' : c.impact < 0 ? 'text-red-600' : 'text-amber-600'}`}>
                  {c.impact > 0 ? `+${c.impact}` : c.impact}
                </span>
                <span className="font-medium text-navy flex-1">{c.label}</span>
                <span className="text-xs text-xeo-muted">💰 {c.cost} pts invested</span>
              </div>
              <p className="text-xs text-xeo-muted leading-relaxed pl-5">{c.feedback}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onComplete} className="btn-primary w-full py-4">Continue →</button>
      <button onClick={handleReset} className="mt-3 w-full text-sm text-xeo-muted hover:text-navy underline underline-offset-2 transition-colors">
        ← Try different choices
      </button>
    </motion.div>
  )
}
