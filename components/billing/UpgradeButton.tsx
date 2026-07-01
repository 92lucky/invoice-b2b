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
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        style={{
          padding: "10px 14px",
          borderRadius: 12,
          border: "1px solid #374151",
          background: loading ? "#374151" : "#111827",
          color: "white",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : `Upgrade ${plan}`}
      </button>

      {error && <span style={{ color: "#ef4444", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
