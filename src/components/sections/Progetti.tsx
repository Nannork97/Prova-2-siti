'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

const projects = [
  { title: 'Residenza Alpha', location: 'Milano, 2023', cat: 'Residenziale', color: '#1a1a2e' },
  { title: 'Torre Vetro', location: 'Roma, 2022', cat: 'Commerciale', color: '#16213e' },
  { title: 'Villa Pietra', location: 'Firenze, 2024', cat: 'Privato', color: '#0f3460' },
  { title: 'Padiglione', location: 'Venezia, 2023', cat: 'Culturale', color: '#1a1a1a' },
]

function ProjectCard({ title, location, cat, color }: typeof projects[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -18)
    rotateY.set(x * 18)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ scale: 1.03 }}
      transition={{ scale: { duration: 0.3 } }}
      className="relative flex-shrink-0 w-[340px] md:w-[420px] h-[500px] md:h-[580px] rounded-sm overflow-hidden group cursor-pointer"
    >
      {/* Background */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundColor: color }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id={`grid-${title}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
        </svg>
      </div>

      {/* Gold accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 w-px h-full bg-forma-gold origin-top"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-forma-gold text-xs tracking-[0.3em] mb-3">{cat}</p>
        <h3 className="font-serif text-3xl text-forma-white mb-1">{title}</h3>
        <p className="text-forma-muted text-sm">{location}</p>
      </div>

      {/* Numero */}
      <div className="absolute top-6 right-6 font-serif text-6xl text-white/5 select-none leading-none">
        {projects.findIndex(p => p.title === title) + 1 < 10
          ? `0${projects.findIndex(p => p.title === title) + 1}`
          : projects.findIndex(p => p.title === title) + 1}
      </div>
    </motion.div>
  )
}

export default function Progetti() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%'])

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-forma-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-16 mb-12 flex justify-between items-end">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] text-forma-white leading-none">
            Progetti
          </h2>
          <span className="text-forma-muted text-sm tracking-widest">
            {projects.length} OPERE
          </span>
        </div>

        {/* Cards track */}
        <motion.div style={{ x }} className="flex gap-6 pl-8 md:pl-16 will-change-transform">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
