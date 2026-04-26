import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTestBySlugCombined, getAllTestsCombined } from "@/lib/data";
import TestClient from "./TestClient";

export async function generateStaticParams() {
  return getAllTestsCombined().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const test = getTestBySlugCombined(slug);
  if (!test) return {};
  return {
    title: `${test.title} — Ücretsiz Test | TerapiRehberi`,
    description: test.description,
    alternates: { canonical: `https://www.terapirehberi.com/testler/${slug}` },
  };
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = getTestBySlugCombined(slug);
  if (!test) notFound();

  return (
    <>
      {/* Statik SEO içeriği — metin/HTML oranını artırır */}
      <div className="bg-white border-b border-slate-100 px-4 py-5">
        <div className="max-w-xl mx-auto">
          <nav className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-600 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/testler" className="hover:text-brand-600 transition-colors">Testler</Link>
            <span>/</span>
            <span className="text-slate-600">{test.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{test.icon}</span>
            <h1 className="text-lg font-bold text-slate-900">{test.title}</h1>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-3">{test.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>📋 {test.questionCount} soru</span>
            <span>⏱ ~{test.estimatedMinutes} dakika</span>
            <span>🔒 Sonuçlar cihazınızda kalır</span>
          </div>
        </div>
      </div>
      <TestClient test={test} />
    </>
  );
}
