import { motion } from 'framer-motion'

export function WireframePricingClarity() {
  const tiers = [
    { name: 'Starter', price: '$49', seats: '1–10', color: '#e5e3dd', textColor: '#9896a0' },
    { name: 'Growth',  price: '$149', seats: '11–50', color: '#ff4f1f', textColor: 'white' },
    { name: 'Enterprise', price: 'Custom', seats: '500+', color: '#e5e3dd', textColor: '#9896a0' },
  ]

  return (
    <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-[100px]">

      {/* Title */}
      <text x="110" y="12" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Pricing tiers, clear filtering criteria</text>

      {/* Tier columns */}
      {tiers.map((tier, i) => {
        const x = 14 + i * 65
        return (
          <motion.g key={tier.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.12 }}
          >
            {/* Card */}
            <rect x={x} y="18" width="58" height="70" rx="6"
              fill={tier.name === 'Growth' ? '#fdf2ee' : 'white'}
              stroke={tier.name === 'Growth' ? '#ff4f1f' : '#e5e3dd'}
              strokeWidth={tier.name === 'Growth' ? '1.5' : '1.2'}
            />
            {/* Tier name */}
            <text x={x + 29} y="31" fill={tier.name === 'Growth' ? '#ff4f1f' : '#9896a0'}
              fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">
              {tier.name}
            </text>
            {/* Price */}
            <text x={x + 29} y="47" fill="#00063d"
              fontSize={tier.price === 'Custom' ? '9' : '12'}
              fontFamily="system-ui" textAnchor="middle" fontWeight="800">
              {tier.price}
            </text>
            {/* /mo */}
            {tier.price !== 'Custom' && (
              <text x={x + 29} y="56" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">/month</text>
            )}
            {/* Seat range */}
            <rect x={x + 8} y="62" width="42" height="8" rx="3" fill="#f0ede8" />
            <text x={x + 29} y="69" fill="#374151" fontSize="10" fontFamily="system-ui" textAnchor="middle">{tier.seats} seats</text>
          </motion.g>
        )
      })}

      {/* Footer */}
      <text x="110" y="96" fill="#374151" fontSize="9" fontFamily="system-ui" textAnchor="middle">Pricing clarity = agent filtering criterion</text>
    </svg>
  )
}
