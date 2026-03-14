import { motion } from 'framer-motion'

export function WireframeAiSov() {
  const brands = [
    { name: 'Aria',       pct: 0.28, color: '#ff4f1f' },
    { name: 'Comp. A',    pct: 0.42, color: '#e5e3dd' },
    { name: 'Comp. B',    pct: 0.18, color: '#e5e3dd' },
    { name: 'Comp. C',    pct: 0.12, color: '#e5e3dd' },
  ]
  const maxBar = 160

  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* Frame */}
      <rect x="10" y="8" width="200" height="92" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />

      {/* Title */}
      <text x="16" y="20" fill="#374151" fontSize="9" fontFamily="system-ui">AI Share of Voice</text>

      {/* Bars */}
      {brands.map((b, i) => {
        const barW = b.pct * maxBar
        const y = 28 + i * 18
        return (
          <g key={b.name}>
            <text x="16" y={y + 9} fill="#00063d" fontSize="9" fontFamily="system-ui" fontWeight={b.name === 'Aria' ? '700' : '400'}>{b.name}</text>
            <motion.rect x="62" y={y} width={barW} height="12" rx="2" fill={b.color}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              style={{ transformOrigin: '62px center' }}
            />
            <text x={64 + barW} y={y + 9} fill={b.name === 'Aria' ? '#ff4f1f' : '#9896a0'} fontSize="9" fontFamily="system-ui" fontWeight={b.name === 'Aria' ? '700' : '400'}>
              {Math.round(b.pct * 100)}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
