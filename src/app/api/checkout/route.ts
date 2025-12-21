import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // 1. Get User ID from token
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    // 2. Find the user's cart
    const cart = await Cart.findOne({ user: payload.id }).populate("items.book");
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3. Calculate total price and prepare order items
    const totalPrice = cart.items.reduce((acc: number, item: any) => {
      return acc + (item.book.price * item.quantity);
    }, 0);

    const orderItems = cart.items.map((item: any) => ({
      book: item.book._id,
      quantity: item.quantity,
      price: item.book.price, // Locking in the price at time of purchase
    }));

    // 4. Create the Order
    const newOrder = await Order.create({
      user: payload.id,
      items: orderItems,
      totalPrice,
      status: "pending",
    });

    // 5. Clear the User's Cart
    await Cart.findOneAndUpdate({ user: payload.id }, { items: [] });

    return NextResponse.json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}