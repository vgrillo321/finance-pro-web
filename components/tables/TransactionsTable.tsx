// tabla simple que renderiza fecha, vendor, descripción, monto, categoría// components/tables/TransactionsTable.tsx
import React from "react";

export type Transaction = {
  id: number;
  date: string;
  vendor?: string | null;
  description?: string | null;
  amount: number;
  category_name?: string | null;
};

type Props = {
  items: Transaction[];
};

export default function TransactionsTable({ items }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr className="text-left text-xs uppercase text-slate-400">
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Vendor</th>
            <th className="px-3 py-2">Descripción</th>
            <th className="px-3 py-2 text-right">Monto</th>
            <th className="px-3 py-2">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tx) => (
            <tr key={tx.id} className="border-t border-slate-800">
              <td className="px-3 py-2 text-slate-200">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 text-slate-200">{tx.vendor ?? "-"}</td>
              <td className="px-3 py-2 text-slate-400">
                {tx.description ?? "-"}
              </td>
              <td className="px-3 py-2 text-right text-slate-100">
                ${tx.amount.toFixed(2)}
              </td>
              <td className="px-3 py-2 text-slate-300">
                {tx.category_name ?? "Sin categoría"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
