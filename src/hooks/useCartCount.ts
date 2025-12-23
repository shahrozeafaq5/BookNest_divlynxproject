"use client";

import { useEffect, useState } from "react";

export function useCartCount() {
  const [count, setCount] = useState(0);

  async function fetchCount() {
    try {
      const res = await fetch("/api/cart/count", {
        cache: "no-store",
      });
      const data = await res.json();
      setCount(data.count || 0);
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchCount();

    // Listen for cart updates
    const handler = () => fetchCount();
    window.addEventListener("cart-updated", handler);

    return () => {
      window.removeEventListener("cart-updated", handler);
    };
  }, []);

  return count;
}
