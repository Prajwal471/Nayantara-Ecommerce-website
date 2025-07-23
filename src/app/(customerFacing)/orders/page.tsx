"use client"

import { emailOrderHistory } from "@/actions/orders"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { useTransition } from "react"

export default function MyOrdersPage() {
  const initialState = { error: undefined, message: undefined }

  const [state, formAction] = useActionState(emailOrderHistory, initialState)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        startTransition(() => {
          formAction(formData)
        })
      }}
      className="max-w-xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" required name="email" id="email" />
            {state?.error && <div className="text-destructive">{state.error}</div>}
          </div>
        </CardContent>
        <CardFooter>
          {state?.message ? (
            <p className="text-green-600">{state.message}</p>
          ) : (
            <Button className="w-full" size="lg" disabled={isPending} type="submit">
              {isPending ? "Sending..." : "Send"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
