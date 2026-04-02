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
  return <UzmanOlClient />;
}
