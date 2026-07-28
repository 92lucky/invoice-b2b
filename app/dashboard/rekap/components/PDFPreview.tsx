type PdfPreviewProps = {
  pdfUrl: string | null;
  loading: boolean;
};

export default function PdfPreview({ pdfUrl, loading }: PdfPreviewProps) {
  return (
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
  );
}
