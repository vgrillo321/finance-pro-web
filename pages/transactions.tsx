// pages/transactions.tsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TransactionsTable, {
  Transaction,
} from "../components/tables/TransactionsTable";

export default function TransactionsPage() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions`
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = (await res.json()) as Transaction[];
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando transacciones.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-semibold">Transacciones</h2>

      {loading && <p className="text-sm text-slate-300">Cargando...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-sm text-slate-400">
          No hay transacciones todavía. Sube un statement en la página de
          Upload.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <TransactionsTable items={items} />
      )}
    </Layout>
  );
}
