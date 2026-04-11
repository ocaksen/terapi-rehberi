import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "TerapiRehberi — Konya'da Psikolog Bul",
    template: "%s | TerapiRehberi",
  },
  description:
    "Konya'da lisanslı psikolog, terapist ve psikolojik danışman bul. Kimlik ve diploma doğrulamalı uzmanlar. Bireysel terapi, çift terapisi, ergen ve çocuk psikolojisi.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terapirehberi.com"
  ),
  keywords: [
    "konya psikolog",
    "konya terapist",
    "konya psikolojik danışman",
    "konya çocuk psikoloğu",
    "konya ergen terapisi",
    "konya aile terapisi",
    "online terapi konya",
    "psikolog bul",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: "TerapiRehberi",
    locale: "tr_TR",
    type: "website",
    title: "TerapiRehberi — Konya'da Psikolog Bul",
    description:
      "Konya'da lisanslı psikolog, terapist ve psikolojik danışman bul. Kimlik ve diploma doğrulamalı uzmanlar.",
    images: [
      {
        url: "/images/aile-section.png",
        width: 1200,
        height: 630,
        alt: "TerapiRehberi — Konya'da Psikolog Bul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TerapiRehberi — Konya'da Psikolog Bul",
    description:
      "Konya'da lisanslı psikolog, terapist ve psikolojik danışman bul. Kimlik ve diploma doğrulamalı uzmanlar.",
  },
  alternates: {
    canonical: "https://www.terapirehberi.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TerapiRehberi",
  url: "https://www.terapirehberi.com",
  logo: "https://www.terapirehberi.com/images/aile-section.png",
  sameAs: [
    "https://www.psikologcaksen.com",
    "https://www.terapitime.com",
    "https://www.caksendanismanlik.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Turkish",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TerapiRehberi",
  url: "https://www.terapirehberi.com",
  description: "Konya'da psikolog, terapist ve destek uzmanı rehberi.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.terapirehberi.com/konya/psikologlar?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TerapiRehberi",
  url: "https://www.terapirehberi.com",
  description: "Konya'da güvenilir psikolog ve terapist rehberi. Kimlik ve diploma doğrulamalı 50+ uzman.",
  areaServed: [
    { "@type": "City", name: "Konya" },
    { "@type": "City", name: "Meram" },
    { "@type": "City", name: "Selçuklu" },
    { "@type": "City", name: "Karatay" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Konya",
    addressRegion: "Konya",
    postalCode: "42250",
    addressCountry: "TR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.psikologcaksen.com",
    "https://www.terapitime.com",
    "https://www.caksendanismanlik.com",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${lora.variable}`}>
      <head>
        {/* Preconnect — dış kaynak bağlantılarını önceden kur */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://randomuser.me" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2TP7B2CGPH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2TP7B2CGPH');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
