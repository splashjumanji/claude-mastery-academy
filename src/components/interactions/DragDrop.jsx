import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BUCKET_COLORS = {
  critical:     { border: 'border-red-400',     bg: 'bg-red-50',     text: 'text-red-600',     label: 'bg-red-100 border-red-300' },
  important:    { border: 'border-amber-400',   bg: 'bg-amber-50',   text: 'text-amber-700',   label: 'bg-amber-100 border-amber-300' },
  nice_to_have: { border: 'border-green-400',   bg: 'bg-green-50',   text: 'text-green-700',   label: 'bg-green-100 border-green-300' },
  SEO:          { border: 'border-blue-400',    bg: 'bg-blue-50',    text: 'text-blue-600',    label: 'bg-blue-100 border-blue-300' },
  AEO:          { border: 'border-purple-400',  bg: 'bg-purple-50',  text: 'text-purple-600',  label: 'bg-purple-100 border-purple-300' },
  GEO:          { border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'bg-emerald-100 border-emerald-300' },
  // Module 2 — Claude.ai features
  projects:     { border: 'border-aria-400',    bg: 'bg-aria-50',    text: 'text-aria-700',    label: 'bg-aria-100 border-aria-300' },
  artifacts:    { border: 'border-jasper-400',  bg: 'bg-jasper-50',  text: 'text-jasper-700',  label: 'bg-jasper-100 border-jasper-300' },
  cowork:       { border: 'border-flame-400',   bg: 'bg-flame-50',   text: 'text-flame-700',   label: 'bg-flame-100 border-flame-300' },
}

const DEFAULT_BUCKET_COLOR = { border: 'border-xeo-border', bg: 'bg-xeo-subtle', text: 'text-navy', label: 'bg-xeo-subtle border-xeo-border' }

export function DragDrop({ title, description, items, buckets, onComplete }) {
  const [placements, setPlacements] = useState({})
  const [feedback, setFeedback] = useState({})
  const [revealed, setRevealed] = useState({})
  const [dragging, setDragging] = useState(null)
  const [hovering, setHovering] = useState(null)

  const unplaced = items.filter(i => !placements[i.id])
  const allPlaced = items.every(i => placements[i.id])
  const allCorrect = items.every(i => placements[i.id] === i.correctBucket)
  const score = items.filter(i => placements[i.id] === i.correctBucket).length

  const handleDrop = (bucketId) => {
    if (!dragging) return
    const item = items.find(i => i.id === dragging)
    const correct = item.correctBucket === bucketId
    setPlacements(p => ({ ...p, [dragging]: bucketId }))
    setFeedback(f => ({ ...f, [dragging]: correct ? 'correct' : 'wrong' }))
    setRevealed(r => ({ ...r, [dragging]: true }))
    setDragging(null)
    setHovering(null)
  }

  const handleItemClick = (itemId) => {
    setDragging(dragging === itemId ? null : itemId)
  }

  const handleBucketClick = (bucketId) => {
    if (dragging) handleDrop(bucketId)
  }

  if (allPlaced) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center">
        <div className="lesson-card mb-5">
          <div className="text-5xl mb-3">{allCorrect ? '🏆' : score >= items.length * 0.7 ? '👍' : '📚'}</div>
          <div className="text-xl font-bold mb-2 text-navy">
            {score} / {items.length} correct
          </div>
          <div className="text-xeo-muted text-sm mb-5">
            {allCorrect ? 'Perfect! You know exactly what to prioritize.' : 'Review the explanations below, then continue.'}
          </div>
          <div className="space-y-2 text-left">
            {items.map(item => {
              const correct = placements[item.id] === item.correctBucket
              const bucket = buckets.find(b => b.id === item.correctBucket)
              const placedBucket = buckets.find(b => b.id === placements[item.id])
              const c = BUCKET_COLORS[item.correctBucket] ?? DEFAULT_BUCKET_COLOR
              return (
                <div key={item.id} className={`p-3 rounded-xl border ${correct ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
                  <div className="flex items-start gap-2 mb-1">
                    <span>{correct ? '✅' : '⚠️'}</span>
                    <div>
                      <div className="text-sm font-semibold text-navy">{item.label}</div>
                      {!correct && (
                        <div className="text-xs text-xeo-muted mt-0.5">
                          You placed: <span className="font-semibold">{placedBucket?.label}</span>
                        </div>
                      )}
                      <div className={`text-xs font-semibold ${c.text} mt-0.5`}>
                        Correct: {bucket?.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-xeo-muted ml-6">{item.explanation}</p>
                </div>
              )
            })}
          </div>
        </div>
        <button onClick={() => onComplete(Math.round((score/items.length)*100))} className="btn-primary w-full py-4">
          Continue →
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xeo-muted text-sm mb-5">{description}</p>

      {/* Bucket targets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {buckets.map(bucket => {
          const c = BUCKET_COLORS[bucket.id] ?? DEFAULT_BUCKET_COLOR
          const placed = items.filter(i => placements[i.id] === bucket.id)
          const isHover = hovering === bucket.id
          return (
            <div
              key={bucket.id}
              className={`rounded-xl border-2 p-3 min-h-[80px] transition-all
                ${isHover ? `${c.border} ${c.bg}` : dragging ? `border-xeo-border hover:${c.border} hover:${c.bg} cursor-pointer` : 'border-xeo-border'}
              `}
              onDragOver={e => { e.preventDefault(); setHovering(bucket.id) }}
              onDragLeave={() => setHovering(null)}
              onDrop={() => handleDrop(bucket.id)}
              onClick={() => handleBucketClick(bucket.id)}
            >
              <div className={`text-sm font-bold mb-1 ${c.text}`}>{bucket.label}</div>
              <div className="text-xs text-xeo-muted mb-2">{bucket.description}</div>
              <div className="flex flex-wrap gap-1">
                {placed.map(i => (
                  <span key={i.id} className={`text-xs px-2 py-0.5 rounded-full ${c.label} ${c.text} border`}>
                    {feedback[i.id] === 'correct' ? '✓' : '✗'} {i.label.slice(0, 18)}…
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {dragging && (
        <div className="text-center text-xs text-flame-600 font-semibold mb-3 animate-pulse">
          ↑ Click a bucket above to place this item ↑
        </div>
      )}

      {/* Unplaced items */}
      <div className="space-y-2">
        <div className="text-xs text-xeo-muted font-semibold mb-2">
          Drag or click to select, then click a bucket above ({unplaced.length} remaining)
        </div>
        {unplaced.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDragging(item.id)}
            onDragEnd={() => { setDragging(null); setHovering(null) }}
            onClick={() => handleItemClick(item.id)}
            className={`card p-4 cursor-grab active:cursor-grabbing transition-all border-2 select-none
              ${dragging === item.id ? 'border-flame-500 bg-flame-50 shadow-md' : 'border-transparent hover:border-xeo-border hover:shadow-sm'}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-xeo-muted text-lg">⠿</div>
              <div className="text-sm font-medium text-navy">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
