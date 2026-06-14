import { TARIF_DEFAULT } from "@/lib/rekap/constants";

export function calculateLaporanLOTotals(data) {
  const totalTbg = data.reduce(
    (sum, item) => sum + (Number(item.jumlahTbg) || 0),
    0
  );

  const totalKg = data.reduce(
    (sum, item) => sum + (Number(item.jumlahKg) || 0),
    0
  );

  const totalBiayaRaw = totalKg * TARIF_DEFAULT;

  // 🔥 SCALE DOWN DI SINI (INI KUNCI)
  const totalBiaya = Math.round(totalBiayaRaw / 100);

  const ppn = Math.round(totalBiaya * 0.11);
  const grandTotal = totalBiaya + ppn;

  return {
    totalTbg,
    totalKg,
    totalBiaya,
    ppn,
    grandTotal,
  };
}
