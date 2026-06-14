import Dashboard from "@/components/dashboard/Dashboard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import PlanBadge from "@/components/billing/PlanBadge";
import { getPlanLabel } from "@/lib/payment/subscription/status";
import SoftGate from "@/lib/softGateway";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscription: true,
    },
  });

  const sub = user?.subscription;

  const label = getPlanLabel(sub);

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <h1>Dashboard</h1>
        <PlanBadge label={label} />
      </div>
      <SoftGate mode="welcome">
        <Dashboard />
      </SoftGate>
    </div>
  );
}
