import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getAllSoruCevap } from "@/lib/data";
import type { SoruCevap } from "@/types";
import SoruSorClient from "./SoruSorClient";

export const metadata: Metadata = {
  title: "Psikolojik Soru Sor",
  description:
    "Merak ettiğiniz psikoloji sorularını anonim sorun, uzman psikologlar yanıtlasın. Konya TerapiRehberi uzman Q&A platformu.",
  alternates: { canonical: "https://www.terapirehberi.com/soru-sor" },
  openGraph: {
    title: "Psikolojik Soru Sor — TerapiRehberi",
    description: "Merak ettiğiniz psikoloji sorularını anonim sorun, uzman psikologlar yanıtlasın.",
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

  return (
    <>
      {/* Statik SEO içeriği */}
      <div className="bg-brand-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-300 text-xs font-semibold uppercase tracking-widest mb-3">Uzman Yanıtları</p>
          <h1 className="text-3xl font-bold text-white mb-3">Psikolojik Soru & Cevap</h1>
          <p className="text-brand-200 text-sm leading-relaxed max-w-xl">
            Psikoloji ve terapi hakkında merak ettiğiniz soruları anonim olarak sorabilir,
            Konya&apos;daki lisanslı uzmanların yanıtlarını okuyabilirsiniz.
            Kişisel tavsiye niteliği taşımayan bu yanıtlar genel bilgilendirme amacıyla sunulmaktadır.
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
    </>
  );
}
