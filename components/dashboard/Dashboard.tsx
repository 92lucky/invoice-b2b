"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

type SubscriptionState = {
  active: boolean;
  label: "FREE" | "TRIAL" | "PREMIUM" | "EXPIRED";
};

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [sub, setSub] = useState<any>(null);
  const [state, setState] = useState<SubscriptionState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchSubscription = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/payment/subscription", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        setSub(data.subscription);
        setState(data.state);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    const interval = setInterval(fetchSubscription, 5000);

    return () => clearInterval(interval);
  }, [status]);

  const expireDate = sub?.trialEnd ?? sub?.currentPeriodEnd ?? null;

  const formatDate = (date: string | Date | null) =>
    date ? new Date(date).toLocaleString("id-ID") : "-";

  const planLabel =
    state?.label === "TRIAL"
      ? "TRIAL PLAN"
      : state?.label === "PREMIUM"
      ? "PREMIUM PLAN"
      : state?.label === "EXPIRED"
      ? "EXPIRED PLAN"
      : "FREE PLAN";

  const statusLabel =
    state?.label === "TRIAL"
      ? "Trial Active"
      : state?.label === "PREMIUM"
      ? "Premium Active"
      : state?.label === "EXPIRED"
      ? "Expired Subscription"
      : "No Subscription";

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 text-sm">
          Kelola subscription & aktivitas kamu
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-2xl">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Email</span>
            <span>{session?.user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span>Plan</span>
            <span className="font-semibold">{planLabel}</span>
          </div>

          <div className="flex justify-between">
            <span>Status</span>
            <span className={state?.active ? "text-green-400" : "text-red-400"}>
              {statusLabel}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Expires</span>
            <span className="text-zinc-300">{formatDate(expireDate)}</span>
          </div>

          {loading && (
            <div className="text-xs text-zinc-500">Syncing subscription...</div>
          )}
        </div>
      </div>

      <div className="max-w-2xl bg-linear-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Upgrade & Unlock Full Power 🚀
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            Jangan biarkan workflow kamu terhenti. Aktifkan fitur premium
            sekarang.
          </p>
        </div>

        <Link
          href="/dashboard/billing"
          className="px-5 py-2 rounded-xl bg-white text-black font-medium hover:opacity-80 transition"
        >
          Upgrade
        </Link>
      </div>
    </div>
  );
}
