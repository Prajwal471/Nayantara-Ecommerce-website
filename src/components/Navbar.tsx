"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  ComponentProps, ReactNode } from "react";

export function Nav({children}:{children:ReactNode}){
  return <nav className="flex justify-between w-full items-center h-24 gap-4 px-6 
  bg-gradient-to-r 
  to-[oklch(0.25_0.042_264.695)] 
  via-[oklch(0.18_0.042_264.695)] 
  from-[oklch(0.12_0.042_264.695)] 
  text-white shadow-lg">{children}</nav>
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