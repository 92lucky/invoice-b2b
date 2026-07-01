import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/LogOutButton";

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
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="flex w-72 flex-col border-r border-zinc-800 bg-black/40 backdrop-blur-xl">
        {/* Logo */}
        <div className="border-b border-zinc-800 px-6 py-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/raven.png"
              alt="Corvusion"
              width={46}
              height={46}
              priority
              className="rounded-xl"
            />

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Corvusion
              </h1>

              <p className="text-xs text-zinc-500">Internal Invoice</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <Link
            href="/dashboard"
            className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/profile"
            className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
          >
            Profile
          </Link>

          <Link
            href="/dashboard/invoice"
            className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
          >
            Invoice
          </Link>

          <Link
            href="/dashboard/rekap"
            className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
          >
            Rekap LO
          </Link>

          <Link
            href="/dashboard/billing"
            className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
          >
            Billing
          </Link>
        </nav>

        {/* Account */}
        <div className="border-t border-zinc-800 px-6 py-5">
          <div className="mb-5">
            <p className="font-medium text-white">
              {session.user.name ?? "User"}
            </p>

            <p className="mt-1 text-sm text-zinc-500 break-all">
              {session.user.email}
            </p>
          </div>

          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-950 p-8">{children}</main>
    </div>
  );
}
