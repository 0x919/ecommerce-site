import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
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

    return Response.json({ user });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
