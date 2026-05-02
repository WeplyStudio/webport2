'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { MenuOverlay } from '@/components/menu-overlay'
import { Footer } from '@/components/footer'

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <Navbar onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      {isMenuOpen && <MenuOverlay isOpen={isMenuOpen} onClose={handleMenuClose} />}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
