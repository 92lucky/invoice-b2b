export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-zinc-200">
      <h1 className="text-3xl font-bold mb-4">Syarat Penggunaan & Privasi</h1>

      <p className="text-zinc-400 mb-8">
        Dengan menggunakan aplikasi ini, Anda menyetujui ketentuan berikut.
      </p>

      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-1">Keamanan</h2>
          <p>
            Login menggunakan Google OAuth. Kami tidak menyimpan kata sandi
            pengguna.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-1">
            Privasi Data
          </h2>
          <p>
            Data digunakan untuk menjalankan layanan dan tidak diperjualbelikan
            kepada pihak ketiga.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-1">Penggunaan</h2>
          <p>
            Pengguna bertanggung jawab atas data yang dimasukkan dan penggunaan
            layanan secara wajar.
          </p>
        </section>

        <p className="text-sm text-zinc-500 pt-6 border-t border-zinc-800">
          Terakhir diperbarui: Juni 2026
        </p>
      </div>
    </main>
  );
}
