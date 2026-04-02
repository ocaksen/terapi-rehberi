import type { Metadata } from "next";
import { getAllSoruCevap } from "@/lib/data";
import SoruSorClient from "./SoruSorClient";

export const metadata: Metadata = {
  title: "Psikolojik Soru Sor",
  description:
    "Merak ettiğiniz psikoloji sorularını anonim sorun, uzman psikologlar yanıtlasın. Konya TerapiRehberi uzman Q&A platformu.",
};

export default function SoruSorPage() {
  const sorular = getAllSoruCevap();
  return <SoruSorClient sorular={sorular} />;
}
