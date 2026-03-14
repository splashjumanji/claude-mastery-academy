import { motion } from 'framer-motion'

export function BotCrawler() {
  return (
    <svg viewBox="0 0 280 148" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[148px]">

      <defs>
        <clipPath id="bot-browser-clip">
          <rect x="142" y="36" width="130" height="87" />
        </clipPath>
      </defs>

      {/* ── AI CRAWLER BOT (left) ── */}

      {/* Antenna */}
      <motion.line x1="60" y1="18" x2="60" y2="8"
        stroke="#162032" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }} />
      <motion.circle cx="60" cy="5" r="4" fill="#e84c1e"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 14 }} />

      {/* Head */}
      <motion.rect x="38" y="18" width="44" height="30" rx="5"
        fill="white" stroke="#162032" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }} />

      {/* Eyes */}
      <motion.circle cx="51" cy="32" r="5.5" fill="#162032"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.25 }} />
      <motion.circle cx="69" cy="32" r="5.5" fill="#162032"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.25 }} />
      <circle cx="53" cy="30" r="1.5" fill="white" />
      <circle cx="71" cy="30" r="1.5" fill="white" />

      {/* Mouth bar */}
      <motion.rect x="48" y="42" width="24" height="3" rx="1.5"
        fill="#162032" opacity="0.15"
        initial={{ opacity: 0 }} animate={{ opacity: 0.15 }}
        transition={{ delay: 0.35 }} />

      {/* Body */}
      <motion.rect x="42" y="52" width="36" height="30" rx="4"
        fill="white" stroke="#162032" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }} />

      {/* Signal arcs */}
      <motion.path d="M 56 60 Q 64 67 56 74"
        stroke="#e84c1e" strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }} />
      <motion.path d="M 51 57 Q 66 67 51 77"
        stroke="#e84c1e" strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ delay: 0.62, duration: 0.4 }} />

      {/* Arms */}
      <motion.line x1="42" y1="62" x2="27" y2="71"
        stroke="#162032" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.38 }} />
      <motion.line x1="78" y1="62" x2="93" y2="71"
        stroke="#162032" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.38 }} />

      {/* Legs */}
      <motion.line x1="54" y1="82" x2="50" y2="97"
        stroke="#162032" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }} />
      <motion.line x1="66" y1="82" x2="70" y2="97"
        stroke="#162032" strokeWidth="1.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }} />

      {/* Feet */}
      <motion.rect x="44" y="97" width="11" height="4" rx="2" fill="#162032" opacity="0.35"
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
        transition={{ delay: 0.46 }} />
      <motion.rect x="66" y="97" width="11" height="4" rx="2" fill="#162032" opacity="0.35"
        initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
        transition={{ delay: 0.46 }} />

      {/* Label */}
      <motion.text x="60" y="116" textAnchor="middle" fill="#9ca3af"
        fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}>
        AI Crawler
      </motion.text>

      {/* ── SCANNING BEAM (animated dots) ── */}
      {[0, 1, 2].map(i => (
        <motion.circle key={i} cx={108 + i * 9} cy="67" r="2.5" fill="#e84c1e"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.75, 0] }}
          transition={{
            delay: 0.85 + i * 0.16,
            duration: 0.55,
            repeat: Infinity,
            repeatDelay: 1.5,
          }} />
      ))}

      {/* ── BROWSER WINDOW (right) ── */}

      {/* Frame */}
      <motion.rect x="142" y="15" width="130" height="108" rx="5"
        fill="white" stroke="#162032" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.35 }} />

      {/* Chrome bar */}
      <motion.rect x="142" y="15" width="130" height="21" rx="5" fill="#f5f4f1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }} />
      <rect x="142" y="27" width="130" height="9" fill="#f5f4f1" />

      {/* Window buttons */}
      {[155, 165, 175].map((cx, i) => (
        <motion.circle key={i} cx={cx} cy="25.5" r="3.5" fill="#e5e3dd"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.65 + i * 0.04 }} />
      ))}

      {/* URL bar */}
      <motion.rect x="188" y="20" width="70" height="11" rx="2.5"
        fill="white" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }} />

      {/* H1 block */}
      <motion.rect x="154" y="42" width="90" height="8" rx="2" fill="#162032"
        initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
        transition={{ delay: 0.75 }} />

      {/* Body text rows */}
      {[
        [154, 58, 110],
        [154, 67, 94],
        [154, 76, 104],
        [154, 85, 66],
      ].map(([x, y, w], i) => (
        <motion.rect key={i} x={x} y={y} width={w} height="5" rx="1.5" fill="#e5e3dd"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.05 }} />
      ))}

      {/* Image placeholder */}
      <motion.rect x="154" y="97" width="46" height="18" rx="3"
        fill="#f5f4f1" stroke="#e5e3dd" strokeWidth="1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }} />
      <motion.text x="177" y="109" textAnchor="middle" fill="#d1d5db"
        fontSize="7" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}>
        img
      </motion.text>

      {/* Scanning highlight, clipped to browser content area */}
      <g clipPath="url(#bot-browser-clip)">
        <motion.rect x="142" width="130" height="7" fill="#e84c1e" opacity="0.1"
          initial={{ y: 42 }}
          animate={{ y: [42, 116, 42] }}
          transition={{ delay: 1.0, duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 }} />
      </g>

      {/* Browser label */}
      <motion.text x="207" y="136" textAnchor="middle" fill="#9ca3af"
        fontSize="7.5" fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}>
        Your website
      </motion.text>

    </svg>
  )
}
