export function formatRupiah(value) {
  const number = Math.trunc(Number(value || 0));
  return new Intl.NumberFormat("id-ID").format(number);
}
