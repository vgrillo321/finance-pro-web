financiero-web/
│
├── pages/                # Rutas/pantallas principales
│   ├── index.tsx         # Dashboard
│   ├── upload.tsx        # Upload de statements
│   └── transactions.tsx  # Lista de transacciones
│
├── components/           # UI reutilizable
│   ├── Layout.tsx
│   ├── cards/
│   │   └── StatCard.tsx
│   ├── tables/
│   │   └── TransactionsTable.tsx
│   └── forms/
│       └── UploadForm.tsx
│
├── lib/                  # Lógica “compartida” (no UI)
│   └── api.ts            # Cliente para el backend
│
├── styles/
│   └── globals.css
│
├── .env.local            # URL del backend
└── package.json
