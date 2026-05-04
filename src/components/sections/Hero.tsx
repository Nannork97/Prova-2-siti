'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE_FORMA } from '@/lib/animations'

const letters = ['F', 'O', 'R', 'M', 'A']

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background geometrico */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="500" x2="1000" y2="500" stroke="#C9A96E" strokeWidth="0.5" />
          <line x1="500" y1="0" x2="500" y2="1000" stroke="#C9A96E" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="300" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <circle cx="500" cy="500" r="150" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <rect x="200" y="200" width="600" height="600" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
          <line x1="0" y1="0" x2="1000" y2="1000" stroke="#C9A96E" strokeWidth="0.3" />
          <line x1="1000" y1="0" x2="0" y2="1000" stroke="#C9A96E" strokeWidth="0.3" />
        </svg>
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-forma-black" />
      </motion.div>

      {/* Lettere stagger */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex items-center gap-2 md:gap-4">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 120, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 1.0, ease: EASE_FORMA }}
            className="font-serif text-[clamp(5rem,18vw,20rem)] leading-none text-forma-white tracking-tight select-none"
            style={{ transformOrigin: 'bottom' }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Sottotitolo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE_FORMA }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <p className="text-forma-muted text-xs tracking-[0.4em] uppercase">Studio di Architettura</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-forma-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
