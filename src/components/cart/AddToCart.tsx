"use client";

import { useState } from "react";

export default function AddToCart({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    try {
      setLoading(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      setAdded(true);

      // ✅ SAFE browser-only event
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error(err);
      alert("Could not add book to cart");
    } finally {
      setLoading(false);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={loading}
      className="w-full px-10 py-5 text-[11px] font-bold uppercase tracking-[0.35em]
                 transition-all duration-300
                 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading
        ? "Archiving…"
        : added
        ? "Added to Collection"
        : "Add to Collection"}
    </button>
  );
}
