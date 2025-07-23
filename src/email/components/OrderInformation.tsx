import { formatCurrency } from "@/lib/formatters"
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components"

type OrderInformationProps = {
  order: { id: string; createdAt: Date; pricePaidInCents: number }
  product: { imagePath: string; name: string; description: string }
  downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export function OrderInformation({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, "") || ""
  const relativePath = product.imagePath.replace(/^\/+/, "")
  const imageUrl = product.imagePath.startsWith("http")
    ? product.imagePath
    : `${baseUrl}/${relativePath}`

  // Uncomment this to debug locally:
  // console.log("Image URL for email:", imageUrl)

  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500">Order ID</Text>
            <Text className="mt-0">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500">Purchased On</Text>
            <Text className="mt-0">
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500">Price Paid</Text>
            <Text className="mt-0">
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>

      <Section className="border border-solid border-gray-300 rounded-lg p-4 my-4">
        <Img
          width="100%"
          alt={product.name}
          src={imageUrl}
          style={{
            borderRadius: "8px",
            marginBottom: "16px",
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <Row className="mt-4">
          <Column>
            <Text className="text-lg font-semibold m-0">{product.name}</Text>
            <Text className="text-gray-500 mt-2">{product.description}</Text>
          </Column>
         
        </Row>
      </Section>
    </>
  )
}
