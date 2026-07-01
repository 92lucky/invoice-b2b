import { auth } from "@/lib/auth";
import { getSubscriptionState } from "@/lib/payment/subscription/status";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { id } = session.user;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    subscription: user.subscription,
    state: getSubscriptionState(user.subscription),
  });
}
