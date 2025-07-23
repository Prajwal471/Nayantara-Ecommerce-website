import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"

type PurchaseReceiptEmailProps = {
  product: {
    name: string
    imagePath: string // should be a FULL URL
    description: string
  }
  order: {
    id: string
    createdAt: Date
    pricePaidInCents: number
  }
  downloadVerificationId: string
}

// ✅ Email preview (used by react-email local server only)
PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    imagePath: "/products/loq.jpg", // ✅ FULL URL here
  },
  order: {
    id: "example-order-id-123",
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: "example-download-verification-id",
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>View the Purchase receipt of  {product.name}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl mx-auto px-4 py-6">
            <Heading className="text-xl mb-4">Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
