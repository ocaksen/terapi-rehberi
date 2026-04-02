"use client";

import { useState, useEffect } from "react";
import type { SoruCevap } from "@/types";
import Link from "next/link";

const KATEGORILER = [
  { slug: "hepsi",   label: "Tümü" },
  { slug: "psikolog", label: "Psikolog" },
  { slug: "cocuk",    label: "Çocuk" },
  { slug: "ergen",    label: "Ergen" },
  { slug: "aile",     label: "Aile" },
] as const;

const KAT_RENK: Record<string, { bg: string; text: string; border: string }> = {
  psikolog: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  cocuk:    { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  ergen:    { bg: "#fdf4ff", text: "#7e22ce", border: "#e9d5ff" },
  aile:     { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
};

type Kategori = "psikolog" | "cocuk" | "ergen" | "aile";

export default function SoruSorClient({ sorular }: { sorular: SoruCevap[] }) {
  const [aktifFiltre, setAktifFiltre] = useState<"hepsi" | Kategori>("hepsi");
  const [seciliKat, setSeciliKat] = useState<Kategori>("psikolog");
  const [soru, setSoru] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const [acikKart, setAcikKart] = useState<string | null>(null);
  const [oylar, setOylar] = useState<Record<string, number>>({});
  const [oyVerilen, setOyVerilen] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tr_oylar");
      if (saved) setOyVerilen(new Set(JSON.parse(saved)));
    } catch { /* ignore */ }
  }, []);

  async function handleOy(id: string, mevcutBegeni: number) {
    if (oyVerilen.has(id)) return;
    const yeni = new Set(oyVerilen);
    yeni.add(id);
    setOyVerilen(yeni);
    setOylar((prev) => ({ ...prev, [id]: (prev[id] ?? mevcutBegeni) + 1 }));
    try {
      localStorage.setItem("tr_oylar", JSON.stringify([...yeni]));
      await fetch("/api/oy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch { /* ignore */ }
  }

  const filtrelenmis = aktifFiltre === "hepsi"
    ? sorular
    : sorular.filter((s) => s.category === aktifFiltre);

  async function handleGonder() {
    if (soru.trim().length < 10) return;
    try {
      await fetch("/api/soru-sor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kategori: seciliKat, soru }),
      });
    } catch { /* sessiz hata */ }
    setGonderildi(true);
    setSoru("");
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* Hero */}
      <section className="bg-brand-700 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-3">Uzman Yanıtları</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Psikolojik Sorularınızı Sorun
          </h1>
          <p className="text-brand-200 text-base leading-relaxed">
            Merak ettiklerinizi anonim olarak sorun, uzman psikologlar yanıtlasın.
            Tüm sorular incelendikten sonra yayımlanır.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 -mt-8">
        {gonderildi ? (
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center mx-auto mb-4 text-3xl">
              ✅
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Sorunuz Alındı!</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Sorunuz uzman ekibimiz tarafından incelendikten sonra yanıtlanıp yayımlanacak.
              Genellikle 24–48 saat içinde yanıt verilmektedir.
            </p>
            <button
              onClick={() => setGonderildi(false)}
              className="btn-outline text-sm"
            >
              Yeni Soru Sor
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Kategori seç */}
              <p className="text-sm font-semibold text-slate-700 mb-3">Uzmanlık Alanı Seçin</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {KATEGORILER.slice(1).map((k) => {
                  const isActive = seciliKat === k.slug;
                  const renk = KAT_RENK[k.slug as Kategori];
                  return (
                    <button
                      key={k.slug}
                      onClick={() => setSeciliKat(k.slug as Kategori)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border"
                      style={
                        isActive
                          ? { background: renk.bg, color: renk.text, borderColor: renk.border }
                          : { background: "#f8fafc", color: "#64748b", borderColor: "#e2e8f0" }
                      }
                    >
                      {k.label}
                    </button>
                  );
                })}
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={soru}
                  onChange={(e) => setSoru(e.target.value.slice(0, 1000))}
                  placeholder='Örn: "Depresyonda olup olmadığımı nasıl anlarım?"'
                  rows={4}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 text-sm leading-relaxed resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
                <span className="absolute bottom-3 right-4 text-xs text-slate-300">
                  {soru.length}/1000
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2 mb-5">
                Sorular incelendikten sonra yayımlanır. Kişisel bilgi paylaşmanıza gerek yok.
              </p>

              <button
                onClick={handleGonder}
                disabled={soru.trim().length < 10}
                className="btn-primary w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Soruyu Gönder
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Soru & Cevap Listesi */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        {/* Filtre tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-sm font-semibold text-slate-500 mr-1">Filtrele:</span>
          {KATEGORILER.map((k) => (
            <button
              key={k.slug}
              onClick={() => setAktifFiltre(k.slug as typeof aktifFiltre)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150"
              style={
                aktifFiltre === k.slug
                  ? { background: "var(--color-brand-700)", color: "#fff" }
                  : { background: "#fff", color: "#64748b", border: "1px solid #e2e8f0" }
              }
            >
              {k.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400">{filtrelenmis.length} soru</span>
        </div>

        {/* Kartlar */}
        <div className="space-y-4">
          {filtrelenmis.map((item) => {
            const renk = KAT_RENK[item.category];
            const acik = acikKart === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Soru başlığı */}
                <button
                  className="w-full text-left p-5 sm:p-6 flex gap-4 items-start"
                  onClick={() => setAcikKart(acik ? null : item.id)}
                >
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: renk.bg, color: renk.text }}
                  >
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: renk.bg, color: renk.text, border: `1px solid ${renk.border}` }}
                      >
                        {KATEGORILER.find((k) => k.slug === item.category)?.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(item.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                      </span>
                    </div>
                    <p className="text-slate-800 font-semibold text-sm leading-snug">{item.soru}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 mt-0.5"
                    style={{ transform: acik ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Cevap */}
                {acik && (
                  <div className="px-5 sm:px-6 pb-5 border-t border-cream-100">
                    <div className="flex gap-3 items-start pt-4">
                      <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 shrink-0 flex items-center justify-center text-xs font-bold text-brand-700 mt-0.5">
                        U
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-brand-600 mb-1.5">{item.uzman}</p>
                        <p className="text-slate-600 text-[0.9375rem] leading-relaxed">{item.cevap}</p>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-cream-100">
                          <button
                            onClick={() => handleOy(item.id, item.begeni)}
                            disabled={oyVerilen.has(item.id)}
                            className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-150 px-3 py-1.5 rounded-lg border ${
                              oyVerilen.has(item.id)
                                ? "bg-brand-50 text-brand-700 border-brand-200 cursor-default"
                                : "bg-white text-slate-500 border-slate-200 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200"
                            }`}
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"/>
                            </svg>
                            {oylar[item.id] ?? item.begeni} faydalı
                          </button>
                          <Link
                            href="/konya/psikologlar"
                            className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors ml-auto"
                          >
                            Uzmanla Görüş →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
