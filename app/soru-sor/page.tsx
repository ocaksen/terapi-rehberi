import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getAllSoruCevap } from "@/lib/data";
import type { SoruCevap } from "@/types";
import SoruSorClient from "./SoruSorClient";

export const metadata: Metadata = {
  title: "Psikolog Sor — Anonim Psikoloji Soruları | TerapiRehberi",
  description:
    "Psikolog sor, anonim yanıt al. Psikoloğunuza sorun — merak ettiğiniz psikoloji sorularını anonim sorun, uzman psikologlar yanıtlasın. TerapiRehberi Q&A platformu.",
  alternates: { canonical: "https://www.terapirehberi.com/soru-sor" },
  openGraph: {
    title: "Psikolog Sor — Anonim Psikoloji Soruları | TerapiRehberi",
    description: "Psikolog sor, anonim yanıt al. Psikoloğunuza sorun — uzman psikologlar yanıtlasın.",
    url: "https://www.terapirehberi.com/soru-sor",
  },
};

interface SorularJson {
  id: string;
  tarih: string;
  kategori: string;
  soru: string;
  durum?: string;
  cevap?: string;
  uzman?: string;
  begeni?: number;
}

export default function SoruSorPage() {
  // db.json'dan statik sorular
  const staticSorular = getAllSoruCevap();

  // sorular.json'dan onaylanan kullanıcı soruları
  const filePath = path.join(process.cwd(), "data", "sorular.json");
  let userSorular: SoruCevap[] = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw: SorularJson[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      userSorular = raw
        .filter((s) => s.durum === "onaylandi" && s.cevap)
        .map((s) => ({
          id: s.id,
          category: (s.kategori as SoruCevap["category"]) ?? "psikolog",
          soru: s.soru,
          cevap: s.cevap!,
          uzman: s.uzman ?? "TerapiRehberi Uzmanı",
          tarih: s.tarih,
          begeni: s.begeni ?? 0,
        }));
    } catch { /* ignore */ }
  }

  // Kullanıcı soruları önce, sonra statikler
  const sorular = [...userSorular, ...staticSorular];

  const qaSchema = sorular.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: sorular.slice(0, 6).map((s) => ({
          "@type": "Question",
          name: s.soru,
          answerCount: 1,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.cevap,
            author: { "@type": "Person", name: s.uzman },
          },
        })),
      }
    : null;

  return (
    <>
      {qaSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(qaSchema) }}
        />
      )}
      {/* Statik SEO içeriği */}
      <div className="bg-brand-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-3">Uzman Yanıtları</p>
          <h1 className="text-3xl font-bold text-white mb-3">Psikolog Sor: Psikoloji Soruları & Uzman Cevapları</h1>
          <p className="text-brand-200 text-sm leading-relaxed max-w-xl">
            Psikolog sor, anonim yanıt al. Psikoloji ve terapi hakkında merak ettiğiniz her soruyu
            psikoloğunuza sorun — Konya&apos;daki lisanslı uzmanlar yanıtlasın.
            Kişisel tavsiye niteliği taşımayan bu yanıtlar genel bilgilendirme amacıyla sunulmaktadır.
          </p>
          <p className="text-brand-300 text-xs leading-relaxed max-w-xl mt-3">
            Psikolog sor platformumuzda kaygı, depresyon, ilişki sorunları, travma ve kişisel gelişim
            konularında uzman yanıtlarına ulaşabilirsiniz. Sorunuzu tamamen anonim olarak iletebilirsiniz.
          </p>
        </div>
      </div>

      {/* Soru-cevap listesi — sunucu tarafında render */}
      {sorular.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pt-8 pb-2 space-y-5">
          {sorular.slice(0, 6).map((s) => (
            <div key={s.id} className="bg-white border border-cream-200 rounded-2xl p-5">
              <p className="font-semibold text-brand-900 text-sm mb-2">{s.soru}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{s.cevap}</p>
              <p className="text-xs text-slate-400 mt-3">Yanıtlayan: {s.uzman}</p>
            </div>
          ))}
        </div>
      )}

      <SoruSorClient sorular={sorular} />

      {/* Bilgi bölümü — SEO */}
      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Psikolog Sor: Sık Sorulan Sorular</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Psikolog sor platformu nasıl çalışır?</h3>
            <p>
              Psikoloğunuza sorun bölümünden anonim olarak soru iletebilirsiniz.
              Konya&apos;daki lisanslı psikologlar sorunuzu değerlendirerek genel bilgilendirme
              amacıyla yanıtlar. Yanıtlar kişisel tavsiye niteliği taşımaz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Hangi konularda psikolog sor?</h3>
            <p>
              Kaygı, depresyon, ilişki sorunları, travma, uyku bozukluğu, iş stresi ve
              kişisel gelişim gibi konularda psikolog sor platformumuza soru iletebilirsiniz.
              Her soru uzman tarafından incelenir.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Yanıtlar ne kadar sürede gelir?</h3>
            <p>
              Sorular uzmanlar tarafından incelendikten sonra yayımlanır.
              Acil psikolojik destek ihtiyacında doğrudan bir psikologla görüşmenizi öneririz.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Psikolog sor ile terapi aynı şey mi?</h3>
            <p>
              Hayır. Psikolog sor platformu genel bilgilendirme içindir; terapi yerine geçmez.
              Düzenli psikolojik destek için lisanslı bir psikologla bireysel seans almanız gerekir.
              Konya&apos;daki psikologlarımızı incelemek için <a href="/konya" className="text-brand-600 hover:underline">Konya psikolog rehberimizi</a> ziyaret edebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
