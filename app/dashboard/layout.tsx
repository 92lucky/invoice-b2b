import Link from "next/link";
import { LogoutButton } from "@/components/ui/LogOutButton";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col">
        <div>
          <h1 className="text-2xl font-bold mb-10">Invoice App</h1>

          <nav className="space-y-3">
            <Link
              href="/dashboard"
              className="block p-3 rounded-xl hover:bg-zinc-900"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/profile"
              className="block p-3 rounded-xl hover:bg-zinc-900"
            >
              Profile
            </Link>

            <Link
              href="/dashboard/invoice"
              className="block p-3 rounded-xl hover:bg-zinc-900"
            >
              Invoice
            </Link>

            <Link
              href="/dashboard/rekap"
              className="block p-3 rounded-xl hover:bg-zinc-900"
            >
              Rekap LO
            </Link>

            <Link
              href="/dashboard/billing"
              className="block p-3 rounded-xl hover:bg-zinc-900"
            >
              Bill/Pembayaran
            </Link>
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm mb-3">Account</p>
          <LogoutButton />
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
