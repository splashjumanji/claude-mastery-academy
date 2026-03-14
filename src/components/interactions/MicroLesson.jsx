import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StatCard } from '../ui/StatCard'
import { PlatformChip } from '../ui/PlatformChip'
import { IllustrationRenderer } from '../illustrations'

const STAT_COLORS = {
  flame:  { text: 'text-flame-600',  border: 'border-flame-300',  bg: 'bg-flame-50'  },
  jasper: { text: 'text-jasper-600', border: 'border-jasper-300', bg: 'bg-jasper-50' },
  aria:   { text: 'text-aria-600',   border: 'border-aria-300',   bg: 'bg-aria-50'   },
  green:  { text: 'text-green-600',  border: 'border-green-300',  bg: 'bg-green-50'  },
  amber:  { text: 'text-amber-600',  border: 'border-amber-300',  bg: 'bg-amber-50'  },
  red:    { text: 'text-red-500',    border: 'border-red-300',    bg: 'bg-red-50'    },
}

function StatReveal({ lesson }) {
  // Deduplicate sources across all stats by URL (or name if no URL)
  const sources = lesson.stats.reduce((acc, stat) => {
    if (!stat.source && !stat.sourceUrl) return acc
    const key = stat.sourceUrl || stat.source
    if (!acc.find(s => (s.url || s.name) === key)) {
      acc.push({ name: stat.source, url: stat.sourceUrl })
    }
    return acc
  }, [])

  return (
    <div>
      <p className="text-navy/75 mb-6 text-base leading-relaxed">{lesson.body}</p>
      {lesson.visual && (
        <IllustrationRenderer
          visual={lesson.visual}
          className="mb-5 rounded-xl bg-xeo-subtle border border-xeo-border p-3"
        />
      )}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {lesson.stats.map((stat, i) => {
          const c = STAT_COLORS[stat.color] || STAT_COLORS.flame
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.07 }}
              className={`card p-4 border-2 ${c.border} ${c.bg}`}
            >
              <div className={`text-3xl font-bold ${c.text}`}>{stat.value}</div>
              <div className="text-sm font-medium text-navy mt-1">{stat.label}</div>
              {stat.detail && <div className="text-xs text-xeo-muted mt-1 leading-relaxed">{stat.detail}</div>}
            </motion.div>
          )
        })}
      </div>
      {lesson.insight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: lesson.stats.length * 0.07 + 0.1 }}
          className="rounded-xl border border-xeo-border p-4 text-sm leading-relaxed text-navy/80"
        >
          💡 <strong>Key insight:</strong> {lesson.insight}
        </motion.div>
      )}
      {sources.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: lesson.stats.length * 0.07 + 0.2 }}
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          <span className="text-xs text-xeo-muted font-medium">Sources:</span>
          {sources.map((s, i) => (
            s.url ? (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-xeo-muted hover:text-aria-600 transition-colors flex items-center gap-0.5"
              >
                <span>↗</span> {s.name}
              </a>
            ) : (
              <span key={i} className="text-xs text-xeo-muted">{s.name}</span>
            )
          ))}
        </motion.div>
      )}
    </div>
  )
}

function PlatformStats({ lesson }) {
  return (
    <div>
      <p className="text-navy/75 mb-6">{lesson.body}</p>
      <div className="space-y-3 mb-4">
        {lesson.platforms.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-xeo-subtle border border-xeo-border flex items-center justify-center font-bold text-sm shrink-0">
              {p.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-navy">{p.name}</div>
              <div className="text-xs text-xeo-muted">{p.stat}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {lesson.insight && (
        <div className="rounded-xl border border-xeo-border p-4 text-sm leading-relaxed text-navy/80">
          ⚠️ {lesson.insight}
        </div>
      )}
      {lesson.sources?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: lesson.platforms.length * 0.1 + 0.15 }}
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          <span className="text-xs text-xeo-muted font-medium">Sources:</span>
          {lesson.sources.map((s, i) => (
            s.url ? (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-xeo-muted hover:text-aria-600 transition-colors flex items-center gap-0.5"
              >
                <span>↗</span> {s.name}
              </a>
            ) : (
              <span key={i} className="text-xs text-xeo-muted">{s.name}</span>
            )
          ))}
        </motion.div>
      )}
    </div>
  )
}

function TrinityIntro({ lesson }) {
  const [selected, setSelected] = useState(null)
  const colors = {
    aria:    { border: 'border-aria-400',    bg: 'bg-aria-50',    text: 'text-aria-700',    badge: 'bg-aria-100 text-aria-700' },
    jasper:  { border: 'border-jasper-400',  bg: 'bg-jasper-50',  text: 'text-jasper-700',  badge: 'bg-jasper-100 text-jasper-700' },
    emerald: { border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  }

  return (
    <div>
      <p className="text-navy/75 mb-6">{lesson.body || 'Click each discipline to learn more.'}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {lesson.disciplines.map(d => {
          const c = colors[d.color]
          const isSelected = selected === d.id
          return (
            <motion.div
              key={d.id}
              onClick={() => setSelected(isSelected ? null : d.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`card p-5 cursor-pointer transition-all border-2 ${isSelected ? `${c.border} ${c.bg}` : 'border-xeo-border'}`}
            >
              <div className={`text-2xl font-black mb-2 ${c.text}`}>{d.label}</div>
              <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${c.badge}`}>
                "{d.tagline}"
              </div>
              {d.layerLabel && (
                <div className="text-[10px] font-semibold tracking-widest uppercase text-xeo-muted mb-2">
                  {d.layerLabel}
                </div>
              )}
              <AnimatePresence>
                {isSelected && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-xeo-muted leading-relaxed"
                  >
                    {d.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const CALLOUT_META = {
  warning: { cls: 'callout-warning', icon: '⚠️' },
  info:    { cls: 'callout-info',    icon: '💡' },
  success: { cls: 'callout-success', icon: '✅' },
  danger:  { cls: 'callout-danger',  icon: '🚨' },
  jasper:  { cls: 'callout-jasper',  icon: '⚡' },
  flame:   { cls: 'callout-flame',   icon: '🔥' },
}

function ConceptLesson({ lesson }) {
  return (
    <div>
      {lesson.body && <p className="text-navy/75 mb-5 text-base leading-relaxed">{lesson.body}</p>}
      {lesson.visual && (
        <IllustrationRenderer
          visual={lesson.visual}
          className="mb-5 rounded-xl bg-xeo-subtle border border-xeo-border p-3"
        />
      )}
      {lesson.keyPoints && (
        <ul className="space-y-2 mb-4">
          {lesson.keyPoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2 text-sm"
            >
              <span className="text-flame-600 mt-0.5 shrink-0 font-bold">›</span>
              {typeof point === 'string' ? (
                <span className="text-navy/80">{point}</span>
              ) : (
                <span className="text-navy/80">
                  {point.text}{' '}
                  {point.sourceUrl && (
                    <a href={point.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-flame-500 underline text-xs">
                      {point.sourceLabel
                        ? `${point.sourceLabel} →`
                        : point.sourceUrl.includes('linkedin.com')
                          ? 'See this post on LinkedIn →'
                          : 'Source →'}
                    </a>
                  )}
                </span>
              )}
            </motion.li>
          ))}
        </ul>
      )}
      {lesson.callout && (() => {
        const meta = CALLOUT_META[lesson.callout.type] || CALLOUT_META.info
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={meta.cls}
          >
            {meta.icon} {lesson.callout.text}
          </motion.div>
        )
      })()}
    </div>
  )
}

export function MicroLesson({ lessons, onComplete }) {
  const [step, setStep] = useState(0)

  const current = lessons[step]
  const isLast = step === lessons.length - 1

  const next = () => {
    if (isLast) onComplete()
    else setStep(s => s + 1)
  }

  const renderLesson = () => {
    switch (current.type) {
      case 'stat_reveal':      return <StatReveal lesson={current} />
      case 'platform_stats':   return <PlatformStats lesson={current} />
      case 'trinity_intro':    return <TrinityIntro lesson={current} />
      case 'narrative':
      case 'concept':
      case 'comparison':
      default:                  return <ConceptLesson lesson={current} />
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 justify-center mb-6">
        {lessons.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === step ? 'w-6 h-2.5 bg-flame-600' :
              i < step   ? 'w-2.5 h-2.5 bg-flame-300' :
                           'w-2.5 h-2.5 bg-xeo-border'
            }`}
          />
        ))}
      </div>

      {/* Lesson card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="lesson-card"
        >
          <h2 className="text-2xl font-display mb-5 text-navy">{current.heading}</h2>
          {renderLesson()}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-5">
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} className="btn-ghost text-sm">← Back</button>
        ) : <div />}
        <button onClick={next} className="btn-primary">
          {isLast ? 'Continue →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
