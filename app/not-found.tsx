import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* 404 Number */}
        <h1 className="text-[25vw] md:text-[20vw] font-bold tracking-tighter leading-none text-white/5 select-none">
          404
        </h1>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-500 mb-4">
            Page Not Found
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Lost in the <span className="serif-italic font-light text-neutral-500 italic">void.</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-md mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to another dimension.
          </p>

          <Link
            href="/"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all duration-500"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 opacity-30 hidden lg:block">
        <div className="flex flex-col gap-2">
          <div className="w-20 h-[1px] bg-white/20" />
          <div className="w-12 h-[1px] bg-white/10" />
          <div className="w-6 h-[1px] bg-white/5" />
        </div>
      </div>

      <div className="absolute bottom-12 right-12 text-right hidden lg:block">
        <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-600">
          Error Code: 404
        </p>
      </div>
    </div>
  )
}
