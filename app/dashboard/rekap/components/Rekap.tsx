"use client";

import UploadExcel from "./UploadExcel";
import PdfPreview from "./PDFPreview";

import { useRekapPdf } from "../hooks/useRekapPdf";

export default function Rekap() {
  const { formRef, pdfUrl, loading, handlePreview, handleDownload } =
    useRekapPdf();

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
        <UploadExcel
          formRef={formRef}
          loading={loading}
          onPreview={handlePreview}
          onDownload={handleDownload}
        />

        {/* PDF PREVIEW */}
        <PdfPreview pdfUrl={pdfUrl} loading={loading} />
      </div>
    </div>
  );
}
