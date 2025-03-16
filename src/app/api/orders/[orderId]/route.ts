import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const user = JSON.parse(request.headers.get("user")!);

    const orderId = Number((await params).orderId);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Order ID must be a number" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (user.id !== order.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: `Failed to get order: ${error}` }, { status: 500 });
  }
}
