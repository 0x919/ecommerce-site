"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/Product";
import { Product } from "@prisma/client";
import { getCartInfo } from "@/lib/utils";

export default function Home() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const [products, setProducts] = useState<Product[]>([]);
  const [cartInfo, setCartInfo] = useState(getCartInfo());

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

  const handleCartUpdate = () => {
    const cart = getCartInfo(); // Assuming getCartInfo is defined in the utils file
    setCartInfo(cart);
  };

  return (
    <div>
      <Header cartInfo={cartInfo} />
      <div className="mt-[200px] px-5">
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onCartUpdate={handleCartUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}
