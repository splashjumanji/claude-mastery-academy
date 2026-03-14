import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeAnswerFirst() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Document card */}
      <motion.rect x="40" y="10" width="200" height="118" rx="6"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Answer-first highlight band */}
      <motion.rect x="40" y="10" width="200" height="26" rx="6"
        fill="#dbeafe"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }} />
      {/* Square off bottom corners of highlight */}
      <rect x="41" y="28" width="198" height="8" fill="#dbeafe" />

      {/* Answer row */}
      <TextRow x={56} y={22} w={148} fill="#93c5fd" delay={0.3} />

      {/* Check label */}
      <motion.text x="56" y="21" fill="#1d4ed8" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}>
        ✓ Direct answer, first sentence
      </motion.text>

      {/* Subheading */}
      <TextRow x={56} y={50} w={90} fill="#94a3b8" delay={0.45} />

      {/* Body rows */}
      <TextRow x={56} y={64} w={162} delay={0.5} />
      <TextRow x={56} y={76} w={154} delay={0.55} />
      <TextRow x={56} y={88} w={140} delay={0.6} />

      {/* Divider */}
      <motion.line x1="56" y1="103" x2="224" y2="103" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.25 }} />

      {/* Footer rows */}
      <TextRow x={56} y={111} w={120} fill="#e5e3dd" delay={0.7} />

      {/* Bottom label */}
      <motion.text x="140" y="136" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.3 }}>
        Answer-first structure
      </motion.text>
    </svg>
  )
}
