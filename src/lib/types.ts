export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export type ProductProps = {
  product: ProductType;
};
