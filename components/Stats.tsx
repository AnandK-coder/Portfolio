'use client'

import { motion } from 'framer-motion'
import { Code, Users, Star, GitBranch } from 'lucide-react'

const stats = [
  { icon: Code, label: 'Projects', value: '50+', color: 'text-blue-400' },
  { icon: Users, label: 'Clients', value: '30+', color: 'text-green-400' },
  { icon: Star, label: 'GitHub Stars', value: '2.5K+', color: 'text-yellow-400' },
  { icon: GitBranch, label: 'Contributions', value: '500+', color: 'text-purple-400' },
]

export default function Stats() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-lg p-6 text-center hover:scale-105 transition-transform"
            >
              <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className="text-3xl font-bold mb-2 gradient-text"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

