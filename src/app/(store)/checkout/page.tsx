"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      if (res.ok) {
        alert("Thank you! Your order has been placed.");
        router.push("/orders"); // We will build this page in Phase 4
      } else {
        const data = await res.json();
        alert(data.error || "Checkout failed");
      }
    } catch (error) {
      alert("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Finalize Your Order</h1>
      <p className="text-gray-600 mb-8">
        By clicking the button below, your order for the items in your cart will be processed.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg border mb-8 text-left">
        <h2 className="font-semibold mb-2">Payment Method</h2>
        <p className="text-sm text-gray-500 italic">Cash on Delivery (Simulated)</p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 transition-all"
      >
        {loading ? "Processing..." : "Confirm & Place Order"}
      </button>
    </div>
  );
}