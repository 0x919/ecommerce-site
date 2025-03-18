"use client";

import axios, { AxiosError } from "axios";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { Order, OrderProduct, Product } from "@prisma/client";
import Header from "@/components/Header";
import OrderItem from "@/components/OrderItem";

export default function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { cartInfo } = useCart();
  const [orderInfo, setOrderInfo] = useState<
    (Order & { orderProducts: (OrderProduct & { product: Product })[] }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const orderId = (await params).orderId;
        const response = await axios.get(`${baseUrl}/api/orders/${orderId}`);
        setOrderInfo(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Something went wrong. Please try again.");
          console.error(error);
        }
      }
    };
    fetchOrderInfo();
  }, [baseUrl, params]);

  return (
    <div>
      <div>
        <Header cartInfo={cartInfo} />
        {error ? (
          <div className="flex justify-center mt-5">
            <p className="text-red-600 text-[80px]">{error}</p>
          </div>
        ) : (
          <div className="p-2 sm:p-10 flex flex-col sm:flex-row">
            <div className="bg-base-200 p-5 rounded-lg sm:w-3/4 sm:mr-5 mb-5 sm:mb-0 flex flex-col items-center sm:items-start sm:justify-between">
              <h1 className="text-[35px] mb-10">Order Info</h1>
              <div className="text-2xl flex flex-col gap-3">
                <p>Order ID: {orderInfo?.id}</p>
                <p>Total amount: ${orderInfo?.totalAmount}</p>
                <p>Status: {orderInfo?.status}</p>
              </div>
            </div>
            <div className="bg-base-200 p-5 rounded-lg sm:w-1/4">
              <div className="flex justify-between">
                <h1 className="text-[25px] mb-10">{cartInfo.length} Items</h1>
              </div>
              <div>
                {orderInfo?.orderProducts.map((item) => (
                  <OrderItem orderProduct={item} key={item.id} />
                ))}
              </div>
              <div className="bg-base-100 h-[1px] w-full my-3"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
