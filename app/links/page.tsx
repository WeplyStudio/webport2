'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'View all my projects',
    url: '#',
    icon: '🎨',
    gradient: 'from-blue-500 to-purple-600',
    featured: true
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://linkedin.com',
    icon: '💼',
    gradient: 'from-blue-600 to-blue-400',
    featured: true
  },
  {
    id: 3,
    title: 'GitHub',
    description: 'View my code',
    url: 'https://github.com',
    icon: '💻',
    gradient: 'from-gray-800 to-gray-600',
    featured: true
  },
  {
    id: 4,
    title: 'Twitter/X',
    description: 'Follow me',
    url: 'https://twitter.com',
    icon: '𝕏',
    gradient: 'from-black to-gray-800'
  },
  {
    id: 5,
    title: 'Instagram',
    description: 'Behind the scenes',
    url: 'https://instagram.com',
    icon: '📸',
    gradient: 'from-pink-500 via-purple-500 to-blue-500'
  },
  {
    id: 6,
    title: 'Dribbble',
    description: 'Design work',
    url: 'https://dribbble.com',
    icon: '🎯',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    id: 7,
    title: 'Email',
    description: 'Get in touch',
    url: 'mailto:hello@jasonndoc.com',
    icon: '✉️',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 8,
    title: 'Book a Call',
    description: 'Schedule meeting',
    url: '#',
    icon: '📞',
    gradient: 'from-green-400 to-emerald-500'
  }
]

export default function LinksPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm md:text-base font-bold tracking-tighter hover:opacity-50 transition">
            Jasonn.doc™
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Sidebar - Profile */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                {/* Avatar */}
                <div className="w-40 h-40 mx-auto md:mx-0 mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                </div>

                {/* Profile Info */}
                <h1 className="text-4xl md:text-3xl font-bold tracking-tight mb-3 text-center md:text-left">
                  Jason
                </h1>
                <p className="text-muted-foreground text-sm mb-4 text-center md:text-left leading-relaxed">
                  Digital Architect & Creative Developer crafting beautiful digital experiences.
                </p>

                {/* Social Icons */}
                <div className="flex gap-3 mb-8 justify-center md:justify-start">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500/20 hover:bg-blue-500 flex items-center justify-center transition text-sm font-bold">
                    f
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-400/20 hover:bg-blue-400 flex items-center justify-center transition text-sm font-bold">
                    𝕏
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-pink-500/20 hover:bg-pink-500 flex items-center justify-center transition text-sm font-bold">
                    📷
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition text-sm font-bold">
                    ▶
                  </a>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl transition duration-300 text-sm">
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Featured Section */}
              <div className="mb-16">
                <h2 className="text-xs uppercase tracking-[0.6em] text-muted-foreground font-bold mb-6 italic">
                  Featured Links
                </h2>
                <div className="space-y-4">
                  {links.filter(link => link.featured).map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      onMouseEnter={() => setHoveredId(link.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`group relative block overflow-hidden rounded-2xl transition-all duration-300 ${
                        hoveredId === link.id ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient}`} />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-5xl">{link.icon}</div>
                          <div className="text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                            →
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{link.title}</h3>
                        <p className="text-white/90 text-sm">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* All Links Grid */}
              <div>
                <h2 className="text-xs uppercase tracking-[0.6em] text-muted-foreground font-bold mb-6 italic">
                  All Links
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      onMouseEnter={() => setHoveredId(link.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`group relative block overflow-hidden rounded-xl transition-all duration-300 ${
                        hoveredId === link.id ? 'shadow-xl scale-105' : 'shadow-md hover:shadow-lg'
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient}`} />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10 p-4">
                        <div className="text-3xl mb-2">{link.icon}</div>
                        <h3 className="text-sm font-bold text-white mb-1">{link.title}</h3>
                        <p className="text-white/80 text-xs line-clamp-1">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-foreground/10 mt-20 pt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">400+</div>
                <p className="text-muted-foreground text-sm">Projects Done</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">100+</div>
                <p className="text-muted-foreground text-sm">Happy Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-500 mb-2">6+</div>
                <p className="text-muted-foreground text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-foreground/10 mt-20 pt-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-3">
              Let's Connect
            </p>
            <a href="mailto:hello@jasonndoc.com" className="text-foreground hover:text-blue-500 font-bold text-lg transition mb-8 inline-block">
              hello@jasonndoc.com
            </a>
            <p className="text-muted-foreground text-xs">
              © 2026 Jason. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
