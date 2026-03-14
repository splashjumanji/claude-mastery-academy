import { motion } from 'framer-motion'

export function ContinuousLoop() {
  // Boxes arranged in a symmetric diamond — uniform radius of 75px from center (140, 100)
  const steps = [
    { label: 'Monitor',    icon: '🔍', cx: 140, cy: 25  },
    { label: 'Diagnose',   icon: '🎯', cx: 215, cy: 100 },
    { label: 'Create',     icon: '✍️', cx: 140, cy: 175 },
    { label: 'Distribute', icon: '📡', cx: 65,  cy: 100 },
  ]

  // Curved arrow paths between boxes (clockwise), matched to symmetric positions
  const arrows = [
    { d: 'M 185 33 C 218 33 237 60 237 88',       delay: 0.35 },
    { d: 'M 237 112 C 237 140 218 167 185 167',   delay: 0.50 },
    { d: 'M 95 167 C 62 167 43 140 43 112',       delay: 0.65 },
    { d: 'M 43 88 C 43 60 62 33 95 33',           delay: 0.80 },
  ]

  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[200px]">

      {/* Arrow paths */}
      {arrows.map((a, i) => (
        <motion.path key={i} d={a.d}
          stroke="#d4d0c8" strokeWidth="1.5" fill="none"
          markerEnd="url(#arrowLoopGray)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: a.delay }}
        />
      ))}

      {/* Step boxes */}
      {steps.map((s, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}>
          <rect x={s.cx - 42} y={s.cy - 18} width="84" height="36" rx="7"
            fill="white" stroke="#e5e3dd" strokeWidth="1.5" />
          <text x={s.cx - 26} y={s.cy + 5} fontSize="13" fontFamily="system-ui">
            {s.icon}
          </text>
          <text x={s.cx + 2} y={s.cy + 5} fill="#00063d" fontSize="10" fontWeight="600"
            fontFamily="system-ui">
            {s.label}
          </text>
        </motion.g>
      ))}

      <defs>
        <marker id="arrowLoopGray" markerWidth="5" markerHeight="5"
          refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 z" fill="#6b7a99" />
        </marker>
      </defs>
    </svg>
  )
}
