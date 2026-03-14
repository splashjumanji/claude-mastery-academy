import { motion } from 'framer-motion'
import { getJasperMoment } from '../../data/jasper-moments'

export function JasperMoment({ moduleId, onContinue }) {
  const moment = getJasperMoment(moduleId)
  if (!moment) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="card border-flame-200 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-flame-50 to-transparent px-6 py-5 border-b border-xeo-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-flame-600 flex items-center justify-center text-lg font-black text-white shadow-sm">
              ⚡
            </div>
            <div>
              <div className="text-flame-600 text-xs font-bold uppercase tracking-widest">Jasper Moment</div>
              <div className="text-sm font-semibold text-navy">How Jasper helps with this</div>
            </div>
          </div>
          <p className="text-sm text-xeo-muted italic">"{moment.concept}"</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Today */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-xs text-green-700 font-bold">✓</div>
              <span className="text-sm font-bold text-green-700">Jasper does this TODAY</span>
            </div>
            <div className="space-y-2 ml-7">
              {moment.today.map((item, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="text-sm font-semibold text-navy mb-1">{item.feature}</div>
                  <div className="text-xs text-xeo-muted leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap — only shown when content is provided */}
          {moment.roadmap?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-jasper-100 border border-jasper-300 flex items-center justify-center text-xs">🔜</div>
                <span className="text-sm font-bold text-jasper-700">Coming to Jasper</span>
              </div>
              <div className="space-y-2 ml-7">
                {moment.roadmap.map((item, i) => (
                  <div key={i} className="bg-jasper-50 border border-jasper-200 rounded-xl p-3">
                    <div className="text-sm font-semibold text-navy mb-1">{item.feature}</div>
                    <div className="text-xs text-xeo-muted leading-relaxed">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 pb-5">
          <a
            href={moment.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flame-600 hover:text-flame-700 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            {moment.ctaLabel} ↗
          </a>
        </div>
      </div>

      <button onClick={onContinue} className="btn-primary w-full py-4 text-base">
        Continue →
      </button>
    </motion.div>
  )
}
