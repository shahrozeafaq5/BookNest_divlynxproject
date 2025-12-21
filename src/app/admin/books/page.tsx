import Link from "next/link";
import AdminBooksTable from "@/components/admin/AdminBooksTable";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books", {
    cache: "no-store",
  });

  const data = await res.json();

  if (Array.isArray(data.data)) return data.data;
  return [];
}

export default async function AdminBooksPage() {
  const books = await getBooks();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <Link
          href="/admin/books/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <AdminBooksTable books={books} />
      )}
    </div>
  );
}
