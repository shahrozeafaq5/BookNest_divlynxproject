"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-8 overflow-hidden bg-[#F8F9FB]">
      {/* Decorative Background Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -right-20 top-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px]"
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 shadow-sm border border-slate-100">
              New Collection 2025
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[96px] font-black leading-[0.85] tracking-[-0.06em] text-[#1A1D23]"
          >
            Stories <br /> 
            <span className="text-slate-300">Redefined.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-500 font-medium max-w-md leading-relaxed"
          >
            Discover a curated sanctuary for bibliophiles. Where every page turned is a journey reimagined in high-fidelity.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-8"
          >
            <Link href="/books" className="px-10 py-5 bg-[#1A1D23] text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/20 active:scale-95">
              Explore Library
            </Link>
            <Link href="/about" className="text-sm font-black uppercase tracking-widest border-b-2 border-[#1A1D23] pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
              Our Ethos
            </Link>
          </motion.div>
        </div>

        {/* Hero Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square bg-white rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center"
        >
          <div className="absolute inset-10 border-2 border-dashed border-slate-100 rounded-[48px]" />
          <span className="text-[180px] font-black text-slate-50 select-none">B.N</span>
        </motion.div>
      </div>
    </section>
  );
}