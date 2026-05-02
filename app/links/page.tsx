'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Briefcase, Github, Mail, Calendar, Linkedin, Twitter, Instagram, Dribbble, ArrowRight } from 'lucide-react'

const links = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'View all my projects',
    url: '#',
    icon: Briefcase,
    featured: true
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://linkedin.com',
    icon: Linkedin,
    featured: true
  },
  {
    id: 3,
    title: 'GitHub',
    description: 'View my code',
    url: 'https://github.com',
    icon: Github,
    featured: true
  },
  {
    id: 4,
    title: 'Twitter/X',
    description: 'Follow me',
    url: 'https://twitter.com',
    icon: Twitter
  },
  {
    id: 5,
    title: 'Instagram',
    description: 'Behind the scenes',
    url: 'https://instagram.com',
    icon: Instagram
  },
  {
    id: 6,
    title: 'Dribbble',
    description: 'Design work',
    url: 'https://dribbble.com',
    icon: Dribbble
  },
  {
    id: 7,
    title: 'Email',
    description: 'Get in touch',
    url: 'mailto:hello@jasonndoc.com',
    icon: Mail
  },
  {
    id: 8,
    title: 'Book a Call',
    description: 'Schedule meeting',
    url: '#',
    icon: Calendar
  }
]

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Profile Section */}
          <div className="text-center mb-12">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-secondary border-2 border-foreground/10 flex items-center justify-center text-4xl font-bold">
              JD
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Jason
            </h1>
            <p className="text-foreground/70 text-sm mb-4">
              Digital Architect & Web Developer
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Creating harmony between complex code and pristine interfaces. Let's build something amazing together.
            </p>
          </div>

          {/* Featured Links */}
          <div className="space-y-3 mb-12">
            {links.filter(link => link.featured).map((link) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.id}
                  href={link.url}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-secondary border border-foreground/5 hover:border-foreground/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                    <IconComponent className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {link.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground/60 group-hover:translate-x-1 transition-all" />
                </a>
              )
            })}
          </div>

          {/* All Links */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-semibold mb-4">
              More Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {links.filter(link => !link.featured).map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    className="group p-4 rounded-lg bg-secondary border border-foreground/5 hover:border-foreground/20 transition-all duration-300 text-center"
                  >
                    <div className="w-full flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                        <IconComponent className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-xs font-semibold text-foreground mb-1">
                      {link.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">
                      {link.description}
                    </p>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-foreground/5">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">400+</div>
              <p className="text-xs text-muted-foreground">Projects Done</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">100+</div>
              <p className="text-xs text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">6+</div>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-foreground/5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Let's Connect
            </p>
            <a href="mailto:hello@jasonndoc.com" className="text-foreground hover:text-foreground/60 transition text-sm font-medium">
              hello@jasonndoc.com
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

