import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import { createOrderSchema } from "@/lib/schemas";

interface CartItem {
  productId: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { error } = createOrderSchema.validate(data);
  if (error) {
    return Response.json({ error: error.details[0].message }, { status: 400 });
  }

  const user = JSON.parse(request.headers.get("user")!) as User;
  const { cartItems } = data as { cartItems: CartItem[] };
  const productIds = cartItems.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  for (const cartItem of cartItems) {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) {
      return NextResponse.json({ error: `Product id ${cartItem.productId} is invalid` }, { status: 400 });
    }
    if (product.stock < cartItem.quantity) {
      return NextResponse.json({ error: `Not enough stock for product id ${cartItem.productId}` }, { status: 400 });
    }
  }

  const totalAmount = cartItems.reduce((sum, cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return sum + product!.price * cartItem.quantity;
  }, 0);

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        totalAmount,
        orderProducts: {
          create: cartItems.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          })),
        },
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) continue;

      await tx.product.update({
        where: { id: cartItem.productId },
        data: { stock: product.stock - cartItem.quantity },
      });
    }

    return newOrder;
  });

  return NextResponse.json(order);
}
