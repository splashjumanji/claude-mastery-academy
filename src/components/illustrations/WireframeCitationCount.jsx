import { motion } from 'framer-motion'

export function WireframeCitationCount() {
  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* AI response window */}
      <rect x="10" y="8" width="145" height="80" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />

      {/* Window chrome */}
      <rect x="10" y="8" width="145" height="16" rx="6" fill="#f0ede8" />
      <rect x="10" y="17" width="145" height="7" fill="#f0ede8" />
      <circle cx="22" cy="16" r="3" fill="#e5e3dd" />
      <circle cx="32" cy="16" r="3" fill="#e5e3dd" />
      <circle cx="42" cy="16" r="3" fill="#e5e3dd" />

      {/* Response text lines */}
      {[30, 38, 46, 54].map((y, i) => (
        <motion.rect key={y} x="18" y={y} width={i === 3 ? 60 : 120} height="5" rx="2" fill="#e5e3dd"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
          style={{ transformOrigin: '18px center' }}
        />
      ))}

      {/* Citation numbers in text */}
      {[
        { cx: 72, cy: 34 },
        { cx: 96, cy: 42 },
        { cx: 54, cy: 50 },
      ].map((pos, i) => (
        <motion.g key={i}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.25, delay: 0.6 + i * 0.12 }}
          style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}
        >
          <circle cx={pos.cx} cy={pos.cy} r="5" fill="#ff4f1f" />
          <text x={pos.cx} y={pos.cy + 3} fill="white" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">{i + 1}</text>
        </motion.g>
      ))}

      {/* Citation sources panel */}
      <motion.rect x="160" y="8" width="50" height="80" rx="6" fill="#fdf2ee" stroke="#ffd4c2" strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <text x="185" y="22" fill="#ff4f1f" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Sources</text>
      {[30, 42, 54, 66, 78].map((y, i) => (
        <motion.rect key={y} x="166" y={y} width="38" height="4" rx="1.5" fill="#ffd4c2"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.07 }}
          style={{ transformOrigin: '166px center' }}
        />
      ))}

      {/* Count badge */}
      <text x="110" y="102" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Count citations across target query set</text>
    </svg>
  )
}
