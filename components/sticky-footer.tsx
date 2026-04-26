"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function StickyFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from("#sticky-footer .max-w-4xl", {
      scrollTrigger: {
        trigger: "#main-content",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
      y: -100,
      opacity: 0,
      scale: 0.9,
    })
  }, [])

  return (
    <footer ref={footerRef} id="sticky-footer">
      <div className="max-w-4xl text-center px-8">
        <h2 className="text-[8vw] font-bold tracking-tighter mb-12">
          Ready to <br />{" "}
          <span className="serif-italic font-light">Collaborate?</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">
            Instagram
          </a>
          <a href="#" className="hover:text-foreground transition">
            LinkedIn
          </a>
          <a href="#" className="hover:text-foreground transition">
            Dribbble
          </a>
          <a href="#" className="hover:text-foreground transition">
            Twitter
          </a>
        </div>

        <div className="pt-10 border-t border-foreground/5">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em]">
            Jason &copy; 2026 — Made with love
          </p>
        </div>
      </div>
    </footer>
  )
}
