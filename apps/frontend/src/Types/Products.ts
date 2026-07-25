import { Seller } from "./Sellers";

export interface Product {
  _id: string | number;
  images: string[];
  color?: string;
  size: string;
  price: number;
  preOrderPrice: number;
  quantity: number;
  name: string;
  description: string;
  totalSold: number;
  sellerId: Seller;
  category: string;
}
