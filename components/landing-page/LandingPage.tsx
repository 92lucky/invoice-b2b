"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          className="h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-linear-to-br from-black via-zinc-950/95 to-green-950/70" />
      </div>

      {/* Glow */}
      <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
        <div className="grid w-full gap-14 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-green-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Internal Management Platform
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Aplikasi Internal
              <span className="bg-linear-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Agen LPG 3 Kg
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
              Platform internal modern untuk membantu operasional agen LPG 3 Kg
              menjadi lebih cepat, rapi, dan terintegrasi dalam satu dashboard.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-linear-to-r from-green-500 to-blue-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.03] hover:shadow-green-500/50"
              >
                Masuk
              </Link>

              <a
                href="#learn-more"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-medium text-zinc-200 backdrop-blur-md transition hover:bg-white/10"
              >
                Selengkapnya ...
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
                <p className="text-3xl font-bold text-green-400">2</p>
                <p className="mt-1 text-sm text-zinc-400">Fitur Utama</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
                <p className="text-3xl font-bold text-red-400">24/7</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Internal Access System
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex items-center justify-center">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop"
                alt="Dashboard Preview"
                className="h-162.5 w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="rounded-2xl border border-green-400/20 bg-black/40 p-5 backdrop-blur-lg">
                  <p className="text-sm font-medium text-green-300">
                    Smart Internal Workflow
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Rekap LO & Invoice Generator
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    Membantu pengelolaan transaksi, pencatatan distribusi LPG,
                    serta monitoring invoice secara lebih efisien dan realtime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More */}
      <section
        id="learn-more"
        className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
              Learn More
            </p>

            <h2 className="text-4xl font-black leading-tight">
              Dibangun untuk kebutuhan operasional vendor agen LPG 3KG
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              Aplikasi internal ini dirancang untuk membantu proses administrasi
              dan operasional agen LPG 3KG agar lebih terstruktur, cepat, dan
              efisien.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
