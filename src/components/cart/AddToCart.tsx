"use client";

import { useEffect, useState } from "react";

export default function AddToCart({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [exists, setExists] = useState(false);

  // 🔍 Check if book already in cart
  useEffect(() => {
    let mounted = true;

    async function checkCart() {
      try {
        const res = await fetch(
          `/api/cart/contains?bookId=${bookId}`
        );
        const data = await res.json();

        if (mounted && data.exists) {
          setExists(true);
        }
      } catch {
        // silently ignore
      }
    }

    checkCart();

    return () => {
      mounted = false;
    };
  }, [bookId]);

  async function handleAdd() {
    try {
      setLoading(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      setAdded(true);
      setExists(true);

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
      disabled={loading || exists}
      className="
        w-full
        px-12
        py-5
        border
        border-[#2B2A28]
        text-[11px]
        font-bold
        uppercase
        tracking-[0.35em]
        transition-all
        duration-300

        bg-[#2B2A28]
        text-[#FDFCF8]

        hover:bg-[#8B6F47]
        hover:border-[#8B6F47]

        disabled:bg-[#EAE7E0]
        disabled:text-[#8B6F47]
        disabled:border-[#8B6F47]/30
        disabled:cursor-not-allowed
      "
    >
      {exists
        ? "Already in Collection"
        : loading
        ? "Archiving…"
        : added
        ? "Added to Collection"
        : "Add to Collection"}
    </button>
  );
}
