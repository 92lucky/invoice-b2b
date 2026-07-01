import { getTransactionDetail } from "@/lib/payment/transaction-detil";

export async function GET() {
  const data = await getTransactionDetail(
    "ae2840c3-0d04-4adc-a3f5-d6e2e01bd254",
    8000
  );

  return Response.json(data);
}
