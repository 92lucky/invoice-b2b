"use client";

import { useEffect } from "react";
import { useInvoiceStore } from "../store/invoice-store";

export function useInvoicePreview() {
  const {
    quantity,
    date,
    invoiceNo,
    periode,
    loading,
    pdfUrl,
    setLoading,
    setPdfUrl,
  } = useInvoiceStore();

  const generatePDF = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/invoice?mode=preview", {
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

      return await res.blob();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const preview = async () => {
      if (!quantity || !date || !invoiceNo || !periode) return;

      const blob = await generatePDF();

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setPdfUrl(URL.createObjectURL(blob));
    };

    preview();
  }, [quantity, date, invoiceNo, periode]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return {
    loading,
    pdfUrl,
  };
}
