"use client";

import { useState, useEffect } from "react";
import type { SoruCevap } from "@/types";
import Link from "next/link";

const KATEGORILER = [
  { slug: "hepsi",    label: "Tümü" },
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

const KAT_ICONS: Record<string, string> = {
  psikolog: "🧠",
  cocuk:    "🧸",
  ergen:    "⭐",
  aile:     "🏡",
};

type Kategori = "psikolog" | "cocuk" | "ergen" | "aile";

const FAQ = [
  {
    soru: "Sorum ne zaman yanıtlanır?",
    cevap: "Sorular genellikle 24–48 saat içinde uzman ekibimiz tarafından incelenir ve yanıtlanır.",
  },
  {
    soru: "Sorularım kimler tarafından görülür?",
    cevap: "Sorular yalnızca moderasyon ekibimiz ve ilgili uzman psikolog tarafından görülür. Ad-soyad gibi kişisel bilgi paylaşmanıza gerek yoktur.",
  },
  {
    soru: "Yayımlanan cevaplarda kim olduğum belli olur mu?",
    cevap: "Hayır. Tüm sorular anonim olarak yayımlanır; kişisel hiçbir bilginiz paylaşılmaz.",
  },
  {
    soru: "Her soru yayımlanır mı?",
    cevap: "Uygunsuz veya yönlendirici sorular yayımlanmayabilir. Kişisel tıbbi tavsiye niteliğindeki sorular genel bilgilendirme olarak yanıtlanır.",
  },
];

export default function SoruSorClient({ sorular }: { sorular: SoruCevap[] }) {
  const [aktifFiltre, setAktifFiltre] = useState<"hepsi" | Kategori>("hepsi");
  const [seciliKat, setSeciliKat] = useState<Kategori>("psikolog");
  const [soru, setSoru] = useState("");
  const [adim, setAdim] = useState<1 | 2>(1);
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState("");
  const [acikKart, setAcikKart] = useState<string | null>(null);
  const [acikFaq, setAcikFaq] = useState<number | null>(null);
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

  function handleIleri() {
    setHata("");
    setAdim(2);
  }

  async function handleGonder() {
    setHata("");
    if (soru.trim().length < 10) {
      setHata("Lütfen bu alanı doldurmayı unutmayın — en az 10 karakter yazmanız yeterli.");
      return;
    }
    try {
      await fetch("/api/soru-sor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kategori: seciliKat, soru }),
      });
    } catch { /* sessiz hata */ }
    setGonderildi(true);
    setSoru("");
    setAdim(1);
  }

  const filtrelenmis = aktifFiltre === "hepsi"
    ? sorular
    : sorular.filter((s) => s.category === aktifFiltre);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-16 px-4">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <svg className="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-semibold text-white/90">Sorularınız gizlilikle yanıtlanır</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Psikolojik Sorularınızı<br />
            <span className="text-brand-300">Anonim Sorun</span>
          </h1>
          <p className="text-brand-200 text-base leading-relaxed max-w-lg mx-auto">
            Merak ettiklerinizi anonim olarak sorun, uzman psikologlar yanıtlasın.
            Kişisel bilgi paylaşmanıza gerek yok.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            {[
              { icon: "🔒", text: "Anonim & Gizli" },
              { icon: "✅", text: "Uzman Yanıtı" },
              { icon: "⚡", text: "24-48 Saat" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs text-white/70">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-step Form */}
      <section className="max-w-2xl mx-auto px-4 -mt-6 relative z-10">
        {gonderildi ? (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Sorunuz Alındı!</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Uzman ekibimiz sorunuzu inceleyip 24–48 saat içinde yanıtlayacak.
              Yanıt bu sayfada anonim olarak yayımlanacak.
            </p>
            <button onClick={() => setGonderildi(false)} className="btn-outline text-sm">
              Yeni Soru Sor
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
            {/* Adım göstergesi */}
            <div className="px-6 pt-6 pb-0 flex items-center gap-3">
              {[1, 2].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    adim === n
                      ? "bg-brand-700 text-white"
                      : adim > n
                      ? "bg-green-500 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {adim > n ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : n}
                  </div>
                  <span className={`text-xs font-semibold ${adim === n ? "text-slate-700" : "text-slate-400"}`}>
                    {n === 1 ? "Alan Seç" : "Sorunuzu Yazın"}
                  </span>
                  {n < 2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {/* Adım 1: Kategori */}
              {adim === 1 && (
                <div>
                  <p className="text-base font-black text-slate-900 mb-1">Uzmanlık alanı seçin</p>
                  <p className="text-sm text-slate-500 mb-5">Sorunuzun en çok hangi alanla ilgili olduğunu seçin.</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {KATEGORILER.slice(1).map((k) => {
                      const isActive = seciliKat === k.slug;
                      const renk = KAT_RENK[k.slug as Kategori];
                      return (
                        <button
                          key={k.slug}
                          onClick={() => setSeciliKat(k.slug as Kategori)}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-150 border-2 text-left"
                          style={
                            isActive
                              ? { background: renk.bg, color: renk.text, borderColor: renk.border }
                              : { background: "#f8fafc", color: "#64748b", borderColor: "#e2e8f0" }
                          }
                        >
                          <span className="text-xl">{KAT_ICONS[k.slug as Kategori]}</span>
                          <span>{k.label}</span>
                          {isActive && (
                            <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleIleri}
                    className="btn-primary w-full justify-center"
                  >
                    Devam Et
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Adım 2: Soru */}
              {adim === 2 && (
                <div>
                  <button
                    onClick={() => setAdim(1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors mb-4 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    Geri Dön
                  </button>

                  <p className="text-base font-black text-slate-900 mb-1">Sorunuzu yazın</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Ne kadar detaylı yazarsanız o kadar iyi yanıt alırsınız.
                  </p>

                  <div className="relative">
                    <textarea
                      value={soru}
                      onChange={(e) => { setSoru(e.target.value.slice(0, 1000)); setHata(""); }}
                      placeholder='Örn: "Kaygı bozukluğum olduğunu düşünüyorum, nasıl anlarım?"'
                      rows={5}
                      className={`w-full border-2 rounded-2xl px-4 py-3.5 text-slate-800 text-sm leading-loose resize-none focus:outline-none transition-all ${
                        hata
                          ? "border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                          : "border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      }`}
                    />
                    <div className="absolute bottom-3 right-4 flex items-center gap-2">
                      <span className={`text-xs transition-colors ${soru.length > 900 ? "text-orange-400" : "text-slate-300"}`}>
                        {soru.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Hata mesajı — empatik */}
                  {hata && (
                    <div className="flex items-start gap-2 mt-2 text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 animate-pulse">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <p className="text-xs leading-relaxed">{hata}</p>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mt-3 mb-5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd"/>
                    </svg>
                    Kişisel bilgi paylaşmanıza gerek yok. Sorular incelendikten sonra anonim yayımlanır.
                  </p>

                  <button
                    onClick={handleGonder}
                    disabled={soru.trim().length < 10}
                    className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Soruyu Gönder
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Nasıl Çalışır? */}
      <section className="max-w-2xl mx-auto px-4 pt-12 pb-2">
        <p className="text-xs font-black uppercase tracking-widest text-brand-600 mb-5 text-center">Nasıl Çalışır?</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { step: "1", icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
              </svg>
            ), title: "Soru Sor", desc: "Anonim olarak sorunuzu yazın" },
            { step: "2", icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            ), title: "24 Saatte Yanıt", desc: "Uzman psikolog inceler ve yanıtlar" },
            { step: "3", icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
              </svg>
            ), title: "Gizli Kal", desc: "Kimliğiniz hiçbir zaman paylaşılmaz" },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <p className="font-black text-slate-900 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Soru & Cevap Listesi */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-sm font-bold text-slate-600 mr-1">Önceki Sorular</span>
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {KATEGORILER.map((k) => (
              <button
                key={k.slug}
                onClick={() => setAktifFiltre(k.slug as typeof aktifFiltre)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
                style={
                  aktifFiltre === k.slug
                    ? { background: "var(--color-brand-700)", color: "#fff" }
                    : { background: "#fff", color: "#64748b", border: "1px solid #e2e8f0" }
                }
              >
                {k.label}
              </button>
            ))}
            <span className="text-xs text-slate-400 self-center ml-1">{filtrelenmis.length} soru</span>
          </div>
        </div>

        <div className="space-y-3">
          {filtrelenmis.map((item) => {
            const renk = KAT_RENK[item.category];
            const acik = acikKart === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  className="w-full text-left p-5 flex gap-4 items-start cursor-pointer"
                  onClick={() => setAcikKart(acik ? null : item.id)}
                >
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: renk.bg, color: renk.text }}
                  >
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {acik && (
                  <div className="px-5 pb-5 border-t border-slate-50">
                    <div className="flex gap-3 items-start pt-4">
                      <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 shrink-0 flex items-center justify-center text-xs font-bold text-brand-700 mt-0.5">
                        U
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-brand-600 mb-1.5">{item.uzman}</p>
                        <p className="text-slate-600 text-sm leading-loose">{item.cevap}</p>
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-50">
                          <button
                            onClick={() => handleOy(item.id, item.begeni)}
                            disabled={oyVerilen.has(item.id)}
                            className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-150 px-3 py-1.5 rounded-lg border cursor-pointer ${
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

      {/* SSS */}
      <section className="max-w-2xl mx-auto px-4 pb-14">
        <p className="text-xs font-black uppercase tracking-widest text-brand-600 mb-5">Sık Sorulan Sorular</p>
        <div className="space-y-2">
          {FAQ.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setAcikFaq(acikFaq === i ? null : i)}
              >
                <p className="font-semibold text-slate-800 text-sm">{faq.soru}</p>
                <svg
                  className="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200"
                  style={{ transform: acikFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {acikFaq === i && (
                <div className="px-5 pb-4 border-t border-slate-50">
                  <p className="text-sm text-slate-500 leading-relaxed pt-3">{faq.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
