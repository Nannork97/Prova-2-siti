import type { Metadata } from 'next'
import './globals.css'
import { cormorant, inter } from './fonts'
import MagneticCursor from '@/components/ui/MagneticCursor'

export const metadata: Metadata = {
  title: 'FORMA — Studio di Architettura',
  description: 'Studio di architettura di lusso',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-forma-black text-forma-white font-sans overflow-x-hidden">
        <MagneticCursor />
        {children}
      </body>
    </html>
  )
}
