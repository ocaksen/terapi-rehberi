import type { Expert } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terapirehberi.com";

/** Ana site için WebSite schema */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Terapi Rehberi",
    url: SITE_URL,
    description: "Konya'da uzman psikolog ve terapist rehberi. Kimlik ve lisans doğrulamasından geçmiş uzmanlar.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/konya/psikologlar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Psikolog listesi sayfası için BreadcrumbList + ItemList */
export function cityListSchema(cityName: string, citySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cityName} Psikologları`,
    description: `${cityName}'daki doğrulanmış psikolog ve terapistlerin listesi.`,
    url: `${SITE_URL}/${citySlug}/psikologlar`,
  };
}

/** Uzman profil sayfası için Person + MedicalBusiness schema */
export function expertSchema(expert: Expert) {
  const personNode: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${SITE_URL}/uzman/${expert.slug}`,
    name: expert.name,
    jobTitle: expert.title,
    description: expert.shortBio,
    image: expert.image.startsWith("http")
      ? expert.image
      : `${SITE_URL}${expert.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: expert.district,
      addressRegion: expert.city.charAt(0).toUpperCase() + expert.city.slice(1),
      addressCountry: "TR",
    },
    url: `${SITE_URL}/uzman/${expert.slug}`,
    knowsAbout: expert.services.map((s) => s.replace(/-/g, " ")),
  };
  if (expert.phone) personNode.telephone = expert.phone;

  const businessNode: Record<string, unknown> = {
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/uzman/${expert.slug}#business`,
    name: expert.name,
    description: expert.shortBio,
    medicalSpecialty: "Psychology",
    url: `${SITE_URL}/uzman/${expert.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: expert.district,
      addressRegion: expert.city.charAt(0).toUpperCase() + expert.city.slice(1),
      addressCountry: "TR",
    },
    availableService: expert.services.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.replace(/-/g, " "),
    })),
  };
  if (expert.phone)      businessNode.telephone  = expert.phone;
  if (expert.sessionFee) businessNode.priceRange = expert.sessionFee;

  return {
    "@context": "https://schema.org",
    "@graph": [personNode, businessNode],
  };
}

/** Breadcrumb schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** FAQ schema */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
