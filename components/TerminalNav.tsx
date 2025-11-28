'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Minimize2 } from 'lucide-react'

const commands = [
  { cmd: 'about', desc: 'Show about information' },
  { cmd: 'projects', desc: 'List all projects' },
  { cmd: 'skills', desc: 'Display skills' },
  { cmd: 'contact', desc: 'Show contact information' },
  { cmd: 'clear', desc: 'Clear terminal' },
  { cmd: 'help', desc: 'Show available commands' },
]

export default function TerminalNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output', content: string }>>([
    { type: 'output', content: 'Welcome to the portfolio terminal! Type "help" for available commands.' }
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    
    switch (command) {
      case 'help':
        setHistory(prev => [
          ...prev,
          { type: 'output' as const, content: 'Available commands:' },
          ...commands.map(c => ({ type: 'output' as const, content: `  ${c.cmd.padEnd(10)} - ${c.desc}` }))
        ])
        break
      case 'about':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: 'Fullstack Developer | Passionate about creating innovative solutions' },
          { type: 'output', content: 'Expertise: React, Node.js, TypeScript, Python, Cloud Architecture' }
        ])
        break
      case 'projects':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: 'Featured Projects:' },
          { type: 'output', content: '  1. E-Commerce Platform (React, Node.js, MongoDB)' },
          { type: 'output', content: '  2. Real-time Chat App (Socket.io, Express)' },
          { type: 'output', content: '  3. AI-Powered Analytics Dashboard (Python, TensorFlow)' },
          { type: 'output', content: 'Type "projects" in main view to see details' }
        ])
        break
      case 'skills':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: 'Technical Skills:' },
          { type: 'output', content: '  Frontend: React, Next.js, TypeScript, Tailwind CSS' },
          { type: 'output', content: '  Backend: Node.js, Express, Python, FastAPI' },
          { type: 'output', content: '  Database: MongoDB, PostgreSQL, Redis' },
          { type: 'output', content: '  DevOps: Docker, AWS, CI/CD, Kubernetes' }
        ])
        break
      case 'contact':
        setHistory(prev => [
          ...prev,
          { type: 'output', content: 'Contact Information:' },
          { type: 'output', content: '  Email: your.email@example.com' },
          { type: 'output', content: '  GitHub: github.com/yourusername' },
          { type: 'output', content: '  LinkedIn: linkedin.com/in/yourprofile' }
        ])
        break
      case 'clear':
        setHistory([])
        break
      case '':
        break
      default:
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` }
        ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setHistory(prev => [...prev, { type: 'input', content: `$ ${input}` }])
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Terminal size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-96 glass rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-gray-300">Terminal</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <Minimize2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div
              ref={terminalRef}
              className="h-[calc(100%-3rem)] bg-black/90 text-green-400 p-4 font-mono text-sm overflow-y-auto"
            >
              {history.map((item, idx) => (
                <div key={idx} className={item.type === 'input' ? 'text-blue-400' : ''}>
                  {item.content}
                </div>
              ))}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-green-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-green-400"
                  autoFocus
                />
                <span className="terminal-cursor">|</span>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

