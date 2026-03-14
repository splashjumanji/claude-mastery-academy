import { motion } from 'framer-motion'

const CARDS = [
  { label: 'SEO',  sublabel: 'page-level',    metric: 'Rankings',  accent: '#2563eb', bg: '#eff6ff', border: '#93c5fd', lineColor: '#93c5fd' },
  { label: 'AEO',  sublabel: 'passage-level',  metric: 'Citations', accent: '#4f46e5', bg: '#eef2ff', border: '#a5b4fc', lineColor: '#a5b4fc' },
  { label: 'GEO',  sublabel: 'entity-level',   metric: 'Trust',     accent: '#16a34a', bg: '#f0fdf4', border: '#86efac', lineColor: '#86efac' },
]

const CX       = 150   // hub centre x
const HUB_Y    = 8
const HUB_H    = 26
const HUB_W    = 120
const CARD_Y   = 76
const CARD_W   = 82
const CARD_H   = 50
const CENTERS  = [50, 150, 250]

function OutcomeCard({ x, y, w, h, label, sublabel, metric, accent, bg, border, delay }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200, damping: 18 }}>
      <rect x={x} y={y} width={w} height={h} rx="6"
        fill={bg} stroke={border} strokeWidth="1.5" />
      {/* Accent bar */}
      <rect x={x} y={y} width={w} height="3" rx="3" fill={accent} />
      {/* Label */}
      <text x={x + w / 2} y={y + 19} textAnchor="middle"
        fill={accent} fontSize="11" fontWeight="800"
        fontFamily="system-ui, sans-serif">{label}</text>
      {/* Sublabel */}
      <text x={x + w / 2} y={y + 30} textAnchor="middle"
        fill={accent} fontSize="7" opacity="0.75"
        fontFamily="system-ui, sans-serif">{sublabel}</text>
      {/* Metric */}
      <text x={x + w / 2} y={y + 42} textAnchor="middle"
        fill="#6b7a99" fontSize="7.5"
        fontFamily="system-ui, sans-serif">→ {metric}</text>
    </motion.g>
  )
}

export function TripleDisciplineSync() {
  return (
    <svg viewBox="0 0 300 134" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[134px]">

      {/* ── Content hub ── */}
      <motion.rect
        x={CX - HUB_W / 2} y={HUB_Y} width={HUB_W} height={HUB_H} rx="6"
        fill="#f5f4f0" stroke="#c8c5bc" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />
      <motion.text x={CX} y={HUB_Y + 17} textAnchor="middle"
        fill="#00063d" fontSize="9" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}>
        One piece of content
      </motion.text>

      {/* ── Connector lines ── */}
      {CARDS.map(({ lineColor }, i) => (
        <motion.line key={i}
          x1={CX} y1={HUB_Y + HUB_H}
          x2={CENTERS[i]} y2={CARD_Y}
          stroke={lineColor} strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }} />
      ))}

      {/* "simultaneously" label */}
      <motion.text x={CX} y={54} textAnchor="middle"
        fill="#9ca3af" fontSize="7" fontStyle="italic"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.3 }}>
        simultaneously ↓
      </motion.text>

      {/* ── Outcome cards ── */}
      {CARDS.map(({ label, sublabel, metric, accent, bg, border }, i) => (
        <OutcomeCard key={label}
          x={CENTERS[i] - CARD_W / 2} y={CARD_Y}
          w={CARD_W} h={CARD_H}
          label={label} sublabel={sublabel} metric={metric}
          accent={accent} bg={bg} border={border}
          delay={0.5 + i * 0.1} />
      ))}
    </svg>
  )
}
