import { motion } from 'framer-motion'

export function EarnedMediaInversion() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[160px]">

      {/* Y axis label */}
      <text x="10" y="95" fill="#6b7a99" fontSize="7.5" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle" letterSpacing="0.05em"
        transform="rotate(-90 10 95)">
        AI TRUST
      </text>

      {/* --- Column 1: Your Website --- */}
      {/* Background track */}
      <rect x="62" y="22" width="44" height="104" rx="4" fill="#f0eeea" />
      {/* Low fill, ~25% — use scaleY from bottom for reliable cross-browser animation */}
      <motion.rect x="62" y="100" width="44" height="26" rx="3"
        fill="#ef4444"
        style={{ transformOrigin: '84px 126px' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />
      <motion.text x="84" y="95" fill="#ef4444" fontSize="9" fontWeight="700"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
        Low
      </motion.text>
      <text x="84" y="140" fill="#00063d" fontSize="9" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle">
        Your Website
      </text>
      <text x="84" y="151" fill="#6b7a99" fontSize="7.5"
        fontFamily="system-ui" textAnchor="middle">
        brand-owned
      </text>

      {/* --- Column 2: 3rd Party --- */}
      {/* Background track */}
      <rect x="174" y="22" width="44" height="104" rx="4" fill="#f0eeea" />
      {/* High fill, ~90% */}
      <motion.rect x="174" y="25" width="44" height="98" rx="4"
        fill="#86efac"
        initial={{ height: 0, y: 123 }} animate={{ height: 98, y: 25 }}
        transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
      />
      <motion.text x="196" y="19" fill="#16a34a" fontSize="9" fontWeight="700"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
        High
      </motion.text>
      <text x="196" y="140" fill="#00063d" fontSize="9" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle">
        3rd Party Sources
      </text>
      <text x="196" y="151" fill="#6b7a99" fontSize="7.5"
        fontFamily="system-ui" textAnchor="middle">
        earned media
      </text>

    </svg>
  )
}
