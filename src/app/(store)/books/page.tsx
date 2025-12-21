import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import BookCard from "@/components/books/BookCard";

export default async function BooksPage() {
  await connectDB();
  const rawBooks = await Book.find({}).lean();
  const books = JSON.parse(JSON.stringify(rawBooks));

  return (
    <main className="min-h-screen pt-24 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-2xl mb-20">
          <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none">
            Selected <span className="text-slate-400">Works.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Our library is a curated collection of timeless classics and modern essentials. 
            Quality over quantity, always.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {books.map((book: any, index: number) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}