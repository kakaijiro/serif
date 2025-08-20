import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrainCircuit } from 'lucide-react'

export default function Page() {
return (
  <main className="relative min-h-screen w-full">
    {/* Background image (full-screen) */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/hero-background.jpg"
        alt="Abstract diagonal red light on dark background"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
    </div>

    {/* Content */}
    <section className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center">
      <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/90 ring-1 ring-white/20 backdrop-blur">
        <BrainCircuit className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-wide uppercase">AI-enabled</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl px-2">
        Amplify your voice with striking posts.
      </h1>
      <p className="mt-4 sm:mt-5 max-w-2xl text-balance text-base sm:text-lg text-white/90 md:text-xl px-4">
        Join a community of passionate writers and share your stories with the world.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row w-full sm:w-auto px-4 sm:px-0">
        <Button asChild size="lg" className="h-11 px-6 text-base bg-white/70 text-black hover:bg-white/90 w-full sm:w-auto">
          <Link href="/write">Start writing</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-11 border-white/30 bg-white/10 px-6 text-base text-white hover:bg-white/20 hover:text-white w-full sm:w-auto"
        >
          <Link href="/explore">Explore posts</Link>
        </Button>
      </div>
    </section>
  </main>
)
}
