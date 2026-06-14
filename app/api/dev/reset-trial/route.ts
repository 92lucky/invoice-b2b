import { prisma } from "@/lib/prisma";
import { getTrialEndDate } from "@/lib/payment/subscription/duration";

export async function POST(req: Request) {
  let userId: string;

  const body = await req.json().catch(() => null);

  // DEV ONLY fallback
  if (process.env.NODE_ENV !== "production") {
    const user = await prisma.user.findFirst();
    userId = user!.id;
  } else {
    userId = body?.userId;
  }

  if (!userId) {
    return Response.json({ error: "No userId" }, { status: 400 });
  }

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      trialEnd: getTrialEndDate(),
      status: "trial",
    },
    create: {
      userId,
      plan: "free",
      status: "trial",
      trialEnd: getTrialEndDate(),
    },
  });

  return Response.json({
    success: true,
    userId,
  });
}
