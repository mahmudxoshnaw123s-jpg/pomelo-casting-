import { motion } from 'framer-motion'

interface BrandPhotoProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function BrandPhoto({ src, alt, className = '', priority = false }: BrandPhotoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  )
}
