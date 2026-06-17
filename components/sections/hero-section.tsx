'use client'

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-20 bg-background">
      <div className="max-w-7xl w-full">
        <div className="mb-8">
          <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Digital Experience Architect
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12 text-foreground">
          Jason — Sculpting Simplicity.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Creating harmony between complex code and pristine interfaces.
        </p>
      </div>
    </section>
  )
}
