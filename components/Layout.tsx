// components/Layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold tracking-tight">
            FINANCIERO <span className="text-emerald-400">PRO</span>
          </h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-emerald-400">
              Dashboard
            </Link>
            <Link href="/transactions" className="hover:text-emerald-400">
              Transacciones
            </Link>
            <Link href="/upload" className="hover:text-emerald-400">
              Upload
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
