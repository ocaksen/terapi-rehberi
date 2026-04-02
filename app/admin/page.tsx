import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY ?? "admin123";

  if (key === adminKey) {
    redirect(`/admin/basvurular?key=${key}`);
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-cream-200 p-8 max-w-sm w-full text-center shadow-sm">
        <h1 className="text-xl font-bold text-brand-900 mb-2">Admin Paneli</h1>
        <p className="text-sm text-slate-500 mb-3">
          URL&apos;ye <code className="bg-cream-100 px-1.5 py-0.5 rounded text-xs">?key=ŞİFRENİZ</code> ekleyin
        </p>
        <p className="text-xs text-slate-400">Örnek: /admin?key=sifreniz</p>
      </div>
    </div>
  );
}
