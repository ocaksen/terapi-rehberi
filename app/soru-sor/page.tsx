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

  return <SoruSorClient sorular={sorular} />;
}
