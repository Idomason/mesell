import Checkout from "@/components/checkout/Checkout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <div className="container mx-auto p-4 md:px-8 bg-gray-200 h-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary py-2 mb-4">
          Shipping Details
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_400px] gap-4 mt-4">
        <Checkout />

        {/* Order Summary */}
        <div className="h-fit bg-primary p-4 rounded shadow text-white">
          <h2 className="text-lg font-semibold border-b border-primary-600 pb-2">
            Order Summary
          </h2>
          <div className="my-5 pt-5 pb-5 bg-black/75 p-3 rounded">
            <strong className="text-white flex items-center gap-2 mb-2">
              <button className="h-4 w-4 p-3.5 rounded-full bg-white shadow flex items-center justify-center">
                🎁
              </button>
              <span>Buying gift for a loved one?</span>
            </strong>
            <p className="text-sm text-gray-300 font-medium py-2">
              Gift wrap and personalizes message on card, only for N3,000
            </p>
            <Textarea
              placeholder="Write a personalized message to be included in the card"
              className="w-full bg-gray-100 text-gray-700 rounded p-2 text-sm mb-2 my-3"
            />
            <Button className="bg-white text-primary px-4 py-1 rounded mt-4 font-semibold hover:text-white">
              Add gift wrap 🎁
            </Button>
          </div>
          <div className="border-t border-primary-600 py-5">
            <strong className="text-white text-xl mb-3 inline-block">
              Price Details
            </strong>
            <div>
              <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
                <span>10 Items</span>
                <span>$1099.99</span>
              </p>

              <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
                <span>Subtotal</span>
                <span>$99.99</span>
              </p>
              <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
                <span>Shipping</span>
                <span>$5.99</span>
              </p>
              <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
                <span>Gift Wrap</span>
                <span>$5.99</span>
              </p>
              <p className="flex items-center justify-between mt-4 font-bold text-lg border-t border-primary-600 pt-5">
                <span>Total</span>
                <span>$105.98</span>
              </p>
            </div>
          </div>
          <Button
            size={"lg"}
            className="w-full bg-white text-primary text-lg px-4 py-1 rounded mt-4 font-semibold hover:text-white hover:bg-black/75"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
