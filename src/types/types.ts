export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
}

export type ProductProps = {
  product: ProductType;
};
