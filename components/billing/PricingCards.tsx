"use client";

import { plans } from "./plan";
import PricingCard from "./PricingCard";

export default function PricingCards() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {plans.map((item) => (
        <PricingCard key={item.plan} item={item} />
      ))}
    </div>
  );
}
