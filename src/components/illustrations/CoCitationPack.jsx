import { motion } from 'framer-motion'

export function CoCitationPack() {
  const established = [
    { label: 'Asana',      x: 82,  y: 52  },
    { label: 'Monday.com', x: 186, y: 40  },
    { label: 'Notion',     x: 230, y: 90  },
    { label: 'ClickUp',    x: 165, y: 122 },
    { label: 'Jira',       x: 58,  y: 112 },
  ]

  return (
    <svg viewBox="0 0 300 168" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[168px]">

      {/* Cluster bubble */}
      <motion.ellipse cx="150" cy="84" rx="122" ry="68"
        fill="#f5f4f0" stroke="#e5e3dd" strokeWidth="1.5"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Established brand chips */}
      {established.map((b, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 + i * 0.08 }}>
          <rect x={b.x - 30} y={b.y - 10} width="60" height="20" rx="10"
            fill="white" stroke="#d4d0c8" strokeWidth="1.5" />
          <text x={b.x} y={b.y + 5} fill="#6b7a99" fontSize="8.5" fontWeight="600"
            fontFamily="system-ui" textAnchor="middle">
            {b.label}
          </text>
        </motion.g>
      ))}

      {/* Aria, being added with emphasis */}
      <motion.g
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}>
        <rect x="115" y="71" width="70" height="26" rx="13"
          fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="150" y="88" fill="#1d4ed8" fontSize="10" fontWeight="800"
          fontFamily="system-ui" textAnchor="middle">
          Aria ✦
        </text>
      </motion.g>

      {/* Label */}
      <motion.text x="150" y="163" fill="#6b7a99" fontSize="7.5" fontWeight="600"
        fontFamily="system-ui" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        Co-citation pack, project management
      </motion.text>
    </svg>
  )
}
