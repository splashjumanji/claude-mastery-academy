import { motion } from 'framer-motion'

export function WireframeMachineReadable() {
  return (
    <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[100px]">

      {/* Left: Prose page (bad) */}
      <motion.rect x="10" y="12" width="88" height="72" rx="5" fill="white" stroke="#e5e3dd" strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <text x="54" y="24" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Feature page</text>
      {[30, 38, 46, 54, 62, 70].map((y, i) => (
        <rect key={y} x="18" y={y} width={i % 2 === 0 ? 72 : 55} height="4" rx="1.5" fill="#e5e3dd" opacity="0.7" />
      ))}
      {/* X badge */}
      <circle cx="88" cy="12" r="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="88" y="16" fill="#dc2626" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">✗</text>

      {/* Arrow */}
      <motion.text x="110" y="52" fill="#374151" fontSize="12" fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.4 }}
      >→</motion.text>

      {/* Right: Structured specs (good) */}
      <motion.rect x="122" y="12" width="88" height="72" rx="5" fill="#f8fff8" stroke="#86efac" strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <text x="166" y="24" fill="#16a34a" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="600">Structured specs</text>
      {[
        { key: 'type:', val: 'SaaS' },
        { key: 'price:', val: '$49/mo' },
        { key: 'users:', val: '500' },
        { key: 'api:', val: 'true' },
        { key: 'g2:', val: '4.7★' },
      ].map((row, i) => (
        <g key={i}>
          <rect x="130" y={30 + i * 9} width="22" height="5" rx="1.5" fill="#d4d0c8" />
          <rect x="156" y={30 + i * 9} width="46" height="5" rx="1.5" fill="#bbf7d0" />
        </g>
      ))}
      {/* Check badge */}
      <circle cx="200" cy="12" r="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="200" y="16" fill="#16a34a" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">✓</text>

      {/* Footer */}
      <text x="110" y="96" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Machine-readable specs, agents parse, not read</text>
    </svg>
  )
}
