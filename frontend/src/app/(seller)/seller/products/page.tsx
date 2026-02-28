"use client";

import { useList } from "@refinedev/core";

export default function VendorProducts() {
  const { data } = useList({
    resource: "products",
  });

  return (
    <div>
      {data?.data.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
