export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";
import Image from "next/image";

type SearchParams = {
  q?: string;
  category?: string;
  sort?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function BooksPage({ searchParams }: Props) {
  let books: any[] = [];

  try {
    await connectDB();
    
    const resolvedParams = await searchParams;
    const { q, category, sort } = resolvedParams;
    
    const query: any = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category.toLowerCase();
    }

    let sortQuery: any = { createdAt: -1 };
    if (sort === "price") sortQuery = { price: 1 };
    if (sort === "latest") sortQuery = { createdAt: -1 };

    const rawBooks = await Book.find(query).sort(sortQuery).lean();
    books = JSON.parse(JSON.stringify(rawBooks));
  } catch (error) {
    console.error("BooksPage SSR error:", error);
  }

  return (
    <div className="min-h-screen relative px-6 md:px-12 lg:px-24">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2940&auto=format&fit=crop"
          alt="Library Archive Background"
          fill
          className="object-cover opacity-[0.08] grayscale sepia-[20%]"
          priority
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/40 via-[#FDFCF8]/90 to-[#FDFCF8]" />
      </div>

      <div className="relative z-10 pt-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8 mb-16 md:mb-24 border-b border-[#8B6F47]/10 pb-12 md:pb-16">
          <h1 className="font-scripture text-7xl md:text-9xl tracking-tighter opacity-10 leading-none">01</h1>
          <div className="max-w-2xl">
            <h2 className="font-serif italic text-4xl md:text-6xl mb-4 md:mb-6">
              Selected <span className="text-[#8B6F47]">Folios</span>
            </h2>
            <p className="font-serif italic text-base md:text-lg text-[#6B6B6B]">
              Browse our curated archive of essential human thought.
            </p>
          </div>
        </header>

        <BookFilters />

        {/* Results Counter */}
        <div className="mt-8 mb-12">
          <p className="font-serif italic text-sm text-[#8B6F47]/70">
            {books.length === 0
              ? "No folios match your search"
              : books.length === 1
              ? "1 folio found"
              : `${books.length} folios found`}
          </p>
        </div>

        {/* Professional Grid Layout */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
             <p className="italic text-[#8B6F47]/60 text-center">Try adjusting your search or filters.</p>
          </div>
        ) : (
          /* grid-cols-2: Fixes the 'one large book' issue on mobile.
             gap-x-6: Tightens horizontal spacing for small screens.
             gap-y-16: Ample vertical space to keep the premium feel.
          */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16 md:gap-y-24 mb-24">
            {books.map((book: any, index: number) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}