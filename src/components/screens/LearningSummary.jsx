import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { MODULES, LEVELS } from '../../data/modules'
import { BADGE_DEFINITIONS, getLevelInfo } from '../../hooks/useProgress'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getKeyPointText(kp) {
  if (!kp) return null
  if (typeof kp === 'string') return kp
  return kp.text ?? null
}

function getModuleTakeaways(mod) {
  const items = []

  // Up to 2 key stats
  for (const lesson of mod.lessons ?? []) {
    for (const stat of lesson.stats ?? []) {
      if (items.length >= 2) break
      if (stat.value && stat.label) {
        items.push({ type: 'stat', text: `${stat.value} — ${stat.label}` })
      }
    }
    if (items.length >= 2) break
  }

  // Up to 3 key points
  for (const lesson of mod.lessons ?? []) {
    for (const kp of lesson.keyPoints ?? []) {
      if (items.length >= 5) break
      const text = getKeyPointText(kp)
      if (text) items.push({ type: 'point', text })
    }
    if (items.length >= 5) break
  }

  return items.slice(0, 5)
}

function scoreColor(score) {
  if (score == null) return 'text-xeo-muted'
  if (score >= 80) return 'text-green-700'
  if (score >= 60) return 'text-amber-700'
  return 'text-red-600'
}

function scoreBg(score) {
  if (score == null) return 'bg-xeo-subtle'
  if (score >= 80) return 'bg-green-50 border-green-200'
  if (score >= 60) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

// ─── Components ───────────────────────────────────────────────────────────────

function ModuleSection({ mod, quizScore }) {
  const takeaways = getModuleTakeaways(mod)

  return (
    <div className="summary-module border border-xeo-border rounded-xl p-5 mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{mod.icon}</span>
          <div>
            <h3 className="font-semibold text-navy text-sm">{mod.title}</h3>
            <p className="text-xs text-xeo-muted">{mod.subtitle}</p>
          </div>
        </div>
        {quizScore != null && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border shrink-0 ${scoreBg(quizScore)} ${scoreColor(quizScore)}`}>
            Quiz: {quizScore}%
          </span>
        )}
      </div>

      {takeaways.length > 0 && (
        <ul className="space-y-1.5">
          {takeaways.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-navy">
              <span className="mt-0.5 shrink-0 text-xeo-muted">
                {item.type === 'stat' ? '📊' : '•'}
              </span>
              <span className={item.type === 'stat' ? 'font-semibold' : ''}>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function LearningSummary({ progress }) {
  const printRef = useRef(null)
  const { current: levelInfo } = getLevelInfo(progress.xp)

  const completedModules = (progress.completedModules ?? [])
    .map(id => MODULES[id])
    .filter(Boolean)
    .sort((a, b) => a.id - b.id)

  const earnedBadges = BADGE_DEFINITIONS.filter(b => (progress.badges ?? []).includes(b.id))
  const totalModules = Object.keys(MODULES).length
  const isComplete = completedModules.length === totalModules

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  function handlePrint() {
    window.print()
  }

  return (
    <div>
      {/* Page actions — hidden in print */}
      <div className="no-print flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Learning Summary</h1>
          <p className="text-xeo-muted text-sm mt-0.5">
            {completedModules.length} of {totalModules} modules complete
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-ghost text-sm px-3 py-2">← Back</Link>
          <button onClick={handlePrint} className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="summary-content">

        {/* Print header */}
        <div className="print-only hidden mb-8 pb-6 border-b border-xeo-border">
          <h1 className="text-3xl font-bold text-navy">Claude Mastery Academy</h1>
          <p className="text-xl text-xeo-muted mt-1">Learning Summary</p>
          <p className="text-sm text-xeo-muted mt-1">{today}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-navy">{completedModules.length}/{totalModules}</div>
            <div className="text-xs text-xeo-muted mt-0.5">Modules</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-flame-600">⭐ {progress.xp}</div>
            <div className="text-xs text-xeo-muted mt-0.5">XP earned</div>
          </div>
          <div className="card p-4 text-center">
            <div className={`text-2xl font-bold ${levelInfo.color}`}>{levelInfo.name}</div>
            <div className="text-xs text-xeo-muted mt-0.5">Level</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-aria-600">{progress.ariaScore}/100</div>
            <div className="text-xs text-xeo-muted mt-0.5">Nexus Velocity</div>
          </div>
        </div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="card p-5 mb-6">
            <h2 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wider">Badges Earned</h2>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="flex items-center gap-2 bg-xeo-subtle rounded-xl px-3 py-2">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-navy">{badge.name}</div>
                    <div className="text-[10px] text-xeo-muted">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completion message */}
        {isComplete && (
          <div className="callout-success mb-6 text-sm">
            <strong>Course complete!</strong> You&apos;ve worked through all 13 modules of Claude Mastery Academy. Nexus is running on full AI-augmented velocity.
          </div>
        )}

        {completedModules.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-4xl mb-3">📚</p>
            <p className="font-semibold text-navy mb-1">No modules completed yet</p>
            <p className="text-xeo-muted text-sm mb-4">Complete your first module to start building your summary.</p>
            <Link to="/" className="btn-primary px-5 py-2.5 text-sm">Go to course</Link>
          </div>
        ) : (
          <>
            {/* Group by level */}
            {LEVELS.map(level => {
              const levelCompleted = level.modules
                .map(id => MODULES[id])
                .filter(m => (progress.completedModules ?? []).includes(m.id))

              if (levelCompleted.length === 0) return null

              return (
                <div key={level.id} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{level.icon}</span>
                    <h2 className="font-bold text-navy">{level.title}</h2>
                    <span className="text-xs text-xeo-muted font-mono">{level.label}</span>
                    <span className="text-xs text-xeo-muted ml-auto">{levelCompleted.length}/{level.modules.length} completed</span>
                  </div>
                  {levelCompleted.map(mod => (
                    <ModuleSection
                      key={mod.id}
                      mod={mod}
                      quizScore={progress.quizScores?.[mod.id] ?? null}
                    />
                  ))}
                </div>
              )
            })}
          </>
        )}

        {/* Print footer */}
        <div className="print-only hidden mt-8 pt-4 border-t border-xeo-border text-xs text-xeo-muted text-center">
          Claude Mastery Academy · {today}
        </div>
      </div>

      {/* Bottom print button — hidden in print */}
      {completedModules.length > 0 && (
        <div className="no-print mt-6 flex justify-center">
          <button onClick={handlePrint} className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm">
            🖨️ Print / Save PDF
          </button>
        </div>
      )}
    </div>
  )
}
