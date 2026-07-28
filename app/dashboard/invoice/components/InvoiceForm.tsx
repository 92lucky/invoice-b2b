"use client";

import { useInvoiceStore } from "../store/invoice-store";

export default function InvoiceForm() {
  const { quantity, date, invoiceNo, periode, setField } = useInvoiceStore();
  return (
    <div className="max-w-4xl mx-auto mb-3">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Invoice No
            </label>

            <input
              value={invoiceNo}
              onChange={(e) => setField("invoiceNo", e.target.value)}
              placeholder="05-404224..."
              className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Periode</label>

            <input
              value={periode}
              onChange={(e) => setField("periode", e.target.value)}
              placeholder="Mei 2026"
              className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Tanggal</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setField("date", e.target.value)}
              className="w-full bg-zinc-100 text-black border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Quantity KG
            </label>

            <input
              value={quantity}
              onChange={(e) => setField("quantity", e.target.value)}
              placeholder="1000"
              className="w-full bg-zinc-100 text-black placeholder:text-zinc-500 border border-zinc-300 rounded-2xl px-4 py-1 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
