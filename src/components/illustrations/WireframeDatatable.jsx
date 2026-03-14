import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="5" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

const COL1_X = 28
const COL2_X = 118
const COL3_X = 200

export function WireframeDatatable() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Table outer */}
      <motion.rect x="20" y="10" width="240" height="118" rx="5"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Header row bg */}
      <motion.rect x="20" y="10" width="240" height="20" rx="5"
        fill="#94a3b8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }} />
      <rect x="21" y="22" width="238" height="8" fill="#94a3b8" />

      {/* Vertical column dividers */}
      {[110, 192].map((x, i) => (
        <motion.line key={i} x1={x} y1="10" x2={x} y2="128" stroke="#e5e3dd" strokeWidth="1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.2 }} />
      ))}

      {/* Header text rows */}
      <TextRow x={COL1_X} y={16} w={70} fill="white" delay={0.25} />
      <TextRow x={COL2_X} y={16} w={60} fill="white" delay={0.28} />
      <TextRow x={COL3_X} y={16} w={52} fill="white" delay={0.31} />

      {/* Data rows */}
      {[
        { y: 36, bg: 'white', d: 0.35 },
        { y: 56, bg: '#f8fafc', d: 0.45 },
        { y: 76, bg: 'white', d: 0.55 },
        { y: 96, bg: '#f8fafc', d: 0.65 },
      ].map(({ y, bg, d }, i) => (
        <g key={i}>
          {bg !== 'white' && (
            <motion.rect x="20" y={y - 8} width="240" height="20" fill={bg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: d - 0.05, duration: 0.2 }} />
          )}
          <motion.line x1="20" y1={y - 8} x2="260" y2={y - 8} stroke="#e5e3dd" strokeWidth="0.75"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: d - 0.08, duration: 0.2 }} />
          <TextRow x={COL1_X} y={y} w={68} fill="#94a3b8" delay={d} />
          <TextRow x={COL2_X} y={y} w={60} fill="#e5e3dd" delay={d + 0.04} />
          <TextRow x={COL3_X} y={y} w={46} fill="#e5e3dd" delay={d + 0.08} />
        </g>
      ))}

      {/* "Verbatim extract" callout */}
      <motion.rect x="150" y="112" width="98" height="12" rx="3"
        fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }} />
      <motion.text x="199" y="120" textAnchor="middle"
        fill="#7c3aed" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}>
        AI cites tables verbatim
      </motion.text>

      {/* Bottom label */}
      <motion.text x="140" y="137" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}>
        Structured data table
      </motion.text>
    </svg>
  )
}
