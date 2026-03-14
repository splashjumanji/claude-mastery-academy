import { motion } from 'framer-motion'

function TextRow({ x, y, w, fill = '#e5e3dd', delay = 0 }) {
  return (
    <motion.rect x={x} y={y} width={w} height="6" rx="2" fill={fill}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.25 }} />
  )
}

export function WireframeToc() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[140px]">

      {/* Card */}
      <motion.rect x="30" y="8" width="220" height="122" rx="6"
        fill="white" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} />

      {/* Left accent bar */}
      <motion.rect x="30" y="8" width="4" height="122" rx="2"
        fill="#bfdbfe"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }} />

      {/* "Contents" heading */}
      <motion.text x="48" y="26" fill="#374151" fontSize="8.5" fontWeight="700"
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}>
        Contents
      </motion.text>

      {/* TOC items */}
      {[
        { num: '1.', y: 38, w: 150, indent: false, d: 0.25 },
        { num: '2.', y: 54, w: 140, indent: false, d: 0.35 },
        { num: '3.', y: 70, w: 158, indent: false, d: 0.45 },
        { num: '',   y: 84, w: 120, indent: true,  d: 0.52 },  // sub-item
        { num: '4.', y: 98, w: 135, indent: false, d: 0.6 },
        { num: '5.', y: 112, w: 148, indent: false, d: 0.7 },
      ].map(({ num, y, w, indent, d }, i) => (
        <g key={i}>
          {indent ? (
            <>
              <motion.rect x="65" y={y - 1} width="3" height="8" rx="1"
                fill="#bfdbfe"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: d, duration: 0.2 }} />
              <TextRow x={72} y={y} w={w} fill="#c7d2fe" delay={d + 0.05} />
            </>
          ) : (
            <>
              <motion.text x="48" y={y + 6} fill="#6366f1" fontSize="10" fontWeight="700"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: d, duration: 0.25 }}>
                {num}
              </motion.text>
              <TextRow x={62} y={y} w={w} fill="#94a3b8" delay={d + 0.05} />
            </>
          )}
        </g>
      ))}

      {/* Bottom label */}
      <motion.text x="140" y="138" textAnchor="middle"
        fill="#374151" fontSize="10" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}>
        Table of contents structure
      </motion.text>
    </svg>
  )
}
