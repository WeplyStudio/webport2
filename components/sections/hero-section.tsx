"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    tl.to("#hero-sub", { y: 0, duration: 1.5, delay: 0.5 })
      .to("#hero-main span span", { y: 0, stagger: 0.2, duration: 1.8 }, "-=1.2")
      .to("#hero-desc", { y: 0, duration: 1.5 }, "-=1.4")
      .to("#hero-explore", { opacity: 1, y: 0, duration: 1.5 }, "-=1.4")
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-20">
      <div className="max-w-7xl w-full">
        <div className="hero-title-wrap">
          <h2
            id="hero-sub"
            className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-[0.5em] mb-12 translate-y-full"
          >
            Digital Experience Architect
          </h2>
        </div>

        <h1 id="hero-main" className="text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter">
          <span className="hero-title-wrap">
            <span className="block translate-y-full">Jason —</span>
          </span>
          <span className="hero-title-wrap">
            <span className="block translate-y-full serif-italic font-light">Sculpting</span>
          </span>
          <span className="hero-title-wrap">
            <span className="block translate-y-full">Simplicity.</span>
          </span>
        </h1>

        <div className="mt-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="hero-title-wrap">
            <p
              id="hero-desc"
              className="max-w-md text-muted-foreground text-lg leading-relaxed translate-y-full"
            >
              Creating harmony between complex code and pristine interfaces.
            </p>
          </div>

          <div id="hero-explore" className="flex flex-col items-center gap-4 opacity-0 translate-y-10">
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] rotate-90 mb-8">
              Explore
            </span>
            <div className="explore-line"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
