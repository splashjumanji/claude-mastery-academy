import { motion } from 'framer-motion'

export function WireframeBrandSearch() {
  const bars = [18, 24, 20, 28, 32, 26, 38, 44]
  const maxH = 44

  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* Chart frame */}
      <rect x="10" y="8" width="200" height="80" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />

      {/* Y-axis label */}
      <text x="16" y="18" fill="#374151" fontSize="9" fontFamily="system-ui">Branded searches</text>

      {/* Bars */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={22 + i * 22}
          y={72 - h}
          width="14"
          height={h}
          rx="2"
          fill={i === bars.length - 1 ? '#ff4f1f' : '#e5e3dd'}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
          style={{ transformOrigin: `${22 + i * 22 + 7}px 72px` }}
        />
      ))}

      {/* Trend arrow */}
      <motion.path d="M 24 62 L 68 56 L 112 50 L 156 40 L 198 28"
        stroke="#ff4f1f" strokeWidth="1.5" fill="none" strokeDasharray="3,2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      />

      {/* "Branded" label chip */}
      <rect x="142" y="95" width="60" height="12" rx="3" fill="#fdf2ee" stroke="#ffd4c2" strokeWidth="1" />
      <text x="172" y="104" fill="#ff4f1f" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="600">
        Branded ↑
      </text>
    </svg>
  )
}
