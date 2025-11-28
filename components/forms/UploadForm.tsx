// acepta csv/pdf, crea FormData y POST a `${NEXT_PUBLIC_API_URL}/statements/upload`// components/forms/UploadForm.tsx
import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setStatus("Selecciona un archivo primero.");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/statements/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setStatus(
        `✅ Upload exitoso. Transacciones procesadas: ${
          data.inserted ?? "N/A"
        }`
      );
    } catch (err) {
      console.error(err);
      setStatus("❌ Error subiendo el archivo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Statement (CSV o PDF)
        </label>
        <input
          type="file"
          accept=".csv,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
      >
        {loading ? "Subiendo..." : "Subir statement"}
      </button>
      {status && <p className="text-sm text-slate-300">{status}</p>}
    </form>
  );
}
