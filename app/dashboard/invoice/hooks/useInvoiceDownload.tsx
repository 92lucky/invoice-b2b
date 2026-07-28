"use client";

import { useInvoiceStore } from "../store/invoice-store";

export function useInvoiceDownload() {
  const { quantity, date, invoiceNo, periode, loading, setLoading } =
    useInvoiceStore();

  const handleDownload = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/invoice?mode=download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: Number(quantity),
          date,
          invoiceNo,
          periode,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed generate PDF");
      }

      const blob = await res.blob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleDownload,
  };
}
