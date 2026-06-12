"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface PriceTicker {
  monthly: number
  yearly: number
}

const pricingPlans: { name: string; type: string; description: string; prices: PriceTicker; features: string[] }[] = [
  {
    name: "UI / UX Design",
    type: "01 / Design Only",
    description: "Complete UI/UX design system. Perfect for teams with their own development team.",
    prices: { monthly: 3500, yearly: 2800 },
    features: ["Design Systems", "Unlimited Revisions", "Figma Files"],
  },
  {
    name: "Web Development",
    type: "02 / Full Stack",
    description: "Complete web application from design to deployment. Ready-to-use production code.",
    prices: { monthly: 8000, yearly: 6400 },
    features: ["UI/UX + Development", "Next.js / React", "Deployment Included"],
  },
  {
    name: "Custom Project",
    type: "03 / Bespoke",
    description: "Tailored solutions for your unique business needs. Let&apos;s discuss your vision.",
    prices: { monthly: 5000, yearly: 4000 },
    features: ["Custom Scope", "Strategy Included", "Full Support"],
  },
]

function PriceDisplay({ price, isYearly, currency = "$", showKSuffix = false }: { price: PriceTicker; isYearly: boolean; currency?: string; showKSuffix?: boolean }) {
  const value = isYearly ? price.yearly : price.monthly
  let displayValue = value.toString()
  
  if (showKSuffix) {
    displayValue = displayValue.slice(0, -1) + "K"
  }
  
  const digits = displayValue.split("")

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-neutral-400 text-xl md:text-2xl font-light">{currency}</span>
      <div className="price-ticker flex font-black text-5xl md:text-7xl tracking-tighter">
        {digits.map((digit, i) => {
          if (digit === "K") {
            return <span key={i} className="text-neutral-600 text-lg md:text-2xl self-end ml-0.5">{digit}</span>
          }
          return (
            <div key={i} className="digit-container">
              <div
                className="digit-strip"
                style={{
                  transform: `translateY(-${parseInt(digit) * 1}em)`,
                  transition: `transform 0.8s cubic-bezier(0.7, 0, 0.3, 1) ${i * 0.1}s`,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          )
        })}
        {digits.length > 3 && !showKSuffix && (
          <span className="text-neutral-400">,</span>
        )}
      </div>
      <span className="text-neutral-600 text-[9px] font-bold uppercase tracking-widest">
        / {isYearly ? "yr" : "mo"}
      </span>
    </div>
  )
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(".pricing-card", {
      scrollTrigger: { trigger: "#pricing-plans", start: "top 85%" },
      x: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "all",
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing-plans"
      className="py-24 md:py-20 bg-background border-t border-foreground/5 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="px-6 md:px-24 flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12 reveal-on-scroll">
          <div className="max-w-2xl">
            <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-neutral-600 mb-4 md:mb-8 font-black italic">
              05 — Investment
            </h3>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground uppercase">
              Choose <br />{" "}
              <span className="serif-italic font-light text-muted-foreground italic lowercase">
                your
              </span>{" "}
              rhythm.
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <div className="flex items-center gap-4">
              <span
                className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                  !isYearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 md:w-16 md:h-8 bg-secondary dark:bg-neutral-900 rounded-full border border-foreground/10 p-1 group"
              >
                <div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
                  style={{
                    transform: isYearly ? "translateX(28px)" : "translateX(0)",
                    backgroundColor: isYearly ? "#3b82f6" : "var(--foreground)",
                  }}
                ></div>
              </button>
              <span
                className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                  isYearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Yearly
              </span>
            </div>
            <div className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full">
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest italic">
                Save 20% with Yearly
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className="flex gap-6 px-6 md:px-24 pb-12 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card shrink-0 w-[80vw] md:w-[400px] snap-start group relative p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col justify-between overflow-hidden transition-all duration-700 ${
                index === 1
                  ? "bg-background dark:bg-white text-foreground dark:text-black shadow-2xl z-20 border border-foreground/5 dark:border-none"
                  : "bg-secondary dark:bg-[#0A0A0A] border border-foreground/5 hover:border-foreground/20"
              }`}
            >
              {index === 1 && (
                <div className="absolute top-8 right-8 px-3 py-1.5 bg-blue-600 rounded-full">
                  <span className="text-[7px] md:text-[8px] font-black text-white uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <span
                  className={`text-[9px] font-bold uppercase tracking-[0.4em] mb-6 md:mb-8 block ${
                    index === 1 ? "text-muted-foreground dark:text-neutral-400" : "text-muted-foreground"
                  }`}
                >
                  {plan.type}
                </span>
                <h4
                  className={`text-3xl md:text-4xl font-bold tracking-tighter mb-3 md:mb-4 uppercase ${
                    index === 1 ? "text-foreground dark:text-black" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h4>
                <p
                  className={`text-xs md:text-sm leading-relaxed mb-8 md:mb-12 max-w-[240px] ${
                    index === 1 ? "text-muted-foreground dark:text-neutral-400" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className={`mb-8 md:mb-12 ${index === 1 ? "text-foreground dark:text-black" : "text-foreground"}`}>
                  <PriceDisplay price={plan.prices} isYearly={isYearly} currency={index === 2 ? "IDR" : "$"} showKSuffix={index === 2} />
                </div>

                <ul className="space-y-3 md:space-y-4 mb-10 md:mb-16">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest ${
                        index === 1 ? "text-muted-foreground dark:text-neutral-600" : "text-muted-foreground"
                      }`}
                    >
                      <span className={index === 1 ? "text-blue-600 font-bold" : "text-blue-500 font-bold"}>
                        ✓
                      </span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl text-[9px] font-bold uppercase tracking-[0.3em] transition-all ${
                  index === 1
                    ? "bg-foreground dark:bg-black text-background dark:text-white hover:bg-blue-600 hover:text-white shadow-xl"
                    : "bg-secondary dark:bg-neutral-900 border border-foreground/5 text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {index === 1 ? "Get Started" : index === 2 ? "Contact Me" : "Choose Plan"}
              </button>
            </div>
          ))}

          <div className="shrink-0 w-6 md:w-24"></div>
        </div>
      </div>
    </section>
  )
}
