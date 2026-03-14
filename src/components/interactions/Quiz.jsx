import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function QuizQuestion({ question, questionIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (idx) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
  }

  const isCorrect = selected === question.correct

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-xs text-xeo-muted font-semibold mb-3">
        Question {questionIndex + 1} of {total}
      </div>

      <div className="lesson-card mb-4">
        <h3 className="text-lg font-bold mb-6 text-navy">{question.question}</h3>

        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (revealed) {
              if (i === question.correct) cls += ' quiz-option-correct'
              else if (i === selected && !isCorrect) cls += ' quiz-option-wrong'
              else cls += ' opacity-40'
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5
                    ${revealed && i === question.correct ? 'border-green-500 bg-green-500 text-white' :
                      revealed && i === selected && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                      'border-xeo-border text-xeo-muted'}`}
                  >
                    {revealed && i === question.correct ? '✓' : revealed && i === selected ? '✗' : String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm leading-relaxed text-left text-navy">{opt}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-4 rounded-xl p-4 text-sm leading-relaxed border ${
                isCorrect
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="font-bold mb-1">{isCorrect ? '✓ Correct!' : '✗ Not quite.'}</div>
              {question.explanation}
              {question.sourceUrl && (
                <div className="mt-2 pt-2 border-t border-current/10 flex items-center gap-1.5">
                  <span className="text-[11px] opacity-60 font-medium">Source:</span>
                  <a
                    href={question.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] opacity-50 hover:opacity-80 transition-opacity underline underline-offset-2"
                  >
                    {question.source || question.sourceUrl}
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onAnswer(isCorrect)} className="btn-primary w-full">
            {questionIndex + 1 < total ? 'Next question →' : 'Finish quiz →'}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

function QuizResults({ score, total, onContinue }) {
  const pct = Math.round((score / total) * 100)
  const grade = pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📚'
  const msg = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good job!' : 'Keep learning!'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="lesson-card mb-5">
        <div className="text-6xl mb-4">{grade}</div>
        <div className="text-2xl font-bold mb-1 text-navy">{msg}</div>
        <div className="text-xeo-muted text-sm mb-6">You scored {score} out of {total}</div>

        {/* Score bar */}
        <div className="progress-bar mb-2">
          <motion.div
            className={`progress-fill ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <div className="text-right text-xs text-xeo-muted">{pct}%</div>
      </div>
      <button onClick={onContinue} className="btn-primary w-full py-4">Continue →</button>
    </motion.div>
  )
}

export function Quiz({ questions, xpBonus = 0, onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  const handleAnswer = (correct) => {
    const newAnswers = [...answers, correct]
    setAnswers(newAnswers)
    if (step + 1 >= questions.length) {
      setDone(true)
    } else {
      setStep(s => s + 1)
    }
  }

  const score = answers.filter(Boolean).length
  const scorePct = Math.round((score / questions.length) * 100)

  if (done) {
    return <QuizResults score={score} total={questions.length} onContinue={() => onComplete(scorePct)} />
  }

  return (
    <div>
      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="progress-bar">
          <div className="progress-fill bg-flame-600" style={{ width: `${(step / questions.length) * 100}%` }} />
        </div>
      </div>
      <QuizQuestion
        key={step}
        question={questions[step]}
        questionIndex={step}
        total={questions.length}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
