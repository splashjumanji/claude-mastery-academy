import { motion } from 'framer-motion'
import { getAriaReportCard, ARIA_BASELINE_ISSUES } from '../../data/aria'
import { ProgressRing } from '../ui/ProgressRing'

const STATUS_STYLES = {
  not_found: { dot: 'bg-red-500',    label: 'text-red-600',    card: 'border-red-200 bg-red-50' },
  weak:      { dot: 'bg-orange-500', label: 'text-orange-600', card: 'border-orange-200 bg-orange-50' },
  growing:   { dot: 'bg-amber-500',  label: 'text-amber-700',  card: 'border-amber-200 bg-amber-50' },
  strong:    { dot: 'bg-green-500',  label: 'text-green-700',  card: 'border-green-200 bg-green-50' },
}

const PLATFORM_NAMES = { claude_ai: 'Claude.ai', claude_code: 'Claude Code', claude_api: 'Claude API', workflows: 'Automated Workflows', team: 'Team Adoption' }

function PlatformCard({ platform, state }) {
  const s = STATUS_STYLES[state.status]
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-4 border ${s.card}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-navy">{PLATFORM_NAMES[platform]}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className={`text-xs font-semibold ${s.label}`}>{state.label}</span>
        </div>
      </div>
      <p className="text-xs text-xeo-muted mb-2">{state.detail}</p>
      {state.snippet && (
        <div className="bg-xeo-subtle border border-xeo-border rounded-lg p-2 text-xs text-xeo-muted italic leading-relaxed">
          "{state.snippet}"
        </div>
      )}
    </motion.div>
  )
}

export function AriaReportCard({ progress }) {
  const report = getAriaReportCard(progress.ariaScore, progress.completedModules)
  const { summary } = report

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display text-navy">Nexus Velocity Card</h1>
          <p className="text-xeo-muted text-sm mt-1">Nexus's Claude adoption across the five surfaces</p>
        </div>
        <ProgressRing score={progress.ariaScore} size={64} strokeWidth={7} />
      </div>

      {/* Overall grade */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-5 mb-5 flex items-center gap-5"
      >
        <div className="text-5xl font-black w-16 text-center">
          <span className={summary.color}>{summary.grade}</span>
        </div>
        <div>
          <div className={`text-lg font-bold ${summary.color}`}>{summary.label}</div>
          <div className="text-sm text-xeo-muted mt-1">{summary.message}</div>
        </div>
      </motion.div>

      {/* Platform breakdown */}
      <h2 className="text-sm font-bold text-xeo-muted uppercase tracking-wider mb-3">Adoption by Surface</h2>
      <div className="space-y-3 mb-6">
        {Object.entries(report.platforms).map(([platform, state], i) => (
          <motion.div key={platform} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <PlatformCard platform={platform} state={state} />
          </motion.div>
        ))}
      </div>

      {/* Baseline issues (if score is low) */}
      {progress.ariaScore < 20 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-3 text-red-600">⚠️ Nexus Baseline Issues</h2>
          <div className="space-y-1.5">
            {ARIA_BASELINE_ISSUES.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-xeo-muted">
                <span className="text-red-500 shrink-0 mt-0.5">✗</span>
                {issue}
              </div>
            ))}
          </div>
          <p className="text-xs text-xeo-muted mt-3">Complete more modules to fix these issues and improve Nexus's Velocity Score.</p>
        </div>
      )}

      {/* Progress milestones */}
      {progress.ariaScore >= 20 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold mb-3 text-navy">What's improved</h2>
          <div className="space-y-2">
            {[
              { threshold: 5,  label: 'Foundations set — team understands how Claude works and where to apply it', done: progress.ariaScore >= 5 },
              { threshold: 15, label: 'Claude.ai adopted — Projects, co-work, and artifacts in daily use', done: progress.ariaScore >= 15 },
              { threshold: 30, label: 'Claude Code deployed — engineers using agentic workflows and CLAUDE.md', done: progress.ariaScore >= 30 },
              { threshold: 45, label: 'First API harness live — agent in production with proper tool schemas', done: progress.ariaScore >= 45 },
              { threshold: 60, label: 'Workflows standardized — repeatable AI patterns documented and shared', done: progress.ariaScore >= 60 },
              { threshold: 80, label: 'Automation integrated — CI/CD hooks, MCP servers, and evals in place', done: progress.ariaScore >= 80 },
              { threshold: 90, label: 'Culture shift complete — Claude embedded in onboarding and team norms', done: progress.ariaScore >= 90 },
            ].map((milestone, i) => (
              <div key={i} className={`flex items-start gap-2 text-xs ${milestone.done ? 'text-navy' : 'text-xeo-muted opacity-40'}`}>
                <span className={milestone.done ? 'text-green-600' : 'text-xeo-muted'}>
                  {milestone.done ? '✓' : '○'}
                </span>
                {milestone.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
