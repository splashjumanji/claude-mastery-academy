import { motion } from 'framer-motion'

const CITED = ['Asana', 'Monday.com', 'Notion']

export function AriaInvisible() {
  return (
    <svg viewBox="0 0 300 165" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[165px]">

      {/* ── AI response card ── */}
      <motion.rect x="6" y="4" width="288" height="152" rx="8"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Header strip */}
      <motion.rect x="6" y="4" width="288" height="28" rx="8"
        fill="#f5f4f0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }} />
      {/* Flush bottom of header */}
      <rect x="6" y="24" width="288" height="8" fill="#f5f4f0" />

      {/* Dots */}
      {[20, 29, 38].map((cx, i) => (
        <motion.circle key={i} cx={cx} cy="18" r="3.5" fill="#d1d5db"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }} />
      ))}

      <motion.text x="152" y="21" textAnchor="middle"
        fill="#6b7a99" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}>
        AI Answer, "best project management software"
      </motion.text>

      {/* Section label */}
      <motion.text x="20" y="48" fill="#9ca3af" fontSize="7.5"
        fontFamily="system-ui, sans-serif" letterSpacing="0.05em" fontWeight="600"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}>
        CITED SOURCES
      </motion.text>

      {/* Cited competitor chips (green) */}
      {CITED.map((name, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.14, duration: 0.35 }}>
          <rect x="20" y={56 + i * 26} width="92" height="18" rx="9"
            fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
          <text x="32" y={69 + i * 26} fill="#16a34a"
            fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">✓</text>
          <text x="43" y={69 + i * 26} fill="#16a34a"
            fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">{name}</text>
        </motion.g>
      ))}

      {/* Aria, absent / ghost chip */}
      <motion.g
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.45 }}>
        <rect x="20" y={56 + 3 * 26} width="92" height="18" rx="9"
          fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="32" y={69 + 3 * 26} fill="#ef4444"
          fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">✗</text>
        <text x="43" y={69 + 3 * 26} fill="#ef4444"
          fontSize="9" fontFamily="system-ui, sans-serif">Aria, not cited</text>
      </motion.g>

      {/* Divider */}
      <motion.line x1="132" y1="46" x2="132" y2="152"
        stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }} />

      {/* Right panel, stats */}
      <motion.text x="216" y="72" textAnchor="middle"
        fill="#ef4444" fontSize="28" fontWeight="800" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.4 }}>
        0
      </motion.text>
      <motion.text x="216" y="87" textAnchor="middle"
        fill="#9ca3af" fontSize="8" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}>
        AI citations
      </motion.text>

      <motion.line x1="148" y1="100" x2="284" y2="100"
        stroke="#e5e3dd" strokeWidth="0.75"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }} />

      <motion.text x="216" y="116" textAnchor="middle"
        fill="#9ca3af" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.3 }}>
        0% Share of Model
      </motion.text>
      <motion.text x="216" y="130" textAnchor="middle"
        fill="#9ca3af" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}>
        Invisible to AI buyers
      </motion.text>

      {/* Bottom label */}
      <motion.text x="150" y="160" textAnchor="middle"
        fill="#9ca3af" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}>
        Aria's AISV starting position
      </motion.text>
    </svg>
  )
}
