'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a project in mind? Let's bring it to life together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-400 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={20} />
                <span>Anandsh237@gmail.com</span>
              </a>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://github.com/AnandK-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/anand-kumar-9b03812b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-lg p-8"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || submitted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {submitted ? (
                <>
                  <span>✓</span> Message Sent!
                </>
              ) : (
                <>
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

