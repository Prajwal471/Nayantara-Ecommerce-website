import { formatCurrency } from "@/lib/formatters";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
    imagePath: string;
};

export function ProductCard({
    id,
    name,
    priceInCents,
    description,
    imagePath,
}: ProductCardProps) {
    return (
        <Card className="flex flex-col w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden transition-transform hover:scale-[1.02] duration-200 pt-0">
            <div className="w-full h-[240px] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center p-4">
                <Image
                    src={imagePath}
                    alt={name}
                    width={600}
                    height={400}
                    priority
                    className="max-h-full max-w-full object-contain"
                />
            </div>


            <CardHeader className="pb-0">
                <CardTitle className="text-xl font-semibold tracking-tight">{name}</CardTitle>
                <CardDescription className="text-lg text-green-600 font-medium">
                    {formatCurrency(priceInCents / 100)}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-zinc-300 line-clamp-3">
                {description}
            </CardContent>
            <CardFooter className="mt-auto">
                <Button asChild size="lg" className="w-full rounded-full">
                    <Link href={`/products/${id}/purchase`}>Purchase</Link>
                </Button>
            </CardFooter>
        </Card>

    )
}

export function ProductCardSkeleton() {
    return (
        <Card className="flex flex-col w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            {/* Image Placeholder */}
            <div className="flex justify-center items-center bg-gray-100 dark:bg-zinc-800 p-4 h-[240px]">
                <div className="w-full h-full bg-gray-300 dark:bg-zinc-700 rounded-md " />
            </div>

            {/* Header */}
            <CardHeader className="pb-0 space-y-3">
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-600 rounded animate-pulse" />
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-2 mt-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-zinc-600 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-gray-200 dark:bg-zinc-600 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-600 rounded animate-pulse" />
            </CardContent>

            {/* Footer */}
            <CardFooter className="mt-auto">
                <div className="h-10 w-full bg-gray-300 dark:bg-zinc-700 rounded-full animate-pulse" />
            </CardFooter>
        </Card>
    );
}
