import Header from "@/components/Header";
import ProductCard from "@/components/Product";
import { Product } from "@prisma/client";

export default async function Home() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/products`);

  if (!response.ok) {
    console.error("Failed to fetch products: ", response);
    return <div>Error loading products: {await response.text()}</div>;
  }

  const products: Product[] = await response.json();

  return (
    <div>
      <Header />
      <div className="mt-[200px] px-5">
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
