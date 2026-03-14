import { motion } from 'framer-motion'

// Gray text row helper, simulate a line of body text
function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function ContentStructure() {
  return (
    <svg viewBox="0 0 304 162" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[162px]">

      {/* ── LEFT: "Before" document ── */}
      <motion.rect x="4" y="22" width="138" height="130" rx="5"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Label above */}
      <motion.text x="73" y="16" textAnchor="middle"
        fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif"
        letterSpacing="0.05em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}>
        ✗  AI CAN'T EXTRACT
      </motion.text>

      {/* Dense uniform text rows, answer buried deep */}
      {[
        [16, 32, 106],
        [16, 44, 118],
        [16, 56, 96],
        [16, 68, 112],
        [16, 80, 88],   // ← "Answer: yes, but...", slightly different shade
        [16, 92, 118],
        [16, 104, 100],
        [16, 116, 76],
      ].map(([x, y, w], i) => (
        <TextRow key={i} x={x} y={y} w={w} delay={0.15 + i * 0.03}
          fill={i === 4 ? '#c7d2fe' : '#e5e3dd'} />
      ))}

      {/* "Answer buried here" pointer */}
      <motion.text x="16" y="82" fill="#6366f1" fontSize="6.5"
        fontFamily="system-ui, sans-serif" fontStyle="italic"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        ← answer buried in line 5
      </motion.text>

      {/* Bottom label */}
      <motion.text x="73" y="163" textAnchor="middle"
        fill="#9ca3af" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        Traditional structure
      </motion.text>

      {/* ── RIGHT: "After" document ── */}
      <motion.rect x="162" y="22" width="138" height="130" rx="5"
        fill="white" stroke="#93c5fd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.35 }} />

      {/* Label above */}
      <motion.text x="231" y="16" textAnchor="middle"
        fill="#16a34a" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif"
        letterSpacing="0.05em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}>
        ✓  AI EXTRACTS INSTANTLY
      </motion.text>

      {/* Highlighted answer-first row */}
      <motion.rect x="162" y="22" width="138" height="20" rx="5"
        fill="#dbeafe"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.35 }} />
      {/* Bottom of highlight flush with card */}
      <rect x="163" y="36" width="136" height="6" fill="#dbeafe" />

      <motion.text x="174" y="35" fill="#1d4ed8" fontSize="8" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.3 }}>
        ✓ Direct answer, first sentence
      </motion.text>

      {/* H2-style subheading row */}
      <TextRow x={174} y={54} w={80} fill="#94a3b8" delay={0.7} />

      {/* Body text rows below heading */}
      {[
        [174, 66, 110],
        [174, 78, 118],
        [174, 90, 94],
      ].map(([x, y, w], i) => (
        <TextRow key={i} x={x} y={y} w={w} delay={0.75 + i * 0.06} />
      ))}

      {/* FAQ block */}
      <motion.rect x="174" y="106" width="114" height="36" rx="3"
        fill="#f0fdf4" stroke="#86efac" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }} />
      <motion.text x="181" y="118" fill="#16a34a" fontSize="7.5" fontWeight="600"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.3 }}>
        FAQ block
      </motion.text>
      <TextRow x={181} y={122} w={90} fill="#bbf7d0" delay={1.0} />
      <TextRow x={181} y={133} w={76} fill="#bbf7d0" delay={1.05} />

      {/* Bottom label */}
      <motion.text x="231" y="163" textAnchor="middle"
        fill="#9ca3af" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.3 }}>
        Answer-first structure
      </motion.text>
    </svg>
  )
}
