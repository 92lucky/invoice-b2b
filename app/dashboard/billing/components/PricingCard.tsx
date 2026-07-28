"use client";

import UpgradeButton from "./UpgradeButton";

type Plan = {
  label: string;
  price: string;
  desc: string;
  plan: string;
};

export default function PricingCard({ item }: { item: Plan }) {
  const price = item.price.replace(/[^\d]/g, "");

  return (
    <div
      className="
    flex h-full min-h-[340px] flex-col
    rounded-3xl
    border border-emerald-500/20
    bg-linear-to-b from-emerald-500/10 via-zinc-900/80 to-zinc-900
    p-6 lg:p-7
    backdrop-blur-xl
    transition-all duration-300
    hover:-translate-y-1
    hover:border-emerald-400/40
    hover:shadow-xl hover:shadow-emerald-500/10
  "
    >
      {/* LABEL */}
      <div className="flex justify-center">
        <span className="rounded-full bg-emerald-500/15 px-5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
          {item.label}
        </span>
      </div>

      {/* PRICE */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          {price + "k"}

          <p className="mt-3 text-sm font-normal leading-6 text-zinc-400">
            {item.desc}
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <div className="pt-6">
        <UpgradeButton plan={item.plan} />
      </div>
    </div>
  );
}
