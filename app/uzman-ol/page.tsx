import type { Metadata } from "next";
import UzmanOlClient from "./UzmanOlClient";

export const metadata: Metadata = {
  title: "Uzman Olarak Katıl — TerapiRehberi",
  description:
    "Konya'nın psikolog rehberine katılın. Profilinizi oluşturun, sizi arayan ailelere ulaşın. Aylık sabit ücret, komisyon yok.",
  alternates: { canonical: "https://www.terapirehberi.com/uzman-ol" },
  openGraph: {
    title: "Uzman Olarak Katıl — TerapiRehberi",
    description: "Konya'nın psikolog rehberine katılın. Profilinizi oluşturun, sizi arayan ailelere ulaşın.",
    url: "https://www.terapirehberi.com/uzman-ol",
  },
};

export default function UzmanOlPage() {
  return (
    <>
      {/* Statik içerik — SEO için sunucu tarafında render */}
      <div className="bg-brand-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-3">Psikologlar için</p>
          <h1 className="text-3xl font-bold text-white mb-3">TerapiRehberi&apos;ne Uzman Olarak Katıl</h1>
          <p className="text-brand-200 text-sm leading-relaxed max-w-xl">
            Konya&apos;da hizmet veren lisanslı psikolog, klinik psikolog ve psikolojik danışmanlar için
            ücretsiz profil oluşturma platformu. Diploma doğrulaması tamamlandıktan sonra profiliniz yayına alınır,
            psikolog arayan danışanlar sizi doğrudan bulabilir. Komisyon yok, sabit ücret modeli.
          </p>
        </div>
      </div>
      <UzmanOlClient />
    </>
  );
}
