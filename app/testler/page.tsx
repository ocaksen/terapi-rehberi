import type { Metadata } from "next";
import { getAllTestsCombined } from "@/lib/data";
import TestlerClient from "./TestlerClient";

export const metadata: Metadata = {
  title: "Ücretsiz Psikolojik Testler — TerapiRehberi",
  description:
    "GAD-7, PHQ-9, PCL-5 gibi bilimsel ölçeklere dayalı ücretsiz psikolojik testler. Anksiyete, depresyon, travma, OKB, ilişki ve daha fazlası.",
  alternates: { canonical: "https://www.terapirehberi.com/testler" },
  openGraph: {
    title: "Ücretsiz Psikolojik Testler — TerapiRehberi",
    description: "GAD-7, PHQ-9, PCL-5 gibi bilimsel ölçeklere dayalı ücretsiz psikolojik testler.",
    url: "https://www.terapirehberi.com/testler",
  },
};

export default function TestlerPage() {
  const tests = getAllTestsCombined();

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <section className="bg-brand-800 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">
              Bilimsel Ölçeklere Dayalı · Ücretsiz
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Psikolojik Değerlendirme Testleri
            </h1>
            <p className="text-brand-200 text-base leading-relaxed">
              Klinik ortamlarda kullanılan bilimsel ölçekler. Sonuçlar yalnızca
              size gösterilir, hiçbir yerde saklanmaz.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { value: `${tests.length}`, label: "Farklı test" },
              { value: "Anonim",          label: "Veri saklanmaz" },
              { value: "3–5 dk",          label: "Ortalama süre" },
              { value: "GAD-7 · PHQ-9",   label: "Bilimsel ölçekler" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold">{s.value}</p>
                <p className="text-brand-300 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestlerClient tests={tests} />
    </div>
  );
}
