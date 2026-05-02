"use client"

import { useState, useEffect } from "react"
import { NoiseBackground } from "@/components/noise-background"
import { CustomCursor } from "@/components/custom-cursor"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { OfferingsSection } from "@/components/sections/offerings-section"
import { ServicesSection } from "@/components/sections/services-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { ProcessSection } from "@/components/sections/process-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  const [footerHeight, setFooterHeight] = useState("100vh")

  useEffect(() => {
    // Initialize footer reveal height
    const initFooterReveal = () => {
      const footer = document.querySelector("footer")
      if (footer) {
        setFooterHeight(`${footer.getBoundingClientRect().height}px`)
      }
    }

    initFooterReveal()
    window.addEventListener("resize", initFooterReveal)
    return () => window.removeEventListener("resize", initFooterReveal)
  }, [])

  return (
    <>
      <NoiseBackground />
      <CustomCursor />

      {/* Main Content Layer */}
      <div id="main-content" style={{ marginBottom: footerHeight }}>
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
