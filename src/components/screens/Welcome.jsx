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
        className="max-w-2xl w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-flame-600 flex items-center justify-center text-4xl font-black text-white shadow-xl glow-flame">
            CM
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl sm:text-5xl font-display mb-3 text-navy">
            Welcome to <span className="text-gradient">Claude Mastery</span>
          </h1>
          <p className="text-xl text-xeo-muted mb-8">
            From first conversation to production agent harnesses, master every layer of Claude.
          </p>
        </motion.div>

        {/* Nexus intro card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-8 text-left border-aria-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-aria-600 flex items-center justify-center text-xl shrink-0 text-white">
              🚀
            </div>
            <div>
              <div className="text-sm text-aria-600 font-semibold mb-1">Your mission</div>
              <h2 className="text-lg font-bold mb-2 text-navy">You're the new Head of Developer Productivity at Nexus.</h2>
              <p className="text-sm text-xeo-muted leading-relaxed">
                Nexus is a mid-stage startup with a 12-person engineering team drowning in technical debt
                and shipping too slowly. <strong className="text-navy">Your job: embed Claude across the entire
                engineering workflow</strong> to turn things around; from how engineers write code to how the team
                builds and deploys agent-powered systems.
              </p>
              <p className="text-sm text-xeo-muted mt-2 leading-relaxed">
                Over 13 modules, you'll master Claude.ai, Claude Code, and the Claude API, and build
                Nexus into a team that ships 3x faster with AI. Every decision you make changes Nexus's Velocity Score.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What you'll learn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {[
            { icon: '🧠', level: '101', title: 'Foundations', desc: 'Understand Claude.ai, Claude Code, and when to use each' },
            { icon: '⚙️', level: '201–301', title: 'Mastery & Harnesses', desc: 'Prompting, MCP, agent architecture, and building harnesses' },
            { icon: '🚀', level: '401', title: 'Advanced Patterns', desc: 'Multi-agent systems, evaluation, and scaling to production' },
          ].map(item => (
            <div key={item.level} className="card p-4 text-left">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-xeo-muted font-semibold mb-1">{item.level}</div>
              <div className="text-sm font-semibold mb-1 text-navy">{item.title}</div>
              <div className="text-xs text-xeo-muted">{item.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <button onClick={handleStart} className="btn-primary text-lg px-10 py-4 glow-flame">
            Start your mission →
          </button>
          <p className="text-xs text-xeo-muted mt-4">13 modules · Learn by doing · No slides</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
