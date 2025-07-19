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

export function ProductForm({ product }: { product?: Product | null }) {
  const isNewProduct = product == null

  const [error, action] = useActionState(
    isNewProduct ? addProduct : updateProduct.bind(null, product.id),
    { errors: [] }
  )

  const [priceInCents, setPriceInCents] = useState<number>(product?.priceInCents ?? 0)

  return (
    <form action={action} className="space-y-6 ml-5 w-180">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error?.properties?.name?.errors?.map((err: string, i: number) => (
          <div key={i} className="text-destructive">{err}</div>
        ))}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Paise</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) =>
            setPriceInCents(Number(e.target.value) || 0)
          }
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInCents / 100)}
        </div>
        {error?.properties?.priceInCents?.errors?.map((err: string, i: number) => (
          <div key={i} className="text-destructive">{err}</div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error?.properties?.description?.errors?.map((err: string, i: number) => (
          <div key={i} className="text-destructive">{err}</div>
        ))}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        {isNewProduct ? (
          <Input className="w-80" type="file" id="file" name="file" required />
        ) : (
          <>
            <Input className="w-80" type="file" id="file" name="file" />
            <div className="text-muted-foreground">{product.filePath}</div>
          </>
        )}
        {error?.properties?.file?.errors?.map((err: string, i: number) => (
          <div key={i} className="text-destructive">{err}</div>
        ))}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        {isNewProduct ? (
          <Input className="w-80" type="file" id="image" name="image" required />
        ) : (
          <>
            <Input className="w-80" type="file" id="image" name="image" />
            {product.imagePath && (
              <Image
                src={product.imagePath}
                height={200}
                width={200}
                alt="Product Image"
                className="rounded-2xl border-5 border-neutral-500 border-r-gray-400 border-b-gray-300"
              />
            )}
          </>
        )}
        {error?.properties?.image?.errors?.map((err: string, i: number) => (
          <div key={i} className="text-destructive">{err}</div>
        ))}
      </div>

      {/* Submit */}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="mb-5 w-40 ml-75 h-12 text-xl"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
