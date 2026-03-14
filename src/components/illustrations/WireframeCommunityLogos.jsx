import { motion } from 'framer-motion'

export function WireframeCommunityLogos() {
  return (
    <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[80px]">

      {/* Label */}
      <text x="110" y="12" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Community platforms, heavily cited by Perplexity</text>

      {/* Reddit */}
      <motion.rect x="18" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />
      {/* Reddit alien icon (simplified) */}
      <circle cx="38" cy="36" r="9" fill="#e5e3dd" opacity="0.5" />
      <circle cx="34" cy="34" r="1.5" fill="#374151" opacity="0.5" />
      <circle cx="42" cy="34" r="1.5" fill="#374151" opacity="0.5" />
      <path d="M 34 39 Q 38 42 42 39" stroke="#9896a0" strokeWidth="1.2" fill="none" opacity="0.5" />
      <rect x="52" y="32" width="40" height="5" rx="2" fill="#d4d0c8" opacity="0.5" />
      <rect x="52" y="40" width="28" height="4" rx="2" fill="#e5e3dd" opacity="0.4" />
      <text x="59" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Reddit</text>

      {/* Quora */}
      <motion.rect x="120" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      />
      {/* Quora "Q" icon */}
      <circle cx="140" cy="36" r="9" fill="#e5e3dd" opacity="0.5" />
      <text x="140" y="40" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Q</text>
      <rect x="154" y="32" width="40" height="5" rx="2" fill="#d4d0c8" opacity="0.5" />
      <rect x="154" y="40" width="28" height="4" rx="2" fill="#e5e3dd" opacity="0.4" />
      <text x="161" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">Quora</text>
    </svg>
  )
}
