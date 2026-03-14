import { motion } from 'framer-motion'

export function WireframeAnalystLogos() {
  return (
    <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[80px]">

      {/* Label */}
      <text x="110" y="12" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Analyst coverage, highest-authority citations</text>

      {/* Gartner */}
      <motion.rect x="18" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />
      <rect x="28" y="34" width="62" height="8" rx="2" fill="#d4d0c8" opacity="0.6" />
      <rect x="34" y="46" width="50" height="5" rx="2" fill="#e5e3dd" opacity="0.5" />
      <text x="59" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">GARTNER</text>

      {/* Forrester */}
      <motion.rect x="120" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      />
      <rect x="130" y="34" width="62" height="8" rx="2" fill="#d4d0c8" opacity="0.6" />
      <rect x="136" y="46" width="50" height="5" rx="2" fill="#e5e3dd" opacity="0.5" />
      <text x="161" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">FORRESTER</text>
    </svg>
  )
}
