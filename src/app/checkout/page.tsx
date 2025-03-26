"use client";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Link from "next/link";
import CheckoutItem from "@/components/CheckoutItem";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cartInfo, cartItems } = useCart();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      setError(null);
      const response = await axios.post("/api/orders", {
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.count,
        })),
      });
      const orderId = response.data.id;
      router.push(`/order/${orderId}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        console.log(error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header cartInfo={cartInfo} />
      <div className="p-2 sm:p-10 flex flex-col sm:flex-row">
        <div className="bg-base-200 p-5 rounded-lg sm:w-3/4 sm:mr-5 mb-5 sm:mb-0 flex flex-col items-center sm:justify-between">
          <h1 className="text-[35px]">Checkout</h1>
          <div>
            <h1 className="text-red-500 mb-5 text-2xl">{error}</h1>
            <button className="btn btn-primary text-2xl w-[200px]" onClick={handlePlaceOrder}>
              Place order
            </button>
          </div>
        </div>
        <div className="bg-base-200 p-5 rounded-lg sm:w-1/4">
          <div className="flex justify-between">
            <h1 className="text-[25px] mb-10">{cartInfo.length} Items</h1>
            <Link className="text-[25px] cursor-pointer" href="/cart">
              Edit
            </Link>
          </div>
          <div>
            {cartItems.map((item) => (
              <CheckoutItem product={item} key={item.id} />
            ))}
          </div>
          <div className="bg-base-100 h-[1px] w-full my-3"></div>
          <h1 className="text-[20px]">Total to pay: ${cartInfo.total}</h1>
        </div>
      </div>
    </div>
  );
}
