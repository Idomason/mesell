"use client";

import VerifyPayment from "@/components/VerifyPayment";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const reference = searchParams.get("reference");

  if (!orderId) return <div>Invalid order, please try again</div>;

  return <VerifyPayment orderId={orderId} reference={reference || ""} />;
}

export default function VerifyPayPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
