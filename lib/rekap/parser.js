import * as XLSX from "xlsx";

/**
 * PARSE NUMBER (ANTI ERROR GLOBAL FORMAT)
 * Support:
 * - 1,680   → 1680 (Indonesia ribuan)
 * - 1.680   → 1680 (EU ribuan)
 * - 1.680,5 → 1680.5 (EU desimal)
 * - 1680    → 1680 (plain number)
 */
function parseNumber(value) {
  if (value === null || value === undefined || value === "") return 0;

  if (typeof value === "number") {
    return Math.round(value);
  }

  let str = String(value).trim();

  const hasComma = str.includes(",");
  const hasDot = str.includes(".");

  // 🔥 CASE 1: "1,680" (Indonesia ribuan)
  if (hasComma && !hasDot) {
    return Math.round(Number(str.replace(/,/g, "")) || 0);
  }

  // 🔥 CASE 2: "1.680" (EU ribuan)
  if (hasDot && !hasComma) {
    return Math.round(Number(str.replace(/\./g, "")) || 0);
  }

  // 🔥 CASE 3: "1.680,50" (EU desimal)
  if (hasDot && hasComma) {
    str = str.replace(/\./g, "").replace(",", ".");
    return Math.round(Number(str) || 0);
  }

  // 🔥 CASE 4: plain number
  return Math.round(Number(str) || 0);
}

/**
 * NORMALIZE HEADER
 */
function normalizeRow(raw) {
  const row = {};

  Object.keys(raw).forEach((key) => {
    const cleanKey = key.toLowerCase().replace(/\s+/g, " ").trim();

    row[cleanKey] = raw[key];
  });

  return row;
}

/**
 * EMPTY CHECK
 */
function isEmptyRow(row) {
  return !(
    row.date ||
    row["no so"] ||
    row["no lo"] ||
    row["qty pcs"] ||
    row["qty kg"]
  );
}

/**
 * VALIDATE
 */
function validateRow(row) {
  if (!row.date) {
    throw new Error(`Tanggal kosong pada baris ${row.excelRow}`);
  }
}

/**
 * MAIN PARSER
 */
export async function parseLaporanLOExcel(file) {
  const bytes = await file.arrayBuffer();

  const workbook = XLSX.read(bytes);

  const sheetName = workbook.SheetNames[0];

  const rawRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: "",
    raw: false,
  });

  return rawRows
    .map((raw, index) => {
      const row = normalizeRow(raw);

      return {
        excelRow: index + 2,

        no: row["no."] || index + 1,

        date: row["tanggal"] || row["tgl"] || "",

        noSO: row["no so"] || "",

        noLO: row["no lo"] || "",

        jumlahTbg: parseNumber(row["qty pcs"]),

        jumlahKg: parseNumber(row["qty kg"]),
      };
    })

    .filter((row) => !isEmptyRow(row))

    .map((row) => {
      validateRow(row);
      return row;
    });
}
