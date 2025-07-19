"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 px-6 sm:px-10 py-12 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-t border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left Side - Branding */}
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-bold tracking-wide text-zinc-900 dark:text-white">
            Naintara
          </h2>
          <p className="text-sm">Timeless elegance, crafted for you.</p>
        </div>

        {/* Center - Navigation */}
        <div className="flex gap-6 flex-wrap justify-center text-sm">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition">
            Products
          </Link>
          <Link href="/orders" className="hover:text-zinc-900 dark:hover:text-white transition">
            Orders
          </Link>
          <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Right Side - Copyright */}
        <div className="text-sm text-center sm:text-right">
          &copy; {new Date().getFullYear()} Naintara. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
