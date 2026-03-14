export function StatCard({ label, value, sub, color = 'flame', icon }) {
  const colors = {
    flame:  'text-flame-600',
    jasper: 'text-jasper-600',
    aria:   'text-aria-600',
    green:  'text-green-600',
    amber:  'text-amber-600',
    red:    'text-red-600',
    gray:   'text-gray-500',
  }
  return (
    <div className="stat-card">
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className={`text-3xl font-bold ${colors[color] || 'text-navy'}`}>{value}</div>
      <div className="text-sm font-medium text-navy">{label}</div>
      {sub && <div className="text-xs text-xeo-muted mt-1">{sub}</div>}
    </div>
  )
}
