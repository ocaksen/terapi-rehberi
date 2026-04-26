import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Konya Psikolog & Terapist Rehberi 2026 — TerapiRehberi",
  description:
    "Konya'da güvenilir psikolog ve terapist bul. Meram, Selçuklu, Karatay'dan 50+ doğrulanmış uzman. Bireysel terapi, çocuk psikolojisi, aile terapisi, EMDR. Yüz yüze ve online seans.",
  keywords: ["konya psikolog", "konya terapist", "konya psikolog bul", "çocuk psikolog konya", "online terapi konya"],
  alternates: { canonical: "https://www.terapirehberi.com" },
  openGraph: {
    title: "Konya Psikolog & Terapist Rehberi 2026 — TerapiRehberi",
    description: "Konya'da doğrulanmış psikolog ve terapist bul. 50+ uzman, yüz yüze ve online seans.",
    url: "https://www.terapirehberi.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Statik SEO içeriği — sunucu tarafında render edilir */}
      <div className="sr-only">
        <h1>Konya Psikolog ve Terapist Rehberi 2026</h1>
        <p>
          TerapiRehberi, Konya&apos;da psikolojik destek arayan kişileri lisanslı, diploma doğrulamalı
          psikolog ve terapistlerle buluşturan bağımsız bir rehber platformudur. Meram, Selçuklu ve
          Karatay başta olmak üzere Konya genelinde 50&apos;den fazla uzman listemizde yer almaktadır.
        </p>
        <p>
          Bireysel terapi, çift terapisi, çocuk psikolojisi, ergen psikolojisi, aile terapisi, EMDR
          ve kaygı bozukluğu gibi alanlarda uzman psikologları karşılaştırabilir, profil sayfalarını
          inceleyebilir ve doğrudan randevu alabilirsiniz. Yüz yüze seans seçeneğinin yanı sıra online
          terapi de sunulmaktadır.
        </p>
        <p>
          2026 yılı itibarıyla Konya&apos;da bireysel terapi seansı ortalama 1.500–5.000 TL arasında
          değişmektedir. Her uzmanın profil sayfasında güncel seans ücreti, uzmanlık alanları ve
          iletişim bilgileri yer almaktadır.
        </p>
        <nav aria-label="Hızlı erişim">
          <ul>
            <li><a href="/konya/psikologlar">Konya Psikologları</a></li>
            <li><a href="/konya/meram">Meram Psikolog</a></li>
            <li><a href="/konya/selcuklu">Selçuklu Psikolog</a></li>
            <li><a href="/konya/karatay">Karatay Psikolog</a></li>
            <li><a href="/konya/bireysel-terapi">Bireysel Terapi Konya</a></li>
            <li><a href="/konya/cift-terapisi">Çift Terapisi Konya</a></li>
            <li><a href="/testler">Ücretsiz Psikolojik Testler</a></li>
            <li><a href="/blog">Psikoloji Blog</a></li>
          </ul>
        </nav>
      </div>
      <HomeClient />
    </>
  );
}
