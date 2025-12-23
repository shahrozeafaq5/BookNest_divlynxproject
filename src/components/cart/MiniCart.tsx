"use client";
import Link from "next/link";
import { useCartCount } from "@/hooks/useCartCount";
import MiniCart from "@/components/cart/MiniCart";

export default function Navbar() {
  const cartCount = useCartCount();

  return (
    <nav className="fixed top-0 z-[60] w-full h-24 flex items-center bg-[#FDFCF8]/90 backdrop-blur-md border-b border-[#8B6F47]/10">
      <div className="max-w-6xl mx-auto w-full px-8 flex items-center justify-between">

        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 border border-[#8B6F47]/40 rounded-full flex items-center justify-center transition-all group-hover:bg-[#2B2A28]">
            <span className="text-[#8B6F47] group-hover:text-[#FDFCF8] font-serif font-bold text-lg">B</span>
          </div>
          <span className="font-serif italic text-xl tracking-tighter text-[#2B2A28]">BookNest</span>
        </Link>

        {/* 2. THE SEQUENCE */}
        <div className="flex items-center gap-10">
          
          {/* THE "ARCHIVE" (LEFT MOST) */}
          <Link
            href="/books"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6F47] hover:text-[#2B2A28] transition-colors"
          >
            Archive
          </Link>

          {/* BOOKS AND ABOUT */}
          <Link
            href="/books"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6F47] hover:text-[#2B2A28] transition-colors"
          >
            Books
          </Link>

          <Link
            href="/about"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6F47] hover:text-[#2B2A28] transition-colors"
          >
            About
          </Link>

          {/* SIGN IN (AFTER ABOUT) */}
          <Link
            href="/login"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6F47] hover:text-[#2B2A28] transition-colors ml-4"
          >
            Sign In
          </Link>

          {/* THE BAG (LAST) */}
          <div className="flex items-center gap-2 pl-6 border-l border-[#8B6F47]/10">
            {/* MiniCart is the "Hover" component. 
               We remove the extra "Cart" text link to stop the "Bag Bag" look.
            */}
            <MiniCart />
            
            <Link href="/cart" className="relative flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2B2A28]">
                The Bag
              </span>
              {cartCount > 0 && (
                <span className="min-w-[16px] h-[16px] rounded-full bg-[#8B6F47] text-[#FDFCF8] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}