import { FileText } from "lucide-react";
import LoginButton from "@/components/ui/LoginButton";

export default function Page() {
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

          <div className="flex justify-center">
            <LoginButton />
          </div>

          <p className="text-zinc-500 text-sm text-center mt-10">
            login dengan akun Google
          </p>
        </div>
      </div>
    </main>
  );
}
