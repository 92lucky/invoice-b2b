"use client";

import { useState } from "react";

export default function UpgradeButton({ plan }: { plan: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err?.error || "Payment error");
        return;
      }

      const data = await res.json();

      if (data?.redirect_url) {
        window.open(data.redirect_url, "_blank");
      } else {
        setError("Redirect URL tidak ditemukan");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="
          w-full rounded-xl
          bg-emerald-500
          px-4 py-3
          text-sm font-semibold text-white
          shadow-lg shadow-emerald-500/20
          transition-all duration-200
          hover:bg-emerald-400
          hover:shadow-emerald-500/30
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:bg-zinc-700
          disabled:text-zinc-300
          disabled:shadow-none
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Pilih`
        )}
      </button>

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
