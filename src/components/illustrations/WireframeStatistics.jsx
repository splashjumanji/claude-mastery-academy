import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeStatistics() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Document card */}
      <motion.rect x="30" y="12" width="220" height="112" rx="6"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Heading */}
      <TextRow x={46} y={26} w={130} fill="#94a3b8" delay={0.2} />

      {/* Body row 1 */}
      <TextRow x={46} y={40} w={188} delay={0.3} />

      {/* Row with inline stat highlight */}
      {/* Pre-stat gray */}
      <TextRow x={46} y={54} w={60} fill="#e5e3dd" delay={0.35} />
      {/* Stat badge */}
      <motion.rect x={110} y={51} width={34} height="11" rx="3"
        fill="#fed7aa"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }} />
      <motion.text x="127" y="59" textAnchor="middle"
        fill="#c2410c" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}>
        73%
      </motion.text>
      {/* Post-stat gray */}
      <TextRow x={148} y={54} w={80} fill="#e5e3dd" delay={0.35} />
      {/* Citation superscript */}
      <motion.text x="232" y="54" fill="#6366f1" fontSize="9" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        [1]
      </motion.text>

      {/* More body rows */}
      <TextRow x={46} y={70} w={178} delay={0.55} />
      <TextRow x={46} y={82} w={162} delay={0.6} />

      {/* Inline second stat */}
      <TextRow x={46} y={96} w={40} fill="#e5e3dd" delay={0.65} />
      <motion.rect x={90} y={93} width={30} height="11" rx="3"
        fill="#e9d5ff"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }} />
      <motion.text x="105" y="101" textAnchor="middle"
        fill="#7c3aed" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.3 }}>
        40%
      </motion.text>
      <TextRow x={124} y={96} w={98} fill="#e5e3dd" delay={0.65} />
      <motion.text x="226" y="96" fill="#6366f1" fontSize="9" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.3 }}>
        [2]
      </motion.text>

      {/* +40% visibility badge */}
      <motion.rect x="164" y="110" width="70" height="12" rx="4"
        fill="#fef9c3" stroke="#fde047" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }} />
      <motion.text x="199" y="119" textAnchor="middle"
        fill="#854d0e" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}>
        +40% AI visibility
      </motion.text>

      {/* Bottom label */}
      <motion.text x="140" y="136" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}>
        Statistics with citations
      </motion.text>
    </svg>
  )
}
