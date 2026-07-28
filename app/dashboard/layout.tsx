import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardSidebar from "./components/DashboardSidebar";

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
      <DashboardSidebar session={session} />

      <main className="flex-1 overflow-y-auto bg-zinc-950 px-4 pt-20 pb-5 sm:px-6 sm:py-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
