import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) {
      return Response.json({ error: "Refresh token required" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!) as DecodedToken;
      const payload = { id: decoded.id, email: decoded.email, role: decoded.role };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "30m" });

      return Response.json({ accessToken });
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Invalid refresh token" }, { status: 403 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
