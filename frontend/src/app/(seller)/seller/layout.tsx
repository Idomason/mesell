"use client";

import { Refine, useMenu } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dataProvider } from "@/providers/data-provider";
import { RefineKbarProvider } from "@refinedev/kbar";
import { Home } from "lucide-react";
import Link from "next/link";

const queryClient = new QueryClient();

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <RefineKbarProvider>
  //       <Refine
  //         routerProvider={routerProvider}
  //         dataProvider={{ default: dataProvider }}
  //         resources={[
  //           {
  //             name: "dashboard",
  //             list: "/",
  //             meta: { label: "Home", icon: <Home /> },
  //           },
  //           {
  //             name: "products",
  //             list: "/seller/products",
  //             create: "/seller/products/create",
  //             edit: "/seller/products/edit/:id",
  //           },
  //           {
  //             name: "orders",
  //             list: "/seller/orders",
  //           },
  //         ]}
  //       >
  //         <div className="flex">
  //           {/* Sidebar */}
  //           <Sidebar />
  //           {/* Page Content */}
  //           <main className="flex-1 p-6">{children}</main>
  //         </div>
  //       </Refine>
  //     </RefineKbarProvider>
  //   </QueryClientProvider>
  // );
return null
}

function Sidebar() {
  const { menuItems } = useMenu();
  return (
    <aside className="w-64 border-r p-4">
      {menuItems.map((item) => (
        <Link
          key={item.key}
          href={item.route ?? "#"}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
        >
          {item.meta?.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}
