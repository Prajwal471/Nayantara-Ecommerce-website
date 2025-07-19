import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownMenuItem,
  DeleteDropdownMenuItem,
} from "./_components/ProductActions";

export default function AdminProductsPage() {
  return (
    <div className="w-full space-y-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
        <PageHeader>
          <p className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono">
            Products
          </p>
        </PageHeader>
        <Button asChild className="text-lg px-6 py-2 rounded-full shadow">
          <Link href="/admin/products/new">+ Add Product</Link>
        </Button>
      </div>

      <ProductsTable />
    </div>
  );
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
  });

  if (products.length === 0)
    return (
      <p className="text-center text-xl text-muted-foreground py-12">
        No products found.
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white dark:bg-zinc-900 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-10 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5" />
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
              <TableCell>{formatNumber(product._count.orders)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
                    <MoreVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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
  );
}
