import { CartProductProps } from "@/lib/types";
import Image from "next/image";
import { addToCart, lowerCartCount, removeFromCart } from "@/lib/utils";

export default function CartItem({ product, onCartUpdate }: CartProductProps) {
  return (
    <div className="bg-base-300 rounded-lg p-3 flex items-center mb-3">
      <div className="hidden sm:block relative w-20 h-20 rounded overflow-hidden mr-5">
        <Image src={product.imageUrl} alt={product.name} fill sizes="100vw"></Image>
      </div>
      <div className="flex-1 w-full">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="">{product.description}</p>
      </div>
      <div className="flex items-center sm:mr-5">
        <div className="bg-primary text-black rounded-xl px-2 flex justify-between gap-3 mr-3 w-[100px]">
          <button
            onClick={() => {
              lowerCartCount(product);
              onCartUpdate();
            }}
          >
            -
          </button>
          <p>{product.count}</p>
          <button
            onClick={() => {
              addToCart(product);
              onCartUpdate();
            }}
          >
            +
          </button>
        </div>
        <div className="flex justify-between w-full">
          <p className="mr-10 sm:mr-10 text-3xl font-semibold w-16">
            ${Math.round(product.price * product.count * 100) / 100}
          </p>
          <button
            onClick={() => {
              removeFromCart(product);
              onCartUpdate();
            }}
            className="btn btn-primary"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
