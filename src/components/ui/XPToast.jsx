import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function XPToast({ amount, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2200)
      return () => clearTimeout(t)
    }
  }, [visible, onHide])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-amber-500 text-black font-bold text-lg px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            +{amount} XP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
