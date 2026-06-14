"use client";

import UpgradeButton from "./UpgradeButton";

type Plan = {
  label: string;
  price: string;
  desc: string;
  plan: string;
};

export default function PricingCard({ item }: { item: Plan }) {
  return (
    <div
      className="
        rounded-2xl p-6
        bg-emerald-500/10
        border border-emerald-500/20
        backdrop-blur-xl
        transition-all duration-200
        cursor-pointer
        hover:bg-[#18181b]
        hover:border-white/10
      "
    >
      {/* LABEL */}
      <p className="text-emerald-200 text-sm font-semibold mb-2 tracking-wide">
        {item.label}
      </p>

      {/* PRICE */}
      <h3 className="text-white text-3xl font-extrabold mb-1 tracking-tight">
        {item.price}
      </h3>

      {/* DESC */}
      <p className="text-zinc-400 text-sm mb-5">{item.desc}</p>

      {/* FEATURES */}
      <div className="flex flex-col gap-2 mb-6">
        {["Invoice Export", "Payment Tracking", "Premium Features"].map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 text-sm text-zinc-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {f}
          </div>
        ))}
      </div>

      <UpgradeButton plan={item.plan} />
    </div>
  );
}
