import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Progetti from '@/components/sections/Progetti'
import Processo from '@/components/sections/Processo'
import Contatti from '@/components/sections/Contatti'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Manifesto />
      <Progetti />
      <Processo />
      <Contatti />
    </main>
  )
}
