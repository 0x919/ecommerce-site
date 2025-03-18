import { OrderProduct, Product } from "@prisma/client";

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

export type CheckoutProductProps = {
  product: CartProduct;
};

export type OrderProductProps = {
  orderProduct: OrderProduct & { product: Product };
};

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface CartInfo {
  length: number;
  total: number;
}
