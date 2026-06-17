"use client"

import { useEffect, useState } from "react"

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      id="menu-overlay"
      style={{
        clipPath: isOpen ? "circle(150% at 95% 5%)" : "circle(0% at 95% 5%)",
        transition: "clip-path 1.2s cubic-bezier(0.7, 0, 0.3, 1)",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-10 right-8 z-[450] group flex items-center gap-4 focus:outline-none"
        style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors">
          Close
        </span>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span className="absolute w-6 h-0.5 bg-foreground rotate-45"></span>
          <span className="absolute w-6 h-0.5 bg-foreground -rotate-45"></span>
        </div>
      </button>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        {/* Main Navigation */}
        <div className="md:col-span-8 flex flex-col gap-2">
          {[
            { href: "#about", label: "About", sub: "Philosophy" },
            { href: "#offerings", label: "Offerings", sub: "Value Proposition" },
            { href: "#services-stack", label: "Services", sub: "Expertise" },
            { href: "#process", label: "Process", sub: "The Blueprint" },
            { href: "#faq", label: "FAQ", sub: "Questions" },
            { href: "#contact", label: "Contact", sub: "Start a Conversation" },
          ].map((item, index) => (
            <div key={item.href} className="hero-title-wrap">
              <a
                href={item.href}
                className="menu-link menu-item"
                onClick={onClose}
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(100%)",
                  opacity: isOpen ? 1 : 0,
                  transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease",
                  transitionDelay: isOpen ? `${0.2 + index * 0.08}s` : "0s",
                }}
              >
                <span className="primary-text">{item.label}</span>
                <span className="secondary-text">{item.sub}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Location Info */}
        <div className="md:col-span-4 pb-4">
          <div
            className="menu-info-item"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(10px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isOpen ? "0.8s" : "0s",
            }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4">
              Location
            </h4>
            <p className="text-sm font-medium text-foreground">Jakarta, Indonesia</p>
            <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">{time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
