import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeQuestionHeading() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Section 1 */}
      {/* H2 heading row with ? indicator */}
      <motion.rect x="20" y="14" width="8" height="8" rx="1"
        fill="#6366f1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25 }} />
      <motion.text x="20" y="21" fill="#6366f1" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}>
        ?
      </motion.text>
      <TextRow x={34} y={14} w={160} fill="#94a3b8" delay={0.2} />
      <TextRow x={34} y={28} w={60} fill="#bfdbfe" delay={0.25} />

      {/* Body rows for section 1 */}
      <TextRow x={20} y={42} w={228} delay={0.3} />
      <TextRow x={20} y={54} w={212} delay={0.35} />
      <TextRow x={20} y={66} w={195} delay={0.4} />

      {/* Divider */}
      <motion.line x1="20" y1="81" x2="248" y2="81" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.25 }} />

      {/* Section 2 */}
      <motion.text x="20" y="97" fill="#6366f1" fontSize="10" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}>
        ?
      </motion.text>
      <TextRow x={34} y={90} w={148} fill="#94a3b8" delay={0.55} />
      <TextRow x={34} y={104} w={50} fill="#bfdbfe" delay={0.6} />

      {/* Body rows for section 2 */}
      <TextRow x={20} y={116} w={216} delay={0.65} />
      <TextRow x={20} y={128} w={188} delay={0.7} />

      {/* Right-side label */}
      <motion.text x="260" y="70" textAnchor="middle"
        fill="#6366f1" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif"
        transform="rotate(90, 260, 70)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.3 }}>
        Question-based headings
      </motion.text>
    </svg>
  )
}
