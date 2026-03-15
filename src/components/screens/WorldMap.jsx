import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LEVELS, MODULES } from '../../data/modules'
import { BADGE_DEFINITIONS } from '../../hooks/useProgress'

const TOTAL_MODULES = Object.keys(MODULES).length
const LAST_VISIT_KEY = 'aisv_last_visit'

/* ── Editorial Section Title with ruled lines ── */
function SectionTitle({ title, tag }) {
  return (
    <div className="flex items-baseline gap-4 mb-7">
      <div className="flex-none w-10 h-px bg-navy" />
      <h2 className="font-display text-xl sm:text-[22px] font-semibold tracking-tight text-navy whitespace-nowrap">
        {title}
      </h2>
      <span className="text-[11px] tracking-[0.12em] uppercase text-xeo-muted px-2 py-0.5 border border-xeo-border shrink-0">
        {tag}
      </span>
      <div className="flex-1 h-px bg-xeo-border" />
    </div>
  )
}

/* ── Featured (active) module — dark full-bleed treatment ── */
function FeaturedModule({ module }) {
  return (
    <Link to={`/module/${module.id}`}>
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] bg-navy text-white mb-px cursor-pointer hover:opacity-95 transition-opacity overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 mb-3">
            Module {String(module.id).padStart(2, '0')} &middot; Active
          </div>
          <div className="font-display text-xl sm:text-2xl font-bold mb-3 text-white leading-tight">
            {module.title}
          </div>
          <div className="text-sm text-white/60 leading-relaxed">
            {module.subtitle}
          </div>
        </div>
        <div className="p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-white/10 flex flex-col justify-between gap-4">
          <div className="flex sm:flex-col gap-6 sm:gap-4">
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">XP Reward</div>
              <div className="font-display text-2xl font-bold text-white">
                {module.xpReward} <span className="text-sm font-sans font-normal text-white/50">XP</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">Est. Time</div>
              <div className="font-display text-2xl font-bold text-white">
                {module.estimatedMinutes} <span className="text-sm font-sans font-normal text-white/50">min</span>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 bg-flame-600 hover:bg-flame-700 text-white px-5 py-2.5 text-[12px] tracking-widest uppercase font-medium transition-colors self-start">
            Continue &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ── Module card in the editorial grid ── */
function ModuleCard({ module, unlocked, completed, quizScore }) {
  const statusChip = completed
    ? { label: 'Complete', cls: 'text-jasper-700 border-jasper-600' }
    : unlocked
    ? { label: 'Unlocked', cls: 'text-flame-600 border-flame-600' }
    : { label: 'Locked', cls: 'text-xeo-muted border-xeo-border' }

  const cardClasses = [
    'bg-xeo-bg p-6 cursor-pointer transition-colors',
    completed ? 'bg-jasper-50/50' : '',
    !unlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-xeo-subtle',
  ].join(' ')

  const inner = (
    <div className={cardClasses}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] tracking-[0.15em] uppercase text-xeo-muted">
          Module {String(module.id).padStart(2, '0')}
        </span>
        <span className={`text-[10px] px-2 py-0.5 tracking-wider uppercase font-medium border ${statusChip.cls}`}>
          {statusChip.label}
        </span>
      </div>
      <div className="font-display text-lg font-semibold leading-tight mb-2 text-navy">
        {module.title}
      </div>
      <div className="text-[13px] text-xeo-muted leading-relaxed mb-5">
        {module.subtitle}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-xeo-border text-[12px]">
        <span className="text-xeo-muted">{module.estimatedMinutes} min</span>
        {completed && quizScore != null && (
          <span className="font-mono font-medium text-jasper-600">{quizScore}% quiz</span>
        )}
        <span className="font-mono font-semibold text-amber-700">+{module.xpReward} XP</span>
      </div>
    </div>
  )

  if (!unlocked) return inner
  return <Link to={`/module/${module.id}`} className="block">{inner}</Link>
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
      {/* ── Mission Brief ── */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 py-8 border-b border-xeo-border mb-12">
        <div>
          <h1 className="font-display text-2xl sm:text-[34px] font-bold leading-tight tracking-tight text-navy mb-4">
            Your Mission:<br />
            Embed <em className="italic text-flame-600">Claude</em> Across Nexus
          </h1>
          <p className="text-[15px] text-xeo-muted leading-[1.75] max-w-xl">
            {done === 0
              ? "You've just joined Nexus as Head of Developer Productivity. The company is scaling fast, and your mandate is clear: embed Claude across the engineering workflow. This curriculum is your roadmap from baseline fluency to architectural mastery."
              : done < total
              ? `${done} of ${total} modules complete. Your Nexus Velocity Score is ${progress.ariaScore}/100. Keep building to unlock the full potential of Claude across the engineering stack.`
              : 'All modules complete. Nexus is transformed. You\'ve mastered every layer of Claude — from conversational AI to multi-agent production systems.'}
          </p>
        </div>
        <div className="border-l-[3px] border-navy pl-7 flex flex-col gap-5">
          <div className="font-display italic text-lg sm:text-xl leading-relaxed text-navy relative">
            <span className="absolute -left-2 top-0 text-5xl text-flame-600/30 leading-none">&ldquo;</span>
            The organizations that master AI tools now will define the competitive landscape for the next decade.
          </div>
          <div className="text-[12px] tracking-widest uppercase text-xeo-muted">
            — The Nexus Charter
          </div>

          {/* Badges strip */}
          <div className="flex gap-3 pt-4 border-t border-xeo-border mt-2">
            {BADGE_DEFINITIONS.map(badge => {
              const earned = progress.badges.includes(badge.id)
              return (
                <div key={badge.id} className={`flex flex-col items-center gap-1.5 cursor-pointer transition-opacity ${earned ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-base ${earned ? 'border-amber-500 bg-amber-50' : 'border-xeo-border bg-xeo-subtle'}`}>
                    {badge.icon}
                  </div>
                  <span className="text-[9px] tracking-wider uppercase text-xeo-muted text-center max-w-[56px] leading-tight">
                    {badge.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Summary CTA ── */}
      {done > 0 && (
        <div className="mb-10">
          <Link to="/summary">
            <div className="border border-dashed border-xeo-border p-3 flex items-center gap-3 hover:bg-xeo-subtle transition-colors group">
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
              <span className="text-xs text-flame-600 group-hover:text-flame-700 font-semibold shrink-0">
                {done === TOTAL_MODULES ? 'Download →' : 'View →'}
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* ── Levels ── */}
      <div className="space-y-14">
        {LEVELS.map((level, idx) => {
          const levelModules = level.modules.map(id => MODULES[id])
          const levelDone = levelModules.filter(m => isModuleComplete(m.id)).length
          const levelTotal = levelModules.length
          const isLocked = levelModules.every(m => !isModuleUnlocked(m.id))

          // Find the first incomplete unlocked module in this level for featured treatment
          const featuredInLevel = levelModules.find(
            m => isModuleUnlocked(m.id) && !isModuleComplete(m.id)
          )
          const remainingModules = levelModules.filter(m => m !== featuredInLevel)

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className={isLocked ? 'opacity-40' : ''}
            >
              <SectionTitle
                title={`Level ${['One', 'Two', 'Three', 'Four'][level.id - 1]} · ${level.title}`}
                tag={level.label}
              />

              {/* Level subtitle / deck */}
              <div className="text-[13px] italic text-xeo-muted mb-6 pl-4 ml-10 border-l-2 border-xeo-border py-1">
                {level.subtitle}
                {levelDone === levelTotal && levelTotal > 0 && ' — completed ✓'}
                {isLocked && ' — locked until previous level complete'}
              </div>

              {/* Level progress line */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[12px] text-xeo-muted">Level progress</span>
                <div className="flex-1 max-w-[200px] h-[3px] bg-xeo-border overflow-hidden">
                  <div
                    className="h-full bg-jasper-600 transition-all duration-700"
                    style={{ width: `${(levelDone / levelTotal) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] font-semibold font-mono text-navy">
                  {levelDone} / {levelTotal} modules
                </span>
              </div>

              {/* Featured active module */}
              {featuredInLevel && !isLocked && (
                <FeaturedModule module={featuredInLevel} />
              )}

              {/* Module grid */}
              {remainingModules.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-xeo-border border border-xeo-border" style={{ marginTop: featuredInLevel ? '1px' : 0 }}>
                  {remainingModules.map(module => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      unlocked={isModuleUnlocked(module.id)}
                      completed={isModuleComplete(module.id)}
                      quizScore={progress.quizScores[module.id]}
                    />
                  ))}
                </div>
              )}

              {/* Nexus Report checkpoint */}
              {(level.id === 1 || level.id === 2 || level.id === 3) && levelDone === levelTotal && (
                <div className="mt-3">
                  <Link to="/aria">
                    <div className="border border-dashed border-xeo-border p-3 flex items-center gap-3 hover:bg-xeo-subtle transition-colors group">
                      <span className="text-lg">📊</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-navy">Nexus Report Card</div>
                        <div className="text-xs text-xeo-muted">See Nexus velocity after Level {level.id}</div>
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
