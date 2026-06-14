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
} from "lucide-react";

type FormData = {
  namaPT?: string;
  namaBank?: string;
  noRekening?: string;
  penanggungJawab?: string;
  alamat?: string;
  kabupaten?: string;
};

export default function ProfileForm({
  initialData,
}: {
  initialData?: FormData | null;
}) {
  const router = useRouter();
  const { update } = useSession();

  const [form, setForm] = useState<FormData>(initialData ?? {});
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      await update();

      setSuccess(true);
      setEdit(false);

      router.refresh();

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
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
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl">
        {/* glow */}
        <div className="absolute -top-24 right-0 h-64 w-64 bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 p-8 md:p-10">
          {/* HEADER */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Company Profile
              </h1>

              <p className="text-slate-400 mt-2">
                Kelola informasi invoice dan identitas perusahaan.
              </p>
            </div>

            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 transition-all text-white font-medium shadow-lg shadow-violet-900/30"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-emerald-300">
              <CheckCircle2 size={20} />
              <span>Profile berhasil disimpan</span>
            </div>
          )}

          {!edit ? (
            <>
              {/* VIEW MODE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div
                      key={field.name}
                      className="rounded-2xl border border-white/10 bg-white/3 p-5 hover:border-violet-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                          <Icon size={20} />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            {field.label}
                          </p>
                        </div>
                      </div>

                      <p className="text-white text-lg font-medium wrap-break-words">
                        {form[field.name as keyof FormData] || "-"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div key={field.name}>
                      <label className="text-sm text-slate-300 mb-2 block">
                        {field.label}
                      </label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          <Icon size={18} />
                        </div>

                        <input
                          name={field.name}
                          value={form[field.name as keyof FormData] || ""}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="
                            w-full
                            rounded-2xl
                            border border-white/10
                            bg-white/3
                            pl-12
                            pr-4
                            py-3.5
                            text-white
                            placeholder:text-slate-500
                            outline-none
                            transition-all
                            focus:border-violet-500
                            focus:ring-4
                            focus:ring-violet-500/20
                          "
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ACTION */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/3 text-slate-300 hover:bg-white/6 transition-all"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition-all text-white font-semibold shadow-lg shadow-violet-900/30"
                >
                  <Save size={18} />

                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
