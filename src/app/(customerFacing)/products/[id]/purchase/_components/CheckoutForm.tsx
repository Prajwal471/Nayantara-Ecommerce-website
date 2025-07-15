"use client"

import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatters"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { fa } from "zod/locales"
import { userOrderExists } from "@/app/actions/orders"

type CheckoutFormProps = {
    product: {
        id: string
        imagePath: string
        name: string
        priceInCents: number
        description: string
    }
    clientSecret: string
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    return (
        <div className="relative w-full max-w-6xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-lg p-10 transition-all duration-300">

                <div className="space-y-6">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-md">
                        <Image
                            src={product.imagePath}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {product.name}
                        </h1>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(product.priceInCents / 100)}
                        </p>
                        <p className="text-sm text-zinc-600  dark:text-zinc-300">
                            {product.description}
                        </p>
                    </div>
                </div>


                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-inner px-6 py-8">
                    <Elements options={{ clientSecret }} stripe={stripePromise}>
                        <Form priceInCents={product.priceInCents} productId={product.id} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

function Form({ 
    priceInCents,
    productId 
}: {
    priceInCents: number,
    productId: string
}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return

        setIsLoading(true)

        const orderExists = await userOrderExists(email, productId)

        if (orderExists) {
            setErrorMessage("You have already ordered this product.")
            setIsLoading(false)
            return
        }

        stripe.confirmPayment({
            elements, confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
            },
        }).then(({ error }) => {
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unexpected error occured")
            }
        }).finally(() => setIsLoading(false))

    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && <CardDescription className="text-destructive">
                        {errorMessage}
                    </CardDescription>}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div>
                        <LinkAuthenticationElement
                            onChange={e => setEmail(e.value.email)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        size="lg"
                        disabled={stripe == null || elements == null || isLoading}
                    >
                        {isLoading ? "Purchasing..." : `Purchase  - ${formatCurrency(priceInCents / 100)}`}
                    </Button>
                </CardFooter>
            </Card>

        </form>
    )
}
