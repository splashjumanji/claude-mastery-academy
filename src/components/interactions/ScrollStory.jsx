import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IllustrationRenderer } from '../illustrations'

// ─── Beat generation ────────────────────────────────────────────────
// Expands each lesson into one or more full-screen "beats".
//
// stat_reveal supports displayStyle:
//   'narrative_only' → skip all stat visualization; body text already explains them
//   'contrast' → 2 big opposing numbers side-by-side + supporting stats
//   'chart'    → animated horizontal bar chart comparing all values
//   'grid'     → compact stacked list of number + label pairs
//   (default)  → one dramatic full-screen beat per stat (original)
//
// platform_stats: first 2 platforms get full-screen individual beats,
//   remaining platforms are grouped onto a single compact beat.
//
// Sources: beats carry a `sources` array [{name, url}] rendered as
//   subtle grey footnotes above the scroll prompt.

// Collect unique {name, url} sources from a stats array (deduped by URL)
function uniqueSources(stats) {
  const seen = new Set()
  const out = []
  stats?.forEach(s => {
    if (s.sourceUrl && !seen.has(s.sourceUrl)) {
      seen.add(s.sourceUrl)
      out.push({ name: s.source, url: s.sourceUrl })
    }
  })
  return out.length > 0 ? out : null
}

function generateBeats(lessons) {
  const beats = []

  lessons.forEach(lesson => {
    switch (lesson.type) {

      case 'narrative':
        beats.push({ type: 'narrative', heading: lesson.heading, body: lesson.body, visual: lesson.visual ?? null })
        break

      case 'stat_reveal': {
        const statSources = uniqueSources(lesson.stats)
        // Narrative beat gets sources so the footnote appears even when stats are hidden
        beats.push({ type: 'narrative', heading: lesson.heading, body: lesson.body, sources: statSources, visual: lesson.visual ?? null, callout: lesson.callout ?? null })

        if (lesson.displayStyle === 'narrative_only') {
          // Stats are already described in the narrative body — skip all visualization
        } else if (lesson.displayStyle === 'contrast') {
          beats.push({ type: 'contrast_stat', stats: lesson.stats, sources: statSources })
        } else if (lesson.displayStyle === 'chart') {
          beats.push({ type: 'bar_chart', stats: lesson.stats, sources: statSources })
        } else if (lesson.displayStyle === 'grid') {
          beats.push({ type: 'multi_stat', stats: lesson.stats, sources: statSources })
        } else {
          // Default: each stat gets its own hero screen with its own source
          lesson.stats?.forEach(stat =>
            beats.push({
              type: 'stat',
              number: stat.value,
              label: stat.label,
              color: stat.color,
              sources: stat.source ? [{ name: stat.source, url: stat.sourceUrl }] : null,
            })
          )
        }

        if (lesson.insight) beats.push({ type: 'insight', text: lesson.insight, sources: statSources })
        break
      }

      case 'platform_stats': {
        const lessonSources = lesson.sources ?? null
        beats.push({ type: 'narrative', heading: lesson.heading, body: lesson.body, sources: lessonSources })

        const platforms = lesson.platforms ?? []
        // Single beat — platforms reveal themselves one at a time via an internal timer
        beats.push({
          type: 'platform_reveal',
          platforms,
          sources: lessonSources,
        })

        if (lesson.insight) beats.push({ type: 'insight', text: lesson.insight, sources: lessonSources })
        break
      }

      case 'concept':
        beats.push({
          type: 'narrative',
          heading: lesson.heading,
          body: lesson.body,
          callout: lesson.callout,
          tools: lesson.tools ?? null,
          visual: lesson.visual ?? null,
        })
        lesson.keyPoints?.forEach(point => {
          const isObj = typeof point === 'object' && point !== null
          beats.push({ type: 'concept_point', text: isObj ? point.text : point, visual: isObj ? (point.visual ?? null) : null, sourceUrl: isObj ? (point.sourceUrl ?? null) : null, sourceLabel: isObj ? (point.sourceLabel ?? null) : null })
        })
        break

      case 'trinity_intro':
        beats.push({ type: 'chapter', heading: lesson.heading, body: lesson.body })
        lesson.disciplines?.forEach(disc =>
          beats.push({
            type: 'discipline',
            label: disc.label,
            tagline: disc.tagline,
            description: disc.description,
            color: disc.color,
            layerLabel: disc.layerLabel,
          })
        )
        break

      case 'comparison':
        beats.push({ type: 'narrative', heading: lesson.heading, body: lesson.body, visual: lesson.visual ?? null })
        if (lesson.before || lesson.after) {
          beats.push({ type: 'before_after', before: lesson.before ?? null, after: lesson.after ?? null })
        }
        break

      default:
        beats.push({ type: 'narrative', heading: lesson.heading || '', body: lesson.body || '', visual: lesson.visual ?? null })
    }
  })

  return beats
}

// ─── Color maps ─────────────────────────────────────────────────────

const STAT_COLOR = {
  green:  'text-green-600',
  red:    'text-red-500',
  flame:  'text-flame-600',
  jasper: 'text-jasper-500',
  amber:  'text-amber-500',
  gray:   'text-navy/40',
  aria:   'text-aria-500',
}

// Bar fill colours for BarChartBeat
const BAR_BG = {
  green:  'bg-green-500',
  red:    'bg-red-400',
  flame:  'bg-flame-500',
  jasper: 'bg-jasper-400',
  amber:  'bg-amber-400',
  gray:   'bg-navy/25',
  aria:   'bg-aria-500',
}

const CALLOUT_CLASS = {
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  insight: 'bg-flame-50 border-flame-200 text-flame-800',
  danger:  'bg-red-50 border-red-200 text-red-800',
  info:    'bg-aria-50 border-aria-200 text-aria-800',
  tip:     'bg-green-50 border-green-200 text-green-800',
  jasper:  'bg-jasper-50 border-jasper-200 text-jasper-800',
}

const DISC_STYLE = {
  aria:    { accent: 'text-aria-600',    badge: 'bg-aria-100 text-aria-700' },
  jasper:  { accent: 'text-jasper-500',  badge: 'bg-jasper-100 text-jasper-700' },
  emerald: { accent: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
}

// ─── Beat renderers ─────────────────────────────────────────────────

// NARRATIVE — large serif headline + body + optional illustration + optional callout
function NarrativeBeat({ beat }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-4xl md:text-5xl font-display text-navy leading-tight mb-6 [text-wrap:pretty]">
        {beat.heading}
      </h2>
      {beat.body && (
        <p className="text-lg text-navy/70 leading-relaxed max-w-prose">
          {beat.body}
        </p>
      )}
      {beat.visual && (
        <IllustrationRenderer
          visual={beat.visual}
          className="mt-6 rounded-xl bg-xeo-subtle border border-xeo-border p-3"
        />
      )}
      {beat.callout && (
        <div className={`mt-6 border rounded-xl p-4 text-sm leading-relaxed ${CALLOUT_CLASS[beat.callout.type] ?? CALLOUT_CLASS.info}`}>
          {beat.callout.text}
          {beat.callout.sourceUrl && (
            <div className="mt-2 pt-2 border-t border-current/10 flex items-center gap-1.5">
              <span className="text-[10px] opacity-55 font-medium">Source:</span>
              <a
                href={beat.callout.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] opacity-45 hover:opacity-70 transition-opacity underline underline-offset-2"
              >
                {beat.callout.source || beat.callout.sourceUrl}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// STAT — single hero number (used when a stat deserves its own full screen)
function StatBeat({ beat }) {
  const color = STAT_COLOR[beat.color] ?? 'text-navy'
  return (
    <div className="w-full max-w-lg mx-auto px-4 text-center">
      <div className={`text-7xl md:text-8xl font-black leading-none tabular-nums ${color}`}>
        {beat.number}
      </div>
      <div className="mt-5 text-xs font-semibold tracking-[0.22em] uppercase text-navy/45">
        {beat.label}
      </div>
    </div>
  )
}

// CONTRAST_STAT — two opposing numbers side-by-side (e.g. Crocodile Mouth)
function ContrastStatBeat({ beat }) {
  const [primary, secondary, ...rest] = beat.stats ?? []
  if (!primary || !secondary) return null

  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6">
      <div className="flex items-end justify-center gap-6 md:gap-10">
        <div className="text-center">
          <div className={`text-6xl md:text-7xl font-black leading-none tabular-nums ${STAT_COLOR[primary.color] ?? 'text-navy'}`}>
            {primary.value}
          </div>
          <div className="mt-3 text-xs font-semibold tracking-[0.2em] uppercase text-navy/45">
            {primary.label}
          </div>
        </div>

        <div className="text-navy/15 text-2xl font-light mb-5 shrink-0">vs</div>

        <div className="text-center">
          <div className={`text-6xl md:text-7xl font-black leading-none tabular-nums ${STAT_COLOR[secondary.color] ?? 'text-navy'}`}>
            {secondary.value}
          </div>
          <div className="mt-3 text-xs font-semibold tracking-[0.2em] uppercase text-navy/45">
            {secondary.label}
          </div>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="mt-10 pt-7 border-t border-navy/10 flex justify-center gap-10">
          {rest.map((s, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl md:text-3xl font-black tabular-nums ${STAT_COLOR[s.color] ?? 'text-navy'}`}>
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// BAR_CHART — animated horizontal bars, great for comparison across multiple values
function BarChartBeat({ beat, isVisible }) {
  const stats = beat.stats ?? []
  const maxVal = Math.max(...stats.map(s => parseFloat(s.value) || 0), 1)

  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-6">
      <div className="mb-7">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-navy/35">
          Conversion rates compared
        </span>
      </div>
      <div className="space-y-6">
        {stats.map((stat, i) => {
          const pct = (parseFloat(stat.value) / maxVal) * 100
          return (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-navy/60 font-medium leading-tight pr-4">
                  {stat.label}
                </span>
                <span className={`text-base font-black tabular-nums shrink-0 ${STAT_COLOR[stat.color] ?? 'text-navy'}`}>
                  {stat.value}
                </span>
              </div>
              <div className="h-2.5 bg-navy/8 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${BAR_BG[stat.color] ?? 'bg-navy/30'}`}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${pct}%` } : { width: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// MULTI_STAT — stacked list: big number on left, label on right
function MultiStatBeat({ beat }) {
  const stats = beat.stats ?? []
  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-6 space-y-8">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-baseline gap-5">
          <div className={`text-5xl font-black leading-none tabular-nums shrink-0 min-w-[90px] ${STAT_COLOR[stat.color] ?? 'text-navy'}`}>
            {stat.value}
          </div>
          <div className="text-sm text-navy/60 font-medium leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// INSIGHT — a key takeaway, left-border accent
function InsightBeat({ beat }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6">
      <div className="border-l-[3px] border-flame-400 pl-6">
        <p className="text-2xl md:text-3xl font-display text-navy/80 leading-relaxed">
          {beat.text}
        </p>
      </div>
    </div>
  )
}

// PLATFORM — icon badge + platform name + stat (full-screen, for top 2 platforms)
function PlatformBeat({ beat }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-xeo-subtle border border-xeo-border flex items-center justify-center text-2xl font-black text-navy shrink-0">
          {beat.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-display text-navy leading-tight [text-wrap:pretty]">
          {beat.name}
        </h3>
      </div>
      <p className="text-xl text-navy/55 leading-relaxed ml-[5.25rem]">
        {beat.stat}
      </p>
    </div>
  )
}

// PLATFORM_REVEAL — single beat, scroll-triggered reveal.
// revealCount is driven by ScrollStory's wheel intercept (see below) and
// passed in as a prop so there are zero stale-closure / React-timing issues.
//
// Wheel/drum effect: the newest (active) item renders at full size; items
// above it taper in scale + opacity with each step of distance, giving a
// perspective receding effect. AnimatePresence enables exit animations when
// revealCount decrements (reverse scroll through the wheel).
function PlatformRevealBeat({ beat, revealCount }) {
  const { platforms } = beat
  const activeIdx = revealCount - 1

  // Scale + opacity taper as items recede up the wheel
  const wheelStyle = (distance) => ({
    scale:   Math.max(0.64, 1 - distance * 0.11),  // 1.0 → 0.89 → 0.78 → 0.67 → 0.64
    opacity: Math.max(0.22, 1 - distance * 0.22),  // 1.0 → 0.78 → 0.56 → 0.34 → 0.22
  })

  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6 space-y-5">
      <AnimatePresence initial={false}>
        {platforms.slice(0, revealCount).map((p, i) => {
          const { scale, opacity } = wheelStyle(activeIdx - i)
          return (
            <motion.div
              key={i}
              className="flex items-center gap-4"
              style={{ transformOrigin: 'left center' }}
              initial={{ opacity: 0, y: 18, scale: 0.85 }}
              animate={{ opacity, y: 0, scale }}
              exit={{ opacity: 0, y: 18, scale: 0.85 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-12 h-12 rounded-xl bg-xeo-subtle border border-xeo-border flex items-center justify-center text-base font-black text-navy shrink-0">
                {p.icon}
              </div>
              <div>
                <div className="text-xl md:text-2xl font-display text-navy leading-tight">
                  {p.name}
                </div>
                <div className="text-sm text-navy/55 leading-relaxed mt-0.5">
                  {p.stat}
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// CONCEPT_POINT — single key point, arrow accent
function ConceptPointBeat({ beat }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6">
      <div className="flex gap-4 items-start">
        <div className="shrink-0 w-3 h-[2px] bg-flame-400 mt-[1.1rem]" />
        <p className="text-2xl md:text-3xl font-display text-navy leading-snug">
          {beat.text}
        </p>
      </div>
      {beat.visual && (
        <IllustrationRenderer
          visual={beat.visual}
          className="mt-6 rounded-xl bg-xeo-subtle border border-xeo-border p-3"
        />
      )}
      {beat.sourceUrl && (
        <a href={beat.sourceUrl} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1 mt-3 text-xs text-flame-600 font-semibold hover:underline">
          {beat.sourceLabel
            ? `${beat.sourceLabel} →`
            : beat.sourceUrl.includes('linkedin.com')
              ? 'See this post on LinkedIn →'
              : 'Source →'}
        </a>
      )}
    </div>
  )
}

// CHAPTER — section opener, very large headline
function ChapterBeat({ beat }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-5xl md:text-6xl font-display text-navy leading-tight mb-5 [text-wrap:pretty]">
        {beat.heading}
      </h2>
      {beat.body && (
        <p className="text-xl text-navy/55 leading-relaxed">
          {beat.body}
        </p>
      )}
    </div>
  )
}

// DISCIPLINE — SEO / AEO / GEO full-screen introduction
function DisciplineBeat({ beat }) {
  const s = DISC_STYLE[beat.color] ?? DISC_STYLE.aria
  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-6">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 ${s.badge}`}>
        {beat.layerLabel}
      </div>
      <div className={`text-7xl md:text-8xl font-black leading-none mb-4 ${s.accent}`}>
        {beat.label}
      </div>
      <div className="text-2xl md:text-3xl font-display text-navy mb-5">
        {beat.tagline}
      </div>
      <p className="text-lg text-navy/70 leading-relaxed max-w-prose">
        {beat.description}
      </p>
    </div>
  )
}

// BEFORE / AFTER — two-column comparison card
function BeforeAfterBeat({ beat }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {beat.before && (
          <div className="rounded-xl bg-xeo-subtle border border-xeo-border p-4">
            <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-navy/40 mb-3">
              {beat.before.label}
            </div>
            <ul className="space-y-2">
              {beat.before.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-navy/25 shrink-0 mt-0.5">—</span>
                  <span className="text-navy/60">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {beat.after && (
          <div className="rounded-xl bg-aria-50 border border-aria-200 p-4">
            <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-aria-600 mb-3">
              {beat.after.label}
            </div>
            <ul className="space-y-2">
              {beat.after.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-aria-500 shrink-0 mt-0.5">›</span>
                  <span className="text-navy">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Beat dispatcher — isVisible passed through to beats that need it for animations
function BeatContent({ beat, isVisible, revealCount }) {
  switch (beat.type) {
    case 'narrative':       return <NarrativeBeat beat={beat} />
    case 'stat':            return <StatBeat beat={beat} />
    case 'contrast_stat':   return <ContrastStatBeat beat={beat} />
    case 'bar_chart':       return <BarChartBeat beat={beat} isVisible={isVisible} />
    case 'multi_stat':      return <MultiStatBeat beat={beat} />
    case 'insight':         return <InsightBeat beat={beat} />
    case 'platform':        return <PlatformBeat beat={beat} />
    case 'platform_reveal': return <PlatformRevealBeat beat={beat} revealCount={revealCount ?? 1} />
    case 'concept_point':   return <ConceptPointBeat beat={beat} />
    case 'before_after':    return <BeforeAfterBeat beat={beat} />
    case 'chapter':         return <ChapterBeat beat={beat} />
    case 'discipline':      return <DisciplineBeat beat={beat} />
    default:                return <NarrativeBeat beat={beat} />
  }
}

// ─── ScrollStory ─────────────────────────────────────────────────────
// Full-viewport scroll-snap lesson renderer.
// Replaces MicroLesson in the ModulePlayer's "lessons" phase.
//
// Scroll behaviour:
//   • scroll-snap-type: y mandatory — one beat at a time
//   • Each beat = 100% of container height
//   • seenBeats: a Set that only grows — once a beat is seen, it stays animated
//   • onComplete fires 1.8s after the final beat enters view

export function ScrollStory({ lessons, onComplete }) {
  const beats = useMemo(() => generateBeats(lessons), [lessons])

  // Index of the platform_reveal beat (−1 if none), and how many platforms it has
  const platformRevealIdx = useMemo(() => beats.findIndex(b => b.type === 'platform_reveal'), [beats])
  const platformCount     = platformRevealIdx >= 0 ? (beats[platformRevealIdx].platforms?.length ?? 0) : 0

  const containerRef  = useRef(null)
  const currentIdxRef = useRef(0)
  const completedRef  = useRef(false)

  const [currentBeat, setCurrentBeat] = useState(0)
  const [seenBeats, setSeenBeats]     = useState(() => new Set([0]))

  // Platform reveal count — lives here so the wheel handler ref is always current.
  // revealCountRef is updated SYNCHRONOUSLY in the wheel handler (no useEffect needed).
  const [revealCount, setRevealCount] = useState(1)
  const revealCountRef  = useRef(1)
  const lastRevealRef   = useRef(0)
  // isLockedRef: true only after scrollend has fired and overflow:hidden is set.
  // The wheel handler must NOT reveal platforms until this is true — otherwise
  // wheel events from the incoming scroll gesture reveal platforms mid-animation.
  const isLockedRef = useRef(false)
  // waitForGestureEndRef: true means "ignore wheel events until deltaY drops to near-zero".
  // Prevents Mac trackpad deceleration (1–2 s of events) from triggering multiple reveals.
  // Set true whenever we lock (arriving gesture) or trigger a reveal (that gesture's tail).
  const waitForGestureEndRef = useRef(true)
  // waitForLastBeatGestureRef: same gesture-phase detection for the final beat.
  // Set true when the user snaps to the last beat. Cleared when deltaY → 0 (gesture end).
  // Only a new deliberate downward scroll after that fires onComplete.
  const waitForLastBeatGestureRef = useRef(true)

  // ── Scroll handler (tracks current beat, marks seen, fires onComplete) ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const h = el.clientHeight
      if (!h) return
      const ratio = el.scrollTop / h
      const idx = Math.max(0, Math.min(Math.round(ratio), beats.length - 1))

      // Beat tracking — only when the beat index changes
      if (idx !== currentIdxRef.current) {
        currentIdxRef.current = idx
        setCurrentBeat(idx)

        setSeenBeats(prev => {
          if (prev.has(idx)) return prev
          const next = new Set(prev)
          next.add(idx)
          return next
        })

        if (idx === beats.length - 1 && !completedRef.current) {
          // Don't auto-advance — block the landing gesture so only a new
          // deliberate downward scroll fires onComplete (see third useEffect below).
          waitForLastBeatGestureRef.current = true
        }
      }

      // Proximity lock — fires on EVERY scroll event, not just beat changes.
      // When we're within 5% of the platform beat's exact snap position, lock
      // immediately and snap to the precise pixel. This intercepts the animation
      // before the snap can overshoot the beat, which scroll-snap-stop:always
      // does not prevent reliably on fast Mac trackpad swipes.
      if (!isLockedRef.current &&
          platformRevealIdx >= 0 &&
          revealCountRef.current < platformCount &&
          idx === platformRevealIdx &&
          Math.abs(ratio - platformRevealIdx) < 0.05) {
        el.scrollTo({ top: platformRevealIdx * h, behavior: 'instant' }) // exact position first
        el.style.overflowY = 'hidden'
        isLockedRef.current = true
        waitForGestureEndRef.current = true
      }
    }

    // tryLock: apply the overflow:hidden lock if we've settled on the platform beat.
    // Called by both scrollend (immediate, modern browsers) and a debounce fallback
    // (100 ms after last scroll event — scrollend polyfill for older Safari etc.).
    const tryLock = () => {
      const h = el.clientHeight
      if (!h) return
      const idx = Math.round(el.scrollTop / h)
      if (idx === platformRevealIdx &&
          revealCountRef.current < platformCount &&
          !isLockedRef.current) {
        el.style.overflowY = 'hidden'
        isLockedRef.current = true
        waitForGestureEndRef.current = true  // block deceleration of the arriving gesture
      }
    }

    // Debounce: reset on every scroll event; fires 100 ms after scrolling stops.
    // This acts as a scrollend polyfill when the native event isn't available.
    let lockDebounceTimer = null
    const handleScrollDebounce = () => {
      // Only activate when we're on (or entering) the platform beat
      if (currentIdxRef.current !== platformRevealIdx) return
      if (isLockedRef.current) return
      clearTimeout(lockDebounceTimer)
      lockDebounceTimer = setTimeout(tryLock, 100)
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    el.addEventListener('scroll', handleScrollDebounce, { passive: true })
    el.addEventListener('scrollend', tryLock, { passive: true })
    return () => {
      el.removeEventListener('scroll', handleScroll)
      el.removeEventListener('scroll', handleScrollDebounce)
      el.removeEventListener('scrollend', tryLock)
      clearTimeout(lockDebounceTimer)
    }
  }, [beats.length, onComplete, platformRevealIdx, platformCount])

  // ── Platform reveal wheel/touch intercept — window-level + overflow lock ──
  // The container is overflow:hidden while locked. This handler detects gesture intent:
  //   • Gesture-phase detection replaces the old 500ms timestamp throttle.
  //   • waitForGestureEndRef prevents Mac trackpad deceleration (1–2 s of events)
  //     from triggering multiple reveals from a single swipe.
  //   • Each reveal waits for deltaY to drop to ~0 (gesture end) before the
  //     next scroll can trigger another reveal.
  useEffect(() => {
    if (platformRevealIdx < 0) return

    let gestureEndTimer = null

    const handleWheel = (e) => {
      if (currentIdxRef.current !== platformRevealIdx) return
      if (!isLockedRef.current) return

      const el = containerRef.current
      if (!el) return

      // Always prevent while locked — keeps outer page / window from scrolling
      e.preventDefault()

      const absDelta = Math.abs(e.deltaY)

      // Near-zero delta: the current gesture has fully decelerated — allow next gesture
      if (absDelta < 3) {
        waitForGestureEndRef.current = false
        return
      }

      // Silence fallback: if no events for 300 ms, also treat as gesture end
      // (catches fast flicks whose deltaY skips past the < 3 threshold)
      clearTimeout(gestureEndTimer)
      gestureEndTimer = setTimeout(() => { waitForGestureEndRef.current = false }, 300)

      // Still in the gesture that brought us here (or triggered the last reveal) — ignore
      if (waitForGestureEndRef.current) return

      if (e.deltaY <= 0) {
        if (revealCountRef.current > 1) {
          // Still platforms visible — cycle the wheel backward one step
          waitForGestureEndRef.current = true
          const prev = revealCountRef.current - 1
          revealCountRef.current = prev
          setRevealCount(prev)
        } else {
          // Back to the first platform — unlock and go to previous beat
          el.style.overflowY = ''
          isLockedRef.current = false
          waitForGestureEndRef.current = true
          el.scrollTo({ top: (platformRevealIdx - 1) * el.clientHeight, behavior: 'smooth' })
        }
        return
      }

      // Downward new gesture
      if (revealCountRef.current < platformCount) {
        // More platforms to show — reveal one and stay locked.
        // Do NOT unlock even when this is the final reveal: the user needs
        // one more deliberate gesture to advance past this beat.
        waitForGestureEndRef.current = true
        const next = revealCountRef.current + 1
        revealCountRef.current = next
        setRevealCount(next)
      } else {
        // All platforms already shown — this gesture advances past the beat
        el.style.overflowY = ''
        isLockedRef.current = false
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchMove = (e) => {
      if (currentIdxRef.current !== platformRevealIdx) return
      if (!isLockedRef.current) return
      const el = containerRef.current
      if (!el) return
      const dy = touchStartY - e.touches[0].clientY
      if (dy < -20) {
        const now = Date.now()
        if (now - lastRevealRef.current > 500) {
          lastRevealRef.current = now
          touchStartY = e.touches[0].clientY
          if (revealCountRef.current > 1) {
            // Cycle the wheel backward one step
            const prev = revealCountRef.current - 1
            revealCountRef.current = prev
            setRevealCount(prev)
          } else {
            // Back to first — unlock and go to previous beat
            el.style.overflowY = ''
            isLockedRef.current = false
            el.scrollTo({ top: (platformRevealIdx - 1) * el.clientHeight, behavior: 'smooth' })
          }
        }
        return
      }
      if (dy > 20) {
        const now = Date.now()
        if (now - lastRevealRef.current > 500) {
          lastRevealRef.current = now
          touchStartY = e.touches[0].clientY
          if (revealCountRef.current < platformCount) {
            // More platforms to show — reveal one and stay locked.
            // Keep locked even after the final reveal; one more swipe advances.
            const next = revealCountRef.current + 1
            revealCountRef.current = next
            setRevealCount(next)
          } else {
            // All platforms already shown — this swipe advances past the beat
            el.style.overflowY = ''
            isLockedRef.current = false
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      clearTimeout(gestureEndTimer)
    }
  }, [platformRevealIdx, platformCount])

  // ── Last-beat gesture-gated advance ──
  // Replaces the old setTimeout(onComplete, 1800) auto-timer.
  // Stays on the last beat; only a new deliberate downward scroll fires onComplete.
  useEffect(() => {
    if (beats.length === 0) return
    let gestureEndTimer = null

    const handleWheel = (e) => {
      if (currentIdxRef.current !== beats.length - 1) return
      if (completedRef.current) return
      if (isLockedRef.current) return  // platform_reveal may still own this beat

      const absDelta = Math.abs(e.deltaY)
      if (absDelta < 3) {
        waitForLastBeatGestureRef.current = false
        return
      }
      clearTimeout(gestureEndTimer)
      gestureEndTimer = setTimeout(() => { waitForLastBeatGestureRef.current = false }, 300)

      if (waitForLastBeatGestureRef.current) return
      if (e.deltaY <= 0) return  // ignore upward scrolls

      completedRef.current = true
      onComplete()
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(gestureEndTimer)
    }
  }, [beats.length, onComplete])

  if (!beats.length) return null

  return (
    <div className="relative" style={{ height: 'calc(100vh - 224px)' }}>

      {/* ── Scroll snap container ── */}
      <div ref={containerRef} className="scroll-story-container">
        {beats.map((beat, i) => {
          const isVisible = seenBeats.has(i)
          return (
            <div key={i} className="story-beat">

              {/* Beat content — animates in once on first view */}
              <motion.div
                initial={{ opacity: 0, y: beat.type === 'platform_reveal' ? 0 : 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: beat.type === 'platform_reveal' ? 0 : 28 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full"
              >
                <BeatContent
                  beat={beat}
                  isVisible={isVisible}
                  revealCount={i === platformRevealIdx ? revealCount : undefined}
                />
              </motion.div>

              {/* Source + Tool footnotes — grey, subtle, stacked above the scroll prompt */}
              {(beat.sources?.length > 0 || beat.tools?.length > 0) && (
                <motion.div
                  className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-2 px-8 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {beat.sources?.length > 0 && (
                    <div className="flex justify-center items-center flex-wrap gap-1.5">
                      <span className="text-[11px] text-navy/35 font-medium">Sources:</span>
                      {beat.sources.map((s, j) => (
                        <span key={j} className="flex items-center gap-1.5">
                          {j > 0 && <span className="text-[11px] text-navy/20 select-none">|</span>}
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-navy/28 hover:text-navy/50 transition-colors pointer-events-auto"
                          >
                            {s.name}
                          </a>
                        </span>
                      ))}
                    </div>
                  )}
                  {beat.tools?.length > 0 && (
                    <div className="flex justify-center items-center flex-wrap gap-1.5">
                      <span className="text-[11px] text-navy/35 font-medium">Tools:</span>
                      {beat.tools.map((t, j) => (
                        <span key={j} className="flex items-center gap-1.5">
                          {j > 0 && <span className="text-[11px] text-navy/20 select-none">|</span>}
                          <a
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-navy/28 hover:text-navy/50 transition-colors pointer-events-auto"
                          >
                            {t.name}
                          </a>
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Unified scroll / continue prompt — shows on every beat while active */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-navy/30 pointer-events-none select-none"
                animate={{ opacity: currentBeat === i ? 1 : 0 }}
                transition={{ duration: 0.35, delay: currentBeat === i ? 0.9 : 0 }}
              >
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
                  {i === beats.length - 1 ? 'continue' : 'scroll'}
                </span>
                <motion.svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* ── Right-edge progress dots ── */}
      {beats.length > 2 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10 pr-px">
          {beats.map((_, i) => (
            <div
              key={i}
              style={{ transition: 'all 0.25s ease' }}
              className={`rounded-full ${
                i === currentBeat ? 'w-1.5 h-5 bg-flame-500 opacity-75' :
                seenBeats.has(i)  ? 'w-1.5 h-1.5 bg-navy/25' :
                                    'w-1.5 h-1.5 bg-navy/10'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
