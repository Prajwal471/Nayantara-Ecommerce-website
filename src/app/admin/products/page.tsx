import { Button } from "@/components/ui/button"
import { PageHeader } from "../_components/PageHeader"
import Link from "next/link"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ActiveToggleDropdownMenuItem,
    DeleteDropdownMenuItem,
} from "./_components/ProductActions"

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader><pre className="ml-70 text-6xl p-2 font-bold font-mono text-shadow">Product</pre></PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new" className="mr-5 h-15 w-50">
                        <p className="text-2xl">Add Product</p>
                    </Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
        },
        orderBy: { name: "asc" },
    })

    if (products.length === 0) return <p className="text-2xl text-center mr-30 mt-auto">No products found</p>

    return (
        <div className="container ml-65 h-full w-250">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0">
                            <span className="sr-only">Available For Purchase</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.isAvailableForPurchase ? (
                                    <>
                                        <span className="sr-only">Available</span>
                                        <CheckCircle2 />
                                    </>
                                ) : (
                                    <>
                                        <span className="sr-only">Unavailable</span>
                                        <XCircle className="stroke-destructive" />
                                    </>
                                )}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>{formatNumber(product._count.orders)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer">
                                        <MoreVertical />
                                        <span className="sr-only">Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <ActiveToggleDropdownMenuItem
                                            id={product.id}
                                            isAvailableForPurchase={product.isAvailableForPurchase}
                                        />
                                        <DropdownMenuSeparator />
                                        <DeleteDropdownMenuItem
                                            id={product.id}
                                            disabled={product._count.orders > 0}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}