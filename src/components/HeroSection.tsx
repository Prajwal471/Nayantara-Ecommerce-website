"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-between px-6 py-20  bg-gradient-to-b from-gray-100 to-gray-800 dark:from-zinc-900 dark:to-zinc-950 overflow-hidden">
      {/* Left Text Section */}
      <div className="max-w-xl z-10 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
          Discover Timeless Beauty
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Explore our handcrafted collection, where elegance meets simplicity.
        </p>
        <Button asChild className="rounded-full px-6 py-3 text-lg">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block relative w-[400px] h-[500px] z-10">
        <Image
          src={"/rolex.webp"}// replace with your actual image path
          alt="Elegant Woman"
          fill
          className="object-cover rounded-3xl shadow-2xl"
        />
      </div>

      {/* Optional Decorative Clipped Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full backdrop-blur-sm bg-gray-300/30 dark:bg-zinc-800/30 clip-hero z-0" />
    </section>
  );
}
