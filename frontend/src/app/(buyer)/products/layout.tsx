import { ReactNode } from "react";

export default function ProductLayout({
  children,
  product,
}: {
  children: ReactNode;
  product: ReactNode;
}) {
  return (
    <div>
      {children}
      {product}
    </div>
  );
}
