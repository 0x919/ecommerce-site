import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

export const generateToken = (user: User) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "7d" });
};
