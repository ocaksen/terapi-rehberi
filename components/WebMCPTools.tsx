"use client";

import { useEffect } from "react";

const BASE = "https://www.terapirehberi.com";

export default function WebMCPTools() {
  useEffect(() => {
    if (!("modelContext" in navigator)) return;

    const mc = (navigator as unknown as { modelContext: { registerTool: (t: unknown) => void } }).modelContext;

    // Tool 1 — Find a psychologist
    mc.registerTool({
      name: "find-psychologist",
      title: "Konya Psikolog Bul",
      description:
        "TerapiRehberi'nin Konya psikolog dizininde ilçe ve/veya uzmanlık alanına göre lisanslı psikolog ara. " +
        "Sonuçlar isim, unvan, seans ücreti, seans türü (yüz yüze / online) ve randevu bağlantısı içerir.",
      inputSchema: {
        type: "object",
        properties: {
          district: {
            type: "string",
            description: "İlçe filtresi",
            enum: ["meram", "selcuklu", "karatay"],
          },
          specialty: {
            type: "string",
            description: "Uzmanlık alanı filtresi",
            enum: [
              "bireysel-terapi",
              "cift-terapisi",
              "ergen-psikolojisi",
              "aile-terapisi",
              "kaygi-bozuklugu",
              "emdr",
              "cocuk-psikolojisi",
            ],
          },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async (input: Record<string, string>) => {
        const segment = input.district || input.specialty || "";
        const url = segment ? `${BASE}/konya/${segment}` : `${BASE}/konya`;
        try {
          const res = await fetch(url, { headers: { Accept: "text/markdown" } });
          const text = await res.text();
          return { url, content: text.slice(0, 8000) };
        } catch {
          return { url };
        }
      },
    });

    // Tool 2 — Ask a psychology question
    mc.registerTool({
      name: "ask-question",
      title: "Psikoloji Sorusu Sor",
      description:
        "TerapiRehberi'nin Soru-Cevap bölümüne anonim bir psikoloji sorusu gönder. " +
        "Sorular lisanslı psikologlar tarafından yanıtlanır ve yayınlanır.",
      inputSchema: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "Sormak istediğin soru (Türkçe)",
            minLength: 10,
          },
          category: {
            type: "string",
            description: "Konu alanı (opsiyonel) — örn. kaygı, depresyon, ilişki, uyku",
          },
        },
        required: ["question"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input: Record<string, string>) => {
        const res = await fetch(`${BASE}/api/soru-sor`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input.question, category: input.category }),
        });
        const data = await res.json();
        return { success: res.ok, ...data };
      },
    });

    // Tool 3 — Register as expert
    mc.registerTool({
      name: "register-expert",
      title: "Uzman Olarak Kayıt Ol",
      description:
        "Konya'da çalışan lisanslı psikolog veya terapistlerin TerapiRehberi'ne ücretsiz liste başvurusu yapması için bilgileri gönderir.",
      inputSchema: {
        type: "object",
        properties: {
          name:           { type: "string", description: "Ad Soyad" },
          title:          { type: "string", description: "Unvan — örn. Klinik Psikolog" },
          email:          { type: "string", format: "email", description: "İletişim e-postası" },
          phone:          { type: "string", description: "Telefon (opsiyonel)" },
          district:       { type: "string", description: "Konya ilçesi — örn. Selçuklu" },
          sessionType:    { type: "array", items: { type: "string", enum: ["Yüz Yüze", "Online"] }, description: "Seans türleri" },
          appointmentUrl: { type: "string", description: "Randevu sayfası URL'si (opsiyonel)" },
          message:        { type: "string", description: "Ek notlar (opsiyonel)" },
        },
        required: ["name", "title", "email", "district"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input: Record<string, unknown>) => {
        const res = await fetch(`${BASE}/api/basvuru`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, city: "konya" }),
        });
        const data = await res.json();
        return { success: res.ok, formUrl: `${BASE}/uzman-ol`, ...data };
      },
    });
  }, []);

  return null;
}
