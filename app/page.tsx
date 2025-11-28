'use client'

import Background3D from '@/components/Background3D'
import ParticleBackground from '@/components/ParticleBackground'
import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import SkillNetwork from '@/components/SkillNetwork'
import ContactForm from '@/components/ContactForm'
import TerminalNav from '@/components/TerminalNav'
import ThemeToggle from '@/components/ThemeToggle'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Background3D />
      <ParticleBackground />
      <ThemeToggle />
      <TerminalNav />
      
      <Hero />
      
      <section id="skills" className="py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive 3D visualization of my technology stack and expertise
          </p>
        </motion.div>
        <div className="glass rounded-lg p-8 max-w-6xl mx-auto">
          <SkillNetwork />
        </div>
      </section>

      <section id="projects" className="relative z-10">
        <ProjectShowcase />
      </section>

      <section className="relative z-10">
        <ContactForm />
      </section>

      <footer className="py-8 px-4 text-center text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} Fullstack Developer Portfolio. Built with Next.js & Three.js</p>
      </footer>
    </main>
  )
}

