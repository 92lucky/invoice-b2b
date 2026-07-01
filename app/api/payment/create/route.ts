import { createTransaction } from "@/lib/payment/pakasir";
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
        status: "pending",
        plan,
      },
    });

    const transaction = await createTransaction({
      orderId,
      amount: price,
    });

    return Response.json({
      redirect_url: transaction.redirect_url,
      orderId,
      plan,
      price,
      status: "pending",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
