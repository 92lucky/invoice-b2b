import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import BillingHeader from "./components/BillingHeader";
import BillingHero from "./components/BillingHero";
import SubscriptionStatus from "./components/SubscriptionStatus";
import PaymentHistory from "./components/PaymentHistory";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) return null;

  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? "1"));
  const pageSize = 10;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscription: true,
      payments: {
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      },
    },
  });

  if (!user) return null;

  const totalPayments = await prisma.payment.count({
    where: {
      userId: user.id,
    },
  });

  const totalPages = Math.max(1, Math.ceil(totalPayments / pageSize));

  const sub = user.subscription;
  const now = new Date();

  const isTrialActive = sub?.trialEnd ? now < new Date(sub.trialEnd) : false;

  const isPaidActive = sub?.currentPeriodEnd
    ? now < new Date(sub.currentPeriodEnd)
    : false;

  const isActive = isTrialActive || isPaidActive;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BillingHeader />
        </div>

        <div className="mb-8">
          <BillingHero />
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="order-2 lg:order-1">
            <SubscriptionStatus sub={sub} isActive={isActive} />
          </div>

          <div className="order-1 lg:order-2 min-w-0">
            <PaymentHistory payments={user.payments} />

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/dashboard/billing?page=${page - 1}`}
                  className={`rounded-xl border border-zinc-700 px-4 py-2 transition ${
                    page === 1
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  Previous
                </Link>

                <span className="text-sm text-zinc-400">
                  Page {page} of {totalPages}
                </span>

                <Link
                  href={`/dashboard/billing?page=${page + 1}`}
                  className={`rounded-xl border border-zinc-700 px-4 py-2 transition ${
                    page >= totalPages
                      ? "pointer-events-none opacity-40"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
