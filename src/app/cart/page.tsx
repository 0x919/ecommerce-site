"use client";

import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { cartItems, cartInfo, updateCart } = useCart();

  return (
    <div>
      <Header cartInfo={cartInfo} />
      <div className="p-2 sm:p-10">
        <div className="bg-base-200 p-5 rounded-lg">
          <h1 className="text-[35px] mb-10">Cart</h1>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} onCartUpdate={updateCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
