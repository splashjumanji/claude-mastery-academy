import { motion } from 'framer-motion'

export function WireframeDirectTraffic() {
  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* Chart frame */}
      <rect x="10" y="8" width="200" height="80" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />

      {/* Grid lines */}
      {[20, 40, 60].map(y => (
        <line key={y} x1="20" y1={y + 8} x2="205" y2={y + 8} stroke="#f0ede8" strokeWidth="0.8" />
      ))}

      {/* Direct traffic line, upward trend with slight dip */}
      <motion.path
        d="M 20 70 C 50 68 70 62 95 55 S 140 42 160 35 S 185 26 205 22"
        stroke="#e5e3dd" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      {/* Highlighted portion (recent uplift) */}
      <motion.path
        d="M 140 42 S 185 26 205 22"
        stroke="#ff4f1f" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      />

      {/* End dot */}
      <motion.circle cx="205" cy="22" r="4" fill="#ff4f1f"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay: 1.3 }}
      />

      {/* Labels */}
      <text x="16" y="18" fill="#374151" fontSize="9" fontFamily="system-ui">Direct traffic</text>
      <rect x="130" y="95" width="72" height="12" rx="3" fill="#fdf2ee" stroke="#ffd4c2" strokeWidth="1" />
      <text x="166" y="104" fill="#ff4f1f" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="600">
        AI-driven uplift
      </text>
    </svg>
  )
}
