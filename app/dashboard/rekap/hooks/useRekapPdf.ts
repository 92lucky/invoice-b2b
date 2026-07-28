import { useRef, useState } from "react";

export function useRekapPdf() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return {
    formRef,
    pdfUrl,
    loading,
    handlePreview,
    handleDownload,
  };
}
