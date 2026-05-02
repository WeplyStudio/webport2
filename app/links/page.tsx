'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'Check out my latest projects and case studies',
    url: 'https://jasonn.doc',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    url: 'https://linkedin.com',
    icon: '💼',
    color: 'from-blue-700 to-blue-500'
  },
  {
    id: 3,
    title: 'GitHub',
    description: 'Explore my open source projects',
    url: 'https://github.com',
    icon: '💻',
    color: 'from-gray-700 to-gray-900'
  },
  {
    id: 4,
    title: 'Twitter/X',
    description: 'Follow me for web development tips',
    url: 'https://twitter.com',
    icon: '𝕏',
    color: 'from-black to-gray-800'
  },
  {
    id: 5,
    title: 'Instagram',
    description: 'Behind the scenes and design inspiration',
    url: 'https://instagram.com',
    icon: '📸',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Dribbble',
    description: 'Design portfolio and inspiration',
    url: 'https://dribbble.com',
    icon: '🎭',
    color: 'from-pink-400 to-red-500'
  },
  {
    id: 7,
    title: 'Email',
    description: 'hello@itsjason.my.id',
    url: 'mailto:hello@itsjason.my.id',
    icon: '✉️',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 8,
    title: 'Book a Call',
    description: 'Schedule a consultation with me',
    url: 'https://calendly.com',
    icon: '📅',
    color: 'from-green-500 to-emerald-500'
  }
]

export default function LinksPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <Link href="/" className="text-sm md:text-base font-bold tracking-tighter hover:opacity-50 transition">
          Jasonn.doc™
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-5xl font-bold">
                JD
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-3 text-foreground">
              Jason
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Digital Architect & Web Developer
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Creating harmony between complex code and pristine interfaces. Let's build something amazing together.
            </p>
          </div>

          {/* Links Grid */}
          <div className="space-y-3 mb-12">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(link.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative block"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative bg-secondary dark:bg-neutral-900 hover:bg-secondary dark:hover:bg-neutral-800 border border-foreground/10 group-hover:border-transparent rounded-xl px-6 py-4 md:py-5 flex items-center gap-4 transition-all duration-300 cursor-pointer">
                  <div className="text-3xl md:text-4xl">{link.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-foreground transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-sm truncate group-hover:text-muted-foreground transition-colors">
                      {link.description}
                    </p>
                  </div>
                  <div className="text-xl md:text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center border-t border-foreground/5 pt-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Connect with me
            </p>
            <p className="text-muted-foreground text-sm">
              Choose your preferred platform above to reach out or collaborate on a project.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
