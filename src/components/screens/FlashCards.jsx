import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MODULES } from '../../data/modules'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getKeyPointText(kp) {
  if (!kp) return null
  if (typeof kp === 'string') return kp
  return kp.text ?? null
}

// Generate a plausibly wrong version of a stat value by altering the number
function generateWrongValue(trueValue) {
  const match = trueValue.match(/([\+\-]?)(\d+(?:\.\d+)?)/)
  if (!match) return null
  const sign = match[1] || ''
  const n = parseFloat(match[2])
  const factors = [0.55, 0.65, 0.72, 1.28, 1.38, 1.5]
  const factor = factors[Math.floor(Math.random() * factors.length)]
  let fakeN = n * factor
  fakeN = n % 1 === 0 ? Math.round(fakeN) : Math.round(fakeN * 10) / 10
  if (trueValue.includes('%')) fakeN = Math.max(1, Math.min(99, fakeN))
  return trueValue.replace(match[0], sign + fakeN)
}

// ─── Card Generation ──────────────────────────────────────────────────────────

function buildDeck(completedModuleIds) {
  const cards = []
  const ids = completedModuleIds ?? []

  for (const moduleId of ids) {
    const mod = MODULES[moduleId]
    if (!mod) continue

    // Quiz cards — question + correct + 1 random wrong option
    for (const q of mod.quiz?.questions ?? []) {
      if (!q.question || !q.options || q.correct == null) continue
      const correct = q.options[q.correct]
      const wrongs = q.options.filter((_, i) => i !== q.correct)
      const distractor = wrongs[Math.floor(Math.random() * wrongs.length)]
      if (!distractor) continue
      cards.push({
        id: `quiz_${q.id}`,
        type: 'choice',
        question: q.question,
        options: shuffle([correct, distractor]),
        correct,
        explanation: q.explanation ?? null,
        moduleId: mod.id,
        moduleTitle: mod.title,
        icon: mod.icon,
      })
    }

    // Stat cards — true/false with a generated wrong value
    for (const lesson of mod.lessons ?? []) {
      for (let si = 0; si < (lesson.stats ?? []).length; si++) {
        const stat = lesson.stats[si]
        if (!stat.value || !stat.label) continue
        const wrongValue = generateWrongValue(stat.value)
        if (!wrongValue || wrongValue === stat.value) continue

        // Randomly decide whether to show true or false version at build time
        const showFalse = Math.random() < 0.5
        const displayValue = showFalse ? wrongValue : stat.value
        const isTrue = !showFalse

        cards.push({
          id: `stat_${lesson.id}_${si}`,
          type: 'truefalse',
          question: `True or false: "${displayValue} — ${stat.label}"`,
          isTrue,
          trueValue: stat.value,
          falseValue: wrongValue,
          explanation: lesson.insight ?? `The correct figure is ${stat.value}.`,
          moduleId: mod.id,
          moduleTitle: mod.title,
          icon: mod.icon,
        })
      }
    }
  }

  return cards
}

// ─── LocalStorage ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'aisv_flashcard_progress'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? { seen: {}, known: [], needsReview: [] }
  } catch {
    return { seen: {}, known: [], needsReview: [] }
  }
}

function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog))
}

// ─── Session Picker ───────────────────────────────────────────────────────────

function pickSession(deck, prog, count = 5, filterModuleId = null) {
  let pool = filterModuleId ? deck.filter(c => c.moduleId === filterModuleId) : deck
  if (pool.length === 0) pool = deck

  const needsReview = shuffle(pool.filter(c => prog.needsReview.includes(c.id)))
  const unseen      = shuffle(pool.filter(c => !prog.seen[c.id] && !prog.known.includes(c.id) && !prog.needsReview.includes(c.id)))
  const known       = shuffle(pool.filter(c => prog.known.includes(c.id)))

  return [...needsReview, ...unseen, ...known].slice(0, count)
}

// ─── Quiz Card UI ─────────────────────────────────────────────────────────────

function QuizCard({ card, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null)
  const revealed = selected !== null
  const isCorrect = selected === card.correct

  function handleSelect(opt) {
    if (revealed) return
    setSelected(opt)
    if (opt === card.correct) {
      onCorrect(card)
    } else {
      onWrong(card)
    }
  }

  return (
    <div className="card p-8 w-full">
      {/* Module context */}
      <div className="flex items-center gap-2 mb-5 text-xs text-xeo-muted">
        <span>{card.icon}</span>
        <span>{card.moduleTitle}</span>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-jasper-100 text-jasper-700 font-semibold uppercase tracking-wider">
          Quiz
        </span>
      </div>

      {/* Question */}
      <p className="text-navy font-semibold text-lg leading-snug mb-6">{card.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {card.options.map((opt, i) => {
          let cls = 'quiz-option w-full text-left px-4 py-3 rounded-xl text-sm transition-all cursor-pointer'
          if (!revealed) {
            cls += ' hover:border-flame-400 hover:bg-flame-50'
          } else if (opt === card.correct) {
            cls += ' quiz-option-correct'
          } else if (opt === selected && opt !== card.correct) {
            cls += ' quiz-option-wrong'
          } else {
            cls += ' opacity-40'
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={revealed}>
              <span className="font-semibold mr-2 text-xeo-muted">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm mb-4 ${isCorrect ? 'callout-success' : 'callout-danger'}`}
          >
            <p className="font-semibold mb-1">{isCorrect ? '✓ Correct!' : '✗ Not quite.'}</p>
            {card.explanation && <p className="leading-relaxed">{card.explanation}</p>}
            {!isCorrect && (
              <Link
                to={`/module/${card.moduleId}`}
                className="inline-block mt-2 text-xs font-semibold underline"
              >
                Review this in the course →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── True/False Card UI ───────────────────────────────────────────────────────

function TrueFalseCard({ card, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null)
  const revealed = selected !== null

  function handleSelect(val) {
    if (revealed) return
    setSelected(val)
    const userCorrect = (val === true && card.isTrue) || (val === false && !card.isTrue)
    if (userCorrect) {
      onCorrect(card)
    } else {
      onWrong(card)
    }
  }

  const userCorrect = selected !== null && ((selected === true && card.isTrue) || (selected === false && !card.isTrue))

  return (
    <div className="card p-8 w-full">
      {/* Module context */}
      <div className="flex items-center gap-2 mb-5 text-xs text-xeo-muted">
        <span>{card.icon}</span>
        <span>{card.moduleTitle}</span>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-aria-100 text-aria-700 font-semibold uppercase tracking-wider">
          True / False
        </span>
      </div>

      {/* Statement */}
      <p className="text-navy font-semibold text-lg leading-snug mb-8">{card.question}</p>

      {/* True / False buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[true, false].map(val => {
          const label = val ? 'True' : 'False'
          let cls = 'py-4 rounded-xl font-bold text-base border-2 transition-all '
          if (!revealed) {
            cls += val
              ? 'border-green-300 text-green-700 hover:bg-green-50 cursor-pointer'
              : 'border-red-300 text-red-600 hover:bg-red-50 cursor-pointer'
          } else if (selected === val) {
            cls += userCorrect
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-red-400 bg-red-50 text-red-600'
          } else if (val === card.isTrue) {
            cls += 'border-green-400 bg-green-50 text-green-700'
          } else {
            cls += 'border-xeo-border text-xeo-muted opacity-40'
          }
          return (
            <button key={String(val)} className={cls} onClick={() => handleSelect(val)} disabled={revealed}>
              {val ? '✓ True' : '✗ False'}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm mb-4 ${userCorrect ? 'callout-success' : 'callout-danger'}`}
          >
            <p className="font-semibold mb-1">
              {userCorrect ? '✓ Correct!' : `✗ That's ${card.isTrue ? 'actually true' : 'actually false'}.`}
            </p>
            {!card.isTrue && (
              <p className="leading-relaxed">The correct figure is <strong>{card.trueValue}</strong>.</p>
            )}
            {card.explanation && <p className="leading-relaxed mt-1">{card.explanation}</p>}
            {!userCorrect && (
              <Link
                to={`/module/${card.moduleId}`}
                className="inline-block mt-2 text-xs font-semibold underline"
              >
                Review this in the course →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Session Complete ─────────────────────────────────────────────────────────

function SessionComplete({ correct, total, needsReviewCards, onRepeat, onGoDeeper }) {
  const pct = Math.round((correct / total) * 100)
  const emoji = pct === 100 ? '🎉' : pct >= 80 ? '🔥' : pct >= 60 ? '👍' : '📚'
  const msg   = pct === 100 ? 'Perfect score!' : pct >= 80 ? 'You know this well.' : pct >= 60 ? 'Getting there.' : 'Keep reviewing.'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card p-8 text-center max-w-md mx-auto"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-navy mb-1">{correct}/{total} correct</h2>
      <p className="text-xeo-muted mb-6">{msg}</p>

      {needsReviewCards.length > 0 && (
        <div className="callout-warning text-sm mb-6 text-left">
          <p className="font-semibold mb-1">Worth revisiting:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {needsReviewCards.map(c => (
              <li key={c.id} className="text-xs leading-relaxed">
                <Link to={`/module/${c.moduleId}`} className="hover:underline">{c.moduleTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {needsReviewCards.length > 0 && (
          <button onClick={onGoDeeper} className="btn-primary py-2.5">
            Retry the {needsReviewCards.length} I missed
          </button>
        )}
        <button onClick={onRepeat} className="btn-secondary py-2.5">
          New round of 5
        </button>
        <Link to="/" className="text-sm text-xeo-muted hover:text-navy transition-colors mt-1">
          Back to course
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FlashCards({ progress }) {
  const [searchParams] = useSearchParams()
  const filterModuleId = searchParams.get('moduleId') ? Number(searchParams.get('moduleId')) : null

  const [flashProg, setFlashProg] = useState(loadProgress)
  const [deck, setDeck]           = useState([])
  const [session, setSession]     = useState([])
  const [cardIndex, setCardIndex] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState([])
  const [sessionWrong, setSessionWrong]     = useState([])
  const [cardAnswered, setCardAnswered]     = useState(false)
  const [done, setDone]           = useState(false)

  useEffect(() => {
    const d = buildDeck(progress?.completedModules ?? [])
    setDeck(d)
    startSession(d, loadProgress(), filterModuleId)
  }, [progress?.completedModules]) // eslint-disable-line react-hooks/exhaustive-deps

  const startSession = useCallback((d, prog, modFilter) => {
    const s = pickSession(d, prog, 5, modFilter)
    setSession(s)
    setCardIndex(0)
    setSessionCorrect([])
    setSessionWrong([])
    setCardAnswered(false)
    setDone(false)
  }, [])

  function markSeen(card) {
    return { ...flashProg, seen: { ...flashProg.seen, [card.id]: Date.now() } }
  }

  function handleCorrect(card) {
    const updated = {
      ...markSeen(card),
      known: [...new Set([...flashProg.known, card.id])],
      needsReview: flashProg.needsReview.filter(id => id !== card.id),
    }
    setFlashProg(updated)
    saveProgress(updated)
    setSessionCorrect(prev => [...prev, card])
    setCardAnswered(true)
  }

  function handleWrong(card) {
    const updated = {
      ...markSeen(card),
      needsReview: [...new Set([...flashProg.needsReview, card.id])],
      known: flashProg.known.filter(id => id !== card.id),
    }
    setFlashProg(updated)
    saveProgress(updated)
    setSessionWrong(prev => [...prev, card])
    setCardAnswered(true)
  }

  function handleNext() {
    if (cardIndex + 1 >= session.length) {
      setDone(true)
    } else {
      setCardIndex(i => i + 1)
      setCardAnswered(false)
    }
  }

  function handleRepeat() {
    startSession(deck, flashProg, filterModuleId)
  }

  function handleGoDeeper() {
    const prog = { ...flashProg, needsReview: sessionWrong.map(c => c.id) }
    const s = pickSession(deck, prog, sessionWrong.length, filterModuleId)
    setSession(s)
    setCardIndex(0)
    setSessionCorrect([])
    setSessionWrong([])
    setCardAnswered(false)
    setDone(false)
  }

  const currentCard = session[cardIndex]
  const noCards = deck.length === 0

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Pop Quiz</h1>
          <p className="text-xeo-muted text-sm mt-0.5">
            {filterModuleId ? `Module ${filterModuleId} · ` : ''}
            {deck.length} questions across {progress?.completedModules?.length ?? 0} completed modules
          </p>
        </div>
        <Link to="/" className="btn-ghost text-sm px-3 py-2">← Back</Link>
      </div>

      {noCards ? (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-4">🔒</p>
          <h2 className="font-bold text-navy mb-2">No questions yet</h2>
          <p className="text-xeo-muted text-sm mb-4">Complete at least one module to unlock the quiz.</p>
          <Link to="/" className="btn-primary px-6 py-2.5 text-sm">Go to course</Link>
        </div>
      ) : done ? (
        <SessionComplete
          correct={sessionCorrect.length}
          total={session.length}
          needsReviewCards={sessionWrong}
          onRepeat={handleRepeat}
          onGoDeeper={handleGoDeeper}
        />
      ) : (
        <>
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-4">
            {session.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i < cardIndex
                    ? (sessionCorrect.find(c => c.id === session[i]?.id) ? 'w-2 bg-green-500' : 'w-2 bg-red-400')
                    : i === cardIndex ? 'w-6 bg-flame-600'
                    : 'w-2 bg-xeo-border'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-xeo-muted mb-4">
            Question {cardIndex + 1} of {session.length}
          </p>

          {/* Question card */}
          <AnimatePresence mode="wait">
            {currentCard && (
              <motion.div
                key={currentCard.id + cardIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.2 }}
              >
                {currentCard.type === 'choice' ? (
                  <QuizCard card={currentCard} onCorrect={handleCorrect} onWrong={handleWrong} />
                ) : (
                  <TrueFalseCard card={currentCard} onCorrect={handleCorrect} onWrong={handleWrong} />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button — appears after answering */}
          <AnimatePresence>
            {cardAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex justify-center"
              >
                <button onClick={handleNext} className="btn-primary px-8 py-2.5 text-sm">
                  {cardIndex + 1 >= session.length ? 'See results →' : 'Next question →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Stats footer */}
      {!noCards && !done && (
        <div className="mt-8 flex justify-center gap-6 text-xs text-xeo-muted">
          <span>✓ {flashProg.known.length} mastered</span>
          <span>🔁 {flashProg.needsReview.length} to review</span>
        </div>
      )}
    </div>
  )
}
