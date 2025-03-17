import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";
import { registerSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;

    const { error } = registerSchema.validate(data);
    if (error) {
      return Response.json({ error: error.details[0].message }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { email, passwordHash, role: "user" };
    const user = await prisma.user.create({ data: newUser });

    const token = await generateToken(user);

    const response = NextResponse.json({ message: "Account registered!" });

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
