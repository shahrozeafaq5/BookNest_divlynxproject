"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    router.push("/admin/books");
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "author", "category"].map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full border p-2 rounded"
            value={(form as any)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <input
          type="number"
          placeholder="price"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="stock"
          className="w-full border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Book
        </button>
      </form>
    </div>
  );
}
