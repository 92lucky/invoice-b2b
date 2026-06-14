import { TARIF_DEFAULT, BIAYA_ANGKUT_DEFAULT } from "./constants";

/**
 * Transform data setelah parsing
 * Hanya inject data tetap, TIDAK mengubah nilai
 */
export function enrichLaporanLOData(data) {
  return data.map((item) => ({
    ...item,

    // tarif tetap
    tarif: TARIF_DEFAULT,

    // biaya angkut tetap (JANGAN di-floor, JANGAN diubah)
    biaya: BIAYA_ANGKUT_DEFAULT,
  }));
}
