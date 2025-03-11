"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/Product";
import { Product } from "@prisma/client";
import { useCart } from "@/hooks/useCart";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [products, setProducts] = useState<Product[]>([]);
  const { cartInfo, updateCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${baseUrl}/api/products`);
      if (!response.ok) {
        console.error("Failed to fetch products: ", response);
        return;
      }
      const products = await response.json();
      setProducts(products);
    };
    fetchProducts();
  }, [baseUrl]);

  return (
    <div>
      <Header cartInfo={cartInfo} />
      <div className="mt-[200px] px-5">
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onCartUpdate={updateCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
