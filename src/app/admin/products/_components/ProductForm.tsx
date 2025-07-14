"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useActionState, useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"


export function ProductForm({product} : {product?:
Product | null}) {
    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null,product.id), { errors:[]})
    const [priceInCents, setPriceInCents] = useState<number | undefined >(product?.priceInCents)

    return (
        <form action={action} className=" space-y-6 ml-5 w-180  ">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    defaultValue={product?.name || ""} />
                {error?.properties?.name?.errors?.map((err: string, i: number) => (
                    <div key={i} className="text-destructive">{err}</div>
                ))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Paise</Label>
                <Input
                    type="number"
                    id="priceInCents"
                    name="priceInCents"
                    required
                    value={priceInCents === undefined ? "" : priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
                />
                <div className="text-muted-foreground">
                    {formatCurrency((priceInCents || 0) / 100)}
                </div>
                {error?.properties?.priceInCents?.errors?.map((err: string, i: number) => (
                    <div key={i} className="text-destructive">{err}</div>
                ))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={product?.description || ""} />
                {error?.properties?.description?.errors?.map((err: string, i: number) => (
                    <div key={i} className="text-destructive">{err}</div>
                ))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input className="w-80" type="file" id="file" name="file" required = {product == null} />
                {product != null && (
                    <div className="text-muted-foreground">{product.filePath}</div>
                )}
                {error?.properties?.file?.errors?.map((err: string, i: number) => (
                    <div key={i} className="text-destructive">{err}</div>
                ))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input className="w-80" type="file" id="image" name="image" required = {product == null} />
                {product!= null && (
                    <Image 
                        src={product.imagePath} 
                        height="400" 
                        width="400" 
                        alt="Product Image"
                        className="rounded-2xl border-5 border-neutral-500 border-r-gray-400 border-b-gray-300 "
                    />
                )}
                {error?.properties?.image?.errors?.map((err: string, i: number) => (
                    <div key={i} className="text-destructive">{err}</div>
                ))}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" 
            className="mb-5 w-40 ml-75 h-12 text-xl" 
            disabled={pending}>{pending ? "Saving..." : "Save"}
        </Button>
    )
}