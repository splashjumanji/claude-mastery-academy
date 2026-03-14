import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="5" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeParagraphLength() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* ── LEFT: Too long ── */}
      <motion.rect x="8" y="20" width="122" height="108" rx="5"
        fill="white" stroke="#fca5a5" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      <motion.text x="69" y="14" textAnchor="middle"
        fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}>
        ❌  80+ words
      </motion.text>

      {/* Dense rows, too many */}
      {[28, 38, 48, 58, 68, 78, 88, 98, 108, 118].map((y, i) => (
        <TextRow key={i} x={18} y={y} w={102} fill="#e5e3dd" delay={0.15 + i * 0.03} />
      ))}

      {/* "Too long" brace */}
      <motion.text x="69" y="135" textAnchor="middle"
        fill="#ef4444" fontSize="9" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        Hard to extract
      </motion.text>

      {/* ── RIGHT: Optimal ── */}
      <motion.rect x="150" y="20" width="122" height="108" rx="5"
        fill="white" stroke="#86efac" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.35 }} />

      <motion.text x="211" y="14" textAnchor="middle"
        fill="#16a34a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}>
        ✓  40-60 words
      </motion.text>

      {/* Fewer, well-spaced rows */}
      {[30, 44, 58, 72].map((y, i) => (
        <TextRow key={i} x={160} y={y} w={102} fill="#e5e3dd" delay={0.5 + i * 0.05} />
      ))}

      {/* Breathing room indicator */}
      <motion.rect x="160" y="82" width="102" height="14" rx="3"
        fill="#f0fdf4" stroke="#86efac" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.3 }} />
      <motion.text x="211" y="91" textAnchor="middle"
        fill="#16a34a" fontSize="9" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.78, duration: 0.3 }}>
        ✓ AI can extract cleanly
      </motion.text>

      <motion.text x="211" y="135" textAnchor="middle"
        fill="#16a34a" fontSize="9" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}>
        Optimal length
      </motion.text>
    </svg>
  )
}
