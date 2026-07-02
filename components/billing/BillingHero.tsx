import PricingCards from "./PricingCards";

export default function BillingHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
      />

      {/* Glow */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

      <div className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[35%_65%] lg:items-center">
          {/* LEFT */}
          <div className="max-w-md">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-zinc-300 sm:text-sm">
              ✨ Premium Access
            </span>

            <h2 className="mt-5 text-2xl font-extrabold leading-tight lg:text-3xl">
              Tingkatkan produktivitas pekerjaan Anda
            </h2>

            <p className="mt-5 text-sm leading-7 text-zinc-300 sm:text-base">
              Tingkatkan produktivitas dengan fitur premium untuk invoice dan
              rekap LO.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full">
            <PricingCards />
          </div>
        </div>
      </div>
    </section>
  );
}
