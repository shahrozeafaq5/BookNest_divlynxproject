import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import "@/models/Book";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

async function getUserOrders() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) return [];
  const payload = await verifyToken(token);
  if (!payload) return [];

  const rawOrders = await Order.find({ user: payload.id })
    .populate("items.book")
    .sort({ createdAt: -1 })
    .lean(); // .lean() returns plain objects instead of Mongoose docs

  // ✅ THE FIX: Convert complex MongoDB types (like _id) to plain strings
  return JSON.parse(JSON.stringify(rawOrders));
}

export default async function UserOrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black tracking-tight mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="glass-card p-6">
              <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  {/* Now order._id is a string, so it won't throw an error */}
                  <p className="text-xs font-bold text-gray-400 uppercase">Order ID: {order._id}</p>
                  <p className="text-sm text-brand-dark font-medium">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="capitalize px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-[10px] font-black tracking-widest uppercase">
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.book?._id} className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700">{item.book?.title} <span className="text-gray-400 font-medium">x{item.quantity}</span></span>
                    <span className="font-black">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-black text-xl text-brand-dark">
                <span>Total Paid</span>
                <span>${order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}