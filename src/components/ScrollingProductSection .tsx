"use client";

import { ProductCard } from "./ProductCard";
import { Product } from "@prisma/client";

export function ScrollingProductSection({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden py-8 bg-white dark:bg-zinc-900">
      <h2 className="text-3xl font-bold px-6 mb-4 text-gray-900 dark:text-white">
        Featured Picks
      </h2>

      {/* Outer container scrollable manually */}
      <div className="w-full overflow-x-auto">
        {/* Animated auto-scrolling flex container */}
        <div className="flex gap-6 px-6 w-max animate-scroll-x">
          {[...products, ...products].map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] sm:w-[300px]"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
