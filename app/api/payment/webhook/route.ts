import { processPayment } from "@/lib/payment/process-payment";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id, amount, status } = body;

    const payment = await prisma.payment.findUnique({
      where: { orderId: order_id },
    });

    if (!payment || payment.amount !== amount) {
      return Response.json({ success: false }, { status: 400 });
    }

    // =========================
    // SUCCESS PAYMENT
    // =========================
    if (status === "completed") {
      await processPayment(order_id, "paid");
    } else {
      await processPayment(order_id, "failed");
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}
