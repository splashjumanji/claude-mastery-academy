import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function Welcome({ onComplete }) {
  const navigate = useNavigate()

  const handleStart = () => {
    onComplete()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-xeo-bg flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
      >
        {/* Editorial masthead */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="text-[11px] tracking-[0.25em] uppercase text-xeo-muted mb-4">
            The Anthropic Learning Series
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-navy mb-3 leading-tight">
            Claude <em className="italic text-flame-600">Mastery</em> Academy
          </h1>
          <div className="w-20 h-px bg-flame-600 mx-auto my-4" />
          <p className="text-lg text-xeo-muted max-w-xl mx-auto leading-relaxed">
            From first conversation to production agent harnesses, master every layer of Claude.
          </p>
        </motion.div>

        {/* Mission card — editorial two-column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-t-[3px] border-navy mb-10"
        >
          <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-xeo-border">
            <div className="text-[11px] tracking-[0.15em] uppercase text-flame-600 font-semibold mb-3">
              Your Mission
            </div>
            <h2 className="font-display text-xl font-bold mb-3 text-navy leading-snug">
              You're the new Head of Developer Productivity at Nexus.
            </h2>
            <p className="text-sm text-xeo-muted leading-relaxed mb-3">
              Nexus is a mid-stage startup with a 12-person engineering team drowning in technical debt
              and shipping too slowly. <strong className="text-navy">Your job: embed Claude across the entire
              engineering workflow</strong> to turn things around.
            </p>
            <p className="text-sm text-xeo-muted leading-relaxed">
              Over 13 modules, you'll master Claude.ai, Claude Code, and the Claude API, and build
              Nexus into a team that ships 3x faster with AI.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-xeo-subtle flex flex-col gap-5">
            {[
              { level: '101', title: 'Foundations', desc: 'Claude.ai, Claude Code, and when to use each' },
              { level: '201–301', title: 'Mastery', desc: 'Prompting, MCP, agent architecture' },
              { level: '401', title: 'Advanced', desc: 'Multi-agent systems, evaluation, production' },
            ].map(item => (
              <div key={item.level}>
                <div className="text-[10px] tracking-[0.15em] uppercase text-xeo-muted mb-0.5">{item.level}</div>
                <div className="text-sm font-semibold text-navy">{item.title}</div>
                <div className="text-xs text-xeo-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handleStart}
            className="bg-navy hover:bg-navy-soft text-white px-10 py-4 text-[13px] tracking-widest uppercase font-medium transition-colors"
          >
            Start your mission &rarr;
          </button>
          <p className="text-xs text-xeo-muted mt-4 tracking-wider">13 modules &middot; Learn by doing &middot; No slides</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
