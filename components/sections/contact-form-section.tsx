"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ContactFormSection() {
  const [time, setTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: [] as string[],
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Clock Update
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Magnetic Button
    const btn = buttonRef.current
    if (btn) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = btn.getBoundingClientRect()
        const x = e.clientX - (left + width / 2)
        const y = e.clientY - (top + height / 2)
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" })
      }

      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" })
      }

      btn.addEventListener("mousemove", handleMouseMove)
      btn.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        clearInterval(interval)
        btn.removeEventListener("mousemove", handleMouseMove)
        btn.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    return () => clearInterval(interval)
  }, [])

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to send")

      setStatus("success")
      setFormData({ name: "", email: "", services: [], message: "" })
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>("#contact-form .reveal-on-scroll").forEach((el) => {
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
      id="contact-form"
      className="py-20 px-6 md:px-24 bg-black border-t border-white/5 relative overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Context & Info */}
        <div className="lg:col-span-5 flex flex-col justify-between reveal-on-scroll">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-8">
              06 — Contact
            </h3>
            <h2 className="text-6xl md:text-[8vw] font-bold tracking-tighter leading-[0.85] text-white uppercase mb-12">
              {"Let's"} <br />{" "}
              <span className="serif-italic font-light text-neutral-500 italic lowercase">
                talk.
              </span>
            </h2>
            <p className="text-neutral-500 text-lg md:text-xl leading-relaxed max-w-sm mb-16">
              Have a crazy idea or ambitious project? Let&apos;s discuss how I can help you bring it to
              life.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-neutral-700 mb-4">Email</h4>
              <a
                href="mailto:jason@archive.com"
                className="text-2xl font-medium text-white hover:text-blue-500 transition-colors"
              >
                jason@archive.com
              </a>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-neutral-700 mb-4">
                Location
              </h4>
              <p className="text-xl font-medium text-neutral-400">Jakarta — Indonesia</p>
              <p className="text-[10px] font-mono text-blue-600 mt-2 uppercase tracking-widest">
                {time}
              </p>
            </div>
          </div>
        </div>

        {/* Right: The Minimalist Form */}
        <div className="lg:col-span-7 reveal-on-scroll">
          {status === "success" ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-6">✓</div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-neutral-500 mb-8">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-16">
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  Failed to send message. Please try again.
                </div>
              )}

              {/* Name */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 group-focus-within:text-blue-500 transition-colors duration-500">
                  What&apos;s your name?
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Jason Doe *"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-3xl font-medium text-white placeholder:text-neutral-800 focus:outline-none focus:border-blue-600 transition-colors duration-500"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-600 group-focus-within:w-full transition-all duration-700"></div>
              </div>

              {/* Email */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 group-focus-within:text-blue-500 transition-colors duration-500">
                  Your email address?
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="jason@example.com *"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-3xl font-medium text-white placeholder:text-neutral-800 focus:outline-none focus:border-blue-600 transition-colors duration-500"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-600 group-focus-within:w-full transition-all duration-700"></div>
              </div>

              {/* Service Type */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 group-focus-within:text-blue-500 transition-colors duration-500">
                  What service do you need?
                </label>
                <div className="flex flex-wrap gap-4 mt-8">
                  {["Development", "Design", "Strategy"].map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-6 py-3 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
                        formData.services.includes(service)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-white/10 text-neutral-500 hover:border-white/30"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-600 group-focus-within:text-blue-500 transition-colors duration-500">
                  Tell me about your project
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Hi Jason, I want to build..."
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-6 text-2xl md:text-3xl font-medium text-white placeholder:text-neutral-800 focus:outline-none focus:border-blue-600 transition-colors duration-500 resize-none"
                ></textarea>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-600 group-focus-within:w-full transition-all duration-700"></div>
              </div>

              {/* Submit Button */}
              <div className="pt-10 flex justify-end">
                <div ref={buttonRef} className="magnetic-wrap inline-block">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-white text-black px-16 py-8 rounded-full font-bold text-xs uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all duration-500 active:scale-95 shadow-2xl"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
