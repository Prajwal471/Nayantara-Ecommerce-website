import db from "@/db/db"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage(props: {
  searchParams?: { payment_intent?: string }
}) {
  const payment_intent = props.searchParams?.payment_intent
  if (!payment_intent) return notFound()

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)

  if (!paymentIntent.metadata?.productId) return notFound()

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })
  if (!product) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="w-full min-h-screen px-4 py-20 flex items-center justify-center bg-gradient-to-br from-white via-zinc-100 to-zinc-300 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <CheckCircle2 className="text-green-500 w-14 h-14" />
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-xl">
            Thank you for your purchase. You can now view your product from your orders.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              {formatCurrency(product.priceInCents / 100)}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {product.description}
            </p>
            <Button className="mt-4" size="lg" asChild>
              
                <Link href={`/orders`}>
                  My Orders
                </Link>
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

async function creatDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),  
      },
    })
  ).id

}
