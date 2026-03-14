import { motion } from 'framer-motion'

export function WireframeBrandMention() {
  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* AI chat bubble */}
      <motion.path
        d="M 18 15 Q 18 8 25 8 L 175 8 Q 182 8 182 15 L 182 62 Q 182 69 175 69 L 80 69 L 68 82 L 70 69 L 25 69 Q 18 69 18 62 Z"
        fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: '100px 45px' }}
      />

      {/* AI bot icon */}
      <circle cx="34" cy="23" r="7" fill="#f0ede8" />
      <text x="34" y="27" fontSize="9" fontFamily="system-ui" textAnchor="middle">🤖</text>

      {/* Response text lines */}
      {[20, 30, 40, 50].map((y, i) => (
        <motion.rect key={y} x="46" y={y} width={i === 3 ? 50 : 120} height="5" rx="2" fill="#e5e3dd"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
          style={{ transformOrigin: '46px center' }}
        />
      ))}

      {/* Brand name highlight */}
      <motion.rect x="88" y="38" width="36" height="8" rx="2" fill="#fdf2ee" stroke="#ff4f1f" strokeWidth="1"
        initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        style={{ transformOrigin: '106px 42px' }}
      />
      <text x="106" y="45" fill="#ff4f1f" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Aria</text>

      {/* "No link" badge */}
      <motion.rect x="130" y="85" width="72" height="15" rx="4" fill="#fef3cd" stroke="#f6cc52" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />
      <text x="166" y="95" fill="#92740a" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="600">
        Mention, no citation link
      </text>

      {/* Label */}
      <text x="60" y="99" fill="#374151" fontSize="9" fontFamily="system-ui">GEO trust signal</text>
    </svg>
  )
}
