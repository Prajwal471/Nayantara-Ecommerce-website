"use client"

import { ProductCard } from "./ProductCard"
import { Product } from "@prisma/client"

export function ScrollingProductSection({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden py-8 bg-white dark:bg-zinc-900">
      <h2 className="text-3xl font-bold px-6 mb-4">Featured Picks</h2>
      <div className="w-full whitespace-nowrap overflow-hidden">
        <div className="flex animate-scroll-x gap-6 px-6">
          {[...products, ...products].map((product, index) => (
            <div key={index} className="flex-shrink-0 w-[300px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
