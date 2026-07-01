export function getSubscriptionState(sub: Subscription | null) {
  if (!sub) {
    return { active: false, label: "FREE" };
  }

  const now = new Date();

  // 1. FIRST: check ACTIVE status
  if (sub.status === "active") {
    if (!sub.currentPeriodEnd || now <= sub.currentPeriodEnd) {
      return { active: true, label: "PREMIUM" };
    }
    return { active: false, label: "EXPIRED" };
  }

  // 2. TRIAL
  if (sub.status === "trial") {
    if (sub.trialEnd && now <= sub.trialEnd) {
      return { active: true, label: "TRIAL" };
    }
    return { active: false, label: "EXPIRED" };
  }

  return { active: false, label: "FREE" };
}
