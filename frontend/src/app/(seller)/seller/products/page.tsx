"use client";
export const dynamic = "force-dynamic";

import { useList } from "@refinedev/core";

export default function VendorProducts() {
  const { result } = useList({
    resource: "products",
  });

  return (
    <div>
      {result?.data.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
