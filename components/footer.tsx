'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-sm font-bold tracking-tighter hover:opacity-50 transition mb-4 inline-block">
              Jasonn.doc™
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Creating harmony between complex code and pristine interfaces.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Web Design</a></li>
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Development</a></li>
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">Consulting</a></li>
              <li><a href="#services" className="text-xs text-muted-foreground hover:text-foreground transition">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition">About</a></li>
              <li><a href="#process" className="text-xs text-muted-foreground hover:text-foreground transition">Process</a></li>
              <li><a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition">Pricing</a></li>
              <li><a href="/links" className="text-xs text-muted-foreground hover:text-foreground transition">Links</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition">Twitter</a></li>
              <li><a href="mailto:hello@jasonndoc.com" className="text-xs text-muted-foreground hover:text-foreground transition">Email</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/5 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[10px] text-muted-foreground text-center md:text-left mb-4 md:mb-0">
            © 2026 Jasonn.doc™. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
