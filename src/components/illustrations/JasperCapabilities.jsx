import { motion } from 'framer-motion'

const ROW1 = [
  { x: 4,   w: 140, emoji: '📚', name: 'Knowledge Base', tag: 'Authority'   },
  { x: 156, w: 140, emoji: '🧠', name: 'Brand IQ',       tag: 'Consistency' },
]

const ROW2 = [
  { x: 4,   w: 86, emoji: '🎨', name: 'Jasper Canvas',    tag: 'Campaigns' },
  { x: 107, w: 86, emoji: '⚡', name: 'Jasper Grid',      tag: 'Scale'     },
  { x: 210, w: 86, emoji: '📄', name: 'Content Pipeline', tag: 'Output'    },
]

function CapabilityCard({ x, y, w, h, emoji, name, tag, delay }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35, type: 'spring', stiffness: 200, damping: 18 }}>
      <rect x={x} y={y} width={w} height={h} rx="7"
        fill="#f5f4f0" stroke="#e5e3dd" strokeWidth="1.5" />
      {/* Emoji */}
      <text x={x + w / 2} y={y + h * 0.4} textAnchor="middle"
        fontSize="16" fontFamily="system-ui, sans-serif">{emoji}</text>
      {/* Feature name */}
      <text x={x + w / 2} y={y + h * 0.66} textAnchor="middle"
        fill="#00063d" fontSize="8.5" fontWeight="700"
        fontFamily="system-ui, sans-serif">{name}</text>
      {/* Tag */}
      <text x={x + w / 2} y={y + h * 0.84} textAnchor="middle"
        fill="#6b7a99" fontSize="7.5"
        fontFamily="system-ui, sans-serif">{tag}</text>
    </motion.g>
  )
}

export function JasperCapabilities() {
  return (
    <svg viewBox="0 0 300 158" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[158px]">

      {/* Header label */}
      <motion.text x="150" y="13" textAnchor="middle"
        fill="#6b7a99" fontSize="8" fontWeight="700"
        fontFamily="system-ui, sans-serif" letterSpacing="0.1em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}>
        JASPER FOR AISV — ACTIVE TODAY
      </motion.text>

      {/* Row 1 — 2 wider cards */}
      {ROW1.map((card, i) => (
        <CapabilityCard key={card.name}
          x={card.x} y={20} w={card.w} h={60}
          emoji={card.emoji} name={card.name} tag={card.tag}
          delay={0.12 + i * 0.1} />
      ))}

      {/* Row 2 — 3 narrower cards */}
      {ROW2.map((card, i) => (
        <CapabilityCard key={card.name}
          x={card.x} y={90} w={card.w} h={58}
          emoji={card.emoji} name={card.name} tag={card.tag}
          delay={0.3 + i * 0.1} />
      ))}

      {/* Flame accent bar at top of each card */}
      {ROW1.map((card, i) => (
        <motion.rect key={`bar1-${i}`}
          x={card.x} y={20} width={card.w} height="3" rx="3"
          fill="#fa4028"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.12 + i * 0.1 + 0.15, duration: 0.3 }} />
      ))}
      {ROW2.map((card, i) => (
        <motion.rect key={`bar2-${i}`}
          x={card.x} y={90} width={card.w} height="3" rx="3"
          fill="#fa4028"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1 + 0.15, duration: 0.3 }} />
      ))}
    </svg>
  )
}
