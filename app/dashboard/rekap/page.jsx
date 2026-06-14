import SoftGate from "@/lib/softGateway";
import ReportPage from "./Rekap";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RekapPage() {
  const session = await auth();

  const sub = session?.user?.id
    ? await prisma.subscription.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  const now = new Date();

  const isExpired =
    !sub ||
    sub.status !== "active" ||
    (sub.currentPeriodEnd && new Date(sub.currentPeriodEnd) < now);

  return (
    <div>
      <SoftGate mode="feature" featureName="Rekap LO" active={!isExpired}>
        <ReportPage />
      </SoftGate>
    </div>
  );
}
