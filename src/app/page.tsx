import Header from "@/components/Header";
import Product from "@/components/Product";
import { ProductType } from "@/lib/types";

export default async function Home() {
  const response = await fetch(`${process.env.BASE_URL}/api/products`);

  if (!response.ok) {
    console.error("Failed to fetch products");
    return <div>Error loading products</div>;
  }

  const products: ProductType[] = await response.json();

  return (
    <div>
      <Header />
      <div className="mt-[200px] px-5">
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
