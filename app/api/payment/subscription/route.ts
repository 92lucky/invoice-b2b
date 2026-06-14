import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email || !session.user.id) {
    return Response.json({ success: false }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return Response.json({ success: false }, { status: 404 });
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  // ADD ONLY THIS PART (BLOCK EXPIRE)
  const now = new Date();

  const isExpired =
    !subscription ||
    subscription.status !== "active" ||
    (subscription.currentPeriodEnd &&
      new Date(subscription.currentPeriodEnd) < now);

  if (isExpired) {
    return Response.json(
      { success: false, message: "expired" },
      { status: 403 }
    );
  }

  return Response.json({
    success: true,
    subscription,
  });
}
