import { motion } from 'framer-motion'

const BLUE = '#00b2e2'
const LILAC = '#c9a6d1'

interface SceneProps {
  className?: string
}

export function CastingScene({ className = '' }: SceneProps) {
  const positions = [
    { x: 28, y: 30 },
    { x: 50, y: 30 },
    { x: 72, y: 30 },
    { x: 28, y: 68 },
    { x: 50, y: 68 },
    { x: 72, y: 68 },
  ]
  const loopX = positions.map((p) => `${p.x}%`).concat(`${positions[0].x}%`)
  const loopY = positions.map((p) => `${p.y}%`).concat(`${positions[0].y}%`)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-xl"
        animate={{ left: loopX, top: loopY }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {positions.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <motion.div
            className="relative"
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 7.2, repeat: Infinity, delay: (i * 7.2) / positions.length, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
            <motion.span
              className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-pomelo-blue"
              animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 0.4] }}
              transition={{
                duration: 7.2,
                repeat: Infinity,
                delay: (i * 7.2) / positions.length,
                times: [0, 0.38, 0.46, 0.6, 0.7],
                ease: 'easeInOut',
              }}
            >
              <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function EditorialScene({ className = '' }: SceneProps) {
  const hangers = [-14, 10, -6]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute left-[15%] right-[15%] top-[24%] h-px bg-white/40" />

      <div className="absolute inset-x-0 top-[22%] flex items-start justify-center gap-9">
        {hangers.map((amp, i) => (
          <motion.div
            key={i}
            className="origin-top"
            animate={{ rotate: [amp, -amp, amp] }}
            transition={{ duration: 2.6 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <svg viewBox="0 0 24 40" className="h-16 w-10" fill="none">
              <circle cx="12" cy="4" r="2" fill="white" opacity="0.9" />
              <path d="M12 6v3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <path
                d="M12 9 3 16a3 3 0 0 0 1.7 5.4h14.6A3 3 0 0 0 21 16L12 9Z"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6 24h12l-1 10H7l-1-10Z" fill={i % 2 === 0 ? BLUE : LILAC} opacity="0.55" />
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={{ left: ['-20%', '120%'] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
      />
    </div>
  )
}

export function ProductionScene({ className = '' }: SceneProps) {
  const frames = Array.from({ length: 8 })

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-x-0 top-[16%] h-9 overflow-hidden opacity-80">
        <motion.div className="flex gap-2.5" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
          {[...frames, ...frames].map((_, i) => (
            <div
              key={i}
              className="h-9 w-14 shrink-0 rounded-md border border-white/20"
              style={{ background: i % 2 === 0 ? 'rgba(0,178,226,0.3)' : 'rgba(201,166,209,0.3)' }}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox="0 0 48 48"
          className="h-24 w-24"
          fill="none"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.circle
            cx="14"
            cy="14"
            r="12"
            fill={LILAC}
            animate={{ opacity: [0, 0, 0.55, 0], scale: [0.8, 0.8, 1.3, 1.3] }}
            transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.14, 0.3, 0.55], ease: 'easeOut' }}
          />
          <path
            d="M8 20h32v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V20Z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.g
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: [-18, -18, 0, -18] }}
            transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.5, 0.62, 1], ease: 'easeInOut' }}
            style={{ transformOrigin: '8px 20px' }}
          >
            <path d="m8 20 2.5-9h6L14 20" />
            <path d="m20 20 2.5-9h6L26 20" />
            <path d="m32 20 2.5-9h4.5a2 2 0 0 1 2 2v7" />
          </motion.g>
        </motion.svg>
      </div>

      <div className="absolute inset-x-0 bottom-[16%] h-9 overflow-hidden opacity-80">
        <motion.div className="flex gap-2.5" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}>
          {[...frames, ...frames].map((_, i) => (
            <div
              key={i}
              className="h-9 w-14 shrink-0 rounded-md border border-white/20"
              style={{ background: i % 2 === 0 ? 'rgba(137,81,147,0.35)' : 'rgba(0,178,226,0.3)' }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function ManagementScene({ className = '' }: SceneProps) {
  const nodes = [
    { x: 30, y: 30 },
    { x: 170, y: 40 },
    { x: 190, y: 140 },
    { x: 100, y: 185 },
    { x: 18, y: 130 },
  ]

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="h-44 w-44">
        {nodes.map((n, i) => (
          <motion.line
            key={`line-${i}`}
            x1="100"
            y1="100"
            x2={n.x}
            y2={n.y}
            stroke={i % 2 === 0 ? BLUE : LILAC}
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.6"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {nodes.map((n, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={100}
            cy={100}
            r="3"
            fill="white"
            animate={{ x: [0, n.x - 100, 0], y: [0, n.y - 100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}

        {nodes.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="6"
            fill={i % 2 === 0 ? BLUE : LILAC}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}

        <motion.circle
          cx="100"
          cy="100"
          r="16"
          fill="white"
          style={{ transformOrigin: '100px 100px' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
