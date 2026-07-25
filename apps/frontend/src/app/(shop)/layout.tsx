import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 w-full pt-20 md:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
