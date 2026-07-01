"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSubscriptionState } from "@/lib/payment/subscription/status";

export default function PaymentSuccessPage() {
  console.log("PAYMENT SUCCESS PAGE DIRENDER");
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");
  console.log("orderId =", orderId);

  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const check = async () => {
    console.log("check() dipanggil");
    if (checking) return;
    setChecking(true);

    try {
      // Sinkronkan status pembayaran ke database
      if (orderId) {
        console.log("memanggil verify...");
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        });
      }

      // Ambil subscription terbaru
      const res = await fetch("/api/payment/subscription", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.subscription) {
        setSubscription(data.subscription);

        if (getSubscriptionState(data.subscription).active) {
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    check();

    const interval = setInterval(check, 2500);

    return () => clearInterval(interval);
  }, [orderId]);

  const label = getSubscriptionState(subscription).label;

  return (
    <main style={{ padding: 24 }}>
      <h1>Status Pembayaran</h1>

      {loading && <p>Memverifikasi pembayaran...</p>}

      {!loading && label === "EXPIRED" && (
        <p>⏳ Menunggu aktivasi pembayaran...</p>
      )}

      {!loading && label === "TRIAL" && <p>🟡 Trial aktif...</p>}

      {!loading && label === "PREMIUM" && (
        <p>✅ Pembayaran berhasil, mengarahkan...</p>
      )}
    </main>
  );
}
