import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="5" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeComparison() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Table container */}
      <motion.rect x="20" y="10" width="240" height="118" rx="6"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Header row */}
      <motion.rect x="20" y="10" width="240" height="22" rx="6"
        fill="#dbeafe"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }} />
      <rect x="21" y="24" width="238" height="8" fill="#dbeafe" />

      {/* Header: Feature label */}
      <motion.text x="50" y="23" fill="#1d4ed8" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        Feature
      </motion.text>

      {/* Column divider (vertical) */}
      <motion.line x1="140" y1="10" x2="140" y2="128" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.25 }} />

      {/* Header: Brand A */}
      <motion.text x="173" y="23" textAnchor="middle"
        fill="#1d4ed8" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        Brand A
      </motion.text>
      {/* Header: Brand B */}
      <motion.text x="233" y="23" textAnchor="middle"
        fill="#1d4ed8" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        Brand B
      </motion.text>

      {/* Row 1 */}
      <motion.line x1="20" y1="44" x2="260" y2="44" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }} />
      <TextRow x={28} y={37} w={100} fill="#94a3b8" delay={0.32} />
      <motion.rect x="152" y="35" width="28" height="10" rx="3"
        fill="#bbf7d0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.25 }} />
      <motion.text x="166" y="43" textAnchor="middle"
        fill="#15803d" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.25 }}>
        ✓ Yes
      </motion.text>
      <motion.rect x="212" y="35" width="28" height="10" rx="3"
        fill="#fee2e2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.25 }} />
      <motion.text x="226" y="43" textAnchor="middle"
        fill="#dc2626" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.25 }}>
        ✗ No
      </motion.text>

      {/* Row 2 */}
      <motion.line x1="20" y1="62" x2="260" y2="62" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.2 }} />
      <TextRow x={28} y={55} w={88} fill="#94a3b8" delay={0.42} />
      <motion.rect x="152" y="53" width="28" height="10" rx="3"
        fill="#bbf7d0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.25 }} />
      <motion.text x="166" y="61" textAnchor="middle"
        fill="#15803d" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.48, duration: 0.25 }}>
        ✓ Yes
      </motion.text>
      <motion.rect x="212" y="53" width="28" height="10" rx="3"
        fill="#bbf7d0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.25 }} />
      <motion.text x="226" y="61" textAnchor="middle"
        fill="#15803d" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.48, duration: 0.25 }}>
        ✓ Yes
      </motion.text>

      {/* Row 3 */}
      <motion.line x1="20" y1="80" x2="260" y2="80" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.2 }} />
      <TextRow x={28} y={73} w={96} fill="#94a3b8" delay={0.52} />
      <motion.rect x="152" y="71" width="28" height="10" rx="3"
        fill="#fee2e2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.25 }} />
      <motion.text x="166" y="79" textAnchor="middle"
        fill="#dc2626" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.58, duration: 0.25 }}>
        ✗ No
      </motion.text>
      <motion.rect x="212" y="71" width="28" height="10" rx="3"
        fill="#bbf7d0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.25 }} />
      <motion.text x="226" y="79" textAnchor="middle"
        fill="#15803d" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.58, duration: 0.25 }}>
        ✓ Yes
      </motion.text>

      {/* Row 4, price */}
      <motion.line x1="20" y1="98" x2="260" y2="98" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.2 }} />
      <TextRow x={28} y={91} w={76} fill="#94a3b8" delay={0.62} />
      <TextRow x={152} y={91} w={36} fill="#e5e3dd" delay={0.65} />
      <TextRow x={212} y={91} w={36} fill="#e5e3dd" delay={0.65} />

      {/* Bottom label */}
      <motion.text x="140" y="136" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.3 }}>
        Comparison table format
      </motion.text>
    </svg>
  )
}
