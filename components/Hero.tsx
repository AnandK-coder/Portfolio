'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import TypingEffect from './TypingEffect'

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-blue-400" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Fullstack Developer</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
            I build
            <span className="ml-2 text-blue-400">
              <TypingEffect
                strings={[
                  'Scalable Web Applications',
                  'AI-Powered Solutions',
                  'Real-time Systems',
                  'Cloud Infrastructure',
                  'Beautiful User Experiences',
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Crafting innovative digital solutions with cutting-edge technologies.
          Transforming ideas into reality through code and creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all glow"
          >
            View My Work
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

