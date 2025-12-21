"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/cart/AddToCart";

export default function BookCard({ book, index }: { book: any; index: number }) {
  const bookId = book._id.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/books/${bookId}`}>
        <div className="relative aspect-[3/4.2] overflow-hidden bg-[#F2F2F2] mb-5 border border-black/5 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:-translate-y-1">
          {book.image ? (
            <Image 
              src={book.image} 
              alt={book.title}
              fill
              unoptimized // ✅ Prevents Next.js upstream 404 proxy errors
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white text-xs font-black opacity-20 uppercase tracking-widest">
              Image Pending
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-3 px-1">
        <div>
          <h3 className="text-[13px] font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {book.author}
          </p>
        </div>
        <div className="scale-90 origin-left border-t border-black/5 pt-3">
           <AddToCart bookId={bookId} />
        </div>
      </div>
    </motion.div>
  );
}