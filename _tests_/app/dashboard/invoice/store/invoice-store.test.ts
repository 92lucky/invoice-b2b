import { useInvoiceStore } from "@/app/dashboard/invoice/store/invoice-store";

describe("Invoice Store", () => {
  beforeEach(() => {
    useInvoiceStore.getState().reset();
  });

  test("should have initial state", () => {
    const state = useInvoiceStore.getState();

    expect(state.quantity).toBe("");
    expect(state.date).toBe("");
    expect(state.invoiceNo).toBe("");
    expect(state.periode).toBe("");

    expect(state.loading).toBe(false);
    expect(state.pdfUrl).toBe("");
  });

  test("should update quantity", () => {
    useInvoiceStore.getState().setField("quantity", "10");

    expect(useInvoiceStore.getState().quantity).toBe("10");
  });

  test("should update date", () => {
    useInvoiceStore.getState().setField("date", "2026-07-30");

    expect(useInvoiceStore.getState().date).toBe("2026-07-30");
  });

  test("should update invoice number", () => {
    useInvoiceStore.getState().setField("invoiceNo", "INV-001");

    expect(useInvoiceStore.getState().invoiceNo).toBe("INV-001");
  });

  test("should update periode", () => {
    useInvoiceStore.getState().setField("periode", "Juli 2026");

    expect(useInvoiceStore.getState().periode).toBe("Juli 2026");
  });

  test("should update loading", () => {
    useInvoiceStore.getState().setLoading(true);

    expect(useInvoiceStore.getState().loading).toBe(true);
  });

  test("should update pdf url", () => {
    useInvoiceStore.getState().setPdfUrl("/invoice.pdf");

    expect(useInvoiceStore.getState().pdfUrl).toBe("/invoice.pdf");
  });

  test("should reset store", () => {
    const store = useInvoiceStore.getState();

    store.setField("quantity", "5");
    store.setField("date", "2026-07-30");
    store.setField("invoiceNo", "INV-999");
    store.setField("periode", "Agustus");
    store.setLoading(true);
    store.setPdfUrl("/invoice.pdf");

    store.reset();

    const state = useInvoiceStore.getState();

    expect(state.quantity).toBe("");
    expect(state.date).toBe("");
    expect(state.invoiceNo).toBe("");
    expect(state.periode).toBe("");

    expect(state.loading).toBe(false);
    expect(state.pdfUrl).toBe("");
  });
});
