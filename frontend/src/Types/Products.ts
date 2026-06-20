import { Seller } from "./Sellers";

export interface Product {
  _id: string | number;
  images: string[];
  heading: string;
  color?: string;
  size: string;
  price: number;
  quantity: number;
  name: string;
  description: string;
  totalSold: number;
  isLive: boolean;
  seller: Seller;
  category: string;
}
