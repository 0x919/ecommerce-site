export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export type ProductProps = {
  product: ProductType;
};

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
