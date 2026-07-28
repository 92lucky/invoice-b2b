"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { LogoutButton } from "@/app/login/components/LogOutButton";

type DashboardSidebarProps = {
  session: {
    user: {
      name?: string | null;
      email?: string | null;
    };
  };
};

export default function DashboardSidebar({ session }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/dashboard/invoice", label: "Invoice" },
    { href: "/dashboard/rekap", label: "Rekap LO" },
    { href: "/dashboard/billing", label: "Billing" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/logo/raven.png"
            alt="Corvusion"
            width={36}
            height={36}
            className="rounded-lg"
          />

          <div>
            <h1 className="text-sm font-semibold">Corvusion</h1>
            <p className="text-xs text-zinc-500">Internal Invoice</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-zinc-800"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-full w-72 flex-col
          border-r border-zinc-800
          bg-black/90 backdrop-blur-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:flex
        `}
      >
        {/* Close Mobile */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-zinc-800"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 transition-all hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Account */}
        <div className="border-t border-zinc-800 px-6 py-5">
          <div className="mb-5">
            <p className="font-medium text-white">
              {session.user.name ?? "User"}
            </p>

            <p className="mt-1 break-all text-sm text-zinc-500">
              {session.user.email}
            </p>
          </div>

          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
