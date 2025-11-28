// pages/upload.tsx
import Layout from "../components/Layout";
import UploadForm from "../components/forms/UploadForm";

export default function UploadPage() {
  return (
    <Layout>
      <h2 className="mb-4 text-2xl font-semibold">Upload de Statements</h2>
      <p className="mb-4 text-sm text-slate-300">
        Sube tus archivos CSV/PDF de Chase, Capital One, etc. El backend los
        va a parsear y los guardará como transacciones.
      </p>
      <UploadForm />
    </Layout>
  );
}
