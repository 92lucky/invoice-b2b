import type { Subscription } from "@prisma/client";

export function isSubscriptionActive(sub: Subscription | null) {
  if (!sub) return false;

  if (sub.status !== "active") return false;

  if (sub.currentPeriodEnd && new Date() > sub.currentPeriodEnd) {
    return false;
  }

  return true;
}

export function getPlanLabel(sub?: Subscription | null) {
  if (!sub) return "FREE";

  const now = new Date();

  const trialEnd = sub.trialEnd ? new Date(sub.trialEnd) : null;

  const periodEnd = sub.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd)
    : null;

  // PREMIUM ACTIVE
  const isPremiumPlan =
    sub.plan === "monthly" || sub.plan === "quarterly" || sub.plan === "yearly";

  if (isPremiumPlan && periodEnd && now <= periodEnd) {
    return "PREMIUM";
  }

  // TRIAL ACTIVE
  if (trialEnd && now <= trialEnd) {
    return "TRIAL";
  }

  // EXPIRED
  if ((trialEnd && now > trialEnd) || (periodEnd && now > periodEnd)) {
    return "EXPIRED";
  }

  return "FREE";
}
