"use client";

import { useRef, useState } from "react";

export default function ReportPage() {
  // Ref ke form HTML
  const formRef = useRef<HTMLFormElement | null>(null);

  // State
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // =====================
  // PREVIEW PDF
  // =====================
  const handlePreview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      const formData = new FormData(formRef.current);

      const res = await fetch("/api/rekap?mode=preview", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Gagal generate PDF");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // DOWNLOAD PDF
  // =====================
  const handleDownload = async () => {
    if (!formRef.current) return;

    setLoading(true);

    try {
      const formData = new FormData(formRef.current);

      const res = await fetch("/api/rekap?mode=download", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Gagal download PDF");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan-lo.pdf";
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-4">
            Rekap Generator
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            Generate Laporan LO
          </h1>

          <p className="text-zinc-400">
            Upload excel lalu preview atau download PDF rekap
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            ref={formRef}
            onSubmit={handlePreview}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* BULAN */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Bulan & Tahun
                </label>

                <input
                  type="text"
                  name="bulan"
                  placeholder="Mei 2026"
                  required
                  className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              {/* FILE */}
              <div>
                <label className="text-sm text-zinc-300 mb-2 block">
                  Upload Excel
                </label>

                <input
                  type="file"
                  name="file"
                  accept=".xlsx,.xls"
                  required
                  className="w-full bg-zinc-100 text-black border border-zinc-300 rounded-xl px-3 py-2 text-sm file:mr-3 file:px-3 file:py-0.3 file:border-0 file:rounded-lg file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  loading
                    ? "bg-zinc-700 text-white cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white shadow-lg shadow-emerald-600/30"
                }`}
              >
                {loading ? "Generating..." : "Preview PDF"}
              </button>

              <button
                type="button"
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
          </form>
        </div>

        {/* PDF PREVIEW */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <h2 className="text-white text-xl font-semibold">PDF Preview</h2>
              <p className="text-zinc-400 text-sm">
                Generated laporan rekap akan muncul di bawah
              </p>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-emerald-300 text-sm">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                Generating...
              </div>
            )}
          </div>

          {/* EMPTY STATE */}
          {!pdfUrl && !loading && (
            <div className="h-187.5 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-emerald-400"
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
                Upload excel dan klik preview untuk generate laporan rekap PDF.
              </p>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="h-187.5 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-zinc-700 border-t-emerald-500 rounded-full animate-spin mb-6" />
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
              className="w-full h-187.5 rounded-2xl border border-zinc-700 bg-white"
              title="PDF Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}
