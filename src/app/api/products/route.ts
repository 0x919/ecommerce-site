import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
  } catch (err) {
    return Response.json({ error: "Failed to fetch products: ", err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, description, price, stock, imageUrl } = await req.json();
  const product = await prisma.product.create({
    data: { name, description, price, stock, imageUrl },
  });

  return Response.json({ product }, { status: 201 });
}
