// src/app/(admin)/layout.tsx

import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>

      <main className="pt-[80px] px-4 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
