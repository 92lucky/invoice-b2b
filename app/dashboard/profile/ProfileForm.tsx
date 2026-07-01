"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Building2,
  Landmark,
  CreditCard,
  User2,
  MapPin,
  Save,
  Pencil,
  X,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";
import { resetAccount } from "@/app/actions/reset-account";

type FormData = {
  namaPT?: string;
  namaBank?: string;
  noRekening?: string;
  penanggungJawab?: string;
  alamat?: string;
  kabupaten?: string;
};

const FIELDS = [
  {
    label: "Nama PT",
    name: "namaPT",
    icon: Building2,
    placeholder: "PT Example Indonesia",
  },
  {
    label: "Nama Bank",
    name: "namaBank",
    icon: Landmark,
    placeholder: "BCA / Mandiri",
  },
  {
    label: "No Rekening",
    name: "noRekening",
    icon: CreditCard,
    placeholder: "1234567890",
  },
  {
    label: "Penanggung Jawab",
    name: "penanggungJawab",
    icon: User2,
    placeholder: "Nama PIC",
  },
  {
    label: "Alamat",
    name: "alamat",
    icon: MapPin,
    placeholder: "Alamat lengkap",
  },
  {
    label: "Kabupaten",
    name: "kabupaten",
    icon: MapPin,
    placeholder: "Kabupaten",
  },
] as const;

export default function ProfileForm({
  initialData,
}: {
  initialData?: FormData | null;
}) {
  const router = useRouter();
  const { update } = useSession();
  const [form, setForm] = useState<FormData>(initialData ?? {});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      await update();
      setSuccess(true);
      setIsEditing(false);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="rounded-3xl border border-white/10 bg-[#0f172a]/80 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Company Profile</h1>
            <p className="text-slate-400 mt-2">Kelola informasi perusahaan.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-violet-600 px-5 py-3 flex gap-2"
            >
              <Pencil size={18} />
              Edit
            </button>
          )}
        </div>

        {success && (
          <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex gap-2">
            <CheckCircle2 />
            Profile berhasil disimpan.
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              {FIELDS.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.name}>
                    <label className="block mb-2 text-sm">{f.label}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Icon size={18} />
                      </div>
                      <input
                        name={f.name}
                        value={(form as any)[f.name] ?? ""}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 py-3"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border px-5 py-3 flex gap-2"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                disabled={loading}
                className="rounded-xl bg-violet-600 px-5 py-3 flex gap-2"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {FIELDS.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.name}
                  className="rounded-2xl border border-white/10 p-5"
                >
                  <div className="flex gap-3 mb-3">
                    <Icon size={18} />
                    <span>{f.label}</span>
                  </div>
                  <p>{(form as any)[f.name] || "-"}</p>
                </div>
              );
            })}
          </div>
        )}

        <section className="mt-12 rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
          <div className="flex gap-3 items-center text-red-400">
            <TriangleAlert />
            <h2 className="text-xl font-semibold">Danger Zone</h2>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Menghapus akun akan menghapus seluruh data secara permanen.
          </p>
          <form action={resetAccount} className="mt-5">
            <button className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
              Hapus Akun
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
