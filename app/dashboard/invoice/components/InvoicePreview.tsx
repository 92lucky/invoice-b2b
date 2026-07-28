"use client";

import { useInvoicePdf } from "../hooks/useInvoicePdf";
import EmptyPreview from "./EmptyPreview";
import LoadingPreview from "./LoadingPreview";

export default function InvoicePreview() {
  const { loading, pdfUrl } = useInvoicePdf();

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
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

      {!loading && !pdfUrl && <EmptyPreview />}

      {loading && <LoadingPreview />}

      {!loading && pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-175 rounded-2xl border border-zinc-700 bg-white"
        />
      )}
    </div>
  );
}
