import { Seller } from "./Sellers";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  totalSold: number;
  isLive: boolean;
  images: string[];
  seller: Seller;
}
