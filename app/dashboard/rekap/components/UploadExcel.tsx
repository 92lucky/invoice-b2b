import { RefObject } from "react";

type UploadExcelProps = {
  formRef: RefObject<HTMLFormElement | null>;
  loading: boolean;
  onPreview: (e: React.FormEvent<HTMLFormElement>) => void;
  onDownload: () => void;
};

export default function UploadExcel({
  formRef,
  loading,
  onPreview,
  onDownload,
}: UploadExcelProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form
        ref={formRef}
        onSubmit={onPreview}
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
            onClick={onDownload}
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
  );
}
