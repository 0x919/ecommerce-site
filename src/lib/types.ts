import { Product } from "@prisma/client";

export type ProductProps = {
  product: Product;
};

export interface CartProduct extends Product {
  count: number;
}

export type CartProductProps = {
  product: CartProduct;
};

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
