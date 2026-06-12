"use client"

import { useState } from "react"
import Link from "next/link"
import { NoiseBackground } from "@/components/noise-background"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeToggle } from "@/components/theme-toggle"
import { MousePointer2, Layers, Zap, Globe, Check, ArrowUpRight } from "lucide-react"

const features = [
  {
    icon: MousePointer2,
    title: "Drag & Drop Builder",
    desc: "Susun halaman web hanya dengan menyeret elemen. Tanpa satu baris kode pun.",
  },
  {
    icon: Layers,
    title: "Ratusan Template",
    desc: "Mulai dari template profesional yang siap pakai untuk segala jenis bisnis.",
  },
  {
    icon: Zap,
    title: "Publish Instan",
    desc: "Website langsung online dalam hitungan detik dengan satu klik.",
  },
  {
    icon: Globe,
    title: "Custom Domain",
    desc: "Hubungkan domain sendiri dan tampil profesional di mata pelanggan.",
  },
]

const plans = [
  {
    name: "Starter",
    type: "01 / Gratis",
    description: "Cocok untuk mencoba dan membangun ide pertama Anda.",
    price: "0",
    suffix: "",
    features: ["1 Website", "Subdomain Qupid", "Template Dasar", "Komunitas Support"],
    cta: "Mulai Gratis",
  },
  {
    name: "Pro",
    type: "02 / Paling Populer",
    description: "Untuk kreator dan bisnis yang ingin tampil maksimal.",
    price: "149K",
    suffix: "/ bln",
    features: ["Website Tak Terbatas", "Custom Domain", "Semua Template Premium", "Analitik Lengkap", "Priority Support"],
    cta: "Pilih Pro",
    popular: true,
  },
  {
    name: "Business",
    type: "03 / Skala Besar",
    description: "Solusi lengkap untuk tim dan perusahaan berkembang.",
    price: "499K",
    suffix: "/ bln",
    features: ["Semua fitur Pro", "Kolaborasi Tim", "White Label", "API Access", "Dedicated Manager"],
    cta: "Hubungi Sales",
  },
]

export default function QupidPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <>
      <NoiseBackground />
      <CustomCursor />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[350] px-8 py-10 flex justify-between items-center text-foreground">
        <Link href="/" className="text-sm md:text-base font-bold tracking-tighter hover:opacity-50 transition">
          Qupid™
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/"
            className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </nav>

      <main className="bg-background text-foreground">
        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl w-full relative z-10">
            <h2 className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-[0.5em] mb-10">
              Qupid — Website Builder
            </h2>

            <h1 className="text-[13vw] md:text-[9vw] leading-[0.85] font-bold tracking-tighter mb-12">
              Bangun Web <br />
              <span className="serif-italic font-light italic text-muted-foreground">cukup</span> Drag & Drop.
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
                Qupid adalah platform pembuat website yang membuat siapa saja bisa merancang halaman
                profesional tanpa coding — semudah menyeret dan melepas.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#qupid-pricing"
                  className="group flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all"
                >
                  Lihat Harga
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 md:px-24 border-t border-foreground/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-16 md:mb-24">
              <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6">
                01 — Kenapa Qupid
              </h3>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                Semua yang kamu butuh <br />
                <span className="serif-italic font-light text-muted-foreground italic">dalam satu tempat.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-8 rounded-[2rem] bg-secondary dark:bg-[#0A0A0A] border border-foreground/5 hover:border-blue-500/40 transition-all duration-500 min-h-[320px] flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                    <feature.icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold tracking-tight mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="qupid-pricing"
          className="py-24 px-6 md:px-24 border-t border-foreground/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
              <div className="max-w-2xl">
                <h3 className="text-[10px] uppercase tracking-[0.8em] text-neutral-600 mb-6">
                  02 — Harga
                </h3>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">
                  Pilih <br />
                  <span className="serif-italic font-light text-muted-foreground italic lowercase">paket</span>{" "}
                  Anda.
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${
                    !isYearly ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Bulanan
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-16 h-8 bg-secondary dark:bg-neutral-900 rounded-full border border-foreground/10 p-1"
                  aria-label="Toggle billing period"
                >
                  <div
                    className="w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
                    style={{
                      transform: isYearly ? "translateX(32px)" : "translateX(0)",
                      backgroundColor: isYearly ? "#3b82f6" : "var(--foreground)",
                    }}
                  ></div>
                </button>
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${
                    isYearly ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Tahunan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`group relative p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between overflow-hidden transition-all duration-500 min-h-[560px] ${
                    plan.popular
                      ? "bg-background dark:bg-white text-foreground dark:text-black shadow-2xl border border-foreground/5 dark:border-none"
                      : "bg-secondary dark:bg-[#0A0A0A] border border-foreground/5 hover:border-foreground/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-8 right-8 px-3 py-1.5 bg-blue-600 rounded-full">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">
                        Paling Populer
                      </span>
                    </div>
                  )}

                  <div>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.4em] mb-8 block ${
                        plan.popular ? "text-muted-foreground dark:text-neutral-400" : "text-muted-foreground"
                      }`}
                    >
                      {plan.type}
                    </span>
                    <h4 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3 uppercase">
                      {plan.name}
                    </h4>
                    <p
                      className={`text-xs md:text-sm leading-relaxed mb-10 max-w-[240px] ${
                        plan.popular ? "text-muted-foreground dark:text-neutral-400" : "text-muted-foreground"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-10">
                      <span className="text-neutral-400 text-xl md:text-2xl font-light">IDR</span>
                      <span className="font-black text-5xl md:text-6xl tracking-tighter">{plan.price}</span>
                      {plan.suffix && (
                        <span className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest">
                          {plan.suffix}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-4 mb-12">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${
                            plan.popular ? "text-muted-foreground dark:text-neutral-600" : "text-muted-foreground"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-5 rounded-2xl text-[9px] font-bold uppercase tracking-[0.3em] transition-all ${
                      plan.popular
                        ? "bg-foreground dark:bg-black text-background dark:text-white hover:bg-blue-600 hover:text-white shadow-xl"
                        : "bg-secondary dark:bg-neutral-900 border border-foreground/5 text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 md:px-24 border-t border-foreground/5 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
              Siap membangun <span className="serif-italic font-light italic text-blue-600">web pertamamu?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md mx-auto">
              Bergabung dengan ribuan kreator yang sudah mempercayai Qupid untuk hadir online.
            </p>
            <a
              href="#qupid-pricing"
              className="inline-flex items-center gap-3 px-10 py-6 bg-foreground text-background rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all"
            >
              Mulai Sekarang
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
