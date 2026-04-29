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
            Psikoloji ve terapi hakkında merak ettiğiniz her soruyu anonim olarak iletin.
            Konya&apos;daki lisanslı uzmanlar yanıtlasın.
            Bu yanıtlar genel bilgilendirme amacıyla sunulmakta olup kişisel tavsiye niteliği taşımaz.
          </p>
          <p className="text-brand-300 text-xs leading-relaxed max-w-xl mt-3">
            Kaygı, depresyon, ilişki sorunları, travma ve kişisel gelişim konularında uzman görüşlerine ulaşın.
            Sorunuzu tamamen anonim olarak iletebilirsiniz.
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

      {/* Konu başlıkları — SEO */}
      <section className="max-w-3xl mx-auto px-4 pt-10 pb-2 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Yanıt Bulabileceğiniz Konular</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 leading-relaxed">
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Kaygı ve Panik</h3>
            <p>Yoğun kaygı, panik atak ve sosyal kaygı hakkında uzman görüşü alabilirsiniz. Belirtiler günlük hayatı etkiliyorsa bir uzmana danışmak önerilir.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Depresyon</h3>
            <p>Süregelen üzüntü, isteksizlik veya anlamsızlık hissi hakkında genel bilgi alabilirsiniz. Bu belirtiler depresyonun işareti olabilir.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">İlişki Sorunları</h3>
            <p>Çift içi çatışmalar, iletişim güçlükleri veya bağlanma sorunları hakkında uzman bakış açısı edinebilirsiniz.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Travma ve Stres</h3>
            <p>Geçmiş olumsuz deneyimler veya kronik stres yönetimi hakkında genel bilgi alabilirsiniz. Klinik destek için bir uzmana başvurun.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Kişisel Gelişim</h3>
            <p>Öz saygı, motivasyon veya alışkanlık değişimi konularında farkındalık kazanmak için soru sorabilirsiniz.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Uyku ve Yorgunluk</h3>
            <p>Uyku bozuklukları ve kronik yorgunluk psikolojik faktörlerle ilişkili olabilir. Bu konularda genel bilgi almak için soru iletebilirsiniz.</p>
          </div>
        </div>
      </section>

      {/* Bilgi bölümü — SEO */}
      <section className="max-w-3xl mx-auto px-4 py-10 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Sık Sorulan Sorular</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bu platform nasıl çalışır?</h3>
            <p>Soru alanından anonim olarak sorunuzu iletebilirsiniz.</p>
            <p className="mt-2">Konya&apos;daki lisanslı uzmanlar soruyu değerlendirir. Yanıt, genel bilgilendirme amacıyla yayımlanır. Yanıtlar kişisel tavsiye ya da klinik tanı niteliği taşımaz.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Hangi konularda soru sorabilirsiniz?</h3>
            <p>Kaygı, depresyon, ilişki sorunları, travma ve uyku bozukluğu gibi konularda soru iletebilirsiniz.</p>
            <p className="mt-2">İş stresi ve kişisel gelişim konuları da dahil olmak üzere her soru bir uzman tarafından incelenir.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Yanıtlar ne kadar sürede gelir?</h3>
            <p>Sorular uzmanlar tarafından incelendikten sonra yayımlanır.</p>
            <p className="mt-2">Acil psikolojik destek ihtiyacında doğrudan bir uzmanla görüşmenizi öneririz. Bu platform acil müdahale hizmeti vermemektedir.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bu platform terapi yerine geçer mi?</h3>
            <p>Hayır. Bu bölüm yalnızca genel bilgilendirme içindir. Terapi ya da klinik danışmanlık değildir.</p>
            <p className="mt-2">Düzenli psikolojik destek için lisanslı bir uzmanla bireysel seans almanız gerekir. <a href="/konya" className="text-brand-600 hover:underline">Konya psikolog rehberimizi</a> inceleyebilirsiniz.</p>
          </div>
        </div>
      </section>
    </>
  );
}
