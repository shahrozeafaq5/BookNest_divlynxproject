"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdd() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      if (res.status === 401) {
        alert("Please login to add items to cart");
        router.push("/login");
        return;
      }

      if (res.ok) {
        alert("Added to cart!");
        router.refresh(); // Updates the UI state
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors w-full"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}