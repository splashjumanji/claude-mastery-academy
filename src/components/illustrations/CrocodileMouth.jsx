import { motion } from 'framer-motion'

// Data points, 5 marks across Jan 2025 → Jan 2026
const XS     = [56, 112, 168, 224, 280]
const IMP    = [95, 82, 67, 52, 42]    // Impressions +31%  (y decreases = line goes UP)
const CLK    = [95, 103, 110, 117, 122] // Clicks      −18%  (y increases = line goes DOWN)
const MONTHS = ['Jan 25', 'Apr', 'Jul', 'Oct', 'Jan 26']
const GRIDS  = [44, 60, 76, 92, 108, 124]

function polyline(xs, ys) {
  return xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ')
}

function gapPath(xs, top, bot) {
  const fwd = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${top[i]}`).join(' ')
  const rev = [...xs].reverse().map((x, i) => `L ${x} ${[...bot].reverse()[i]}`).join(' ')
  return `${fwd} ${rev} Z`
}

export function CrocodileMouth() {
  return (
    <svg viewBox="0 0 320 166" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[166px]">

      {/* White card, mimics GSC panel */}
      <rect x="1.5" y="1.5" width="317" height="163" rx="6"
        fill="white" stroke="#dadce0" strokeWidth="1" />

      {/* Legend: Clicks (blue) + Impressions (green) */}
      <circle cx="16" cy="14" r="4" fill="#1a73e8" />
      <text x="24" y="18" fill="#3c4043" fontSize="8.5" fontFamily="system-ui" fontWeight="500">
        Clicks  −18%
      </text>
      <circle cx="112" cy="14" r="4" fill="#34a853" />
      <text x="120" y="18" fill="#3c4043" fontSize="8.5" fontFamily="system-ui" fontWeight="500">
        Impressions  +31%
      </text>

      {/* Horizontal dotted grid lines */}
      {GRIDS.map(y => (
        <line key={y} x1="50" y1={y} x2="292" y2={y}
          stroke="#f1f3f4" strokeWidth="1" strokeDasharray="3,3" />
      ))}

      {/* Y-axis + X-axis frame */}
      <line x1="50" y1="28" x2="50"  y2="136" stroke="#dadce0" strokeWidth="1" />
      <line x1="50" y1="136" x2="292" y2="136" stroke="#dadce0" strokeWidth="1" />

      {/* Gap fill, the opening "mouth" */}
      <motion.path
        d={gapPath(XS, IMP, CLK)}
        fill="#fff2f2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      />

      {/* Impressions line, green (#34a853) */}
      <motion.path
        d={polyline(XS, IMP)}
        stroke="#34a853" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      />
      {XS.map((x, i) => (
        <motion.circle key={`imp-${i}`}
          cx={x} cy={IMP[i]} r="3.5"
          fill="white" stroke="#34a853" strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 + i * 0.07 }}
        />
      ))}

      {/* Clicks line, Google blue (#1a73e8) */}
      <motion.path
        d={polyline(XS, CLK)}
        stroke="#1a73e8" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
      />
      {XS.map((x, i) => (
        <motion.circle key={`clk-${i}`}
          cx={x} cy={CLK[i]} r="3.5"
          fill="white" stroke="#1a73e8" strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 + i * 0.07 }}
        />
      ))}

      {/* X-axis month labels */}
      {MONTHS.map((m, i) => (
        <text key={m} x={XS[i]} y="150" fill="#80868b" fontSize="7.5"
          fontFamily="system-ui" textAnchor="middle">
          {m}
        </text>
      ))}
    </svg>
  )
}
