"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function CTASection() {
  const glowRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const glow = glowRef.current

    if (section && glow) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(glow, {
          x,
          y,
          duration: 1.5,
          ease: "power3.out",
        })
      }

      section.addEventListener("mousemove", handleMouseMove)
      return () => section.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>("#contact .reveal-on-scroll").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      })
    })

    // Magnetic button
    const btn = buttonRef.current
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const { left, top, width, height } = btn.getBoundingClientRect()
        const x = e.clientX - (left + width / 2)
        const y = e.clientY - (top + height / 2)
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" })
      }
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" })
      }
      btn.addEventListener("mousemove", handleMove)
      btn.addEventListener("mouseleave", handleLeave)
      return () => {
        btn.removeEventListener("mousemove", handleMove)
        btn.removeEventListener("mouseleave", handleLeave)
      }
    }
  }, [])

  return (
    <section id="contact" className="py-8 px-4 md:px-8 bg-background">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-secondary dark:bg-[#050505] border border-foreground/5 py-32 md:py-48 px-8 text-center group"
      >
        {/* Interactive Ambient Glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 w-[600px] h-[600px] bg-[#FF6B35]/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0"
        ></div>

        <div className="relative z-10">
          {/* Question Heading */}
          <div className="hero-title-wrap mb-12">
            <h2 className="text-[8vw] md:text-[5vw] font-bold tracking-tighter leading-[1.1] max-w-5xl mx-auto reveal-on-scroll">
              Curious how I can boost your{" "}
              <span className="relative inline-block">
                <span className="serif-italic font-light text-[#FF6B35] italic">conversion</span>
              </span>{" "}
              and product quality?
            </h2>
          </div>

          {/* The Hyper-Button */}
          <div className="flex flex-col items-center gap-8 mt-16 reveal-on-scroll">
            <div ref={buttonRef} className="magnetic-wrap">
              <button className="group/btn relative flex items-center gap-4 bg-[#FF6B35] hover:bg-[#E85A28] text-white px-8 py-5 rounded-2xl transition-all duration-500 active:scale-95 shadow-[0_0_40px_rgba(255,107,53,0.3)]">
                {/* Avatar Stack */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                    J
                  </div>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Schedule Consultation
                </span>
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Available for new discussions
              </span>
            </div>
          </div>

          {/* Secondary Contact */}
          <div className="mt-24 pt-12 border-t border-foreground/5 reveal-on-scroll">
            <p className="text-neutral-600 text-[10px] uppercase tracking-[0.4em] mb-4">
              Or send a message to
            </p>
            <a
              href="mailto:jason@archive.com"
              className="text-2xl md:text-3xl font-medium tracking-tight hover:text-[#FF6B35] transition-colors duration-500 border-b border-transparent hover:border-[#FF6B35]/30 pb-2"
            >
              hello@itsjason.my.id
            </a>
          </div>
        </div>

        {/* Background Stats (Watermark Style) */}
        <div className="absolute bottom-12 left-12 opacity-[0.03] select-none pointer-events-none hidden lg:block">
          <span className="text-[15rem] font-black tracking-tighter leading-none">99%</span>
        </div>
      </div>
    </section>
  )
}
