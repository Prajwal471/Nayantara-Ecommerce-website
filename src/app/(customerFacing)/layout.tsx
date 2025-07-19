"use client";

import { Footer } from "@/components/footer";
import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navbar */}
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>

      {/* Page Content */}
      <main className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>
      
       <Footer />
     

    </>
  );
}

