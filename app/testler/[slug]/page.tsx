import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: `${test.title} — Ücretsiz Psikolojik Test | TerapiRehberi`,
    description: test.description,
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

  return <TestClient test={test} />;
}
