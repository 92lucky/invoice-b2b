import { prisma } from "@/lib/prisma";
import {
  getSubscriptionEndDate,
  getTrialEndDate,
} from "@/lib/payment/subscription/duration";

type PaymentStatus = "paid" | "expired" | "cancelled" | "failed";

export async function processPayment(orderId: string, status: PaymentStatus) {
  const payment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  // ❗ FIX: jangan pakai bandingin status request, tapi status DB
  if (payment.status === "paid") return;

  console.log("PROCESS PAYMENT HIT:", orderId, status);

  if (status === "paid") {
    await prisma.$transaction(async (tx) => {
      // 1. UPDATE PAYMENT
      await tx.payment.update({
        where: { orderId },
        data: {
          status: "paid",
          paidAt: new Date(),
        },
      });

      // 2. UPSERT SUBSCRIPTION
      await tx.subscription.upsert({
        where: { userId: payment.userId },
        update: {
          status: "active",
          plan: payment.plan,
          currentPeriodStart: new Date(),
          currentPeriodEnd: getSubscriptionEndDate(payment.plan),
        },
        create: {
          userId: payment.userId,
          plan: payment.plan,
          status: "active",
          trialEnd: getTrialEndDate(),
          currentPeriodStart: new Date(),
          currentPeriodEnd: getSubscriptionEndDate(payment.plan),
        },
      });
    });

    return;
  }

  // fallback non-paid status
  await prisma.payment.update({
    where: { orderId },
    data: {
      status,
    },
  });
}
