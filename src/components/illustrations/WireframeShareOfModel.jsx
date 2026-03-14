import { motion } from 'framer-motion'

export function WireframeShareOfModel() {
  // Pie slice: ~28% highlighted (Aria's share)
  // SVG arc: center (90,50), radius 38
  const cx = 90, cy = 50, r = 38
  const pct = 0.28
  const angle = pct * 2 * Math.PI - Math.PI / 2
  const x1 = cx + r * Math.cos(-Math.PI / 2)
  const y1 = cy + r * Math.sin(-Math.PI / 2)
  const x2 = cx + r * Math.cos(angle)
  const y2 = cy + r * Math.sin(angle)

  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* Background circle */}
      <motion.circle cx={cx} cy={cy} r={r} fill="#f0ede8"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />

      {/* Aria's slice (28%), highlighted */}
      <motion.path
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
        fill="#ff4f1f"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Center hole */}
      <circle cx={cx} cy={cy} r={r * 0.45} fill="white" />

      {/* Center label */}
      <text x={cx} y={cy - 3} fill="#ff4f1f" fontSize="10" fontWeight="700" fontFamily="system-ui" textAnchor="middle">28%</text>
      <text x={cx} y={cy + 8} fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Aria</text>

      {/* Legend */}
      <rect x="148" y="30" width="10" height="10" rx="2" fill="#ff4f1f" />
      <text x="162" y="39" fill="#00063d" fontSize="10" fontFamily="system-ui" fontWeight="600">Aria (28%)</text>
      <rect x="148" y="46" width="10" height="10" rx="2" fill="#f0ede8" />
      <text x="162" y="55" fill="#374151" fontSize="10" fontFamily="system-ui">Others</text>

      {/* Label */}
      <text x="110" y="95" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Share of Model, % of relevant AI answers</text>
    </svg>
  )
}
