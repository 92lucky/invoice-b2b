import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function terbilang(n) {
  const angka = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  if (n < 12) return angka[n];

  if (n < 20) {
    return terbilang(n - 10) + " Belas";
  }

  if (n < 100) {
    return terbilang(Math.floor(n / 10)) + " Puluh " + terbilang(n % 10);
  }

  if (n < 200) {
    return "Seratus " + terbilang(n - 100);
  }

  if (n < 1000) {
    return terbilang(Math.floor(n / 100)) + " Ratus " + terbilang(n % 100);
  }

  if (n < 2000) {
    return "Seribu " + terbilang(n - 1000);
  }

  if (n < 1000000) {
    return terbilang(Math.floor(n / 1000)) + " Ribu " + terbilang(n % 1000);
  }

  if (n < 1000000000) {
    return (
      terbilang(Math.floor(n / 1000000)) + " Juta " + terbilang(n % 1000000)
    );
  }

  return "Angka terlalu besar";
}

// =========================
// MODERN TABLE CELL
// =========================
function drawCell({
  page,
  text,
  x,
  y,
  width,
  height,
  font,
  fontSize = 10,
  align = "left",
  fillColor = null,
  textColor = rgb(0.15, 0.15, 0.18),
}) {
  const borderColor = rgb(0.82, 0.84, 0.88);

  page.drawRectangle({
    x,
    y: y - height + 2,
    width,
    height,
    color: fillColor || undefined,
    borderWidth: 0.7,
    borderColor,
  });

  let textX = x + 6;

  if (align === "center") {
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    textX = x + width / 2 - textWidth / 2;
  }

  if (align === "right") {
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    textX = x + width - textWidth - 6;
  }

  page.drawText(text, {
    x: textX,
    y: y - 9,
    size: fontSize,
    font,
    color: textColor,
  });
}

export async function generateInvoicePdf({
  profile,
  quantity,
  date,
  invoiceNo,
  periode,
}) {
  const qty = Number(quantity);

  // =========================
  // CALCULATION
  // =========================
  const HARGA_SATUAN = 560;
  const PENGALI = 3;
  const HARGA_PER_GRAM = 354.64;

  const displayQty = qty * HARGA_SATUAN * PENGALI;

  const pokok = Math.round(displayQty * HARGA_PER_GRAM);

  const dpp = Math.round((pokok * 11) / 12);

  const ppn = Math.round(dpp * 0.12);

  const total = pokok + ppn;

  const terbilangText = terbilang(total) + " Rupiah";

  // =========================
  // PDF
  // =========================
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595, 842]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const headerColor = rgb(0.88, 0.92, 0.98);

  const totalColor = rgb(0.8, 0.88, 0.98);

  let y = 790;

  // =========================
  // HEADER
  // =========================
  page.drawText(profile.namaPT, {
    x: 180,
    y,
    size: 16,
    font: bold,
    color: rgb(0.1, 0.1, 0.12),
  });

  y -= 18;

  page.drawText("AGEN LPG PSO", {
    x: 260,
    y,
    size: 10,
    font,
    color: rgb(0.35, 0.35, 0.4),
  });

  y -= 15;

  page.drawText(`${profile.alamat}, ${profile.kabupaten}`, {
    x: 200,
    y,
    size: 10,
    font,
    color: rgb(0.4, 0.4, 0.45),
  });

  y -= 18;

  page.drawLine({
    start: { x: 40, y },
    end: { x: 555, y },
    thickness: 0.6,
    color: rgb(0.75, 0.75, 0.8),
  });

  // =========================
  // TITLE
  // =========================
  y -= 40;

  page.drawText("INVOICE", {
    x: 236,
    y,
    size: 24,
    font: bold,
    color: rgb(0.18, 0.18, 0.22),
  });

  y -= 18;

  // =========================
  // CUSTOMER
  // =========================
  y -= 40;

  page.drawText("Kepada : PT. Pertamina Patra Niaga", {
    x: 40,
    y,
    size: 10,
    font,
  });

  y -= 18;

  page.drawText("Alamat : Gedung Wisma Tugu II Lt.2,", {
    x: 40,
    y,
    size: 10,
    font,
  });

  y -= 14;

  page.drawText("Jl. HR Rasuna Said KAV C7-9 Setiabudi,", {
    x: 40,
    y,
    size: 10,
    font,
  });

  y -= 14;

  page.drawText("Jakarta 12920", {
    x: 40,
    y,
    size: 10,
    font,
  });

  // =========================
  // META
  // =========================
  y -= 30;

  page.drawText(`Tanggal : ${date}`, {
    x: 40,
    y,
    size: 10,
    font,
  });

  page.drawText(`No. Invoice : ${invoiceNo}`, {
    x: 330,
    y,
    size: 10,
    font,
  });

  // =========================
  // TABLE
  // =========================
  y -= 40;

  const startX = 40;

  const cols = [20, 250, 55, 60, 90];

  const headers = ["No", "Keterangan", "Qty", "Detil", "Nilai"];

  // HEADER TABLE
  let currentX = startX;

  headers.forEach((h, i) => {
    drawCell({
      page,

      text: h,
      x: currentX,
      y,
      width: cols[i],
      height: 28,
      font: bold,
      fontSize: 10,
      align: "center",
      fillColor: headerColor,
    });

    currentX += cols[i];
  });

  y -= 28;

  // ROW 1
  currentX = startX;

  drawCell({
    page,
    text: "1",
    x: currentX,
    y,
    width: cols[0],
    height: 28,
    font,
    align: "center",
  });

  currentX += cols[0];

  drawCell({
    page,
    text: `Tagihan Transport Fee LPG 3 Kg Periode ${periode}`,
    x: currentX,
    y,
    width: cols[1],
    height: 28,
    font,
  });

  currentX += cols[1];

  drawCell({
    page,
    text: displayQty.toLocaleString("id-ID"),
    x: currentX,
    y,
    width: cols[2],
    height: 28,
    font,
    align: "center",
  });

  currentX += cols[2];

  drawCell({
    page,
    text: "Pokok",
    x: currentX,
    y,
    width: cols[3],
    height: 28,
    font,
  });

  currentX += cols[3];

  drawCell({
    page,
    text: `Rp ${pokok.toLocaleString("id-ID")}`,
    x: currentX,
    y,
    width: cols[4],
    height: 28,
    font,
    align: "right",
  });

  y -= 28;

  // DPP
  currentX = startX;

  for (let i = 0; i < 3; i++) {
    drawCell({
      page,
      text: "",
      x: currentX,
      y,
      width: cols[i],
      height: 28,
      font,
    });

    currentX += cols[i];
  }

  drawCell({
    page,
    text: "DPP",
    x: currentX,
    y,
    width: cols[3],
    height: 28,
    font,
  });

  currentX += cols[3];

  drawCell({
    page,
    text: `Rp ${dpp.toLocaleString("id-ID")}`,
    x: currentX,
    y,
    width: cols[4],
    height: 28,
    font,
    align: "right",
  });

  y -= 28;

  // PPN
  currentX = startX;

  for (let i = 0; i < 3; i++) {
    drawCell({
      page,
      text: "",
      x: currentX,
      y,
      width: cols[i],
      height: 28,
      font,
    });

    currentX += cols[i];
  }

  drawCell({
    page,
    text: "PPN 11%",
    x: currentX,
    y,
    width: cols[3],
    height: 28,
    font,
  });

  currentX += cols[3];

  drawCell({
    page,
    text: `Rp ${ppn.toLocaleString("id-ID")}`,
    x: currentX,
    y,
    width: cols[4],
    height: 28,
    font,
    align: "right",
  });

  y -= 28;

  // TOTAL
  drawCell({
    page,
    text: "TOTAL",
    x: startX,
    y,
    width: cols[0] + cols[1] + cols[2] + cols[3],
    height: 30,
    font: bold,
    fontSize: 12,
    align: "center",
    fillColor: totalColor,
  });

  drawCell({
    page,
    text: `Rp ${total.toLocaleString("id-ID")}`,
    x: startX + cols[0] + cols[1] + cols[2] + cols[3],
    y,
    width: cols[4],
    height: 30,
    font: bold,
    fontSize: 12,
    align: "right",
    fillColor: totalColor,
  });

  // =========================
  // TERBILANG
  // =========================
  y -= 45;

  page.drawText(`Terbilang : ${terbilangText}`, {
    x: 40,
    y,
    size: 10,
    font,
    color: rgb(0.25, 0.25, 0.3),
  });

  // =========================
  // BANK
  // =========================
  y -= 45;

  page.drawText(`Bank : ${profile.namaBank}`, {
    x: 40,
    y,
    size: 10,
    font,
  });

  y -= 18;

  page.drawText(`No. Rekening : ${profile.noRekening}`, {
    x: 40,
    y,
    size: 10,
    font,
  });

  y -= 18;

  page.drawText(`a.n ${profile.namaPT}`, {
    x: 40,
    y,
    size: 10,
    font,
  });

  // =========================
  // SIGNATURE
  // =========================
  y -= 55;

  page.drawText(`${profile.kabupaten}, ${date}`, {
    x: 370,
    y,
    size: 10,
    font,
    color: rgb(0.4, 0.4, 0.45),
  });

  y -= 80;

  page.drawText(profile.penanggungJawab, {
    x: 370,
    y,
    size: 11,
    font: bold,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
