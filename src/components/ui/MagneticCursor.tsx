'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const dotSpringX = useSpring(dotX, { damping: 40, stiffness: 500 })
  const dotSpringY = useSpring(dotY, { damping: 40, stiffness: 500 })

  const isHovering = useRef(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)

      // Magnetic effect
      const magneticEls = document.querySelectorAll('[data-magnetic]')
      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)
        if (dist < 100) {
          const strength = 0.4
          cursorX.set(e.clientX - 20 + (centerX - e.clientX) * strength)
          cursorY.set(e.clientY - 20 + (centerY - e.clientY) * strength)
        }
      })
    }

    const onEnter = () => {
      isHovering.current = true
      cursorRef.current?.classList.add('scale-[2.5]', 'bg-forma-gold', 'opacity-80')
      cursorRef.current?.classList.remove('border-forma-gold')
    }
    const onLeave = () => {
      isHovering.current = false
      cursorRef.current?.classList.remove('scale-[2.5]', 'bg-forma-gold', 'opacity-80')
      cursorRef.current?.classList.add('border-forma-gold')
    }

    const interactives = document.querySelectorAll('a, button, [data-magnetic]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cursorX, cursorY, dotX, dotY])

  return (
    <>
      <motion.div
        ref={cursorRef}
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-forma-gold z-[9999] pointer-events-none transition-[transform,background-color] duration-200 mix-blend-difference"
      />
      <motion.div
        style={{ x: dotSpringX, y: dotSpringY }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-forma-gold z-[9999] pointer-events-none"
      />
    </>
  )
}
