import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  try {
    const decoded = await verifyToken(token);

    if (pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const response = NextResponse.next();
    response.headers.set("user", JSON.stringify(decoded));
    return response;
  } catch {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/cart", "/profile", "/api/profile", "/api/products", "/admin"],
};
