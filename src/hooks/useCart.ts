"use client";

import { useState, useEffect } from "react";
import { CartProduct, CartInfo } from "@/lib/types";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartInfo, setCartInfo] = useState<CartInfo>({ length: 0, total: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const items = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];
    setCartItems(items);

    const length = items.reduce((sum, product) => sum + product.count, 0);
    const total = items.reduce((sum, product) => sum + product.price, 0);
    setCartInfo({ length, total });
  }, [setIsClient]);

  const updateCart = () => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];
    setCartItems(items);

    const length = items.reduce((sum, product) => sum + product.count, 0);
    const total = items.reduce((sum, product) => sum + product.price, 0);
    setCartInfo({ length, total });
  };

  return { cartItems, cartInfo, updateCart, isClient };
}
