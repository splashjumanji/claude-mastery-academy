import { motion } from 'framer-motion'

export function WireframeEntityLogos() {
  return (
    <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[80px]">

      {/* Label */}
      <text x="110" y="12" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Entity verification sources, AI checks these</text>

      {/* Crunchbase */}
      <motion.rect x="18" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />
      {/* Crunchbase "C" icon placeholder */}
      <circle cx="38" cy="38" r="8" fill="#e5e3dd" opacity="0.5" />
      <text x="38" y="42" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">C</text>
      <rect x="52" y="33" width="40" height="5" rx="2" fill="#d4d0c8" opacity="0.5" />
      <rect x="52" y="41" width="30" height="4" rx="2" fill="#e5e3dd" opacity="0.4" />
      <rect x="26" y="52" width="66" height="4" rx="2" fill="#e5e3dd" opacity="0.35" />
      <text x="59" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Crunchbase</text>

      {/* Wikipedia */}
      <motion.rect x="120" y="22" width="82" height="44" rx="6" fill="white" stroke="#e5e3dd" strokeWidth="1.3"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      />
      {/* Wikipedia "W" icon */}
      <circle cx="140" cy="38" r="8" fill="#e5e3dd" opacity="0.5" />
      <text x="140" y="42" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">W</text>
      <rect x="154" y="33" width="40" height="5" rx="2" fill="#d4d0c8" opacity="0.5" />
      <rect x="154" y="41" width="30" height="4" rx="2" fill="#e5e3dd" opacity="0.4" />
      <rect x="128" y="52" width="66" height="4" rx="2" fill="#e5e3dd" opacity="0.35" />
      <text x="161" y="72" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">Wikipedia</text>
    </svg>
  )
}
