import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeFaq() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* FAQ container */}
      <motion.rect x="20" y="8" width="240" height="124" rx="6"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* "FAQ" label tab */}
      <motion.rect x="20" y="8" width="44" height="14" rx="6"
        fill="#f0fdf4" stroke="#86efac" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }} />
      <motion.text x="42" y="18" textAnchor="middle"
        fill="#16a34a" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}>
        FAQ
      </motion.text>

      {/* Q1 */}
      <motion.text x="34" y="33" fill="#374151" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        Q
      </motion.text>
      <TextRow x={44} y={27} w={195} fill="#94a3b8" delay={0.25} />

      {/* A1 */}
      <motion.text x="34" y="46" fill="#6366f1" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}>
        A
      </motion.text>
      <TextRow x={44} y={40} w={195} fill="#bfdbfe" delay={0.35} />
      <TextRow x={44} y={52} w={160} fill="#e5e3dd" delay={0.38} />

      {/* Divider */}
      <motion.line x1="30" y1="65" x2="250" y2="65" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.25 }} />

      {/* Q2 */}
      <motion.text x="34" y="79" fill="#374151" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}>
        Q
      </motion.text>
      <TextRow x={44} y={73} w={180} fill="#94a3b8" delay={0.5} />

      {/* A2 */}
      <motion.text x="34" y="92" fill="#6366f1" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.3 }}>
        A
      </motion.text>
      <TextRow x={44} y={86} w={195} fill="#bfdbfe" delay={0.6} />
      <TextRow x={44} y={98} w={142} fill="#e5e3dd" delay={0.63} />

      {/* Divider */}
      <motion.line x1="30" y1="111" x2="250" y2="111" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.67, duration: 0.25 }} />

      {/* Q3 row (partial) */}
      <motion.text x="34" y="124" fill="#374151" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}>
        Q
      </motion.text>
      <TextRow x={44} y={118} w={165} fill="#94a3b8" delay={0.72} />

      {/* Bottom label */}
      <motion.text x="140" y="138" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}>
        FAQ section structure
      </motion.text>
    </svg>
  )
}
