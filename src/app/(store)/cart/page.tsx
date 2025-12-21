import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import "@/models/Book"; 
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import Link from "next/link";

async function getCart() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;

  return await Cart.findOne({ user: payload.id }).populate("items.book");
}

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items || [];
  const total = items.reduce((acc: number, item: any) => acc + (item.book?.price || 0) * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter text-brand-dark">Your Bag</h1>
        <p className="text-gray-400 font-medium mt-2">{items.length} unique items selected</p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card py-20 text-center">
          <p className="text-xl font-bold text-gray-300 mb-6">Your bag is currently empty.</p>
          <Link href="/books" className="btn-pro bg-brand-primary text-white">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: any) => (
              <div key={item.book?._id} className="glass-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-20 bg-gray-50 rounded-lg flex items-center justify-center font-black text-gray-300">B</div>
                  <div>
                    <h3 className="font-black text-lg text-brand-dark">{item.book?.title}</h3>
                    <p className="text-sm font-bold text-gray-400">QTY: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-xl font-black text-brand-primary">${item.book?.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-1">
            <div className="glass-card p-8 sticky top-32">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              <div className="space-y-4 border-b pb-6 mb-6">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-black">Total</span>
                <span className="text-3xl font-black text-brand-dark">${total}</span>
              </div>
              <Link href="/checkout">
                <button className="btn-pro w-full bg-brand-dark text-white hover:bg-brand-primary shadow-2xl shadow-brand-primary/20">
                  CHECKOUT NOW
                </button>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}