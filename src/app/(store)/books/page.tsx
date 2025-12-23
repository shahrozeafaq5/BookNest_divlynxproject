import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";

type SearchParams = {
  q?: string;
  category?: string;
  sort?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function BooksPage({ searchParams }: Props) {
  await connectDB();

  // 🔥 NEXT 16 FIX: unwrap searchParams
  const { q, category, sort } = await searchParams;

  const query: any = {};

  // 🔍 SEARCH
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
    ];
  }

  // 🏷 CATEGORY (normalized)
  if (category && category !== "All") {
    query.category = category.toLowerCase();
  }

  // ↕ SORT
  let sortQuery: any = { createdAt: -1 };
  if (sort === "price") sortQuery = { price: 1 };
  if (sort === "latest") sortQuery = { createdAt: -1 };

  const rawBooks = await Book.find(query).sort(sortQuery).lean();
  const books = JSON.parse(JSON.stringify(rawBooks));

  return (
    <div className="min-h-screen">

      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row items-baseline gap-8 mb-24 border-b border-[#8B6F47]/10 pb-16">
        <h1 className="font-scripture text-7xl md:text-9xl tracking-tighter opacity-10">
          01
        </h1>

        <div className="max-w-2xl">
          <h2 className="font-serif italic text-4xl md:text-6xl mb-6">
            Selected <span className="text-[#8B6F47]">Folios</span>
          </h2>
          <p className="font-serif italic text-lg text-[#6B6B6B]">
            Browse our curated archive of essential human thought.
          </p>
        </div>
      </header>

      {/* ─── FILTERS ─── */}
      <BookFilters />

      {/* ─── RESULT COUNT ─── */}
      <div className="mt-10 mb-16">
        <p className="font-serif italic text-sm text-[#8B6F47]/70">
          {books.length === 0
            ? "No folios match your search"
            : books.length === 1
            ? "1 folio found"
            : `${books.length} folios found`}
        </p>
      </div>

      {/* ─── GRID ─── */}
      {books.length === 0 ? (
        <p className="italic text-[#8B6F47]/60 mt-20 text-center">
          Try adjusting your search or filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
          {books.map((book: any, index: number) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
