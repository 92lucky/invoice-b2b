import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatRupiah } from "@/utils/format";

export function generateLaporanLOPDF({ data, totals, namaPT, bulan }) {
  const doc = new jsPDF({
    orientation: "potrait",
    unit: "pt",
    format: "a4",
  });

  // =====================
  // HEADER
  // =====================
  doc.setFont("helvetica", "bold");

  doc.setFontSize(18);

  doc.text(`${namaPT || "-"}`, doc.internal.pageSize.getWidth() / 2, 40, {
    align: "center",
  });

  doc.setFont("helvetica");
  doc.setFontSize(12);
  doc.text(`${bulan || "-"}`, doc.internal.pageSize.getWidth() / 2, 55, {
    align: "center",
  });

  // =====================
  // TABLE DATA
  // =====================
  const headers = ["NO", "TGL", "SO", "LO", "TBG", "KG", "TARIF", "BIAYA"];

  const rows = data.map((item, index) => [
    index + 1,
    item.date,
    item.noSO,
    item.noLO,
    Number(item.jumlahTbg || 0),
    Number(item.jumlahKg || 0),
    formatRupiah(item.tarif || 0),
    formatRupiah(item.biaya || 0),
  ]);

  // =====================
  // FOOTER
  // =====================
  const footRows = [
    [
      {
        content: "TOTAL",
        colSpan: 4,
        styles: { halign: "right", fontStyle: "bold" },
      },
      {
        content: String(Number(totals.totalTbg || 0)),
        styles: { halign: "right", fontStyle: "bold" },
      },
      {
        content: String(Number(totals.totalKg || 0)),
        styles: { halign: "right", fontStyle: "bold" },
      },
      { content: "" },
      {
        content: formatRupiah(totals.totalBiaya || 0),
        styles: { halign: "right", fontStyle: "bold" },
      },
    ],
    [
      {
        content: "PPN 11%",
        colSpan: 7,
        styles: { halign: "right", fontStyle: "bold" },
      },
      {
        content: formatRupiah(totals.ppn || 0),
        styles: { halign: "right", fontStyle: "bold" },
      },
    ],
    [
      {
        content: "GRAND TOTAL",
        colSpan: 7,
        styles: {
          halign: "right",
          fontStyle: "bold",
          fillColor: [230, 230, 230],
        },
      },
      {
        content: formatRupiah(totals.grandTotal || 0),
        styles: { halign: "right", fontStyle: "bold" },
      },
    ],
  ];

  // =====================
  // AUTOTABLE
  // =====================
  autoTable(doc, {
    head: [headers],
    body: rows,
    foot: footRows,
    startY: 70,
    theme: "grid",

    showFoot: "lastPage",

    tableWidth: "auto",
    margin: { left: 35, right: 7 },

    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 4,
      valign: "middle",
      overflow: "linebreak",
    },

    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

    footStyles: {
      fontStyle: "bold",
      textColor: [0, 0, 0],
      fillColor: [240, 240, 240],
    },

    columnStyles: {
      0: { cellWidth: 30, halign: "center" },
      1: { cellWidth: 70 },
      2: { cellWidth: 80 },
      3: { cellWidth: 80 },
      4: { cellWidth: 60, halign: "right" },
      5: { cellWidth: 55, halign: "right" },
      6: { cellWidth: 68, halign: "right" },
      7: { cellWidth: 70, halign: "right" },
    },
  });
  autoTable(doc, {
    // ...
  });

  const finalY = doc.lastAutoTable?.finalY || 70;

  doc.setFontSize(11);
  doc.setFont("helvetica");

  doc.text(namaPT || "-", 380, finalY + 50, {
    align: "center",
  });

  return doc.output("arraybuffer");
}
