import { useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getModuleById } from '../../data/modules'
import { ScrollStory } from '../interactions/ScrollStory'
import { Quiz } from '../interactions/Quiz'
import { MatchingGame } from '../interactions/MatchingGame'
import { DragDrop } from '../interactions/DragDrop'
import { PipelineSimulator } from '../interactions/PipelineSimulator'
import { ContentEditor } from '../interactions/ContentEditor'
import { DecisionTree } from '../interactions/DecisionTree'
import { BuildAlong } from '../interactions/BuildAlong'
import { XPToast } from '../ui/XPToast'

// Placeholder for Level 3 & 4 modules not yet fully built
function ComingSoon({ module, onComplete }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
      <div className="lesson-card mb-5">
        <div className="text-5xl mb-3">{module.icon}</div>
        <h2 className="text-xl font-bold mb-2 text-navy">{module.title}</h2>
        <p className="text-xeo-muted mb-5">{module.subtitle}</p>
        <div className="bg-jasper-50 border border-jasper-200 rounded-xl p-4 text-sm text-jasper-700 mb-4">
          <div className="font-bold mb-2">🚧 Full interactive module coming in the next build</div>
          <p className="text-xs leading-relaxed">
            This module will feature: {module.type === 'budget_allocator_scenario' ? 'a budget allocation exercise and competitor scenario fork' :
            module.type === 'schema_builder' ? 'a drag-and-drop JSON-LD schema builder with live preview' :
            module.type === 'dashboard_builder' ? 'a KPI selection exercise with dark funnel measurement insights' :
            module.type === 'channel_allocator' ? 'a 90-day third-party content strategy builder' :
            module.type === 'agent_simulation' ? 'an agentic commerce simulation — guide an AI agent evaluating Aria' :
            module.type === 'workflow_designer' ? 'a continuous optimization loop workflow designer' :
            'a full capability mapping exercise with final Nexus Velocity Card'}
          </p>
        </div>
        <div className="text-xs text-xeo-muted">Estimated time: {module.estimatedMinutes} minutes · +{module.xpReward} XP</div>
      </div>
      <button onClick={() => onComplete(100)} className="btn-primary w-full py-4">
        Mark complete & continue →
      </button>
    </motion.div>
  )
}

// Map module type → phases (ordered array of phase keys)
function getPhases(module) {
  switch (module.type) {
    case 'micro_lesson_quiz':
      return ['lessons', 'quiz', 'buildstep']
    case 'micro_lesson_matching_quiz':
      return ['lessons', 'matching', 'quiz', 'buildstep']
    case 'pipeline_simulator_quiz':
      return ['simulator', 'quiz', 'buildstep']
    case 'micro_lesson_dragdrop_quiz':
      return ['lessons', 'dragdrop', 'quiz', 'buildstep']
    case 'content_editor':
      return ['lessons', 'editor', 'buildstep']
    case 'decision_tree_quiz':
      return ['lessons', 'decisions', 'quiz', 'buildstep']
    default:
      return ['coming_soon']
  }
}

const PHASE_LABELS = {
  lessons:    { label: 'Learn', icon: '📖' },
  quiz:       { label: 'Quiz', icon: '✏️' },
  matching:   { label: 'Match', icon: '🔗' },
  dragdrop:   { label: 'Audit', icon: '📋' },
  simulator:  { label: 'Simulate', icon: '🔬' },
  editor:     { label: 'Transform', icon: '✍️' },
  decisions:  { label: 'Decide', icon: '🗺️' },
  buildstep:  { label: 'Build', icon: '🛠️' },
  coming_soon:{ label: 'Module', icon: '🚧' },
}

export function ModulePlayer({ onModuleComplete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const module = getModuleById(Number(id))

  const [phaseIndex, setPhaseIndex] = useState(0)
  const [xpToast, setXPToast] = useState({ visible: false, amount: 0 })
  const [completed, setCompleted] = useState(false)

  if (!module) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-xeo-muted mb-4">Module not found</p>
        <Link to="/" className="btn-primary">Back to map</Link>
      </div>
    )
  }

  const phases = getPhases(module)
  const currentPhase = phases[phaseIndex]

  const advancePhase = useCallback((quizScore = null) => {
    const isLastPhase = phaseIndex === phases.length - 1

    if (isLastPhase) {
      // Module complete
      if (!completed) {
        setCompleted(true)
        onModuleComplete(module.id, module.xpReward, quizScore)
        setXPToast({ visible: true, amount: module.xpReward })
      }
      setTimeout(() => navigate('/'), 600)
      return
    }

    setPhaseIndex(i => i + 1)
  }, [phaseIndex, phases.length, module, completed, onModuleComplete, navigate])

  const renderPhase = () => {
    switch (currentPhase) {
      case 'lessons':
        return <ScrollStory lessons={module.lessons} onComplete={() => advancePhase()} />

      case 'quiz':
        return (
          <Quiz
            questions={module.quiz.questions}
            xpBonus={module.quiz.xpBonus}
            onComplete={(score) => advancePhase(score)}
          />
        )

      case 'matching':
        return (
          <MatchingGame
            prompt={module.matching.prompt}
            pairs={module.matching.pairs}
            onComplete={() => advancePhase()}
          />
        )

      case 'dragdrop':
        return (
          <DragDrop
            title={module.dragdrop.title}
            description={module.dragdrop.description}
            items={module.dragdrop.items}
            buckets={module.dragdrop.buckets}
            onComplete={(score) => advancePhase(score)}
          />
        )

      case 'simulator':
        return (
          <PipelineSimulator
            lessons={module.lessons}
            simulator={module.simulator}
            onComplete={() => advancePhase()}
          />
        )

      case 'editor':
        return (
          <ContentEditor
            title={module.contentEditor.title}
            instruction={module.contentEditor.instruction}
            originalContent={module.contentEditor.originalContent}
            fixedContent={module.contentEditor.fixedContent}
            onComplete={() => advancePhase()}
          />
        )

      case 'decisions':
        return (
          <DecisionTree
            title={module.decisionTree.title}
            description={module.decisionTree.description}
            scenarios={module.decisionTree.scenarios}
            onComplete={(score) => advancePhase(score)}
          />
        )

      case 'buildstep':
        return <BuildAlong moduleId={module.id} onComplete={() => advancePhase()} />

      case 'coming_soon':
        return <ComingSoon module={module} onComplete={(score) => advancePhase(score)} />

      default:
        return <div className="text-xeo-muted text-center py-10">Phase "{currentPhase}" not yet built</div>
    }
  }

  return (
    <div>
      {/* Module header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="btn-ghost text-sm px-3 py-2">← Back</Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg">{module.icon}</span>
            <h1 className="font-bold text-base truncate">{module.title}</h1>
          </div>
          <div className="text-xs text-xeo-muted">{module.subtitle}</div>
        </div>
        <div className="text-xs text-xeo-muted shrink-0">{module.estimatedMinutes}m</div>
      </div>

      {/* Phase progress */}
      <div className="flex gap-1.5 items-center mb-6">
        {phases.map((phase, i) => {
          const info = PHASE_LABELS[phase]
          const done = i < phaseIndex
          const active = i === phaseIndex
          return (
            <div key={phase} className="flex items-center gap-1.5">
              <div className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all
                ${active ? 'bg-flame-600 text-white shadow-sm' : done ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-xeo-subtle text-xeo-muted border border-xeo-border'}`}
              >
                <span>{done ? '✓' : info.icon}</span>
                <span className="hidden sm:inline">{info.label}</span>
              </div>
              {i < phases.length - 1 && (
                <div className={`w-4 h-0.5 rounded-full ${done ? 'bg-green-500' : 'bg-xeo-border'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${id}-${phaseIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderPhase()}
        </motion.div>
      </AnimatePresence>

      <XPToast
        amount={xpToast.amount}
        visible={xpToast.visible}
        onHide={() => setXPToast(t => ({ ...t, visible: false }))}
      />
    </div>
  )
}
