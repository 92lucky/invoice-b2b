"use client";

import { useState } from "react";

export default function Invoice() {
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [periode, setPeriode] = useState("");

  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================
  // CORE GENERATOR
  // =====================
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

      if (!res.ok) return;

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      return url;
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // PREVIEW
  // =====================
  const handlePreview = async () => {
    const url = await generatePDF("preview");

    if (url) {
      setPdfUrl(url);
    }
  };

  // =====================
  // DOWNLOAD
  // =====================
  const handleDownload = async () => {
    const url = await generatePDF("download");

    if (!url) return;

    const a = document.createElement("a");

    a.href = url;
    a.download = "invoice.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black px-4 py-5">
      <div className="max-w-6xl mx-auto">
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
        <div className="text-center mb-8">
          <div className="inline-flex px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-4">
            Internal Invoice Generator
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            Generate PDF Invoice
          </h1>

          <p className="text-zinc-400">
            Fast internal invoice preview & download
          </p>
        </div>

        {/* ========================= */}
        {/* TOP FORM */}
        {/* ========================= */}
        <div className="max-w-4xl mx-auto mb-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              {/* INVOICE */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Invoice No
                </label>

                <input
                  placeholder="05-404224..."
                  className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  onChange={(e) => setInvoiceNo(e.target.value)}
                />
              </div>

              {/* PERIODE */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Periode
                </label>

                <input
                  placeholder="Mei 2026"
                  className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  onChange={(e) => setPeriode(e.target.value)}
                />
              </div>

              {/* DATE */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Tanggal
                </label>

                <input
                  type="date"
                  className="w-full bg-zinc-100 text-black border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* KG */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Quantity KG
                </label>

                <input
                  placeholder="1000"
                  className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePreview}
                disabled={loading}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  loading
                    ? "bg-zinc-700 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white shadow-lg shadow-blue-600/30"
                }`}
              >
                {loading ? "Generating..." : "Preview PDF"}
              </button>

              <button
                onClick={handleDownload}
                disabled={loading}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  loading
                    ? "bg-zinc-700 text-white cursor-not-allowed"
                    : "bg-white hover:bg-zinc-200 hover:scale-105 text-black shadow-lg"
                }`}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* PDF PREVIEW */}
        {/* ========================= */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <h2 className="text-white text-xl font-semibold">PDF Preview</h2>

              <p className="text-zinc-400 text-sm">
                Generated invoice will appear below
              </p>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-blue-300 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                Generating...
              </div>
            )}
          </div>

          {/* EMPTY */}
          {!pdfUrl && !loading && (
            <div className="h-175 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H14.25V5.625A3.375 3.375 0 0010.875 2.25h-1.5A3.375 3.375 0 006 5.625V8.25H4.125A3.375 3.375 0 00.75 11.625v6.75A3.375 3.375 0 004.125 21.75h15.75a3.375 3.375 0 003.375-3.375v-1.5A2.625 2.625 0 0019.5 14.25z"
                  />
                </svg>
              </div>

              <h3 className="text-white text-2xl font-semibold mb-2">
                No PDF Generated
              </h3>

              <p className="text-zinc-400 max-w-md">
                Fill the form above and click preview to generate invoice PDF.
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="h-175 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin mb-6" />

              <h3 className="text-white text-2xl font-semibold mb-2">
                Generating PDF
              </h3>

              <p className="text-zinc-400">Please wait a few seconds...</p>
            </div>
          )}

          {/* PDF */}
          {pdfUrl && !loading && (
            <iframe
              src={pdfUrl}
              className="w-full h-175 rounded-2xl border border-zinc-700 bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
