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
      className="group flex flex-col h-full overflow-hidden" // Added overflow-hidden to prevent card breakout
    >
      <Link href={`/books/${bookId}`}>
        <div className="relative aspect-[3/4.5] overflow-hidden bg-[#EAE7E0] mb-4 border border-[#8B6F47]/10 shadow-sm transition-all duration-700 group-hover:shadow-[0_20px_40px_rgba(43,42,40,0.1)] group-hover:-translate-y-1">
          <div className="absolute left-0 top-0 w-3 h-full bg-gradient-to-r from-black/5 to-transparent z-10" />
          {book.image && (
            <Image 
              src={book.image} 
              alt={book.title}
              fill
              unoptimized 
              className="object-cover opacity-90 transition-all duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.15] pointer-events-none" />
        </div>
      </Link>

      <div className="flex flex-col flex-grow px-1">
        <div className="mb-3">
          <h3 className="font-serif italic text-base md:text-lg leading-tight text-[#2B2A28] line-clamp-2 min-h-[2.5rem]">
            {book.title}
          </h3>
          <p className="text-[9px] font-bold text-[#8B6F47] uppercase tracking-[0.2em] mt-1 truncate">
            {book.author}
          </p>
        </div>
        
        {/* Footer: Uses flex-col for mobile to prevent horizontal overflow */}
        <div className="mt-auto pt-3 border-t border-[#8B6F47]/10 flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <span className="font-serif italic text-sm md:text-base text-[#2B2A28]">
              ${book.price}
            </span>
          </div>
          
          {/* Button wrapper forced to 100% width on mobile */}
          <div className="w-full">
             <AddToCart bookId={bookId} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}