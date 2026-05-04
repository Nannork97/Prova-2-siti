'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_FORMA } from '@/lib/animations'

const menuLinks = ['Progetti', 'Studio', 'Processo', 'Contatti']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6">
        <span className="font-serif text-2xl tracking-[0.3em] text-forma-white">FORMA</span>
        <button
          data-magnetic
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 group"
        >
          <span className="block w-8 h-px bg-forma-white group-hover:bg-forma-gold transition-colors duration-300" />
          <span className="block w-5 h-px bg-forma-white group-hover:bg-forma-gold transition-colors duration-300 ml-auto" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE_FORMA }}
            className="fixed inset-0 z-[100] bg-forma-gray flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-8 text-forma-muted hover:text-forma-white transition-colors text-sm tracking-widest"
            >
              CHIUDI
            </button>

            <motion.ul className="flex flex-col items-center gap-4">
              {menuLinks.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE_FORMA }}
                >
                  <button
                    onClick={() => setOpen(false)}
                    className="font-serif text-[clamp(3rem,8vw,7rem)] text-forma-white hover:text-forma-gold transition-colors duration-300 leading-none tracking-tight"
                  >
                    {link}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-8 left-8 text-forma-muted text-xs tracking-widest"
            >
              © 2024 FORMA STUDIO
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
