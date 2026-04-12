"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function OfferingsSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Feature Cards Reveal
    gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: (i % 2) * 0.1,
      })
    })

    // Bar Reveal Animation
    gsap.utils.toArray<HTMLElement>(".bar-reveal").forEach((bar) => {
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
        },
        width: bar.getAttribute("data-width") || "0%",
        duration: 1.5,
        ease: "power4.inOut",
      })
    })

    // SVG Chart Drawing
    gsap.to(".chart-path", {
      scrollTrigger: {
        trigger: ".chart-path",
        start: "top 90%",
      },
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    })

    // Chat Bubbles Stagger
    gsap.to(".chat-bubble", {
      scrollTrigger: {
        trigger: ".chat-bubble",
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    })
  }, [])

  return (
    <section id="offerings" className="py-8 px-6 md:px-8 bg-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="mb-24 reveal-on-scroll">
          <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6">
            03 — Value Proposition
          </h3>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
            What I Offer <br />{" "}
            <span className="serif-italic font-light text-neutral-500 italic">is Different.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Experience & Industry */}
          <div className="feature-card relative group p-8 md:p-12 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-colors duration-700"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 mb-12">
                <span className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold text-neutral-400 group-hover:border-blue-500/50 transition-colors">
                  SaaS Startups
                </span>
                <span className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold text-neutral-400 group-hover:border-blue-500/50 transition-colors">
                  E-commerce
                </span>
                <span className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold text-neutral-400 group-hover:border-blue-500/50 transition-colors">
                  Fintech
                </span>
              </div>
              <h4 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                <span className="text-blue-500">6 years</span> of experience building{" "}
                <span className="serif-italic font-light italic">cross-industry solutions.</span>
              </h4>
            </div>

            <div className="relative z-10">
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                We&apos;ve handled 400+ projects across industries, from banking to interactive LIVE
                platforms.
              </p>
            </div>
          </div>

          {/* Card 2: Conversion Focus */}
          <div className="feature-card relative group p-8 md:p-12 rounded-[2.5rem] bg-white text-black overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="space-y-8 mb-12">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Standard Website
                    </span>
                    <span className="text-2xl font-bold tracking-tighter">0%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full w-[2%] bg-neutral-300"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                      Jason&apos;s Conversion Design
                    </span>
                    <span className="text-2xl font-bold tracking-tighter text-blue-600">4-8%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-blue-600 bar-reveal" data-width="65%"></div>
                  </div>
                </div>
              </div>

              <h4 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                Focused on conversion — turn traffic into{" "}
                <span className="serif-italic font-light italic">real sales.</span>
              </h4>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Boost sales and reach more clients through optimized and targeted design.
            </p>
          </div>

          {/* Card 3: Long Term Strategy */}
          <div className="feature-card relative group p-8 md:p-12 rounded-[2.5rem] bg-white text-black overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="mb-12 h-32 flex items-end">
                <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                  <path
                    className="chart-path"
                    d="M0,50 Q40,45 80,30 T160,10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    className="chart-point"
                    cx="160"
                    cy="10"
                    r="4"
                    fill="#3b82f6"
                    opacity="0"
                  />
                  <rect
                    x="150"
                    y="-10"
                    width="40"
                    height="15"
                    rx="4"
                    fill="#3b82f6"
                    className="chart-label opacity-0"
                  />
                </svg>
              </div>

              <h4 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                Long-term strategy for{" "}
                <span className="serif-italic font-light italic text-blue-600">sustainable</span> results.
              </h4>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              We design and optimize products to continuously grow following market trends.
            </p>
          </div>

          {/* Card 4: Design Reasoning */}
          <div className="feature-card relative group p-8 md:p-12 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="Work"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-start gap-4 mb-12">
              <div className="chat-bubble glass-panel px-4 py-2 rounded-2xl rounded-bl-none text-[10px] font-bold tracking-wider opacity-0 translate-y-4">
                Why is this better?
              </div>
              <div className="chat-bubble bg-blue-600 px-4 py-2 rounded-2xl rounded-br-none self-end text-[10px] font-bold tracking-wider opacity-0 translate-y-4">
                Clearer CTA
              </div>
              <div className="chat-bubble bg-blue-800 px-4 py-2 rounded-2xl rounded-br-none self-end text-[10px] font-bold tracking-wider opacity-0 translate-y-4">
                Simplified Message
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                Every Design Decision <span className="text-blue-500">Has a Reason.</span>
              </h4>
              <p className="text-neutral-500 text-sm leading-relaxed mt-4 max-w-sm">
                Every element is designed with purpose—not just aesthetics, but function and results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
