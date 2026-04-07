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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-16 px-4">
        {/* Dekoratif daireler */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-8 right-1/4 w-16 h-16 rounded-full bg-white/8 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-3.5 h-3.5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span className="text-xs font-semibold text-white/90">Bilimsel Ölçeklere Dayalı · Tamamen Ücretsiz</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Psikolojik<br />
            <span className="text-brand-300">Değerlendirme Testleri</span>
          </h1>
          <p className="text-brand-200 text-base leading-relaxed max-w-lg mb-10">
            Klinik ortamlarda kullanılan bilimsel ölçekler. Sonuçlar yalnızca
            size gösterilir, hiçbir yerde saklanmaz.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                value: `${tests.length}`,
                label: "Farklı Test",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                ),
              },
              {
                value: "Anonim",
                label: "Veri Saklanmaz",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                ),
              },
              {
                value: "3–5 dk",
                label: "Ortalama Süre",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
              },
              {
                value: "GAD-7",
                label: "PHQ-9 · PCL-5",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-4 border border-white/15 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 text-brand-300 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-white font-black text-lg leading-none">{s.value}</p>
                  <p className="text-brand-300 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestlerClient tests={tests} />
    </div>
  );
}
