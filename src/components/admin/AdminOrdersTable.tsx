"use client";

import { useState } from "react";

export default function AdminOrdersTable({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);

  async function updateStatus(orderId: string, newStatus: string) {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert("Failed to update status");
    }
  }

  if (orders.length === 0) return <p className="p-4">No orders found.</p>;

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-mono text-xs">{order._id}</td>
              <td className="p-4">{order.user?.email || "Guest"}</td>
              <td className="p-4 font-bold">${order.totalPrice}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="p-4">
                <select 
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border rounded text-xs p-1 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}