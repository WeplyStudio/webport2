"use client"

import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-[350] px-8 py-6 flex justify-between items-center text-foreground bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <a href="#" className="text-xs md:text-sm font-bold tracking-tighter hover:opacity-50 transition">
        Jasonn.doc™
      </a>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button
          onClick={onMenuToggle}
          className="group flex items-center gap-1 md:gap-2 focus:outline-none"
          style={{
            opacity: isMenuOpen ? 0 : 1,
            pointerEvents: isMenuOpen ? "none" : "auto",
            transition: "opacity 0.5s ease",
          }}
        >
          <span className="text-[6px] md:text-[8px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Menu
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-foreground transition-transform duration-500"></span>
            <span className="w-6 h-0.5 bg-foreground transition-transform duration-500"></span>
          </div>
        </button>
      </div>
    </nav>
  )
}
