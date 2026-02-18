import { Seller } from "./Sellers";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  totalSold: number;
  isLive: boolean;
  images: string[];
  seller: Seller;
  category: string;
}
