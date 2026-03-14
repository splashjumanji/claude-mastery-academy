import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'cm_academy_progress'

const defaultState = {
  xp: 0,
  level: 'Apprentice',
  completedModules: [],
  quizScores: {},       // { moduleId: score_percent }
  badges: [],
  streak: 0,
  lastVisit: null,
  ariaScore: 0,
  onboardingDone: false,
}

const LEVEL_THRESHOLDS = [
  { name: 'Apprentice',   min: 0,    color: 'text-gray-600',    bg: 'bg-gray-100' },
  { name: 'Practitioner', min: 300,  color: 'text-aria-700',    bg: 'bg-aria-100' },
  { name: 'Architect',    min: 700,  color: 'text-jasper-700',  bg: 'bg-jasper-100' },
  { name: 'Expert',       min: 1200, color: 'text-amber-700',   bg: 'bg-amber-100' },
]

export function getLevelInfo(xp) {
  let current = LEVEL_THRESHOLDS[0]
  let next = LEVEL_THRESHOLDS[1]
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].min) {
      current = LEVEL_THRESHOLDS[i]
      next = LEVEL_THRESHOLDS[i + 1] || null
      break
    }
  }
  const progress = next
    ? ((xp - current.min) / (next.min - current.min)) * 100
    : 100
  return { current, next, progress: Math.min(progress, 100) }
}

export const BADGE_DEFINITIONS = [
  {
    id: 'claude_native',
    name: 'Claude Native',
    description: 'Completed Level 1 — Foundations',
    icon: '🧠',
    condition: (s) => [1,2,3].every(id => s.completedModules.includes(id)),
  },
  {
    id: 'power_user',
    name: 'Power User',
    description: 'Completed Level 2 — Working Effectively',
    icon: '⚡',
    condition: (s) => [4,5,6,7].every(id => s.completedModules.includes(id)),
  },
  {
    id: 'harness_builder',
    name: 'Harness Builder',
    description: 'Completed Level 3 — Agent Harnesses',
    icon: '🏗️',
    condition: (s) => [8,9,10].every(id => s.completedModules.includes(id)),
  },
  {
    id: 'agent_architect',
    name: 'Agent Architect',
    description: 'Completed Level 3 with 80%+ quiz scores',
    icon: '🏆',
    condition: (s) => [8,9,10].every(id => s.completedModules.includes(id)) &&
      [8,9,10].every(id => (s.quizScores[id] || 0) >= 80),
  },
  {
    id: 'full_stack_cm',
    name: 'Full Stack Claude',
    description: 'Completed all 13 modules',
    icon: '⭐',
    condition: (s) => Array.from({length: 13}, (_, i) => i+1).every(id => s.completedModules.includes(id)),
  },
]

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultState, ...JSON.parse(stored) } : defaultState
    } catch {
      return defaultState
    }
  })

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  // Update streak on mount
  useEffect(() => {
    const today = new Date().toDateString()
    setProgress(prev => {
      if (prev.lastVisit === today) return prev
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const streak = prev.lastVisit === yesterday ? prev.streak + 1 : 1
      return { ...prev, streak, lastVisit: today }
    })
  }, [])

  const addXP = useCallback((amount) => {
    setProgress(prev => {
      const newXP = prev.xp + amount
      const { current } = getLevelInfo(newXP)
      return { ...prev, xp: newXP, level: current.name }
    })
  }, [])

  const completeModule = useCallback((moduleId, xpReward = 50, quizScore = null) => {
    setProgress(prev => {
      const newCompleted = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId]
      const newScores = quizScore !== null
        ? { ...prev.quizScores, [moduleId]: quizScore }
        : prev.quizScores
      const newXP = prev.completedModules.includes(moduleId) ? prev.xp : prev.xp + xpReward
      const { current } = getLevelInfo(newXP)

      // Check badges
      const updatedState = { ...prev, completedModules: newCompleted, quizScores: newScores, xp: newXP, level: current.name }
      const newBadges = BADGE_DEFINITIONS
        .filter(b => !prev.badges.includes(b.id) && b.condition(updatedState))
        .map(b => b.id)

      return { ...updatedState, badges: [...prev.badges, ...newBadges] }
    })
  }, [])

  const updateAriaScore = useCallback((delta) => {
    setProgress(prev => ({
      ...prev,
      ariaScore: Math.min(100, Math.max(0, prev.ariaScore + delta))
    }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setProgress(prev => ({ ...prev, onboardingDone: true }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultState)
  }, [])

  const isModuleUnlocked = useCallback((moduleId) => {
    if (moduleId <= 1) return true
    return progress.completedModules.includes(moduleId - 1)
  }, [progress.completedModules])

  const isModuleComplete = useCallback((moduleId) => {
    return progress.completedModules.includes(moduleId)
  }, [progress.completedModules])

  return {
    progress,
    addXP,
    completeModule,
    updateAriaScore,
    completeOnboarding,
    resetProgress,
    isModuleUnlocked,
    isModuleComplete,
    levelInfo: getLevelInfo(progress.xp),
  }
}
