"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ user }: { user: any }) {
  return (
    <nav className="fixed top-0 z-50 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-[#EEEFF2]">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#1A1D23] rounded-xl flex items-center justify-center transition-all group-hover:bg-blue-600">
             <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-xl font-bold tracking-[-0.03em]">BookNest.</span>
        </Link>

        <div className="flex items-center gap-10">
          {["Shop", "Collections", "About"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#8E94A0] hover:text-[#1A1D23] transition-colors">
              {item}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-[#EEEFF2]" /> {/* Vertical Divider */}

          {user ? (
            <Link href="/cart" className="flex items-center gap-2">
               <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#1A1D23]">Cart</span>
               <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">0</div>
            </Link>
          ) : (
            <Link href="/login" className="px-6 py-2.5 bg-[#1A1D23] text-white rounded-full text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}