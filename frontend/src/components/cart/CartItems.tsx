"use client";

import { Product } from "@/Types/Products";
import Item from "./Item";
import { useProductStore } from "@/store/productStore";

type CartItemsProp = {
  cartData: Product[];
};

export default function CartItems({ cartData }: CartItemsProp) {
  const removeAllCartItems = useProductStore(
    (state) => state.removeAllCartItems,
  );
  return (
    <div className="w-full bg-white rounded-md">
      <div>
        <ul role="list" className="divide-y divide-gray-200 px-2">
          {cartData.map((item) => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
        <div className="px-2 py-5 text-center border-t">
          <button
            onClick={() => removeAllCartItems()}
            className="text-sm font-medium text-red-600 hover:text-red-500 cursor-pointer hover:underline"
          >
            Remove all from cart
          </button>
        </div>
      </div>
    </div>
  );
}
