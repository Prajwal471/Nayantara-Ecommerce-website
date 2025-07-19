"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export function HeroSection() {
  return (
    <section className="w-full min-h-[60vh] sm:min-h-[85vh] bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-zinc-900 dark:to-zinc-800 px-6 py-10 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="text-center sm:text-left max-w-xl space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
            Timeless Pieces <br className="hidden sm:block" /> Designed for You
          </h1>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300">
            Discover luxury in every detail. Explore our handcrafted collection and elevate your everyday.
          </p>
          <Button
            asChild
            className="rounded-full px-6 py-3 text-lg mt-2 sm:mt-4"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>

        {/* Image Section */}
        <div className="w-full sm:w-[400px] sm:h-[500px] relative aspect-[4/5] sm:aspect-auto mx-auto">
          <Image
            src="/rolex.webp"
            alt="Elegant Product"
            fill
            className="object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
