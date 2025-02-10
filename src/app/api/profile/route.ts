import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = JSON.parse(req.headers.get("x-user")!);
  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  return NextResponse.json(user);
}
