'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { wordRevealVariants, staggerContainer } from '@/lib/animations'

const text = 'Progettiamo spazi che respirano. Architettura non come forma ma come esperienza. Ogni linea una decisione. Ogni vuoto una scelta. Il silenzio costruito.'

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const words = text.split(' ')

  return (
    <section className="min-h-screen flex items-center px-8 md:px-24 py-32 bg-forma-black">
      <div ref={ref} className="max-w-5xl">
        <motion.p
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-serif text-[clamp(1.8rem,4vw,4rem)] leading-tight text-forma-white"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordRevealVariants}
              custom={i}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: words.length * 0.06 + 0.3, duration: 1.0 }}
          className="mt-12 h-px bg-forma-gold w-32"
        />
      </div>
    </section>
  )
}
