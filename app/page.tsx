"use client"

import { useState, useEffect } from "react"
import { NoiseBackground } from "@/components/noise-background"
import { CustomCursor } from "@/components/custom-cursor"
import { MenuOverlay } from "@/components/menu-overlay"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { OfferingsSection } from "@/components/sections/offerings-section"
import { ServicesSection } from "@/components/sections/services-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { ProcessSection } from "@/components/sections/process-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"
import { StickyFooter } from "@/components/sticky-footer"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [footerHeight, setFooterHeight] = useState("100vh")

  useEffect(() => {
    // Lock body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  useEffect(() => {
    // Initialize footer reveal height
    const initFooterReveal = () => {
      const footer = document.querySelector("#sticky-footer")
      if (footer) {
        setFooterHeight(`${footer.getBoundingClientRect().height}px`)
      }
    }

    initFooterReveal()
    window.addEventListener("resize", initFooterReveal)
    return () => window.removeEventListener("resize", initFooterReveal)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <NoiseBackground />
      <CustomCursor />
      <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />

      {/* Main Content Layer */}
      <div id="main-content" style={{ marginBottom: footerHeight }}>
        <Navbar onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
        <HeroSection />
        <AboutSection />
        <OfferingsSection />
        <ServicesSection />
        <PricingSection />
        <ProcessSection />
        <ContactFormSection />
        <FAQSection />
        <CTASection />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />

      {/* SVG Definitions */}
      <svg width="0" height="0">
        <defs>
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.2" />
          </pattern>
        </defs>
      </svg>
    </>
  )
}
