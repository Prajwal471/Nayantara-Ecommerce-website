"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center z-20">
          <div className="relative">
            <p className="rounded-4xl shadow-md shadow-gray-400 font-mono font-bold px-4 py-1.5 inline-block">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </p>
            <span className="absolute -top-2 left-5 font-serif px-2 text-sm text-neutral-400">
              NT
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">{children}</div>

        {/* Mobile Menu Toggle - Only visible on small screens */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none z-20"
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-3 px-4 py-2 border-t border-border text-primary bg-primary-foreground">
          {children}
        </div>
      )}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "px-4 py-2 text-base font-mono tracking-wide rounded-3xl hover:bg-white hover:text-secondary-foreground transition",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
