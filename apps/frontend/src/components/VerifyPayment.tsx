"use client";

import { orderApi } from "@/app/api/orders";
import { getFrontendEnv } from "@/lib/env";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VerifyPayment({
  orderId,
  reference,
}: {
  orderId: string;
  reference: string;
}) {
  const [status, setStatus] = useState("verifying");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const env = getFrontendEnv();

  function stopPolling() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  async function checkOrderStatus() {
    try {
      const { data } = await orderApi.getSingleOrder(orderId);

      if (!data || !data.order) return;

      const currentStatus = data.order.paymentStatus?.toLowerCase();
      console.log(currentStatus);
      if (currentStatus === "paid" || currentStatus === "failed") {
        setStatus(data.order.paymentStatus);
        stopPolling();
      }
    } catch (error) {
      console.error(`Polling error: ${error}`);
      // stopPolling();
    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(checkOrderStatus, 2000);

    return () => stopPolling();
  }, [orderId]);

  useEffect(() => {
    if (status === "paid") {
      router.push(`/orders/success?ref=${reference}`);
    } else if (status === "failed") {
      router.push(`/checkout/failed`);
    }
  }, [status, router, reference]);

  if (status === "verifying") return <div>Verying Payment...</div>;

  return <div>Pending please wait...</div>;
}
