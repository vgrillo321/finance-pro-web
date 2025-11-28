// pages/index.tsx
import Layout from "../components/Layout";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <p className="mb-4 text-sm text-slate-300">
        Aquí vas a ver tu snapshot mensual: gasto total, ahorro estimado y
        breakdown por categoría.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Gasto total (mes)" value="$0.00" />
        <StatCard label="Ahorro estimado" value="$0.00" />
        <StatCard label="Fast food (mes)" value="$0.00" />
      </div>
    </Layout>
  );
}
