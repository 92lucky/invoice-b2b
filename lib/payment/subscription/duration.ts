/* =========================
ENV MODE
========================= */
const IS_TEST_MODE = process.env.NODE_ENV !== "production";
const FORCE_RESET_TRIAL = process.env.FORCE_RESET_TRIAL === "true";

/* =========================
   FREE TRIAL DURATION
========================= */
export function getTrialEndDate() {
  const now = Date.now();

  // FORCE RESET (DEV ONLY) → selalu 5 menit
  if (FORCE_RESET_TRIAL || IS_TEST_MODE) {
    return new Date(now + 5 * 60 * 1000);
  }

  // PRODUCTION MODE → 2 bulan trial
  const d = new Date();
  d.setMonth(d.getMonth() + 2);
  return d;
}

/* ========================lear

   SUBSCRIPTION DURATION
========================= */
export function getSubscriptionEndDate(plan: string) {
  const now = Date.now();

  // TEST MODE → pakai menit biar cepat testing
  if (IS_TEST_MODE) {
    const map: Record<string, number> = {
      monthly: 1, // 1 menit
      quarterly: 2, // 2 menit
      yearly: 3, // 3 menit
    };

    const minutes = map[plan] || 0;
    return new Date(now + minutes * 60 * 1000);
  }

  // PRODUCTION MODE
  const d = new Date();

  switch (plan) {
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      return d;

    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      return d;

    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      return d;

    default:
      return d;
  }
}
