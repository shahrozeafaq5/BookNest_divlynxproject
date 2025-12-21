import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in env");
}

// ✅ Keep these as they are (they work in standard Node.js API routes)
export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// ✅ Updated for Edge Compatibility
export async function generateToken(payload: { id: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// ✅ Updated for Edge Compatibility
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; role: "user" | "admin" };
  } catch (error) {
    return null; // Return null instead of throwing to handle logic cleanly
  }
}