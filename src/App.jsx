import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useProgress } from './hooks/useProgress'
import { AppShell } from './components/layout/AppShell'
import { Welcome } from './components/screens/Welcome'
import { WorldMap } from './components/screens/WorldMap'
import { ModulePlayer } from './components/screens/ModulePlayer'
import { AriaReportCard } from './components/screens/AriaReportCard'
import { ReviewDashboard } from './components/screens/ReviewDashboard'
import { FlashCards } from './components/screens/FlashCards'
import { LearningSummary } from './components/screens/LearningSummary'
import { BadgeGrid } from './components/ui/Badge'

function BadgesPage({ progress }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your Badges</h1>
        <p className="text-xeo-muted text-sm mt-1">
          {progress.badges.length === 0
            ? 'Complete modules to unlock badges'
            : `${progress.badges.length} of 5 badges earned`}
        </p>
      </div>
      <BadgeGrid earned={progress.badges} />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const {
    progress,
    addXP,
    completeModule,
    updateAriaScore,
    completeOnboarding,
    isModuleUnlocked,
    isModuleComplete,
    levelInfo,
  } = useProgress()

  // Review dashboard is a standalone admin page — bypasses onboarding
  if (location.pathname === '/review') return <ReviewDashboard />

  // Show welcome screen if not onboarded
  if (!progress.onboardingDone) {
    return <Welcome onComplete={completeOnboarding} />
  }

  return (
    <AppShell progress={progress} levelInfo={levelInfo}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <WorldMap
                progress={progress}
                isModuleUnlocked={isModuleUnlocked}
                isModuleComplete={isModuleComplete}
              />
            }
          />
          <Route
            path="/module/:id"
            element={
              <ModulePlayer
                onModuleComplete={(moduleId, xp, quizScore) => completeModule(moduleId, xp, quizScore)}
                updateAriaScore={updateAriaScore}
              />
            }
          />
          <Route
            path="/aria"
            element={<AriaReportCard progress={progress} />}
          />
          <Route
            path="/badges"
            element={<BadgesPage progress={progress} />}
          />
          <Route
            path="/flashcards"
            element={<FlashCards progress={progress} />}
          />
          <Route
            path="/summary"
            element={<LearningSummary progress={progress} />}
          />
        </Routes>
      </AnimatePresence>
    </AppShell>
  )
}
