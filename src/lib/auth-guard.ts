import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export async function requireAdmin(req: NextRequest) {
  // 1. Try to get token from cookies first (for browser/frontend)
  let token = req.cookies.get("token")?.value;

  // 2. Fallback to Authorization header (for Postman/API testing)
  if (!token) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    throw new Error("Unauthorized: Invalid or expired token");
  }

  if (payload.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }

  return payload;
}