import { motion } from 'framer-motion'
import { BADGE_DEFINITIONS } from '../../hooks/useProgress'

export function BadgeGrid({ earned = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {BADGE_DEFINITIONS.map(badge => {
        const unlocked = earned.includes(badge.id)
        return (
          <div
            key={badge.id}
            className={`card p-4 flex flex-col items-center gap-2 text-center transition-all ${unlocked ? 'border-amber-400' : 'opacity-40'}`}
          >
            <div className={`text-3xl ${unlocked ? '' : 'grayscale'}`}>{badge.icon}</div>
            <div className={`text-sm font-semibold ${unlocked ? 'text-navy' : 'text-xeo-muted'}`}>{badge.name}</div>
            <div className="text-xs text-xeo-muted">{badge.description}</div>
            {!unlocked && <div className="text-xs text-xeo-muted font-medium opacity-60">🔒 Locked</div>}
          </div>
        )
      })}
    </div>
  )
}

export function BadgePopup({ badge, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        className="card p-10 flex flex-col items-center gap-4 max-w-xs mx-4 border-amber-400 glow-aria text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl">{badge.icon}</div>
        <div className="text-amber-600 text-sm font-bold uppercase tracking-widest">Badge Unlocked!</div>
        <div className="text-2xl font-bold text-navy">{badge.name}</div>
        <div className="text-xeo-muted text-sm">{badge.description}</div>
        <button onClick={onClose} className="btn-primary mt-2 w-full">Continue →</button>
      </motion.div>
    </motion.div>
  )
}
