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
    <section id="services-stack" className="relative bg-white dark:bg-black pt-40 pb-24 overflow-visible transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-24">
        {/* Header Section */}
        <div className="mb-40 reveal-on-scroll">
          <h3 className="text-[10px] uppercase tracking-[1em] text-gray-500 dark:text-neutral-600 mb-8">
            04 — Expertise
          </h3>
          <h2 className="text-6xl md:text-[9vw] font-bold tracking-tighter leading-[0.85] text-black dark:text-white">
            The <span className="serif-italic font-light text-gray-500 dark:text-neutral-500 italic">Service</span>{" "}
            <br /> Matrix.
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative flex flex-col gap-0 w-full" id="stack-container">
          {/* Card 01: Web Development */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-white dark:bg-[#080808] border border-gray-200 dark:border-white/5 p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_-50px_100px_rgba(0,0,0,0.8)] transition-colors duration-300">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500">
                    Service 01
                  </span>
                  <h4 className="text-xs font-medium text-gray-600 dark:text-neutral-500 uppercase tracking-widest">
                    Web Development
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
              <h5 className="text-5xl md:text-[7vw] font-bold tracking-tighter max-w-4xl leading-[0.9] text-black dark:text-white">
                Building <br />{" "}
                <span className="serif-italic font-light text-gray-500 dark:text-neutral-400">Modern</span>{" "}
                Websites.
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-gray-600 dark:text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                Fast, responsive, and scalable web applications built with the latest technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-gray-100 dark:bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 dark:text-neutral-400 border border-gray-200 dark:border-white/5">
                  React / Next.js
                </span>
                <span className="px-6 py-3 bg-gray-100 dark:bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 dark:text-neutral-400 border border-gray-200 dark:border-white/5">
                  Full Stack
                </span>
              </div>
            </div>
          </div>

          {/* Card 02: UI/UX Design */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-gray-50 dark:bg-white text-gray-900 dark:text-black p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_-50px_100px_rgba(0,0,0,0.3)] mt-20 transition-colors duration-300">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                    Service 02
                  </span>
                  <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
                    UI / UX Design
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
                Design that <br />{" "}
                <span className="serif-italic font-light italic text-blue-600">Works.</span>
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                User-centered design that combines beautiful aesthetics with intuitive interactions.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black border border-black/5">
                  UI Systems
                </span>
                <span className="px-6 py-3 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-black border border-black/5">
                  UX Research
                </span>
              </div>
            </div>
          </div>

          {/* Card 03: Custom Projects */}
          <div className="stack-card sticky top-[15vh] w-full min-h-[70vh] rounded-[3.5rem] bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 p-8 md:p-20 flex flex-col justify-between overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_-50px_100px_rgba(0,0,0,0.8)] mt-20 transition-colors duration-300">
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500">
                    Service 03
                  </span>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
                    Custom Projects
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
                Tailored <br />{" "}
                <span className="serif-italic font-light text-neutral-500 italic">
                  Solutions
                </span>{" "}
                for You.
              </h5>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
              <p className="text-neutral-500 text-lg md:text-2xl max-w-xl leading-relaxed">
                Bespoke projects tailored to your specific needs and vision, from concept to launch.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  Web Apps
                </span>
                <span className="px-6 py-3 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border border-white/5">
                  Consulting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
