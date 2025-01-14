import { ProductProps } from "@/types/types";
import Image from "next/image";

export default function CartItem({ product }: ProductProps) {
  return (
    <div className="bg-base-300 rounded-lg p-3 flex">
      <div className="relative w-20 h-20 rounded overflow-hidden mr-5">
        <Image src={product.img} alt={product.name} fill sizes="100vw"></Image>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="">{product.description}</p>
      </div>
      <div className="flex items-center mr-5">
        <p className="mr-10 text-3xl font-semibold">${product.price}</p>
        <button className="btn btn-primary">Remove</button>
      </div>
    </div>
  );
}
