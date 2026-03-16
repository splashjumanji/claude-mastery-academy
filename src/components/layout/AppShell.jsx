import { Link, useLocation } from 'react-router-dom'
import { getLevelInfo } from '../../hooks/useProgress'
import { ProgressRing } from '../ui/ProgressRing'
import { FlagContent } from '../ui/FlagContent'
import { MODULES } from '../../data/modules'

export function AppShell({ children, progress }) {
  const location = useLocation()
  const { current } = getLevelInfo(progress.xp)
  const total = Object.keys(MODULES).length
  const done = progress.completedModules.length

  const navItems = [
    { to: '/', label: 'Curriculum' },
    { to: '/aria', label: 'Nexus Score' },
    { to: '/badges', label: 'Badges' },
    { to: '/flashcards', label: 'Flashcards' },
    { to: '/summary', label: 'Summary' },
  ]

  // Calculate average quiz score
  const scores = Object.values(progress.quizScores)
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0

  return (
    <div className="min-h-screen flex flex-col bg-xeo-bg">
      {/* ── Masthead ── */}
      <header className="border-b-[3px] border-double border-navy">
        {/* Top line */}
        <div className="px-6 sm:px-12 flex items-center justify-between py-3 border-b border-xeo-border text-[11px] tracking-widest uppercase text-xeo-muted">
          <span className="hidden sm:inline">Curriculum Guide</span>
          <span>The Anthropic Learning Series</span>
          <span className="hidden sm:inline">Module {done > 0 ? `${done + 1 > total ? done : done + 1} of ${total}` : `1 of ${total}`} &middot; {current.name}</span>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center py-5 gap-1">
          <Link to="/" className="font-display text-3xl sm:text-[42px] font-bold tracking-tight text-navy leading-none">
            Claude <em className="italic text-flame-600">Mastery</em> Academy
          </Link>
          <div className="text-[12px] tracking-[0.22em] uppercase text-xeo-muted font-normal mt-1">
            From 101 to 401 &middot; AI Fluency for the Modern Organization
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex justify-center border-t border-xeo-border mt-2">
          {navItems.map(item => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-5 py-2 text-[12px] tracking-widest uppercase border-r border-xeo-border transition-all duration-150
                  ${active ? 'bg-navy text-white' : 'text-navy/60 hover:bg-navy hover:text-white'}
                `}
                style={item === navItems[0] ? { borderLeft: '1px solid var(--tw-border-opacity, 1)' } : {}}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* ── Byline Band ── */}
      <div className="px-6 sm:px-12 max-w-[1200px] mx-auto w-full">
        <div className="flex items-center gap-6 sm:gap-8 py-4 border-b border-xeo-border overflow-x-auto">
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted">Experience</span>
            <span className="text-base font-semibold font-mono text-flame-600">{progress.xp} XP</span>
          </div>
          <div className="w-px h-9 bg-xeo-border shrink-0" />
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted">Level</span>
            <span className="text-base font-semibold font-mono text-navy">{current.name}</span>
          </div>
          <div className="w-px h-9 bg-xeo-border shrink-0" />
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted">Completed</span>
            <span className="text-base font-semibold font-mono text-navy">{done} / {total}</span>
          </div>
          <div className="w-px h-9 bg-xeo-border shrink-0" />
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted">Quiz Avg</span>
            <span className="text-base font-semibold font-mono text-jasper-600">{avgScore > 0 ? `${avgScore}%` : '--'}</span>
          </div>
          {progress.streak > 0 && (
            <>
              <div className="w-px h-9 bg-xeo-border shrink-0" />
              <div className="flex flex-col gap-0.5 shrink-0">
                <span className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted">Streak</span>
                <span className="text-base font-semibold font-mono text-navy">{progress.streak}</span>
              </div>
            </>
          )}

          {/* Nexus velocity — right-aligned */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-[11px] tracking-widest uppercase text-xeo-muted hidden md:inline">Nexus Velocity</span>
            <ProgressRing score={progress.ariaScore} size={36} strokeWidth={4} label="" />
            <span className="text-lg font-semibold font-mono text-jasper-600">{progress.ariaScore}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 px-6 sm:px-12 max-w-[1200px] mx-auto w-full py-8">
        {children}
      </main>

      {/* ── Bottom Strip ── */}
      <footer className="border-t-[3px] border-double border-navy px-6 sm:px-12 py-4 flex items-center gap-8 text-[12px] text-xeo-muted tracking-wider bg-xeo-subtle">
        <span className="font-display text-sm font-semibold text-navy">Claude Mastery Academy</span>
        <span>&middot;</span>
        <span>An Anthropic Learning Experience</span>
        <span className="ml-auto">Progress saved</span>
      </footer>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="sm:hidden sticky bottom-0 border-t border-xeo-border bg-white flex z-50">
        {navItems.slice(0, 4).map(item => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-medium tracking-wider uppercase transition-colors
                ${active ? 'text-flame-600' : 'text-xeo-muted'}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <FlagContent />
    </div>
  )
}
