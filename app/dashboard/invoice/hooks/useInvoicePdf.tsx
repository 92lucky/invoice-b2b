"use client";

import { useEffect, useState } from "react";
import { useInvoiceStore } from "../store/invoice-store";

export function useInvoicePdf() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { quantity, date, invoiceNo, periode } = useInvoiceStore();

  const generatePDF = async (mode: "preview" | "download") => {
    setLoading(true);

    try {
      const res = await fetch(`/api/invoice?mode=${mode}`, {
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

  // AUTO PREVIEW
  const handlePreview = async () => {
    if (!quantity || !date || !invoiceNo || !periode) {
      return;
    }

    const blob = await generatePDF("preview");

    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
  };

  useEffect(() => {
    handlePreview();
  }, [quantity, date, invoiceNo, periode]);

  // DOWNLOAD
  const handleDownload = async () => {
    const blob = await generatePDF("download");

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "invoice.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  // CLEANUP URL
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
    handleDownload,
  };
}
