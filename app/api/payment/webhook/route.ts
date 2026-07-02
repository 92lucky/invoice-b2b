import { processPayment } from "@/lib/payment/process-payment";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("WEBHOOK BODY:", body);

    const { order_id, amount, status } = body;

    const payment = await prisma.payment.findUnique({
      where: { orderId: order_id },
    });

    console.log("PAYMENT:", payment);

    if (!payment) {
      throw new Error(`Payment not found: ${order_id}`);
    }

    if (payment.amount !== amount) {
      throw new Error(
        `Amount mismatch. DB=${payment.amount}, Payload=${amount}`
      );
    }

    console.log("PROCESS PAYMENT:", status);

    if (status === "completed") {
      await processPayment(order_id, "paid");
    } else {
      await processPayment(order_id, "failed");
    }

    console.log("PROCESS PAYMENT SUCCESS");

    return Response.json({ success: true });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
