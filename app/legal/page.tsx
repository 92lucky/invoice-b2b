export default function LegalPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Syarat Penggunaan & Privasi
        </h1>

        <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
          Dengan menggunakan aplikasi ini, Anda menyetujui syarat penggunaan dan
          kebijakan privasi yang berlaku.
        </p>

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
            <h2 className="text-lg font-semibold text-white">Keamanan</h2>

            <p className="mt-2 leading-7 text-zinc-400">
              Login menggunakan Google OAuth. Kami tidak menyimpan kata sandi
              pengguna sehingga keamanan akun tetap terjaga.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
            <h2 className="text-lg font-semibold text-white">Privasi Data</h2>

            <p className="mt-2 leading-7 text-zinc-400">
              Data digunakan hanya untuk menjalankan layanan aplikasi dan tidak
              diperjualbelikan ataupun dibagikan kepada pihak ketiga tanpa izin.
            </p>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
            <h2 className="text-lg font-semibold text-white">Penggunaan</h2>

            <p className="mt-2 leading-7 text-zinc-400">
              Pengguna bertanggung jawab atas data yang dimasukkan serta
              penggunaan layanan sesuai dengan ketentuan yang berlaku.
            </p>
          </section>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-500">
            Terakhir diperbarui: Juni 2026
          </p>
        </div>
      </div>
    </main>
  );
}
