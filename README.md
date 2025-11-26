# 💻 FINANCIERO PRO — Frontend

Durísimo — hoy toca frontend. Vamos a montar un frontend sencillo y bien
organizado que sea fácil de escalar.

**Stack**

- Next.js + TypeScript
- Tailwind CSS

Resumen: este README explica la estructura del proyecto, cómo arrancarlo y
algunos ejemplos de componentes y utilidades comunes.

---

## Contenido

- [Estructura del proyecto](#estructura-del-proyecto)
- [Arranque rápido](#arranque-rápido)
- [Tailwind (configuración)](#tailwind-configuración)
- [Cliente API (lib/api.ts)](#cliente-api-libapit)
- [Componentes clave](#componentes-clave)
- [Pautas para escalar](#pautas-para-escalar)


## Estructura del proyecto

Idea clave: cada cosa en su sitio.

```bash
financiero-web/
├── pages/                # Rutas / pantallas principales
│   ├── index.tsx         # Dashboard
│   ├── upload.tsx        # Upload de statements
│   └── transactions.tsx  # Lista de transacciones
├── components/           # UI reutilizable
│   ├── Layout.tsx
│   ├── cards/            # tarjetas pequeñas (StatCard)
│   ├── tables/           # tablas (TransactionsTable)
│   └── forms/            # formularios (UploadForm)
├── lib/                  # lógica compartida (API client)
│   └── api.ts
├── styles/
│   └── globals.css
├── .env.local            # variables de entorno (NEXT_PUBLIC_API_URL)
└── package.json
```

## Arranque rápido

Si aún no tienes el proyecto (esqueleto):

```powershell
npx create-next-app@latest financiero-web --typescript
cd financiero-web
npm run dev
# abre http://localhost:3000
```

## Tailwind (configuración)

Instalación:

```powershell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Ejemplo de `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
```

`styles/globals.css` (mínimo):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Con esto ya puedes usar clases como `bg-slate-900`, `text-emerald-400`, etc.

## Cliente API — `lib/api.ts`

Centralizamos las llamadas al backend en un helper sencillo:

```ts
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  return handleResponse<T>(res);
}

export async function apiPostJson<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}
```

Ejemplo de `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Cambiar el backend solo requiere editar la variable anterior.

## Componentes clave (resumen)

- `components/Layout.tsx` — layout y navegación principal.
- `components/cards/StatCard.tsx` — pequeñas tarjetas para métricas.
- `components/forms/UploadForm.tsx` — formulario para subir statements (CSV/PDF).
- `components/tables/TransactionsTable.tsx` — tabla para listar transacciones.

Pequeños ejemplos (resumidos):

`pages/index.tsx` — Dashboard básico (usa `StatCard`):

```tsx
import Layout from "../components/Layout";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-slate-900 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Gasto total (mes)" value="$0.00" />
      </div>
    </Layout>
  );
}
```

`components/forms/UploadForm.tsx` — idea general:

```tsx
// acepta csv/pdf, crea FormData y POST a `${NEXT_PUBLIC_API_URL}/statements/upload`
```

`components/tables/TransactionsTable.tsx` — idea general:

```tsx
// tabla simple que renderiza fecha, vendor, descripción, monto, categoría
```

## Pautas para escalar

Cuando añadas funcionalidades, sigue este patrón:

1. Añade o exponen un endpoint en el backend (por ejemplo `/summary/monthly`).
2. Si hace falta, extiende `lib/api.ts` con helpers específicos.
3. Crea componentes en `components/` (ej. `components/summary/MonthlySummary.tsx`).
4. Monta el componente en una página (`pages/summary.tsx` o `pages/index.tsx`).

Patrón recomendado: API → `useEffect` / data fetching → componente → página.

---

Si quieres, puedo:

- Añadir una tabla de contenidos automatizada.
- Extraer ejemplos de código a archivos de ejemplo en `examples/`.
- Añadir scripts útiles en `package.json`.

Dime qué prefieres y lo implemento.