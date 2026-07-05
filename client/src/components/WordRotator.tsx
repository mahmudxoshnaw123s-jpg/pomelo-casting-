import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface WordRotatorProps {
  words: string[]
  intervalMs?: number
  className?: string
}

export default function WordRotator({ words, intervalMs = 2200, className }: WordRotatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [words.length, intervalMs])

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ''}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
