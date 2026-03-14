import { Link, useLocation } from 'react-router-dom'
import { getLevelInfo } from '../../hooks/useProgress'
import { ProgressRing } from '../ui/ProgressRing'
import { FlagContent } from '../ui/FlagContent'

export function AppShell({ children, progress }) {
  const location = useLocation()
  const { current, next, progress: levelPct } = getLevelInfo(progress.xp)

  const navItems = [
    { to: '/', icon: '📋', label: 'Course Outline' },
    { to: '/flashcards', icon: '🃏', label: 'Pop Quiz' },
    { to: '/badges', icon: '🏅', label: 'Badges' },
    { to: '/aria', icon: '📊', label: 'Aria Report' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-xeo-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-xeo-border bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-flame-600 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 22.36 84.31" className="h-5 w-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.576 65.941C21.576 70.5046 20.9838 74.1294 19.7996 76.8156C18.6154 79.5018 17.0412 81.4225 15.0772 82.5779C13.1131 83.7332 11.0335 84.3109 8.83834 84.3109C7.04757 84.3109 5.48786 84.022 4.15922 83.4444C2.83058 82.8667 1.80522 82.0724 1.08313 81.0615C0.361043 80.0505 0 78.8808 0 77.5521C0 76.2235 0.375485 75.2559 1.12646 74.476C1.87743 73.6962 2.91723 73.3063 4.24587 73.3063C5.34344 73.3063 6.22439 73.5807 6.88871 74.1294C7.55303 74.6782 8.14514 75.5881 8.66504 76.8589C9.30048 78.0143 9.82038 78.8374 10.2247 79.3285C10.6291 79.8195 11.1201 80.065 11.6978 80.065C12.5643 80.065 13.2142 79.7328 13.6474 79.0685C14.0807 78.4042 14.2973 77.5232 14.2973 76.4257C14.2973 75.2703 14.1096 74.1583 13.7341 73.0896C13.3586 72.0209 12.882 70.7934 12.3044 69.407C11.7267 68.0206 11.2501 66.3742 10.8746 64.4679C10.4991 62.5616 10.3114 60.2509 10.3114 57.5359V32.0607C10.3114 30.0966 10.2247 28.638 10.0514 27.6848C9.87815 26.7317 9.47378 26.1684 8.83834 25.9951C8.20291 25.8218 7.1631 25.9662 5.71893 26.4284V23.9155L21.576 17.2434V65.941ZM20.6228 11.2212C21.7781 9.97924 22.3558 8.43397 22.3558 6.58543C22.3558 4.73689 21.7781 3.17718 20.6228 1.90631C19.4675 0.635437 17.9078 0 15.9437 0C13.9796 0 12.3766 0.635437 11.1346 1.90631C9.89259 3.17718 9.2716 4.73689 9.2716 6.58543C9.2716 8.43397 9.89259 9.97924 11.1346 11.2212C12.3766 12.4632 13.9796 13.0842 15.9437 13.0842C17.9078 13.0842 19.4675 12.4632 20.6228 11.2212Z" />
              </svg>
            </div>
            <span className="font-bold text-sm hidden sm:block text-navy">
              AISV <span className="text-flame-600">Academy</span>
            </span>
          </Link>

          {/* XP / Level */}
          <div className="flex-1 max-w-xs hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`level-badge border ${current.bg} ${current.color}`}>
                {current.name}
              </span>
            </div>
            <div className="flex-1">
              <div className="progress-bar">
                <div
                  className="progress-fill bg-gradient-to-r from-flame-600 to-jasper-500"
                  style={{ width: `${levelPct}%` }}
                />
              </div>
            </div>
            <span className="xp-badge shrink-0">⭐ {progress.xp} XP</span>
          </div>

          {/* Aria Score + Streak */}
          <div className="flex items-center gap-4 shrink-0">
            {progress.streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                🔥 {progress.streak}
              </div>
            )}
            <ProgressRing score={progress.ariaScore} size={44} strokeWidth={5} label="" />
            <span className="text-xs text-xeo-muted hidden sm:block">Aria Score</span>
          </div>
        </div>
      </header>

      {/* Nav + Content */}
      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 gap-6 py-6">
        {/* Sidebar nav */}
        <nav className="hidden md:flex flex-col gap-1 w-40 shrink-0 pt-1">
          {navItems.map(item => {
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${active
                    ? 'bg-flame-50 text-flame-700 border border-flame-200'
                    : 'text-xeo-muted hover:text-navy hover:bg-xeo-subtle'
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden sticky bottom-0 border-t border-xeo-border bg-white flex">
        {navItems.map(item => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors
                ${active ? 'text-flame-600' : 'text-xeo-muted'}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <FlagContent />
    </div>
  )
}
