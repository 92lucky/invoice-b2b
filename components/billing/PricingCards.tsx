"use client";

import { plans } from "./plan";
import PricingCard from "./PricingCard";

export default function PricingCards() {
  return (
    <div
      className="
        grid grid-cols-3 gap-4 min-w-125
      "
    >
      {plans.map((item) => (
        <PricingCard key={item.plan} item={item} />
      ))}
    </div>
  );
}
