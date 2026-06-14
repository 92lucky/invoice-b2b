import { snap } from "@/lib/payment/midtrans";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const PRICING: Record<string, number> = {
  monthly: 8000,
  quarterly: 20000,
  yearly: 76000,
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    const price = PRICING[plan];
    if (!price) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const orderId = crypto.randomUUID();

    // PAYMENT
    await prisma.payment.create({
      data: {
        userId: user.id,
        orderId,
        amount: price,
        status: "PENDING",
        plan,
      },
    });

    // SUBSCRIPTION (CREATE / UPDATE = TRIAL 5 MENIT)
    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        plan,
        status: "TRIAL",
        trialEnd: new Date(Date.now() + 5 * 60 * 1000),
      },
      update: {
        plan,
        status: "TRIAL",
        trialEnd: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: price,
      },
      item_details: [
        {
          id: plan,
          price,
          quantity: 1,
          name: `${plan.toUpperCase()} Subscription`,
        },
      ],
    });

    return Response.json({
      redirect_url: transaction.redirect_url,
      orderId,
      plan,
      price,
      status: "PENDING",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
