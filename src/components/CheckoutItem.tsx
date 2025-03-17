import { CheckoutProductProps } from "@/lib/types";

export default function CheckoutItem({ product }: CheckoutProductProps) {
  return (
    <div className="bg-base-300 rounded-lg p-3 flex items-center justify-between mb-3">
      <h1 className="text-lg font-semibold">
        {product.name} - ${product.price}
      </h1>
      <h1 className="text-lg">Quantity: {product.count}</h1>
    </div>
  );
}
