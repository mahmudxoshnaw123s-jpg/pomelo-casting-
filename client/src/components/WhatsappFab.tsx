import { motion } from 'framer-motion'
import { contact } from '../data/content'
import { IconWhatsapp } from './icons'

export default function WhatsappFab() {
  return (
    <motion.a
      href={contact.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Pomelo Casting on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <IconWhatsapp className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-[var(--color-on-accent)] px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>
    </motion.a>
  )
}
