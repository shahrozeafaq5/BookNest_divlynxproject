"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [exists, setExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    async function checkCart() {
      try {
        const res = await fetch(`/api/cart/contains?bookId=${bookId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (mounted && data.exists) {
          setExists(true);
        }
      } catch { /* ignore */ }
    }
    checkCart();
    return () => { mounted = false; };
  }, [bookId]);

  async function handleAdd() {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId, quantity: 1 }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Please sign in to add items to your cart.");
          router.push("/login");
          return;
        }
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to add to cart");
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
        /* Reduced padding for mobile, larger for desktop */
        px-2 sm:px-12
        py-3 sm:py-5
        
        border
        border-[#2B2A28]
        /* Smaller font on mobile to ensure text fits */
        text-[9px] sm:text-[11px]
        font-bold
        uppercase
        /* Slightly tighter tracking on mobile */
        tracking-[0.2em] sm:tracking-[0.35em]
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
        /* Added to handle text wrap elegantly */
        whitespace-normal
        leading-tight
      "
    >
      {exists
        ? "In Collection"
        : loading
        ? "Archiving…"
        : added
        ? "Added"
        : "Add to Collection"}
    </button>
  );
}