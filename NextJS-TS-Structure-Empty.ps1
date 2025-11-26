# 1) Carpetas que hay que crear
$folders = @(
    "pages",
    "components",
    "components\cards",
    "components\tables",
    "components\forms",
    "lib",
    "styles"
)

# Crear carpetas
$folders | ForEach-Object {
    New-Item -Path $_ -ItemType Directory -Force | Out-Null
}

# 2) Files que hay que crear
$files = @(
    "components\Layout.tsx",
    "components\cards\StatCard.tsx",
    "components\tables\TransactionsTable.tsx",
    "components\forms\UploadForm.tsx",
    "pages\index.tsx",
    "pages\upload.tsx",
    "pages\transactions.tsx",
    "lib\api.ts",
    "styles\globals.css"
)

# Crear files
$files | ForEach-Object {
    New-Item -Path $_ -ItemType File -Force | Out-Null
}
