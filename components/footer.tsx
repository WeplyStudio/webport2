'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (footerRef.current) {
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: "#main-content",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        opacity: 0,
      })
    }
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-foreground/5 bg-background">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Main CTA */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Ready to <br />{" "}
            <span className="font-light italic">Collaborate?</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Let's create something amazing together.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-3">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Web Design</a></li>
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Development</a></li>
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Consulting</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition">About</a></li>
              <li><a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition">Pricing</a></li>
              <li><a href="/links" className="text-xs text-muted-foreground hover:text-foreground transition">Links</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-3">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">Twitter</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-3">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@jasonndoc.com" className="text-xs text-muted-foreground hover:text-foreground transition">Email</a></li>
              <li><a href="/links" className="text-xs text-muted-foreground hover:text-foreground transition">Schedule</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/5 pt-6 text-center">
          <p className="text-[10px] text-muted-foreground">
            © 2026 Jasonn.doc™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

