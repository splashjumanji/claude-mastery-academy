import { motion } from 'framer-motion'

export function WireframeReviewIngest() {
  return (
    <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[100px]">

      {/* G2 review card */}
      <motion.rect x="10" y="14" width="120" height="60" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />
      {/* G2 logo chip */}
      <rect x="18" y="22" width="18" height="12" rx="3" fill="#ff4f1f" opacity="0.15" stroke="#ff4f1f" strokeWidth="0.8" />
      <text x="27" y="31" fill="#ff4f1f" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">G2</text>
      <text x="44" y="31" fill="#00063d" fontSize="10" fontFamily="system-ui" fontWeight="600">4.7 / 5.0</text>

      {/* Star row */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.text key={i} x={18 + i * 12} y={48} fontSize="9" fontFamily="system-ui"
          fill={i < 4 ? '#f59e0b' : '#e5e3dd'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.3 + i * 0.07 }}
        >★</motion.text>
      ))}

      <text x="70" y="48" fill="#374151" fontSize="9" fontFamily="system-ui">312 reviews</text>

      {/* Review count bar */}
      <rect x="18" y="55" width="104" height="6" rx="3" fill="#f0ede8" />
      <motion.rect x="18" y="55" width="88" height="6" rx="3" fill="#f59e0b" opacity="0.6"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ transformOrigin: '18px center' }}
      />

      {/* Arrow from G2 to Agent */}
      <motion.path d="M 132 44 L 160 44"
        stroke="#e5e3dd" strokeWidth="1.5" fill="none"
        markerEnd="url(#arrowReview)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.7 }}
      />

      {/* Agent reading icon */}
      <motion.rect x="162" y="28" width="48" height="34" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.6 }}
      />
      <text x="186" y="44" fontSize="14" fontFamily="system-ui" textAnchor="middle">🤖</text>
      <text x="186" y="56" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">ingests</text>

      {/* Footer */}
      <text x="110" y="90" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Review scores + volume directly ingested</text>

      <defs>
        <marker id="arrowReview" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L0,4 L4,2 z" fill="#374151" />
        </marker>
      </defs>
    </svg>
  )
}
