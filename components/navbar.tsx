"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface NavbarProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className="fixed top-0 w-full z-[350] px-8 py-10 flex justify-between items-center mix-blend-difference dark:mix-blend-normal">
      <a href="#" className="text-xl md:text-2xl font-bold tracking-tighter hover:opacity-50 transition">
        Jasonn.doc™
      </a>

      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

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
            <span className="w-6 h-0.5 bg-current dark:bg-white transition-transform duration-500"></span>
            <span className="w-6 h-0.5 bg-current dark:bg-white transition-transform duration-500"></span>
          </div>
        </button>
      </div>
    </nav>
  )
}
