import { HeroSection } from "@/components/HeroSection"
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { ScrollingProductSection } from "@/components/ScrollingProductSection "
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const getMostPopularProduct = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
},
    ["/", "getMostPopularProduct"],
    { revalidate: 60 * 60 * 24 }
)

const getNewestProduct = cache(() => {

    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}, ["/", "getNewestProduct"])

export async function getFeaturedProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        take: 6,
    })
}

export async function ScrollingProductSectionWrapper() {
    const products = await getFeaturedProducts()
    return <ScrollingProductSection products={products} />
}


export default function HomePage() {
    return <main className="space-y-12  ">
        <HeroSection />
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProduct} />
        <ProductGridSection title="Newest" productsFetcher={getNewestProduct} />
        <ScrollingProductSectionWrapper />

    </main>
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (

        <section className="space-y-6 px-4 md:px-8">
            {/* Section Header */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
                <Button
                    asChild
                    variant="outline"
                    className="bg-white text-black border border-gray-300 shadow-md hover:bg-black hover:text-white transition-all duration-200 rounded-full px-5 py-2"
                >
                    <Link href="/products" className="flex items-center gap-2">
                        <span>View All</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">

                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </section>
    );
}


async function ProductSuspense({
    productsFetcher,
}: {
    productsFetcher: () => Promise<Product[]>
}) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}