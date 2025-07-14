import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

export default function NewProductpage() {
    return <>
       <div className="container p-4 shadow-lg shadow-gray-400 rounded-3xl mt-2 ml-90 h-175 w-200">
            <PageHeader> <pre className="ml-2 p-2">  Add Product</pre></PageHeader>
            <ProductForm/>
       </div>
    </>
}