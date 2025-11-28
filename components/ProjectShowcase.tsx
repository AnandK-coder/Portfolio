'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Code, X } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  codePreview: {
    language: string
    code: string
  }
}

const projects: Project[] = [
  {
    id: '1',
    title: 'DevConnect',
    description: 'A specialized platform for developers to showcase their work, connect with opportunities, and get matched with perfect jobs using AI.',
    longDescription: 'DevConnect is like LinkedIn + GitHub + Job Board, but specifically designed for developers.',
    tech: ['React', 'Next.js', 'PostgreSQL', 'Express.js', 'Redis','TypeScript','OpenAI'],
    image: '/api/placeholder/800/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/AnandK-coder/DevConnect',
    codePreview: {
      language: 'typescript',
      code: `// Product Service
export class ProductService {
  async getProducts(filters: ProductFilters) {
    const cacheKey = \`products:\${JSON.stringify(filters)}\`;
    const cached = await redis.get(cacheKey);
    
    if (cached) return JSON.parse(cached);
    
    const products = await Product.find(filters)
      .populate('category')
      .lean();
    
    await redis.setex(cacheKey, 3600, JSON.stringify(products));
    return products;
  }
}`
    }
  },
  {
    id: '2',
    title: 'Expense-IQ',
    description: 'A modern, full-stack web application for tracking expenses and managing budgets with AI-powered insights.',
    longDescription: 'A real-time messaging application with WebSocket support, featuring group chats, file sharing, and message encryption.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB','Mongoose','Tailwind CSS'],
    image: '/api/placeholder/800/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/AnandK-coder/Expense-IQ',
    codePreview: {
      language: 'javascript',
      code: `// Socket.io Connection Handler
io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      userId: socket.userId,
      timestamp: Date.now()
    });
  });
  
  socket.on('send-message', async (data) => {
    const message = await saveMessage(data);
    io.to(data.roomId).emit('new-message', message);
  });
});`
    }
  },
  {
    id: '3',
    title: 'Microservices-Auth',
    description: 'Secure Node.js authentication microservice featuring JWT access/refresh tokens, OAuth2 social login, multi-factor authentication (MFA)',
    longDescription: 'An advanced analytics dashboard with AI-powered insights, predictive modeling, and interactive data visualizations.',
    tech: ['Node.js', 'Express', 'OAuth2','JWT','Redis','Prisma','Typescript'],
    image: '/api/placeholder/800/400',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/AnandK-coder/Microservices',
    codePreview: {
      language: 'python',
      code: `# ML Model Training
from tensorflow import keras
from tensorflow.keras import layers

def build_model(input_shape):
    model = keras.Sequential([
        layers.Dense(128, activation='relu', input_shape=input_shape),
        layers.Dropout(0.3),
        layers.Dense(64, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model`
    }
  },
]

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Featured Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Innovative solutions built with cutting-edge technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Code size={64} className="text-white opacity-20" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-blue-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-blue-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                    <p className="text-gray-400">{selectedProject.longDescription}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Code Preview</h4>
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={selectedProject.codePreview.language}
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                    >
                      {selectedProject.codePreview.code}
                    </SyntaxHighlighter>
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 glass rounded-lg flex items-center gap-2 hover:bg-white/10"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

