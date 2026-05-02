'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Briefcase, Github, Mail, Calendar, Linkedin, Twitter, Instagram, Dribbble, ArrowUpRight } from 'lucide-react'

const links = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'View all my projects',
    url: '#',
    icon: Briefcase,
    size: 'large'
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://linkedin.com',
    icon: Linkedin,
    size: 'medium'
  },
  {
    id: 3,
    title: 'GitHub',
    description: 'View my code',
    url: 'https://github.com',
    icon: Github,
    size: 'medium'
  },
  {
    id: 4,
    title: 'Twitter',
    description: 'Follow me',
    url: 'https://twitter.com',
    icon: Twitter,
    size: 'small'
  },
  {
    id: 5,
    title: 'Instagram',
    description: 'Behind the scenes',
    url: 'https://instagram.com',
    icon: Instagram,
    size: 'small'
  },
  {
    id: 6,
    title: 'Dribbble',
    description: 'Design work',
    url: 'https://dribbble.com',
    icon: Dribbble,
    size: 'small'
  },
  {
    id: 7,
    title: 'Email',
    description: 'Get in touch',
    url: 'mailto:hello@jasonndoc.com',
    icon: Mail,
    size: 'medium'
  },
  {
    id: 8,
    title: 'Book a Call',
    description: 'Schedule meeting',
    url: '#',
    icon: Calendar,
    size: 'medium'
  }
]

export default function LinksPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const items = container.querySelectorAll('[data-tilt]')
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20

        ;(item as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
    }

    const handleMouseLeave = () => {
      const items = container.querySelectorAll('[data-tilt]')
      items.forEach((item) => {
        ;(item as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tighter hover:opacity-50 transition">
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

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="w-20 h-20 rounded-3xl bg-secondary border border-foreground/10 flex items-center justify-center text-2xl font-bold mb-6">
              JD
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Jason
            </h1>
            <p className="text-sm text-muted-foreground">
              Digital Architect & Web Developer
            </p>
          </div>

          {/* Bento Grid */}
          <div className="space-y-3" ref={containerRef}>
            {/* Large Card - Portfolio */}
            <a
              href={links[0].url}
              data-tilt
              className="group relative block bg-secondary border border-foreground/10 rounded-3xl p-6 hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ transitionProperty: 'transform', transitionDuration: '0.3s' }}
            >
              <div className="flex items-start justify-between mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Featured</span>
                <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <Briefcase className="w-8 h-8 text-foreground/70 mb-3" />
                <h2 className="text-2xl font-bold tracking-tight leading-tight">
                  {links[0].title}
                </h2>
                <p className="text-xs text-muted-foreground mt-2">{links[0].description}</p>
              </div>
            </a>

            {/* 2x2 Grid for Medium Cards */}
            <div className="grid grid-cols-2 gap-3">
              {links.slice(1, 3).map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    data-tilt
                    className="group relative block bg-secondary border border-foreground/10 rounded-2xl p-5 hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ transitionProperty: 'transform', transitionDuration: '0.3s' }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <IconComponent className="w-5 h-5 text-foreground/70" />
                      <ArrowUpRight className="w-3 h-3 text-foreground/20 group-hover:text-foreground/50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="text-sm font-semibold">{link.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-1">{link.description}</p>
                  </a>
                )
              })}
            </div>

            {/* 4x1 Grid for Small Cards */}
            <div className="grid grid-cols-4 gap-2">
              {links.slice(3, 7).map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    data-tilt
                    className="group relative block bg-secondary border border-foreground/10 rounded-xl p-3 hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center"
                    style={{ transitionProperty: 'transform', transitionDuration: '0.3s' }}
                  >
                    <IconComponent className="w-5 h-5 text-foreground/70 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] font-semibold line-clamp-1">{link.title}</p>
                  </a>
                )
              })}
            </div>

            {/* Bottom - Email/Contact */}
            <a
              href={links[7].url}
              data-tilt
              className="group relative block bg-secondary border border-foreground/10 rounded-2xl p-5 hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-between"
              style={{ transitionProperty: 'transform', transitionDuration: '0.3s' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{links[7].title}</h3>
                  <p className="text-[10px] text-muted-foreground">{links[7].description}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all shrink-0" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-foreground/5">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">400+</div>
              <p className="text-[10px] text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">100+</div>
              <p className="text-[10px] text-muted-foreground">Clients</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">6+</div>
              <p className="text-[10px] text-muted-foreground">Years</p>
            </div>
          </div>

          {/* Email */}
          <div className="text-center mt-8 pt-6 border-t border-foreground/5">
            <a href="mailto:hello@jasonndoc.com" className="text-sm text-foreground hover:text-foreground/60 transition font-medium">
              hello@jasonndoc.com
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

