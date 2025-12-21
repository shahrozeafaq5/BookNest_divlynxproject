"use client";

import Link from "next/link";

export default function AdminBooksTable({ books }: { books: any[] }) {
  async function deleteBook(id: string) {
    const ok = confirm("Are you sure you want to delete this book?");
    if (!ok) return;

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      alert("Failed to delete book");
      return;
    }

    window.location.reload();
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-t">
              <td className="p-3">{book.title}</td>
              <td className="p-3 text-center">${book.price}</td>
              <td className="p-3 text-center">{book.stock}</td>
              <td className="p-3 text-center space-x-3">
                <Link
                  href={`/admin/books/edit/${book._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteBook(book._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}