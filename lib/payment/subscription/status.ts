import type { Subscription } from "@prisma/client";

export function getSubscriptionState(sub: Subscription | null) {
  if (!sub) {
    return { active: false, label: "FREE" };
  }

  const now = new Date();

  // EXPIRED GLOBAL CHECK
  if (sub.currentPeriodEnd && now > sub.currentPeriodEnd) {
    return { active: false, label: "EXPIRED" };
  }

  if (sub.status === "active") {
    return { active: true, label: "PREMIUM" };
  }

  if (sub.status === "trial") {
    if (sub.trialEnd && now <= sub.trialEnd) {
      return { active: true, label: "TRIAL" };
    }
    return { active: false, label: "EXPIRED" };
  }

  return { active: false, label: "FREE" };
}
