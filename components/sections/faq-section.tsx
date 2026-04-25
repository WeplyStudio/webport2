"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const faqs = [
  {
    question: "Why is a subscription model better than an agency?",
    answer:
      "A subscription model provides unlimited flexibility. You get a senior designer exclusively without the overhead of insurance, office space, or expensive annual salaries. You can pause or cancel anytime.",
  },
  {
    question: "How quickly will I receive design results?",
    answer:
      "Average turnaround is 48 business hours (Monday-Friday). For more complex requests like full web design or app development, we'll break it into milestones delivered periodically.",
  },
  {
    question: "What if I don't like the results?",
    answer:
      "Don't worry. We offer unlimited revisions. We'll keep working on the design until you're 100% satisfied with the results. Your satisfaction is our top priority.",
  },
  {
    question: "What technology is used for development?",
    answer:
      "We use the best modern stack: Next.js for performance, TypeScript for code safety, Tailwind CSS for aesthetics, and GSAP for premium animations. For no-code solutions, we use Framer.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray<HTMLElement>("#faq .reveal-on-scroll").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      })
    })
  }, [])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-12 px-6 md:px-24 bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Static Header */}
        <div className="lg:col-span-5 reveal-on-scroll">
          <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-8">
            05 — Questions
          </h3>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
            Have <br />{" "}
            <span className="serif-italic font-light text-neutral-500 italic">Questions?</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-xs leading-relaxed mb-4">
            Answers to the most frequently asked questions about how we can work together.
          </p>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-7 flex flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border-b border-white/10 group cursor-pointer py-4"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center gap-8">
                <h4 className="text-xl md:text-2xl font-bold tracking-tight transition-colors">
                  {faq.question}
                </h4>
                <div className="faq-icon relative w-6 h-6 flex items-center justify-center shrink-0">
                  <span className="absolute w-full h-[1px] bg-neutral-600 group-hover:bg-white"></span>
                  <span
                    className="absolute w-[1px] h-full bg-neutral-600 group-hover:bg-white transition-transform duration-500"
                    style={{
                      transform: openIndex === index ? "rotate(90deg)" : "rotate(0)",
                      opacity: openIndex === index ? 0 : 1,
                    }}
                  ></span>
                </div>
              </div>
              <div
                className="faq-answer overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.7,0,0.3,1)]"
                style={{
                  maxHeight: openIndex === index ? "500px" : "0",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="pt-8 pb-4">
                  <p className="text-neutral-500 leading-relaxed max-w-xl">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
