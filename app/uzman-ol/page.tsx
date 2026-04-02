import type { Metadata } from "next";
import UzmanOlClient from "./UzmanOlClient";

export const metadata: Metadata = {
  title: "Uzman Olarak Katıl — TerapiRehberi",
  description:
    "Konya'nın psikolog rehberine katılın. Profilinizi oluşturun, sizi arayan ailelere ulaşın. Aylık sabit ücret, komisyon yok.",
};

export default function UzmanOlPage() {
  return <UzmanOlClient />;
}
