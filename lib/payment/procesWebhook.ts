import { prisma } from "@/lib/prisma";
import {
  getSubscriptionEndDate,
  getTrialEndDate,
} from "@/lib/payment/subscription/duration";

export async function processWebhook(body: any) {
  const transactionStatus = body.transaction_status;
  const orderId = body.order_id;

  // AMBIL PAYMENT
  const payment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  // IDEMPOTENCY
  if (payment.status === "PAID") {
    return;
  }

  // SUCCESS
  if (transactionStatus === "settlement" || transactionStatus === "capture") {
    await prisma.payment.update({
      where: { orderId },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    await prisma.subscription.upsert({
      where: { userId: payment.userId },
      update: {
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: getSubscriptionEndDate(payment.plan),
      },
      create: {
        plan: payment.plan,
        userId: payment.userId,
        status: "active",
        trialEnd: getTrialEndDate(),
        currentPeriodStart: new Date(),
        currentPeriodEnd: getSubscriptionEndDate(payment.plan),
      },
    });
  }

  // EXPIRE
  if (transactionStatus === "expire") {
    await prisma.payment.update({
      where: { orderId },
      data: {
        status: "EXPIRED",
      },
    });
  }

  // CANCEL
  if (transactionStatus === "cancel") {
    await prisma.payment.update({
      where: { orderId },
      data: {
        status: "CANCELLED",
      },
    });
  }
}
