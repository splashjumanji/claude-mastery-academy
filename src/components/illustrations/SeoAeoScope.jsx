import { motion } from 'framer-motion'

export function SeoAeoScope() {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[180px]">

      {/* Page border, SEO scope */}
      <motion.rect
        x="44" y="12" width="196" height="156"
        rx="4"
        stroke="#2563eb" strokeWidth="2"
        fill="white"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Gray text block rows (simulated content) */}
      {[28, 42, 56].map((y, i) => (
        <motion.rect key={`top-${i}`} x="60" y={y} width={110 + i * 18} height="7" rx="2"
          fill="#e5e3dd"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
        />
      ))}
      {[116, 130, 144].map((y, i) => (
        <motion.rect key={`bot-${i}`} x="60" y={y} width={100 + i * 20} height="7" rx="2"
          fill="#e5e3dd"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
        />
      ))}

      {/* AEO highlighted paragraph block */}
      <motion.rect
        x="52" y="74" width="180" height="30"
        rx="3"
        fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      />
      <motion.rect x="60" y="80" width="130" height="7" rx="2" fill="#93c5fd"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.rect x="60" y="91" width="100" height="7" rx="2" fill="#93c5fd"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}
      />

      {/* SEO label, right side pointing at page border */}
      <motion.text x="252" y="94" fill="#2563eb" fontSize="11" fontWeight="700"
        fontFamily="system-ui, sans-serif" letterSpacing="0.06em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        SEO
      </motion.text>
      <motion.text x="252" y="107" fill="#6b7a99" fontSize="8"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        page-level
      </motion.text>
      <motion.line x1="250" y1="90" x2="242" y2="90"
        stroke="#2563eb" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />

      {/* AEO label, left side pointing at paragraph */}
      <motion.text x="4" y="85" fill="#2563eb" fontSize="11" fontWeight="700"
        fontFamily="system-ui, sans-serif" letterSpacing="0.06em"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}>
        AEO
      </motion.text>
      <motion.text x="4" y="98" fill="#6b7a99" fontSize="8"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}>
        passage-level
      </motion.text>
      <motion.line x1="38" y1="89" x2="50" y2="89"
        stroke="#2563eb" strokeWidth="1.5"
        markerEnd="url(#arrowBlueSeo)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
      />

      <defs>
        <marker id="arrowBlueSeo" markerWidth="5" markerHeight="5"
          refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 z" fill="#2563eb" />
        </marker>
      </defs>
    </svg>
  )
}
