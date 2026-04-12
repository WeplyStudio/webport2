"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ServicesSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = gsap.utils.toArray<HTMLElement>(".stack-card")

    // Stacking Animation
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        const nextCard = cards[i + 1]

        gsap.to(card, {
          scale: 0.9,
          y: -50,
          scrollTrigger: {
            trigger: nextCard,
            start: "top 90%",
            end: "top 20%",
            scrub: true,
          },
        })
      }
    })

    // Header reveal
    gsap.from("#services-stack .reveal-on-scroll", {
      scrollTrigger: {
        trigger: "#services-stack",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    })
  }, [])

  return (
    <section id="services-stack" className="relative bg-black pt-40 pb-24 overflow-visible">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24">
        {/* Header Section */}
        <div className="mb-40 reveal-on-scroll">
          <h3 className="text-[10px] uppercase tracking-[1em] text-neutral-600 mb-8">
            04 — Expertise
          </h3>
          <h2 className="text-6xl md:text-[9vw] font-bold tracking-tighter leading-[0.85] text-white">
            The <span className="serif-italic font-light text-neutral-500 italic">Service</span>{" "}
            <br /> Matrix.
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative flex flex-col gap-0 w-full" id="stack-container">
          {/* Card 01: Engineering */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-[#080808] border border-white/5 p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">
                    Service 01
                  </span>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Engineering
                  </h4>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-xl">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </div>
              <h5 className="text-5xl md:text-[7vw] font-bold tracking-tighter max-w-4xl leading-[0.9] text-white">
                Building <br />{" "}
                <span className="serif-italic font-light text-neutral-400">Digital</span>{" "}
                Architecture.
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                High-level performance optimization using modern, scalable, and secure stacks.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  Performance
                </span>
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  Scalability
                </span>
              </div>
            </div>
          </div>

          {/* Card 02: Aesthetics */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-white text-black p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.3)] mt-20">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                    Service 02
                  </span>
                  <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                    Design
                  </h4>
                </div>
                <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h5 className="text-5xl md:text-[7vw] font-bold tracking-tighter max-w-4xl leading-[0.9]">
                Interfaces that <br />{" "}
                <span className="serif-italic font-light italic text-blue-600">Resonate.</span>
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                Emotional design that bridges human needs with digital functionality.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black border border-black/5">
                  Visual Design
                </span>
                <span className="px-6 py-3 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black border border-black/5">
                  UX Strategy
                </span>
              </div>
            </div>
          </div>

          {/* Card 03: Growth */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-[#0A0A0A] border border-white/5 p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.8)] mt-20">
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500">
                    Service 03
                  </span>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Growth
                  </h4>
                </div>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-xl">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <h5 className="text-5xl md:text-[7vw] font-bold tracking-tighter max-w-4xl leading-[0.9] text-white">
                Strategic <br />{" "}
                <span className="serif-italic font-light text-neutral-500 italic">
                  Sustainable
                </span>{" "}
                Expansion.
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                Transforming data into design decisions that drive massive business growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  SEO Audit
                </span>
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
