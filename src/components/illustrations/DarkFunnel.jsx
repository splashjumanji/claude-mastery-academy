import { motion } from 'framer-motion'

export function DarkFunnel() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[180px]">

      {/* Top funnel section, AI conversations (faded) */}
      <motion.path
        d="M 28 18 L 252 18 L 192 88 L 88 88 Z"
        fill="#f0eeea" stroke="#d4d0c8" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5 }}
      />
      <motion.text x="140" y="50" fill="#6b7a99" fontSize="10" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
        transition={{ delay: 0.4 }}>
        AI conversations
      </motion.text>
      <motion.text x="140" y="65" fill="#6b7a99" fontSize="8"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}>
        (invisible to analytics)
      </motion.text>

      {/* Dashed separator */}
      <motion.line
        x1="78" y1="94" x2="202" y2="94"
        stroke="#6b7a99" strokeWidth="1" strokeDasharray="4 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.4 }}
      />
      <motion.text x="140" y="107" fill="#6b7a99" fontSize="7.5" fontWeight="700"
        fontFamily="system-ui" textAnchor="middle" letterSpacing="0.07em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}>
        ANALYTICS BLIND SPOT
      </motion.text>

      {/* Bottom funnel section, trackable (blue) */}
      <motion.path
        d="M 88 114 L 192 114 L 162 158 L 118 158 Z"
        fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.5 }}
      />
      <motion.text x="140" y="136" fill="#1d4ed8" fontSize="9" fontWeight="700"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.15 }}>
        First trackable
      </motion.text>
      <motion.text x="140" y="149" fill="#1d4ed8" fontSize="9" fontWeight="700"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}>
        touchpoint
      </motion.text>
    </svg>
  )
}
