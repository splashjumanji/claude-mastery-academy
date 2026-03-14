import { motion } from 'framer-motion'

export function WireframeMixModel() {
  const channels = [
    { label: 'AI Search',  weight: 0.38, color: '#ff4f1f' },
    { label: 'Paid',       weight: 0.22, color: '#e5e3dd' },
    { label: 'Organic',    weight: 0.28, color: '#d4d0c8' },
    { label: 'Email',      weight: 0.12, color: '#ebe9e3' },
  ]

  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* Frame */}
      <rect x="10" y="8" width="200" height="92" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />
      <text x="16" y="20" fill="#374151" fontSize="9" fontFamily="system-ui">Marketing Mix Model, attribution</text>

      {/* Channel nodes on left */}
      {channels.map((c, i) => {
        const y = 30 + i * 18
        const nodeR = 5 + c.weight * 10
        return (
          <g key={c.label}>
            <motion.circle cx={30} cy={y} r={nodeR} fill={c.color}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
              style={{ transformOrigin: `30px ${y}px` }}
            />
            <text x={42} y={y + 4} fill="#00063d" fontSize="9" fontFamily="system-ui"
              fontWeight={c.label === 'AI Search' ? '700' : '400'}>
              {c.label}
            </text>
            {/* Arrow to pipeline */}
            <motion.line x1={52 + (c.label.length * 4)} y1={y} x2={130} y2={55}
              stroke={c.color === '#ff4f1f' ? '#ff4f1f' : '#e5e3dd'} strokeWidth={c.weight * 4}
              markerEnd="url(#arrowMix)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            />
          </g>
        )
      })}

      {/* Pipeline / Revenue box */}
      <motion.rect x="130" y="44" width="68" height="22" rx="4" fill="#fdf2ee" stroke="#ffd4c2" strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
      <text x="164" y="53" fill="#ff4f1f" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Pipeline</text>
      <text x="164" y="62" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">attribution</text>

      <defs>
        <marker id="arrowMix" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L0,4 L4,2 z" fill="#374151" />
        </marker>
      </defs>
    </svg>
  )
}
