import Rekap from "./components/Rekap";
import SoftGate from "@/lib/softGateway";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSubscriptionState } from "@/lib/payment/subscription/status";

export default async function ReportPage() {
  const session = await auth();

  const profile = await prisma.appProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  const subscription = getSubscriptionState(profile);

  return (
    <SoftGate subscription={subscription}>
      <Rekap />
    </SoftGate>
  );
}
