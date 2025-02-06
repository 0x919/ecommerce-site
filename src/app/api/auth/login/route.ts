import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

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

    const token = generateToken(user);

    const response = NextResponse.json({ message: "Logged in!" });

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
