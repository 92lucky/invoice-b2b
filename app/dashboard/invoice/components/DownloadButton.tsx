"use client";

import { useInvoiceDownload } from "../hooks/useInvoiceDownload";

export default function DownloadButton() {
  const { loading, handleDownload } = useInvoiceDownload();

  return (
    <button
      onClick={() => handleDownload()}
      disabled={loading}
      className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
        loading
          ? "bg-zinc-700 text-white cursor-not-allowed"
          : "bg-white hover:bg-zinc-200 hover:scale-105 text-black shadow-lg"
      }`}
    >
      {loading ? "Generating..." : "Download PDF"}
    </button>
  );
}
