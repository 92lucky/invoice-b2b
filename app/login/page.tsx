"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import LoginButton from "@/components/ui/LoginButton";

export default function Page() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-10 shadow-2xl backdrop-blur">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">
              <FileText className="text-black" size={38} />
            </div>
          </div>

          <h1 className="text-white text-4xl font-bold text-center tracking-tight">
            Invoice Internal
          </h1>

          <h2 className="text-zinc-400 text-center text-lg mt-2">
            Vendor Management
          </h2>

          <div className="h-px bg-zinc-800 my-10" />

          <div className="flex justify-center mb-6">
            <LoginButton disabled={!agreed} />
          </div>

          <label className="flex items-start gap-3 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />

            <span>
              Saya menyetujui{" "}
              <a
                href="/legal"
                className="text-zinc-300 hover:text-white underline"
              >
                Syarat Penggunaan & Privasi
              </a>
              .
            </span>
          </label>
        </div>
      </div>
    </main>
  );
}
