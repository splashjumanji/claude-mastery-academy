import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LEVELS, MODULES } from '../../data/modules'
import { ProgressRing } from '../ui/ProgressRing'

const TOTAL_MODULES = Object.keys(MODULES).length

const LAST_VISIT_KEY = 'aisv_last_visit'

const DISCIPLINE_COLORS = {
  1: { border: 'border-aria-300',    bg: 'from-aria-50',    dot: 'bg-aria-500',    badge: 'bg-aria-100 text-aria-700' },
  2: { border: 'border-jasper-300',  bg: 'from-jasper-50',  dot: 'bg-jasper-500',  badge: 'bg-jasper-100 text-jasper-700' },
  3: { border: 'border-emerald-300', bg: 'from-emerald-50', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  4: { border: 'border-amber-300',   bg: 'from-amber-50',   dot: 'bg-amber-500',   badge: 'bg-amber-100 text-amber-700' },
}

function ModuleCard({ module, unlocked, completed, isUpdated }) {
  const inner = (
    <div className={`card p-4 flex items-center gap-3 transition-all duration-200 group
      ${completed ? 'border-emerald-300 bg-emerald-50' : ''}
      ${unlocked && !completed ? 'hover:border-flame-300 hover:bg-flame-50 cursor-pointer' : ''}
      ${!unlocked ? 'opacity-40 cursor-not-allowed' : ''}
    `}>
      <div className="text-2xl">{completed ? '✅' : unlocked ? module.icon : '🔒'}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate text-navy">{module.title}</div>
        <div className="text-xs text-xeo-muted truncate">{module.subtitle}</div>
      </div>
      {isUpdated && (
        <span className="text-[10px] font-semibold bg-flame-100 text-flame-700 rounded-full px-2 py-0.5 shrink-0 whitespace-nowrap">
          Updated
        </span>
      )}
      <div className="text-xs text-xeo-muted shrink-0">{module.estimatedMinutes}m</div>
      {unlocked && !completed && (
        <div className="text-flame-600 text-xs font-bold shrink-0 group-hover:text-flame-700">Start →</div>
      )}
    </div>
  )

  if (!unlocked) return inner

  return (
    <div className="flex items-center gap-2">
      <Link to={`/module/${module.id}`} className="flex-1 min-w-0">{inner}</Link>
      {completed && (
        <Link
          to={`/flashcards?moduleId=${module.id}`}
          className="shrink-0 text-xs font-medium text-xeo-muted hover:text-flame-600 border border-xeo-border hover:border-flame-300 rounded-lg px-2.5 py-1.5 transition-colors whitespace-nowrap"
          title="Quick quiz on this module"
        >
          🃏 Quiz
        </Link>
      )}
    </div>
  )
}

export function WorldMap({ progress, isModuleUnlocked, isModuleComplete }) {
  const [prevVisit, setPrevVisit] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(LAST_VISIT_KEY)
    if (stored) setPrevVisit(stored)
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString().slice(0, 10))
  }, [])

  const total = Object.keys(MODULES).length
  const done = progress.completedModules.length

  return (
    <div>
      {/* Hero */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display text-navy">Your Learning Journey</h1>
          <p className="text-xeo-muted text-sm mt-1">
            {done === 0
              ? "You're the new CMO of Aria. Time to make them visible."
              : done < total
              ? `${done} of ${total} modules complete. Aria's Citation Score: ${progress.ariaScore}/100`
              : '🎉 All modules complete! Aria is a market leader.'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressRing score={progress.ariaScore} size={56} strokeWidth={6} />
          <div className="text-sm">
            <div className="font-bold text-navy">{done}/{total} modules</div>
            <div className="text-xeo-muted text-xs">completed</div>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="progress-bar mb-8">
        <div className="progress-fill bg-gradient-to-r from-flame-600 to-jasper-500" style={{ width: `${(done/total)*100}%` }} />
      </div>

      {/* Summary CTA — always visible once any module is done */}
      {done > 0 && (
        <div className="mb-6">
          <Link to="/summary">
            <div className="border border-dashed border-xeo-border rounded-xl p-3 flex items-center gap-3 hover:border-jasper-300 hover:bg-jasper-50 transition-colors group">
              <span className="text-lg">📄</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-navy">
                  {done === TOTAL_MODULES ? 'Download your learning summary' : 'View progress summary'}
                </div>
                <div className="text-xs text-xeo-muted">
                  {done === TOTAL_MODULES
                    ? 'All modules complete — save or print your full summary'
                    : `${done} of ${TOTAL_MODULES} modules complete`}
                </div>
              </div>
              <span className="text-xs text-jasper-600 group-hover:text-jasper-700 font-semibold shrink-0">
                {done === TOTAL_MODULES ? 'Download →' : 'View →'}
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Levels */}
      <div className="space-y-6">
        {LEVELS.map((level, idx) => {
          const colors = DISCIPLINE_COLORS[level.id]
          const levelModules = level.modules.map(id => MODULES[id])
          const levelDone = levelModules.filter(m => isModuleComplete(m.id)).length
          const levelTotal = levelModules.length

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`card border ${colors.border} overflow-hidden`}
            >
              {/* Level header */}
              <div className={`bg-gradient-to-r ${colors.bg} to-transparent px-5 py-4 flex items-center justify-between border-b border-xeo-border`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`level-badge ${colors.badge} text-xs font-mono`}>{level.label}</span>
                      <h2 className="font-display text-navy">{level.title}</h2>
                    </div>
                    <p className="text-xs text-xeo-muted">{level.subtitle}</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-xeo-muted shrink-0">
                  {levelDone}/{levelTotal}
                </div>
              </div>

              {/* Level progress */}
              <div className="px-5 pt-3">
                <div className="progress-bar">
                  <div className={`progress-fill bg-gradient-to-r ${level.color}`} style={{ width: `${(levelDone/levelTotal)*100}%` }} />
                </div>
              </div>

              {/* Module cards */}
              <div className="p-4 grid gap-2">
                {levelModules.map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    unlocked={isModuleUnlocked(module.id)}
                    completed={isModuleComplete(module.id)}
                    isUpdated={prevVisit ? module.lastUpdated > prevVisit : false}
                  />
                ))}
              </div>

              {/* Aria Report Card checkpoint */}
              {(level.id === 1 || level.id === 2 || level.id === 3) && levelDone === levelTotal && (
                <div className="px-4 pb-4">
                  <Link to={`/aria`}>
                    <div className="border border-dashed border-xeo-border rounded-xl p-3 flex items-center gap-3 hover:border-flame-300 hover:bg-flame-50 transition-colors group">
                      <span className="text-lg">📊</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-navy">Aria Report Card</div>
                        <div className="text-xs text-xeo-muted">See Aria's AI search presence after Level {level.id}</div>
                      </div>
                      <span className="text-xs text-flame-600 group-hover:text-flame-700 font-semibold">View →</span>
                    </div>
                  </Link>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
