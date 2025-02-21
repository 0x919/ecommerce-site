import { Product } from "@prisma/client";

export type ProductProps = {
  product: Product;
  onCartUpdate: () => void;
};

export interface CartProduct extends Product {
  count: number;
}

export type CartProductProps = {
  product: CartProduct;
  onCartUpdate: () => void;
};

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
