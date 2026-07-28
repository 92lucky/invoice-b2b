"use client";

import DownloadButton from "./DownloadButton";

export default function InvoiceActions() {
  return (
    <div className="max-w-4xl mx-auto mb-3">
      <div className="flex justify-center gap-4 mt-6">
        <DownloadButton />
      </div>
    </div>
  );
}
