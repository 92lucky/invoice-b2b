export async function getTransactionDetail(orderId: string, amount: number) {
  const url =
    `https://app.pakasir.com/api/transactiondetail` +
    `?project=${process.env.PAKASIR_PROJECT_SLUG}` +
    `&amount=${amount}` +
    `&order_id=${orderId}` +
    `&api_key=${process.env.PAKASIR_API_KEY}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transaction");
  }

  return res.json();
}
