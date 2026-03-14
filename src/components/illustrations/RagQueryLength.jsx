import { motion } from 'framer-motion'

export function RagQueryLength() {
  return (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[130px]">

      {/* Row 1: Google search, short bar */}
      <text x="18" y="28" fill="#6b7a99" fontSize="9" fontWeight="600"
        fontFamily="system-ui">
        Google search
      </text>
      {/* Track */}
      <rect x="18" y="34" width="264" height="16" rx="3" fill="#f0eeea" />
      {/* Fill ~20% */}
      <motion.rect x="18" y="34" width="52" height="16" rx="3"
        fill="#d4d0c8"
        initial={{ width: 0 }} animate={{ width: 52 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.text x="78" y="46" fill="#6b7a99" fontSize="9"
        fontFamily="system-ui"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}>
        2–4 words
      </motion.text>

      {/* Row 2: AI engine query, long bar */}
      <text x="18" y="78" fill="#00063d" fontSize="9" fontWeight="600"
        fontFamily="system-ui">
        AI engine query
      </text>
      {/* Track */}
      <rect x="18" y="84" width="264" height="16" rx="3" fill="#f0eeea" />
      {/* Fill ~75% */}
      <motion.rect x="18" y="84" width="198" height="16" rx="3"
        fill="#93c5fd"
        initial={{ width: 0 }} animate={{ width: 198 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      />
      <motion.text x="224" y="96" fill="#2563eb" fontSize="9" fontWeight="700"
        fontFamily="system-ui"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}>
        10–23 words
      </motion.text>

      {/* Caption */}
      <motion.text x="150" y="120" fill="#6b7a99" fontSize="7.5" fontWeight="500"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        AI users ask in full sentences, passage-level content wins
      </motion.text>
    </svg>
  )
}
