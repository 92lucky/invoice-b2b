import Dashboard from "@/components/dashboard/Dashboard";
import PlanBadge from "@/components/billing/PlanBadge";
import SoftGate from "@/lib/softGateway";

import { getSubscriptionState } from "@/lib/payment/subscription/status";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      subscription: true,
    },
  });

  const state = getSubscriptionState(user?.subscription ?? null);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <PlanBadge label={state.label} />
      </div>

      <SoftGate mode="welcome">
        <Dashboard />
      </SoftGate>
    </div>
  );
}
