import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeListicle() {
  const items = [
    { num: '1', y: 18, d: 0.15 },
    { num: '2', y: 60, d: 0.45 },
    { num: '3', y: 102, d: 0.75 },
  ]

  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {items.map(({ num, y, d }) => (
        <g key={num}>
          {/* Number badge */}
          <motion.circle cx="30" cy={y + 10} r="10"
            fill="#bfdbfe"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: d, duration: 0.25 }} />
          <motion.text x="30" y={y + 14} textAnchor="middle"
            fill="#1d4ed8" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: d + 0.05, duration: 0.25 }}>
            {num}
          </motion.text>

          {/* Main answer row, slightly highlighted */}
          <TextRow x={50} y={y + 5} w={196} fill="#dbeafe" delay={d + 0.08} />

          {/* Sub detail rows */}
          <TextRow x={50} y={y + 18} w={188} fill="#e5e3dd" delay={d + 0.12} />
          <TextRow x={50} y={y + 30} w={160} fill="#e5e3dd" delay={d + 0.16} />

          {/* Divider (not after last) */}
          {num !== '3' && (
            <motion.line x1="20" y1={y + 42} x2="260" y2={y + 42} stroke="#e5e3dd" strokeWidth="1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: d + 0.2, duration: 0.2 }} />
          )}
        </g>
      ))}

      {/* Bottom label */}
      <motion.text x="140" y="138" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.3 }}>
        Numbered list, answer per item
      </motion.text>
    </svg>
  )
}
