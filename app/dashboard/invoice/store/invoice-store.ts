import { create } from "zustand";

type InvoiceState = {
  quantity: string;
  date: string;
  invoiceNo: string;
  periode: string;

  setField: (
    field: "quantity" | "date" | "invoiceNo" | "periode",
    value: string
  ) => void;

  reset: () => void;
};

export const useInvoiceStore = create<InvoiceState>((set) => ({
  quantity: "",
  date: "",
  invoiceNo: "",
  periode: "",

  setField: (field, value) =>
    set({
      [field]: value,
    }),

  reset: () =>
    set({
      quantity: "",
      date: "",
      invoiceNo: "",
      periode: "",
    }),
}));
