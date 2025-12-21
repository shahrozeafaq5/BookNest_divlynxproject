import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req); // Security check
    await connectDB();

    const orders = await Order.find({})
      .populate("user", "email") // Get user email instead of just ID
      .populate("items.book", "title") // Get book title
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}