import { motion } from 'framer-motion'

export function WireframeAgentApi() {
  return (
    <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[100px]">

      {/* Agent box */}
      <motion.rect x="10" y="28" width="60" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <text x="40" y="44" fontSize="16" fontFamily="system-ui" textAnchor="middle">🤖</text>
      <text x="40" y="58" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="600">AI Agent</text>
      <text x="40" y="66" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">evaluating</text>

      {/* API call arrow */}
      <motion.path d="M 70 50 L 110 50"
        stroke="#ff4f1f" strokeWidth="1.5" fill="none"
        markerEnd="url(#arrowApiRight)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.4 }}
      />
      {/* Return arrow */}
      <motion.path d="M 110 55 L 70 55"
        stroke="#e5e3dd" strokeWidth="1.2" fill="none"
        markerEnd="url(#arrowApiLeft)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.65 }}
      />

      {/* API label */}
      <text x="90" y="46" fill="#ff4f1f" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="600">GET</text>
      <text x="90" y="64" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">JSON</text>

      {/* API endpoint box */}
      <motion.rect x="112" y="22" width="98" height="56" rx="6" fill="#f8f7f5" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      {/* URL bar */}
      <rect x="118" y="28" width="86" height="10" rx="3" fill="white" stroke="#e5e3dd" strokeWidth="1" />
      <text x="122" y="36" fill="#ff4f1f" fontSize="10" fontFamily="system-ui" fontWeight="600">/product-data</text>

      {/* JSON response lines */}
      <rect x="118" y="44" width="30" height="4" rx="1.5" fill="#d4d0c8" />
      <rect x="152" y="44" width="40" height="4" rx="1.5" fill="#e5e3dd" />
      <rect x="118" y="52" width="35" height="4" rx="1.5" fill="#d4d0c8" />
      <rect x="157" y="52" width="30" height="4" rx="1.5" fill="#e5e3dd" />
      <rect x="118" y="60" width="28" height="4" rx="1.5" fill="#d4d0c8" />
      <rect x="150" y="60" width="45" height="4" rx="1.5" fill="#e5e3dd" />

      {/* Bottom label */}
      <text x="110" y="94" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Agents verify claims via API, not prose</text>

      <defs>
        <marker id="arrowApiRight" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L0,4 L4,2 z" fill="#ff4f1f" />
        </marker>
        <marker id="arrowApiLeft" markerWidth="4" markerHeight="4" refX="1" refY="2" orient="auto">
          <path d="M4,0 L4,4 L0,2 z" fill="#374151" />
        </marker>
      </defs>
    </svg>
  )
}
