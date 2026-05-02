import Link from "next/link"
import { ArrowLeft, Home, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* 404 Display */}
        <div className="text-center mb-12">
          <div className="text-8xl font-bold tracking-tighter text-foreground/10 mb-2">
            404
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Page not found
          </h1>
        </div>

        {/* Message */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Error Code: 404
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-3 mb-8">
          {/* Home Button */}
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-foreground/10 hover:border-foreground/30 transition-all duration-300 group"
          >
            <Home className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-foreground">Back to Home</div>
              <div className="text-xs text-muted-foreground">Return to the main page</div>
            </div>
            <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Links Button */}
          <Link
            href="/links"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-foreground/10 hover:border-foreground/30 transition-all duration-300 group"
          >
            <div className="w-5 h-5 rounded-lg bg-foreground/5 flex items-center justify-center">
              <svg className="w-3 h-3 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-foreground">My Links</div>
              <div className="text-xs text-muted-foreground">Connect and explore</div>
            </div>
            <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Contact Button */}
          <a
            href="mailto:hello@jasonndoc.com"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-foreground/10 hover:border-foreground/30 transition-all duration-300 group"
          >
            <Mail className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-foreground">Get in Touch</div>
              <div className="text-xs text-muted-foreground">hello@jasonndoc.com</div>
            </div>
            <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Sitemap */}
        <div className="pt-8 border-t border-foreground/5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-4">
            Explore
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/#about" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              About
            </Link>
            <Link href="/#services" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              Services
            </Link>
            <Link href="/#offerings" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              Offerings
            </Link>
            <Link href="/#pricing" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              Pricing
            </Link>
            <Link href="/#process" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              Process
            </Link>
            <Link href="/#contact" className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1.5 rounded-lg hover:bg-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
