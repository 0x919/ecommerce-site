import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas";
import { NextRequest } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;

    const { error } = loginSchema.validate(data);
    if (error) {
      return Response.json({ error: error.details[0].message }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return Response.json({ error: "User doesn't exist" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return Response.json({ error: "Wrong password" }, { status: 401 });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

    return Response.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
