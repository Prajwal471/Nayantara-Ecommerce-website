import { Nav, NavLink } from "@/components/Navbar";


export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return <>
    <Nav>
      <div className="flex justify-between w-full items-center  h-25 gap-4  ">
        <a href="/" className="relative inline-block mt-2 ml-5 " >
            <p className=" rounded-4xl shadow-md shadow-gray-400
             font-mono font-bold  px-4 
             py-1.5 inline-block"> <img src={"/logo.png"} className=" h-12 w-full"/> 
            </p>
            <span className="absolute -top-2.5 left-5 font-serif px-2 text-sm text-neutral-400">
              NT
            </span>
        </a>
        <div className="w-full justify-center mb-1 gap-x-4 flex items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/orders">My Orders</NavLink>
        </div>
      </div>
    </Nav>
    <div className="container mt-[100px]">{children}</div>
    </>
}