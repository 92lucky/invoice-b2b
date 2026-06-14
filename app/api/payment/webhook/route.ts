import { verifySignature } from "@/lib/payment/verify";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!verifySignature(body)) {
      return Response.json({ success: false }, { status: 403 });
    }

    const { order_id, transaction_status } = body;

    const payment = await prisma.payment.findUnique({
      where: { orderId: order_id },
    });

    if (!payment) {
      return Response.json({ success: false }, { status: 404 });
    }

    // =========================
    // SUCCESS PAYMENT
    // =========================
    if (["settlement", "capture"].includes(transaction_status)) {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: "SUCCESS" },
      });

      await prisma.subscription.update({
        where: { userId: payment.userId },
        data: {
          status: "ACTIVE",
          plan: payment.plan,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          trialEnd: null,
        },
      });
    }

    // =========================
    // FAILED / EXPIRED
    // =========================
    if (["expire", "cancel", "deny"].includes(transaction_status)) {
      await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: "FAILED" },
      });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}
