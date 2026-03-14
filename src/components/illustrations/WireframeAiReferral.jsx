import { motion } from 'framer-motion'

export function WireframeAiReferral() {
  const sources = [
    { label: 'ChatGPT',    y: 22,  color: '#10b981' },
    { label: 'Perplexity', y: 52,  color: '#8b5cf6' },
    { label: 'Claude',     y: 82,  color: '#f59e0b' },
  ]

  return (
    <svg viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[110px]">

      {/* AI source pills */}
      {sources.map((s, i) => (
        <g key={s.label}>
          <motion.rect x="10" y={s.y} width="74" height="18" rx="9" fill="white" stroke="#e5e3dd" strokeWidth="1.2"
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.12 }}
          />
          <circle cx="24" cy={s.y + 9} r="5" fill={s.color} opacity="0.25" />
          <circle cx="24" cy={s.y + 9} r="3" fill={s.color} />
          <text x="32" y={s.y + 13} fill="#00063d" fontSize="10" fontFamily="system-ui" fontWeight="600">{s.label}</text>

          {/* Arrow to site */}
          <motion.path d={`M 84 ${s.y + 9} C 112 ${s.y + 9} 120 52 148 52`}
            stroke="#e5e3dd" strokeWidth="1.2" fill="none" strokeDasharray="3,2"
            markerEnd="url(#arrowRef)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.45, delay: 0.4 + i * 0.1 }}
          />
        </g>
      ))}

      {/* Site box */}
      <motion.rect x="148" y="38" width="60" height="28" rx="5" fill="#fdf2ee" stroke="#ff4f1f" strokeWidth="1.2"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{ transformOrigin: '178px 52px' }}
      />
      <text x="178" y="50" fill="#ff4f1f" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">aria.com</text>
      <text x="178" y="60" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">GA4 sessions</text>

      {/* Footer note */}
      <text x="110" y="104" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Track in GA4: filter by AI referral domains</text>

      <defs>
        <marker id="arrowRef" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L0,4 L4,2 z" fill="#374151" />
        </marker>
      </defs>
    </svg>
  )
}
