import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

export const generateTokens = (user: User) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" }),
  };
};
