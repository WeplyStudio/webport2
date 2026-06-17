'use client'

export function ServicesSection() {
  const services = [
    {
      title: 'Web Development',
      description: 'Fast, responsive, and scalable web applications built with the latest technologies.'
    },
    {
      title: 'UI / UX Design',
      description: 'User-centered design that combines beautiful aesthetics with intuitive interactions.'
    },
    {
      title: 'Custom Projects',
      description: 'Bespoke projects tailored to your specific needs and vision, from concept to launch.'
    }
  ]

  return (
    <section id="services-stack" className="py-24 px-8 md:px-24 bg-background">
      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Expertise</p>
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-20">
          The Service Matrix.
        </h2>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="pb-12 border-b border-foreground/10 last:border-b-0 last:pb-0">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
