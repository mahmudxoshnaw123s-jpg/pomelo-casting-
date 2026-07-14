import { motion } from 'framer-motion'
import logoDark from '../assets/pomelo-logo-dark-optimized.png'

export default function Preloader() {
  return (
    <motion.div exit={{ opacity: 0, transition: { duration: 0.3 } }} className="fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#0b0713] via-[#130b21] to-[#0a0f1a]"
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#0b0713] via-[#130b21] to-[#0a0f1a]"
        initial={{ x: '0%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: 'easeIn' }}
      >
        <div className="flex flex-col items-center gap-8">
          <motion.img
            src={logoDark}
            alt="Pomelo Casting"
            width={641}
            height={256}
            className="h-12 w-auto sm:h-14"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-pomelo-blue to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
