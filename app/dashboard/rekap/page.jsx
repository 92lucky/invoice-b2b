import SoftGate from "@/lib/softGateway";
import ReportPage from "./Rekap";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSubscriptionState } from "@/lib/payment/subscription/status";

export default async function RekapPage() {
  const session = await auth();

  const sub = session?.user?.id
    ? await prisma.subscription.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  const { active } = getSubscriptionState(sub);

  return (
    <div>
      <SoftGate mode="feature" featureName="Rekap LO" active={active}>
        <ReportPage />
      </SoftGate>
    </div>
  );
}
