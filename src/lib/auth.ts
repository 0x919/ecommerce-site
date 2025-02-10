import { jwtVerify, SignJWT } from "jose";
import type { User } from "@prisma/client";
import { DecodedToken } from "./types";

export const generateToken = (user: User) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
    const payload = decoded.payload as unknown as DecodedToken;
    return payload;
  } catch {
    throw new Error("Invalid token");
  }
};
