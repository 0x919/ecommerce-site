import { OrderProductProps } from "@/lib/types";

export default function OrderItem({ orderProduct }: OrderProductProps) {
  return (
    <div className="bg-base-300 rounded-lg p-3 flex items-center justify-between mb-3">
      <h1 className="text-lg font-semibold">
        {orderProduct.product.name} - ${orderProduct.product.price}
      </h1>
      <h1 className="text-lg">Quantity: {orderProduct.quantity}</h1>
    </div>
  );
}
