import Header from "@/components/Header";
import Product from "@/components/Product";
import { ProductType } from "@/lib/types";
import axios from "axios";

export default async function Home() {
  const response = await axios.get("http://localhost:3000/api/products");
  const products: ProductType[] = response.data;

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
