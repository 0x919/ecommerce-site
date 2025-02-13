import Header from "@/components/Header";
import { ProductType } from "@/lib/types";
import CartItem from "@/components/CartItem";

const product: ProductType = {
  name: "Product",
  description: "Product sample description",
  id: 10,
  imageUrl: "/assets/test.jpg",
  price: 9.99,
};

export default function Cart() {
  return (
    <div>
      <Header />
      <div className="p-2 sm:p-10">
        <div className="bg-base-200 p-5 rounded-lg">
          <h1 className="text-[35px] mb-10">Cart</h1>
          <div>
            <CartItem product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
