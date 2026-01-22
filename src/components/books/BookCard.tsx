"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/cart/AddToCart";

export default function BookCard({ book, index }: { book: any; index: number }) {
  const bookId = book._id.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full"
    >
      <Link href={`/books/${bookId}`}>
        <div className="relative aspect-[3/4.5] overflow-hidden bg-[#EAE7E0] mb-6 border border-[#8B6F47]/10 shadow-sm transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(43,42,40,0.1)] group-hover:-translate-y-2">
          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-black/10 to-transparent z-10" />
          
          {book.image ? (
            <Image 
              src={book.image} 
              alt={book.title}
              fill
              unoptimized 
              className="object-cover opacity-90 grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#FDFCF8] text-[10px] font-serif italic opacity-40 uppercase tracking-[0.3em]">
              Untitled Folio
            </div>
          )}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.2] pointer-events-none" />
        </div>
      </Link>

      <div className="flex flex-col flex-grow space-y-4 px-1 text-center sm:text-left">
        <div className="min-h-[4rem] flex flex-col justify-center">
          <h3 className="font-serif italic text-lg leading-tight text-[#2B2A28] group-hover:text-[#8B6F47] transition-colors duration-300 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-[10px] font-bold text-[#8B6F47] uppercase tracking-[0.25em] mt-1.5">
            {book.author}
          </p>
        </div>
        
        {/* FIX: Use flex-col on mobile to stack price and button, sm:flex-row on desktop */}
        <div className="mt-auto pt-4 border-t border-[#8B6F47]/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
          <span className="font-serif italic text-base text-[#2B2A28]">${book.price}</span>
          
          {/* Ensure the button wrapper takes full width on mobile */}
          <div className="w-full sm:w-auto scale-90 sm:scale-75 origin-center sm:origin-right">
             <AddToCart bookId={bookId} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}