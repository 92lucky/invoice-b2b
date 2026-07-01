// app/api/payment/verify/route.ts

import { prisma } from "@/lib/prisma";
import { processPayment } from "@/lib/payment/process-payment";
import { getTransactionDetail } from "@/lib/payment/transaction-detil";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  const payment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!payment) {
    return Response.json(
      { success: false, message: "Payment not found" },
      { status: 404 }
    );
  }

  const trx = await getTransactionDetail(payment.orderId, payment.amount);

  if (!trx.transaction) {
    return Response.json(
      { success: false, message: "Transaction not found" },
      { status: 400 }
    );
  }

  if (trx.transaction.status === "completed") {
    await processPayment(payment.orderId, "paid");
  } else {
    return Response.json({
      success: false,
      message: "Payment not completed",
      pakasir: trx,
    });
  }
  const updatedPayment = await prisma.payment.findUnique({
    where: { orderId },
  });

  return Response.json({
    success: true,
    payment: updatedPayment,
    pakasir: trx,
  });
}
