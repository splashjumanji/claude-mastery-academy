import { motion } from 'framer-motion'

export function EntityWeb() {
  const center = { x: 140, y: 90 }
  const spokes = [
    { label: 'LinkedIn',   x: 140, y: 22  },
    { label: 'G2',         x: 238, y: 90  },
    { label: 'Wikipedia',  x: 140, y: 158 },
    { label: 'Crunchbase', x: 42,  y: 90  },
  ]

  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[180px]">

      {/* Spoke lines */}
      {spokes.map((s, i) => (
        <motion.line key={i}
          x1={center.x} y1={center.y}
          x2={s.x} y2={s.y}
          stroke="#d4d0c8" strokeWidth="1.5" strokeDasharray="3 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
        />
      ))}

      {/* Center node, Aria */}
      <motion.circle cx={center.x} cy={center.y} r="27"
        fill="#dbeafe" stroke="#2563eb" strokeWidth="2"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      />
      <motion.text x={center.x} y={center.y + 5}
        fill="#1d4ed8" fontSize="12" fontWeight="800"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}>
        Aria
      </motion.text>

      {/* Satellite nodes */}
      {spokes.map((s, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.45 + i * 0.1 }}>
          <rect x={s.x - 32} y={s.y - 12} width="64" height="22" rx="11"
            fill="white" stroke="#d4d0c8" strokeWidth="1.5" />
          <text x={s.x} y={s.y + 5} fill="#00063d" fontSize="9" fontWeight="600"
            fontFamily="system-ui" textAnchor="middle">
            {s.label}
          </text>
        </motion.g>
      ))}

      {/* SameAs label */}
      <motion.text x="140" y="176" fill="#6b7a99" fontSize="7.5" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle" letterSpacing="0.05em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}>
        SameAs entity unification
      </motion.text>
    </svg>
  )
}
