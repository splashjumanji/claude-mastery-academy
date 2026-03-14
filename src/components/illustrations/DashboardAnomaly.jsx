import { motion } from 'framer-motion'

const CARDS = [
  {
    x: 4,
    label: 'AI IMPRESSIONS',
    value: '+127%',
    subtext: 'vs. same period',
    valueColor: '#16a34a',
    bg: '#f0fdf4',
    border: '#86efac',
    dashed: false,
  },
  {
    x: 110,
    label: 'ORGANIC CLICKS',
    value: '−18%',
    subtext: 'vs. same period',
    valueColor: '#dc2626',
    bg: '#fef2f2',
    border: '#fca5a5',
    dashed: false,
  },
  {
    x: 216,
    label: "WHAT'S HAPPENING?",
    value: '?',
    subtext: 'metrics conflict',
    valueColor: '#9ca3af',
    bg: '#fafafa',
    border: '#d1d5db',
    dashed: true,
  },
]

export function DashboardAnomaly() {
  return (
    <svg viewBox="0 0 304 105" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[105px]">

      {CARDS.map((card, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.18, duration: 0.4 }}>

          {/* Card fill */}
          <rect x={card.x} y="4" width="84" height="76" rx="6" fill={card.bg} />

          {/* Card border, solid or dashed */}
          {card.dashed ? (
            <rect x={card.x} y="4" width="84" height="76" rx="6"
              fill="none" stroke={card.border} strokeWidth="1.5" strokeDasharray="4 3" />
          ) : (
            <rect x={card.x} y="4" width="84" height="76" rx="6"
              fill="none" stroke={card.border} strokeWidth="1.5" />
          )}

          {/* Top label */}
          <text x={card.x + 42} y="22" textAnchor="middle"
            fill="#6b7a99" fontSize="7" fontFamily="system-ui, sans-serif"
            fontWeight="600" letterSpacing="0.06em">
            {card.label}
          </text>

          {/* Main value */}
          <text x={card.x + 42} y="54" textAnchor="middle"
            fill={card.valueColor} fontSize="24" fontWeight="700"
            fontFamily="system-ui, sans-serif">
            {card.value}
          </text>

          {/* Subtext */}
          <text x={card.x + 42} y="70" textAnchor="middle"
            fill="#374151" fontSize="7.5" fontFamily="system-ui, sans-serif">
            {card.subtext}
          </text>
        </motion.g>
      ))}

      {/* Bottom note */}
      <motion.text x="152" y="97" textAnchor="middle"
        fill="#374151" fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}>
        42 B2B SaaS companies, Google Search Console, Jan 2025 → Jan 2026
      </motion.text>
    </svg>
  )
}
