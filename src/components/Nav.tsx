"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  ComponentProps, ReactNode } from "react";

export function Nav({children}:{children:ReactNode}){
  return <nav className="bg-primary text-primary-foreground h-64px fixed top-0 left-0 w-full z-50 flex justify-center px-4">{children}</nav>
}



export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "p-2 h-10 text-xl font-mono tracking-wide rounded-4xl hover:bg-white  hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  )
}