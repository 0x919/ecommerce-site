"use client";

import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import { useState, useEffect } from "react";
import { getCartInfo, getCartItems } from "@/lib/utils";
import { CartProduct } from "@/lib/types";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartInfo, setCartInfo] = useState(getCartInfo());

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  const handleCartUpdate = () => {
    const items = getCartItems();
    setCartItems(items);
    const cartInfo = getCartInfo();
    setCartInfo(cartInfo);
  };

  return (
    <div>
      <Header cartInfo={cartInfo} />
      <div className="p-2 sm:p-10">
        <div className="bg-base-200 p-5 rounded-lg">
          <h1 className="text-[35px] mb-10">Cart</h1>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} onCartUpdate={handleCartUpdate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
