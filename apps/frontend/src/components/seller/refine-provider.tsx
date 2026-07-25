"use client";

import { Refine, useMenu } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ChartNoAxesColumnDecreasing,
  Package,
  Power,
  ShoppingBag,
  Store,
  Tags,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { RiMotorbikeLine } from "react-icons/ri";

// Replace with your actual API URL
const API_URL = "https://api.fake-rest.refine.dev";

export const SellerRefineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        resources={[
          {
            name: "dashboard",
            list: "/seller/dashboard",
            meta: {
              label: "dashboard",
              icon: <ChartNoAxesColumnDecreasing size={18} />,
            },
          },
          {
            name: "orders",
            list: "/seller/orders",
            meta: { label: "orders", icon: <ShoppingBag size={18} /> },
          },
          {
            name: "products",
            list: "/seller/products",
            create: "/seller/products/create",
            edit: "/seller/products/edit/:id",
            meta: { label: "products", icon: <Package size={18} /> },
          },
          {
            name: "customers",
            list: "/seller/customers",
            meta: {
              label: "customers",
              icon: <UsersRound size={18} />,
            },
          },
          {
            name: "categories",
            list: "/seller/categories",
            create: "/seller/categories/create",
            edit: "/seller/categories/edit/:id",
            meta: {
              label: "categories",
              icon: <Tags className="rotate-90" size={18} />,
            },
          },
          {
            name: "stores",
            list: "/seller/stores",
            create: "/seller/stores/create",
            edit: "/seller/stores/edit/:id",
            meta: {
              label: "stores",
              icon: <Store size={18} />,
            },
          },
          {
            name: "couriers",
            list: "/seller/couriers",
            meta: {
              label: "couriers",
              icon: <RiMotorbikeLine size={18} />,
            },
          },
          {
            name: "logout",
            list: "/seller/logout",
            meta: {
              label: "logout",
              icon: <Power className="rotate-90" size={18} />,
            },
          },
        ]}
        options={{ syncWithLocation: true }}
      >
        {children}
      </Refine>
    </Suspense>
  );
};

export default function Sidebar() {
  const { menuItems } = useMenu();

  return (
    <aside className="w-52 border-r bg-gray-50 py-4">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          href={item.route ?? "#"}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
        >
          <span className="text-primary">{item.meta?.icon}</span>
          <span className="capitalize">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}
