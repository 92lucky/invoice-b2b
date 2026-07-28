import { create } from "zustand";

type InvoiceState = {
  quantity: string;
  date: string;
  invoiceNo: string;
  periode: string;

  loading: boolean;
  pdfUrl: string;

  setField: (
    field: "quantity" | "date" | "invoiceNo" | "periode",
    value: string
  ) => void;

  setLoading: (loading: boolean) => void;
  setPdfUrl: (url: string) => void;

  reset: () => void;
};

export const useInvoiceStore = create<InvoiceState>((set) => ({
  quantity: "",
  date: "",
  invoiceNo: "",
  periode: "",

  loading: false,
  pdfUrl: "",

  setField: (field, value) =>
    set({
      [field]: value,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setPdfUrl: (pdfUrl) =>
    set({
      pdfUrl,
    }),

  reset: () =>
    set({
      quantity: "",
      date: "",
      invoiceNo: "",
      periode: "",
      loading: false,
      pdfUrl: "",
    }),
}));
