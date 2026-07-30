"use client";

import InvoiceForm from "./components/InvoiceForm";
import InvoiceActions from "./components/InvoiceActions";
import InvoicePreview from "./components/InvoicePreview";

export default function InvoicePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black px-4 py-5">
      <div className="max-w-6xl mx-auto">
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

        <InvoiceForm />

        <InvoiceActions />

        <InvoicePreview />
      </div>
    </div>
  );
}
