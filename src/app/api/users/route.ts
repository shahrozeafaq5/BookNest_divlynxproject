import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User"; // Ensure you have a User model

export async function GET() {
  try {
    await connectDB();
    // For safety, we usually don't return all users in a real app 
    // without admin protection, so we'll just return a placeholder for now.
    return NextResponse.json({ message: "User Archive Access Authorized" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Archive Access Failed" }, { status: 500 });
  }
}