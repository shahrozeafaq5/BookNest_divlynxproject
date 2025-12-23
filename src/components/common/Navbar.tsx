"use client";
import Link from "next/link";
import { useCartCount } from "@/hooks/useCartCount";

export default function Navbar() {
  const cartCount = useCartCount();

  return (
    <nav className="fixed top-0 z-[60] w-full h-24 flex items-center bg-[#FDFCF8]/90 backdrop-blur-md border-b border-[#8B6F47]/10">
      <div className="max-w-6xl mx-auto w-full px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-11 h-11 border border-[#8B6F47]/40 rounded-full flex items-center justify-center transition-all group-hover:bg-[#2B2A28]">
            <span className="text-[#8B6F47] group-hover:text-[#FDFCF8] font-serif font-bold text-xl">
              B
            </span>
          </div>
          <span className="font-serif italic text-2xl tracking-tighter">
            BookNest
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-12">
          <Link
            href="/books"
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B6F47] hover:text-[#2B2A28] relative group"
          >
            Books
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#2B2A28] transition-all group-hover:w-full" />
          </Link>

          <Link
            href="/cart"
            className="relative text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B6F47] hover:text-[#2B2A28]"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#2B2A28] text-[#FDFCF8] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/about"
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8B6F47] hover:text-[#2B2A28]"
          >
            About
          </Link>

          <div className="h-4 w-[1px] bg-[#8B6F47]/20" />

          <Link
            href="/login"
            className="text-[11px] font-bold uppercase tracking-[0.2em] border border-[#2B2A28] px-6 py-2 rounded-sm hover:bg-[#2B2A28] hover:text-[#FDFCF8] transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
