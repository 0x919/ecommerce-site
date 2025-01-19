import { ProductProps } from "@/types/types";
import Image from "next/image";

export default function Product({ product }: ProductProps) {
  return (
    <div className="card bg-base-300 w-[300px] h-[400px] shadow-xl rounded-lg overflow-hidden">
      <div className="relative h-1/2 w-full">
        <Image src={product.image} alt={product.name} fill sizes="100vw" />
      </div>
      <div className="px-5 flex-1 overflow-hidden">
        <h1 className="text-[30px] mb-2 font-bold">{product.name}</h1>
        <p className="overflow-hidden">{product.description}</p>
      </div>
      <div className="p-5 flex justify-between">
        <p className="text-[30px] font-semibold">${product.price}</p>
        <button className="btn btn-primary">Add to cart</button>
      </div>
    </div>
  );
}
