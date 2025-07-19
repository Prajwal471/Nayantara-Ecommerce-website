// src/components/Nav.tsx

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[oklch(0.12_0.042_264.695)] via-[oklch(0.18_0.042_264.695)] to-[oklch(0.25_0.042_264.695)] text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center z-20">
          <div className="relative">
            <p className="rounded-4xl shadow-md shadow-gray-400 font-mono font-bold px-4 py-1.5 inline-block">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </p>
            <span className="absolute -top-2 left-5 font-serif px-2 text-sm text-neutral-200">
              NT
            </span>
          </div>
        </a>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex gap-6">{children}</div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden z-30 text-white focus:outline-none"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden absolute right-4 mt-2 w-40 bg-white dark:bg-zinc-800 shadow-md rounded-md py-2 text-sm text-black dark:text-white z-40">
          <div className="flex flex-col items-start gap-2 px-4 py-2">{children}</div>
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
        "px-4 py-2 text-base font-mono tracking-wide rounded-3xl hover:bg-white hover:text-black transition",
        pathname === props.href && "bg-background text-black dark:text-white"
      )}
    />
  );
}
