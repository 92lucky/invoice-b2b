export async function createTransaction({
  orderId,
  amount,
}: {
  orderId: string;
  amount: number;
}) {
  const appUrl = process.env.APP_URL!;

  return {
    redirect_url:
      `https://app.pakasir.com/pay/${process.env.PAKASIR_PROJECT_SLUG}/${amount}` +
      `?order_id=${orderId}` +
      `&qris_only=1` +
      `&redirect=${encodeURIComponent(
        `${appUrl}/payment/success?order_id=${orderId}`
      )}`,
  };
}
