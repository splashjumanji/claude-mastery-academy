import { motion } from 'framer-motion'

export function WireframeIntegrationCheck() {
  const integrations = [
    { name: 'Slack',      checked: true  },
    { name: 'Salesforce', checked: true  },
    { name: 'Jira',       checked: true  },
    { name: 'HubSpot',    checked: true  },
    { name: 'Zapier',     checked: false },
    { name: 'Notion',     checked: false },
  ]

  return (
    <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[100px]">

      {/* Frame */}
      <rect x="10" y="8" width="200" height="82" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.2" />
      <text x="110" y="21" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Integration compatibility check</text>

      {/* Grid of integrations */}
      {integrations.map((intg, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 20 + col * 62
        const y = 28 + row * 28
        return (
          <motion.g key={intg.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
            style={{ transformOrigin: `${x + 27}px ${y + 12}px` }}
          >
            <rect x={x} y={y} width="54" height="22" rx="4"
              fill={intg.checked ? '#f0fdf4' : 'white'}
              stroke={intg.checked ? '#86efac' : '#e5e3dd'}
              strokeWidth="1.1"
            />
            <circle cx={x + 10} cy={y + 11} r="6" fill={intg.checked ? '#86efac' : '#f0ede8'} />
            <text x={x + 10} y={y + 14} fill={intg.checked ? '#16a34a' : '#9896a0'}
              fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">
              {intg.checked ? '✓' : '–'}
            </text>
            <text x={x + 20} y={y + 13} fill={intg.checked ? '#15803d' : '#9896a0'}
              fontSize="9" fontFamily="system-ui" fontWeight={intg.checked ? '600' : '400'}>
              {intg.name}
            </text>
          </motion.g>
        )
      })}

      {/* Footer */}
      <text x="110" y="96" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Verified programmatically, not inferred</text>
    </svg>
  )
}
