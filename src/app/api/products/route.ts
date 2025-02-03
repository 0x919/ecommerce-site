import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: `Failed to fetch products: ${error}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, stock, imageUrl } = await req.json();
    const product = await prisma.product.create({
      data: { name, description, price, stock, imageUrl },
    });

    return Response.json({ product }, { status: 201 });
  } catch (error) {
    return Response.json({ error: `Failed to create product: ${error}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return Response.json({ message: "Product deleted" });
  } catch (error) {
    return Response.json({ error: `Failed to delete message: ${error}` }, { status: 500 });
  }
}
