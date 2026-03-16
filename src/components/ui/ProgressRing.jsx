export function ProgressRing({ score, size = 80, strokeWidth = 7, label = 'Velocity Score' }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score < 30 ? '#ef4444' : score < 60 ? '#f59e0b' : score < 80 ? '#3b82f6' : '#22c55e'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track — light gray for light mode */}
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8dcd0" strokeWidth={strokeWidth} />
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-navy">{score}</span>
        </div>
      </div>
      {label && <span className="text-xs text-xeo-muted font-medium">{label}</span>}
    </div>
  )
}
