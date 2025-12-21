"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then(setForm);
  }, [id]);

  if (!form) return <p>Loading...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/books");
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "category"].map((field) => (
          <input
            key={field}
            className="w-full border p-2 rounded"
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: Number(e.target.value) })
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
}
