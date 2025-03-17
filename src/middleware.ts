import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

const adminRoutes = ["/admin", "/api/products", "/api/orders"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;
  const token = req.cookies.get("accessToken")?.value;

  // Allow GET request to get products, but not to add or delete (POST / DELETE)
  if (["/api/products"].some((route) => route.startsWith(pathname)) && method === "GET") {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      if (["/login", "/register"].includes(pathname)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  try {
    const decoded = await verifyToken(token);

    if (["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/api/orders") && (method === "GET" || method === "POST")) {
      const response = NextResponse.next();
      response.headers.set("user", JSON.stringify(decoded));
      return response;
    }

    if (adminRoutes.some((route) => route.startsWith(pathname)) && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const response = NextResponse.next();
    response.headers.set("user", JSON.stringify(decoded));
    return response;
  } catch {
    if (["/login", "/register"].includes(pathname)) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/cart",
    "/profile",
    "/api/profile",
    "/api/products",
    "/api/orders",
    "/api/orders/:orderId",
    "/admin",
    "/login",
    "/register",
  ],
};
