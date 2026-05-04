'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUpVariants, staggerContainer, EASE_FORMA } from '@/lib/animations'

const steps = [
  { num: 47, label: 'Analisi', desc: 'Ascoltiamo il luogo, il cliente, la luce.' },
  { num: 12, label: 'Progetto', desc: 'Traduciamo visioni in strutture precise.' },
  { num: 99, label: 'Realizzazione', desc: 'Ogni dettaglio eseguito senza compromessi.' },
]

const svgPaths = {
  circle: 'M 50 10 A 40 40 0 1 1 49.9 10 Z',
  triangle: 'M 50 8 L 92 80 L 8 80 Z',
  square: 'M 12 12 L 88 12 L 88 88 L 12 88 Z',
}

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])
  return <>{value}</>
}

function MorphShape({ shape }: { shape: keyof typeof svgPaths }) {
  return (
    <motion.svg width="100" height="100" viewBox="0 0 100 100" className="text-forma-gold">
      <motion.path
        d={svgPaths[shape]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ d: svgPaths[shape] }}
        transition={{ duration: 0.8, ease: EASE_FORMA }}
      />
    </motion.svg>
  )
}

const shapeKeys = Object.keys(svgPaths) as (keyof typeof svgPaths)[]

export default function Processo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [shapeIdx, setShapeIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setShapeIdx(i => (i + 1) % shapeKeys.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="min-h-screen bg-forma-gray flex flex-col justify-center px-8 md:px-24 py-32">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-6xl w-full mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex items-center gap-8 mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={shapeIdx}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.5, ease: EASE_FORMA }}
            >
              <MorphShape shape={shapeKeys[shapeIdx]} />
            </motion.div>
          </AnimatePresence>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-forma-white leading-none">
            Processo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              variants={fadeUpVariants}
              custom={i}
              className="flex flex-col gap-4"
            >
              <div className="font-serif text-[5rem] leading-none text-forma-gold font-light">
                <Counter target={step.num} inView={inView} />
              </div>
              <div className="w-8 h-px bg-forma-gold" />
              <h3 className="font-serif text-2xl text-forma-white">{step.label}</h3>
              <p className="text-forma-muted text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
