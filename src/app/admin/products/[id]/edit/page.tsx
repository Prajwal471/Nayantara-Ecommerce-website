import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductpage({
    params: { id }
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({ where: { id } })
    return <>
        <div className="container shadow-lg shadow-gray-400 rounded-lg  mt-2 ml-90  h-full w-200">
            <PageHeader> <pre className="ml-2 p-2 ">Edit Product</pre></PageHeader>
            <ProductForm product = { product } />
        </div>
    </>
}