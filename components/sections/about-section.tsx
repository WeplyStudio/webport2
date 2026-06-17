'use client'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-8 md:px-24 bg-background">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Philosophy</p>
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-16">
          Simplicity is the ultimate sophistication.
        </h2>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <p>
            For me, every pixel has a purpose. I don&apos;t just build websites; I create digital
            spaces where aesthetics and logic meet in perfect harmony.
          </p>
          <p>
            With a background in design and engineering, I ensure every line of code I write is
            a reflection of an uncompromising creative vision.
          </p>
        </div>

        {/* Services List */}
        <div className="mt-20 space-y-4">
          <div className="py-4 border-b border-foreground/10">
            <p className="text-sm font-medium text-foreground">Development</p>
          </div>
          <div className="py-4 border-b border-foreground/10">
            <p className="text-sm font-medium text-foreground">Visual Design</p>
          </div>
          <div className="py-4 border-b border-foreground/10">
            <p className="text-sm font-medium text-foreground">Architecture</p>
          </div>
        </div>
      </div>
    </section>
  )
}
