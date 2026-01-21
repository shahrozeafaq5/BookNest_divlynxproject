import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import "@/models/Book"; // Ensure Book model is registered for population
import { verifyToken } from "@/lib/auth.token";
import { cookies } from "next/headers"; // 1. Import for Next.js 15
import { Model } from "mongoose";      // 2. Import for type casting

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // 3. Use Next.js 15 async cookies API
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // 4. FIX: Cast Order to Model<any> to fix 'user' property TS error
    const orders = await (Order as Model<any>).find({ user: payload.id })
      .populate("items.book", "title price")
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance in API routes

    // 5. Serialize and return
    return NextResponse.json(JSON.parse(JSON.stringify(orders)));
  } catch (error: any) {
    console.error("ORDERS_GET_ERROR:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message }, 
      { status: 500 }
    );
  }
}