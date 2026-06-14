"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileWarning } from "lucide-react";

interface SoftGateProps {
  children: ReactNode;
  featureName?: string;
  mode?: "welcome" | "feature";
  active?: boolean;
}

export default function SoftGate({
  children,
  featureName,
  mode = "feature",
  active = true,
}: SoftGateProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // =========================
  // SAFE PROFILE CHECK
  // =========================
  const profileCompleted = !!session?.user?.profileCompleted;

  const profileIncomplete = status !== "loading" && !profileCompleted;

  // =========================
  // SUBSCRIPTION CHECK
  // =========================
  const subscriptionExpired = !active;

  // =========================
  // FINAL LOGIC
  // =========================
  const showWarning =
    status === "loading"
      ? false
      : mode === "welcome"
      ? profileIncomplete
      : profileIncomplete || subscriptionExpired;

  // =========================
  // ACTION HANDLER
  // =========================
  const handleProfile = () => {
    router.push("/dashboard/profile");
  };

  const handleBilling = () => {
    router.push("/dashboard/billing");
  };

  const handleAction = () => {
    if (profileIncomplete) {
      handleProfile();
    } else {
      handleBilling();
    }
  };

  return (
    <div className="relative">
      {/* CONTENT */}
      {children}

      {/* OVERLAY */}
      {showWarning && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

          {/* MODAL */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div
              className={`
                w-full max-w-md rounded-2xl shadow-2xl p-6
                ${
                  mode === "welcome"
                    ? "bg-zinc-900 border border-red-700/40"
                    : "bg-zinc-900 border border-green-400/40"
                }
              `}
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                {profileIncomplete ? (
                  <FileWarning
                    className="text-amber-400 animate-pulse"
                    size={22}
                  />
                ) : (
                  <CheckCircle2 className="text-emerald-400" size={22} />
                )}

                <span className="text-emerald-400 font-semibold">
                  {mode === "welcome" ? "Sukses Login" : "Access Control"}
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold text-white mb-2">
                {mode === "welcome" ? "Selamat Datang !" : "Akses Dibatasi"}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {profileIncomplete
                  ? mode === "welcome"
                    ? "Untuk melanjutkan, lengkapi profil terlebih dahulu."
                    : featureName
                    ? `Untuk mengakses fitur ${featureName}, lengkapi profil terlebih dahulu.`
                    : "Lengkapi profil terlebih dahulu."
                  : subscriptionExpired
                  ? "Subscription kamu tidak aktif atau expired."
                  : "Akses tersedia."}
              </p>

              {/* BUTTON */}
              <button
                onClick={handleAction}
                className="mt-5 w-full bg-blue-800 hover:bg-blue-500 text-white py-2 rounded-xl font-medium transition"
              >
                {profileIncomplete ? "Lengkapi Profil" : "Upgrade Plan"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
