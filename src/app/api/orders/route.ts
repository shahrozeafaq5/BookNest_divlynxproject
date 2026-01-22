import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Book from "@/models/Book";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth.token";
import { isSameOriginRequest } from "@/lib/security";
import { Types, Model } from "mongoose"; // 1. Added Model import

export const dynamic = "force-dynamic"; // 2. Critical for Vercel

type PopulatedCartItem = {
  book: {
    _id: Types.ObjectId;
    title: string;
    price: number;
    stock: number;
  };
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    if (!isSameOriginRequest(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    /* ─── AUTH ─── */
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    /* ─── FETCH CART ─── */
    const cart = await (Cart as Model<any>)
      .findOne({ user: payload.id })
      .populate({ path: "items.book", model: Book })
      .lean();

    if (!cart || !cart.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    /* ─── FILTER INVALID ITEMS ─── */
    const validItems = cart.items.filter(
      (item: any) => item.book && item.book._id
    );

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "Cart contains invalid items. Please re-add products." },
        { status: 400 }
      );
    }

    /* ─── SELF-HEAL CART (IMPORTANT) ─── */
    if (validItems.length !== cart.items.length) {
      await (Cart as Model<any>).updateOne(
        { user: payload.id },
        { $set: { items: validItems.map(i => ({
          book: i.book._id,
          quantity: i.quantity
        }))}}
      );
    }

    /* ─── VALIDATE STOCK & CALCULATE ─── */
    let totalPrice = 0;

    for (const item of validItems) {
      if (item.book.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.book.title}` },
          { status: 400 }
        );
      }
      totalPrice += item.book.price * item.quantity;
    }

    /* ─── CREATE ORDER ─── */
    const order = await (Order as Model<any>).create({
      user: payload.id,
      items: validItems.map((item) => ({
        book: item.book._id,
        quantity: item.quantity,
        price: item.book.price,
      })),
      totalPrice,
      status: "pending",
    });

    /* ─── UPDATE STOCK ─── */
    await Promise.all(
      validItems.map((item) =>
        (Book as Model<any>).findByIdAndUpdate(item.book._id, {
          $inc: { stock: -item.quantity },
        })
      )
    );

    /* ─── CLEAR CART ─── */
    await (Cart as Model<any>).updateOne(
      { user: payload.id },
      { $set: { items: [] } }
    );

    return NextResponse.json(
      { success: true, orderId: order._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("ORDER_API_ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
