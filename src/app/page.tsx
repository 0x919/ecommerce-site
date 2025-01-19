import Header from "@/components/Header";
import Product from "@/components/Product";
import { ProductType } from "@/types/types";

const product: ProductType = {
  name: "Product",
  description: "Product sample description",
  id: 10,
  image: "/assets/test.jpg",
  price: 9.99,
};

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-[200px] px-5">
        <div>
          <Product product={product} />
        </div>
      </div>
    </div>
  );
}
