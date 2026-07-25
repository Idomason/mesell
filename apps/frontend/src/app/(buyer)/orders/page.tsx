"use client";

import { orderApi } from "@/app/api/orders";
import { Button } from "@workspace/ui/components/ui/button";
import { Input } from "@workspace/ui/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { BsFillCartFill } from "react-icons/bs";
import { OrderTable } from "@workspace/ui/components/ui/order-table";

// This fetch function remains outside your component safely
const fetchMyOrders = async () => {
  const res = await orderApi.getAllUserOrders();

  return res.data.myOrders; // Ensure you return the actual rows array payload
};

export type BackendSubItem = {
  _id: string;
  product: string; // Product ID
  seller: string; // Seller ID
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryStatus: "pending" | "fulfilled" | "delivered" | "cancelled";
  payoutStatus: string;
};

export type BackendOrderGroup = {
  _id: string;
  createdAt: string;
  paymentStatus: "paid" | "pending" | "refunded";
  totalAmount: number;
  deliveryStatus: string;
  items: BackendSubItem[];
};

// Helper function to turn nested database logs into flat row presentation views
const flattenBackendOrders = (orderGroups: BackendOrderGroup[]) => {
  if (!orderGroups || !Array.isArray(orderGroups)) return [];

  return orderGroups.flatMap((group) => {
    // Extract global attributes from the main checkout bucket
    const orderDate = new Date(group.createdAt).toISOString().split("T")[0]; // e.g. "2026-06-10"
    const parsedPayment = (group.paymentStatus.charAt(0).toUpperCase() +
      group.paymentStatus.slice(1)) as any;

    return group.items.map((item) => {
      // Map item-specific status tags to your frontend layout badge strings
      let displayStatus: "Ordered" | "Fulfilled" | "Delivered" | "Cancelled" =
        "Ordered";
      if (item.deliveryStatus === "fulfilled") displayStatus = "Fulfilled";
      if (item.deliveryStatus === "delivered") displayStatus = "Delivered";
      if (item.deliveryStatus === "cancelled") displayStatus = "Cancelled";

      return {
        id: item._id, // Use unique sub-item ID so drag-and-drop key indexing works flawlessly
        date: orderDate,
        orderStatus: displayStatus,
        orderNumber: `MS-${group._id.slice(-9).toUpperCase()}`, // Shortens hex strings into clean "MS-9081" formats
        seller: `Seller (${item.seller.slice(-6)})`, // Replace with dynamic seller name strings if populated
        paymentStatus: parsedPayment,
        product: `Product (${item.product.slice(-6)})`, // Replace with populated title strings later
        amount: item.quantity,
        price: `₦${item.totalPrice.toLocaleString()}`, // Formats 20000 into "₦20,000"
      };
    });
  });
};

export default function Orders() {
  const {
    data: rawGroups,
    isLoading,
    error,
  } = useQuery<BackendOrderGroup[]>({
    queryKey: ["my-orders"],
    queryFn: fetchMyOrders,
  });

  if (isLoading)
    return <div className="p-8 text-center">Loading your orders...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-destructive">
        Failed to load orders.
      </div>
    );

  // Process and flatten your MongoDB database arrays safely right here
  const normalizedOrders = flattenBackendOrders(rawGroups || []);

  return (
    <section className="py-10 bg-gray-200 font-sans w-full min-h-screen overflow-x-visible">
      <div className="px-4 sm:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-primary-50 rounded-md ring-primary/20 ring-1">
              <BsFillCartFill className="fill-primary-500 size-5" />
            </button>
            <h1 className="text-lg text-primary font-semibold md:text-2xl">
              My Orders
            </h1>
          </div>

          <form className="flex items-center bg-white border-white border-2 py-1 px-1 ring-gray-200 ring-1 rounded-md">
            <Input
              type="search"
              placeholder="Search an order"
              className="border-none bg-white p-1 px-2 md:w-72 shadow-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="tracking-wide uppercase font-medium">
              Search
            </Button>
          </form>
        </div>

        <div>{/* Filter */}</div>
        <div className="mt-24">
          {/* 4. Pass the real network data down to your table component as a prop */}
          <OrderTable initialData={normalizedOrders} />
        </div>
      </div>
    </section>
  );
}
