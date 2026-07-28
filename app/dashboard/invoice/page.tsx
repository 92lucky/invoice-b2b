import SoftGate from "@/lib/softGateway";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSubscriptionState } from "@/lib/payment/subscription/status";
import InvoicePage from "./InvoicePage";

export default async function Page() {
  const session = await auth();

  const sub = session?.user?.id
    ? await prisma.subscription.findUnique({
        where: { userId: session.user.id },
      })
    : null;

  const { active } = getSubscriptionState(sub);

  return (
    <SoftGate mode="feature" featureName="Invoice" active={active}>
      <InvoicePage />
    </SoftGate>
  );
}
