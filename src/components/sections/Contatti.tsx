'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUpVariants, staggerContainer, EASE_FORMA } from '@/lib/animations'

function FloatingInput({ label, type = 'text' }: { label: string; type?: string }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <motion.label
        animate={active ? { y: -22, scale: 0.75, color: '#C9A96E' } : { y: 0, scale: 1, color: '#6B6B6B' }}
        transition={{ duration: 0.25, ease: EASE_FORMA }}
        className="absolute left-0 top-3 text-sm tracking-widest pointer-events-none origin-left"
      >
        {label.toUpperCase()}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-forma-muted pt-6 pb-2 text-forma-white outline-none text-sm tracking-wide"
      />
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: EASE_FORMA }}
        className="absolute bottom-0 left-0 w-full h-px bg-forma-gold origin-left"
      />
    </div>
  )
}

export default function Contatti() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="min-h-screen bg-forma-black flex flex-col justify-between px-8 md:px-24 py-32">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-2xl"
      >
        <motion.h2 variants={fadeUpVariants} className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-forma-white leading-none mb-16">
          Iniziamo<br /><em>insieme.</em>
        </motion.h2>

        <motion.form variants={staggerContainer} className="flex flex-col gap-10" onSubmit={e => e.preventDefault()}>
          <motion.div variants={fadeUpVariants}>
            <FloatingInput label="Nome" />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <FloatingInput label="Email" type="email" />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <FloatingInput label="Progetto" />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <motion.button
              data-magnetic
              type="submit"
              whileHover={{ backgroundColor: '#C9A96E', color: '#0A0A0A' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="mt-4 self-start border border-forma-gold text-forma-gold px-10 py-4 text-xs tracking-[0.3em] uppercase font-sans"
            >
              Invia Richiesta
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-24 flex justify-between items-end text-forma-muted text-xs tracking-widest"
      >
        <span>© 2024 FORMA STUDIO</span>
        <div className="flex gap-8">
          {['Instagram', 'Behance', 'LinkedIn'].map(s => (
            <motion.a
              key={s}
              data-magnetic
              whileHover={{ color: '#C9A96E' }}
              className="transition-colors"
            >
              {s}
            </motion.a>
          ))}
        </div>
      </motion.footer>
    </section>
  )
}
