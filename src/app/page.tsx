"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for that "Deep" feeling
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center px-10 overflow-hidden bg-[#F8F9FB] selection:bg-blue-500/10">
      
      {/* ─── DYNAMIC BACKGROUND ORBS ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
        
        {/* ─── LEFT CONTENT ─── */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Curation Vol. 01 / 2025
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              style={{ y: y1 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(60px,8vw,120px)] font-black leading-[0.82] tracking-[-0.07em] text-[#1A1D23]"
            >
              The Art of <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Storytelling.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-2xl text-slate-400 font-medium max-w-lg leading-snug tracking-tight"
            >
              A digital sanctuary where high-fidelity design meets the timeless elegance of the written word.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link href="/books" className="group relative px-12 py-6 bg-[#1A1D23] text-white rounded-[24px] font-bold overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Browse Library
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            
            <Link href="/about" className="group text-sm font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition-colors py-4">
              Our Vision
              <div className="h-[2px] w-0 group-hover:w-full bg-blue-600 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* ─── RIGHT VISUAL (THE "SQUIRCLE") ─── */}
        <motion.div 
          style={{ y: y2, rotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Main Container */}
          <div className="relative w-[500px] h-[650px] bg-white rounded-[80px] shadow-[0_100px_150px_-50px_rgba(0,0,0,0.12)] border border-white/50 flex items-center justify-center overflow-hidden">
            
            {/* Animated Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-purple-50/20" />
            
            {/* Minimalist Logo Graphics */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[800px] h-[800px] border border-slate-100 rounded-full opacity-50"
            />
            
            <div className="relative z-10 text-center">
              <span className="text-[220px] font-black text-[#1A1D23] tracking-tighter drop-shadow-2xl">B.</span>
              <p className="text-sm font-black text-slate-300 uppercase tracking-[0.5em] -mt-10">EST. 2025</p>
            </div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-10 p-5 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50"
            >
              <div className="w-8 h-1 bg-blue-500 rounded-full mb-2" />
              <div className="w-12 h-1 bg-slate-100 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}