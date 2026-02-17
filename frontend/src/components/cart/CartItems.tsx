import Item from "./Item";

type SetTotalProp = {
  onSetTotal: (t: number) => void;
};

export default function CartItems({ cartData, onSetTotal }: SetTotalProp) {
  return (
    <div className="w-full bg-white rounded-md">
      <div>
        <ul role="list" className="divide-y divide-gray-200 px-2">
          {cartData.map((item) => (
            <Item key={item.id} item={item} onSetTotal={onSetTotal} />
          ))}
        </ul>
        <div className="px-2 py-5 text-center border-t">
          <button className="text-sm font-medium text-red-600 hover:text-red-500 cursor-pointer hover:underline">
            Remove all from cart
          </button>
        </div>
      </div>
    </div>
  );
}
