"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function AboutSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray<HTMLElement>("#about .reveal-on-scroll").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      })
    })
  }, [])

  return (
    <section
      id="about"
      className="py-8 px-8 md:px-24 bg-black text-white selection:bg-white selection:text-black"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Manifesto Header */}
        <div className="mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-4 reveal-on-scroll">
            02 — Philosophy
          </h3>
          <div className="hero-title-wrap">
            <h2 className="text-[clamp(2.5rem,7vw,10rem)] font-bold tracking-tighter leading-[0.9] reveal-on-scroll">
              Simplicity is the <br />
              <span className="serif-italic font-light text-neutral-400 italic">ultimate</span>{" "}
              sophistication.
            </h2>
          </div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-4 items-start">
          {/* Main Narrative */}
          <div className="md:col-span-8 reveal-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-500 font-light leading-relaxed text-lg">
              <p>
                For me, every pixel has a purpose. I don&apos;t just build websites; I create digital
                spaces where aesthetics and logic meet in perfect harmony.
              </p>
              <p>
                With a background in design and engineering, I ensure every line of code I write is
                a reflection of an uncompromising creative vision.
              </p>
            </div>
          </div>

          {/* Sidebar Info: Tech & Services */}
          <div className="md:col-span-4 flex flex-col gap-32 md:pt-4">
            {/* Services Minimalist List */}
            <div className="reveal-on-scroll">
              <div className="space-y-4">
                <div className="group flex justify-between items-center py-4 border-b border-white/5 cursor-default">
                  <span className="text-xl font-semibold group-hover:italic group-hover:translate-x-2 transition-all duration-500">
                    Development
                  </span>
                  <span className="text-[10px] text-neutral-700">01</span>
                </div>
                <div className="group flex justify-between items-center py-4 border-b border-white/5 cursor-default">
                  <span className="text-xl font-semibold group-hover:italic group-hover:translate-x-2 transition-all duration-500">
                    Visual Design
                  </span>
                  <span className="text-[10px] text-neutral-700">02</span>
                </div>
                <div className="group flex justify-between items-center py-4 border-b border-white/5 cursor-default">
                  <span className="text-xl font-semibold group-hover:italic group-hover:translate-x-2 transition-all duration-500">
                    Architecture
                  </span>
                  <span className="text-[10px] text-neutral-700">03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
