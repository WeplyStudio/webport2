"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const phases = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Finding the essence. I dive deep into your project&apos;s DNA to uncover core problems and strategic opportunities.",
    variant: "dark",
  },
  {
    number: "02",
    title: "Sculpting",
    description:
      "Shaping the vision. Blending minimalist aesthetics with conversion psychology for intuitive interfaces.",
    variant: "light",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Building with precision. Transforming designs into fast, secure, and scalable code.",
    variant: "dark",
  },
  {
    number: "04",
    title: "Evolution",
    description:
      "Launch & Iterate. Ensuring smooth transitions and continuous optimization based on real data.",
    variant: "darker",
  },
]

export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const track = trackRef.current
    if (!track) return

    const scrollAmount = track.scrollWidth - window.innerWidth

    const scrollTween = gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: "#process",
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left 90%",
          toggleActions: "play none none reverse",
        },
        scale: 0.95,
        opacity: 0.6,
        duration: 1,
        ease: "power2.out",
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section id="process" className="relative bg-black py-20 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24 mb-4">
        {/* Section Header */}
        <div className="reveal-on-scroll">
          <h3 className="text-[10px] uppercase tracking-[1em] text-neutral-600 mb-8">06 — Process</h3>
          <h2 className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-[0.85] text-white">
            The <span className="serif-italic font-light text-neutral-500 italic">Blueprint.</span>
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div className="horizontal-container relative w-full h-[70vh] flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-10 px-8 md:px-24 h-full items-center horizontal-track"
        >
          {phases.map((phase) => (
            <div
              key={phase.number}
              className={`process-card shrink-0 w-[85vw] md:w-[550px] h-[400px] rounded-[3rem] p-10 md:p-12 flex flex-col justify-between relative group overflow-hidden ${
                phase.variant === "light"
                  ? "bg-white text-black"
                  : phase.variant === "darker"
                    ? "bg-[#111111] border border-white/5"
                    : "bg-[#0A0A0A] border border-white/5"
              }`}
            >
              {phase.variant !== "light" && (
                <div
                  className={`absolute w-64 h-64 bg-blue-600/${phase.number === "01" ? "10" : "5"} blur-[100px] rounded-full group-hover:bg-blue-600/${phase.number === "01" ? "20" : "15"} transition-all duration-700 ${
                    phase.number === "01" ? "-top-20 -right-20" : "-bottom-20 -left-20"
                  }`}
                ></div>
              )}

              <div className="relative z-10">
                <span
                  className={`text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block ${
                    phase.variant === "light" ? "text-neutral-400" : "text-blue-500"
                  }`}
                >
                  Phase {phase.number}
                </span>
                <h4
                  className={`text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none ${
                    phase.variant === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {phase.title}
                </h4>
              </div>

              <div className="relative z-10">
                <p
                  className={`text-base md:text-lg leading-relaxed mb-6 ${
                    phase.variant === "light" ? "text-neutral-500" : "text-neutral-500"
                  }`}
                >
                  {phase.description}
                </p>
                <div
                  className={`h-[1px] w-10 group-hover:w-20 transition-all duration-700 ${
                    phase.variant === "light" ? "bg-black" : "bg-blue-600"
                  }`}
                ></div>
              </div>
            </div>
          ))}

          <div className="shrink-0 w-20 md:w-60 h-1"></div>
        </div>
      </div>
    </section>
  )
}
