"use client";

import { useState } from "react";

import LoginButton from "@/components/ui/LoginButton";
import Image from "next/image";

export default function Page() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B] flex items-center justify-center p6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-6 shadow-[0_25px_80px_rgba(0,0,0,.45)]">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20">
              <Image
                src="/logo/raven.png"
                alt="Raven Logo"
                width={42}
                height={42}
                priority
              />
            </div>
          </div>

          {/* Title */}
          <div className="mt-7 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Corvusion
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Kelola invoice vendor dengan aman menggunakan akun Google.
            </p>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Continue with Google
            </span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* Login */}
          <div className="flex justify-center">
            <LoginButton disabled={!agreed} />
          </div>

          {/* Terms */}
          <label className="mt-8 flex items-start gap-3 text-sm leading-6 text-zinc-400">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-blue-500"
            />

            <span>
              Saya menyetujui{" "}
              <a
                href="/legal"
                className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
              >
                Syarat Penggunaan
              </a>{" "}
              dan{" "}
              <a
                href="/legal"
                className="font-medium text-zinc-200 hover:text-blue-400 transition-colors"
              >
                Kebijakan Privasi
              </a>
              .
            </span>
          </label>

          {/* Footer */}
          <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
            <p className="text-xs text-zinc-500">
              Secure authentication powered by Google
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
