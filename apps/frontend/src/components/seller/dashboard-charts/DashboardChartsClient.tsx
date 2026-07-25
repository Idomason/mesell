"use client";

import dynamic from "next/dynamic";

const DailyOrders = dynamic(
  () => import("@/components/seller/dashboard-charts/DailyOrders"),
  {
    loading: () => (
      <div className="h-[280px] animate-pulse bg-gray-100 rounded-md" />
    ),
    ssr: false,
  },
);

const DailyRevenue = dynamic(
  () => import("@/components/seller/dashboard-charts/DailyRevenue"),
  {
    loading: () => (
      <div className="h-[280px] animate-pulse bg-gray-100 rounded-md" />
    ),
    ssr: false,
  },
);

const NewCustomers = dynamic(
  () => import("@/components/seller/dashboard-charts/NewCustomers"),
  {
    loading: () => (
      <div className="h-[280px] animate-pulse bg-gray-100 rounded-md" />
    ),
    ssr: false,
  },
);

export default function DashboardChartsClient() {
  return (
    <div className="flex items-center gap-4">
      <DailyRevenue />
      <DailyOrders />
      <NewCustomers />
    </div>
  );
}
