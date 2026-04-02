"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Sabit veriler
───────────────────────────────────────────── */
const UNVANLAR = [
  "Psikolog",
  "Klinik Psikolog",
  "Psikolojik Danışman",
  "Psikiyatrist",
  "Çocuk ve Ergen Psikoloğu",
  "Aile Danışmanı",
];

const ALANLAR = [
  "Bireysel Terapi", "Çift Terapisi", "Ergen Psikolojisi",
  "Çocuk Psikolojisi", "Aile Terapisi", "Kaygı & Panik Atak",
  "Depresyon", "EMDR", "Travma Terapisi", "Bağımlılık", "OKB", "Yas & Kayıp",
];

const DENEYIM = ["1 yıldan az", "1–3 yıl", "3–5 yıl", "5–10 yıl", "10 yıldan fazla"];
const YILLAR  = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));

const BENEFITS = [
  {
    title: "Yerel Görünürlük",
    desc: "Konya'da psikolog arayan aileler sizi Google'da bulur. Yerel SEO'da öne çıkın.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    title: "Komisyon Yok",
    desc: "Danışanlarınızdan gelen her kuruş sizin. Platform sabit aylık ücret alır, kesinti yapmaz.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    title: "Doğrulanmış Rozet",
    desc: "Diploma ve lisans kontrolünden geçen uzmanlara 'Doğrulanmış' rozeti verilir.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
  },
  {
    title: "Hedefli Danışan",
    desc: "Çocuk, ergen ve aile odaklı platformumuz, doğru danışanı size yönlendirir.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  },
  {
    title: "Zengin Profil",
    desc: "Fotoğraf, biyografi, uzmanlık alanları ve ücret bilgisini öne çıkaran profil sayfası.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  },
  {
    title: "KVKK Uyumlu",
    desc: "Tüm kişisel veriler Türkiye KVKK mevzuatına uygun olarak işlenir ve korunur.",
    svg: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
  },
];

const STEPS = [
  { no: "01", title: "Formu Doldurun", desc: "5 dakikada başvuru formunu tamamlayın. Mesleki bilgilerinizi ve uzmanlık alanlarınızı girin." },
  { no: "02", title: "Doğrulama", desc: "Ekibimiz diploma ve Sağlık Bakanlığı sicilinizi 48 saat içinde doğrular, sizi arar." },
  { no: "03", title: "Profiliniz Yayına Girer", desc: "Aylık listeleme ücretini ödediğinizde profiliniz anında yayına alınır." },
];

interface FormData {
  adSoyad: string; unvan: string; eposta: string; telefon: string;
  sehir: string; ilce: string; okul: string; mezuniyetYili: string;
  deneyim: string; alanlar: string[]; seanstipi: string[];
  seansUcreti: string; bio: string; kvkk: boolean; acikRiza: boolean;
}

const EMPTY: FormData = {
  adSoyad: "", unvan: "", eposta: "", telefon: "",
  sehir: "Konya", ilce: "", okul: "", mezuniyetYili: "",
  deneyim: "", alanlar: [], seanstipi: [], seansUcreti: "",
  bio: "", kvkk: false, acikRiza: false,
};

export default function UzmanOlClient() {
  const [form, setForm]     = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep]     = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  }

  function toggleArr(key: "alanlar" | "seanstipi", val: string) {
    setForm((p) => {
      const arr = p[key] as string[];
      return { ...p, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  }

  function validate(s: 1 | 2): boolean {
    const e: typeof errors = {};
    if (s === 1) {
      if (!form.adSoyad.trim()) e.adSoyad = "Zorunlu alan";
      if (!form.unvan)          e.unvan   = "Unvan seçiniz";
      if (!form.eposta.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.eposta = "Geçerli e-posta giriniz";
      if (!form.telefon.trim()) e.telefon = "Zorunlu alan";
      if (!form.ilce.trim())    e.ilce    = "Zorunlu alan";
    }
    if (s === 2) {
      if (!form.okul.trim())            e.okul          = "Zorunlu alan";
      if (!form.mezuniyetYili)          e.mezuniyetYili = "Seçiniz";
      if (!form.deneyim)                e.deneyim       = "Seçiniz";
      if (form.alanlar.length === 0)    e.alanlar       = "En az bir alan seçin";
      if (form.seanstipi.length === 0)  e.seanstipi     = "Seçiniz";
      if (!form.seansUcreti.trim())     e.seansUcreti   = "Zorunlu alan";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (validate(step as 1 | 2)) {
      setStep((s) => (s + 1) as 1 | 2 | 3);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleSubmit() {
    if (!form.kvkk) { setErrors({ kvkk: "KVKK onayı zorunludur" }); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/basvuru", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      setDone(true);
      if (json.whatsapp && typeof window !== "undefined") window.open(json.whatsapp, "_blank");
    } catch { setDone(true); } finally { setLoading(false); }
  }

  const inp = (err?: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all bg-white ${
      err ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:border-brand-400 focus:ring-brand-100"
    }`;

  /* ── Başarı ── */
  if (done) return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center mx-auto mb-5 text-4xl">🎉</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Başvurunuz Alındı!</h1>
        <p className="text-slate-600 text-[0.9375rem] leading-relaxed mb-6">
          Ekibimiz başvurunuzu en geç <strong>48 saat</strong> içinde inceleyecek,
          diploma doğrulaması sonrasında sizi arayacaktır.
        </p>
        <div className="bg-brand-50 rounded-2xl p-4 text-left text-sm text-brand-700 space-y-2 mb-7">
          <p className="flex gap-2 items-center"><span>✅</span> Başvuru alındı</p>
          <p className="flex gap-2 items-center"><span>⏳</span> Diploma / Sağlık Bakanlığı doğrulama</p>
          <p className="flex gap-2 items-center"><span>⏳</span> Profil oluşturma görüşmesi</p>
          <p className="flex gap-2 items-center"><span>⏳</span> Ödeme bağlantısı → Yayına alma</p>
        </div>
        <Link href="/" className="btn-primary">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════
          HERO — HealMeUp / DoktorTakvimi tarzı
      ══════════════════════════════════════ */}
      <section className="bg-brand-700 pt-16 pb-0 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

            {/* Sol metin */}
            <div className="pb-16">
              <span className="inline-block bg-white/10 text-brand-200 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                Profesyoneller İçin
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Konya&apos;nın Aileleri<br />
                <span className="text-brand-300">Sizi Bekliyor</span>
              </h1>
              <p className="text-brand-200 text-base leading-relaxed mb-8 max-w-md">
                Çocuk, ergen ve aile psikolojisi alanında Konya&apos;nın güvenilir rehberine katılın.
                Komisyon yok — tüm danışanlar sizin.
              </p>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex items-center gap-2.5 bg-white text-brand-800 font-bold px-8 py-4 rounded-xl hover:bg-cream-50 transition-colors shadow-lg text-sm"
              >
                Hemen Başvur
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Sağ — istatistik kartları */}
            <div className="hidden lg:grid grid-cols-2 gap-3 pb-8">
              {[
                { val: "Ücretsiz", label: "Platform kayıt ücreti" },
                { val: "%0",       label: "Komisyon oranı" },
                { val: "48 saat",  label: "Başvuru yanıt süresi" },
                { val: "🔒",       label: "KVKK uyumlu sistem" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <p className="text-2xl font-bold text-white mb-1">{s.val}</p>
                  <p className="text-brand-300 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="bg-brand-800 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-12">
          {[
            { val: "Konya Odaklı", label: "Yerel hedefleme" },
            { val: "Doğrulanmış", label: "Diploma kontrolü" },
            { val: "Komisyonsuz", label: "Sabit aylık ücret" },
            { val: "7/24", label: "Profil görünürlüğü" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white font-bold text-sm">{s.val}</p>
              <p className="text-brand-400 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAYDALAR — HealMeUp'ın 8-kart yapısı
      ══════════════════════════════════════ */}
      <section className="py-16 px-4 bg-cream-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Neden TerapiRehberi?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              TerapiRehberi'nde Uzman Olmanın Farkı
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-cream-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4">
                  {b.svg}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NASIL ÇALIŞIR — Terappin tarzı
      ══════════════════════════════════════ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Süreç</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">3 Adımda Profiliniz Yayında</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.no} className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] right-[-calc(50%-2rem)] h-0.5 bg-brand-100" />
                )}
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border-2 border-brand-200 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-700 font-black text-lg">{s.no}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BAŞVURU FORMU — 3 Adım
      ══════════════════════════════════════ */}
      <section ref={formRef} className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Başvuru</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">5 Dakikada Başvurun</h2>
            <p className="text-slate-500 text-sm mt-2">Başvuru ücretsizdir. Onay sonrası ücretlendirme başlar.</p>
          </div>

          {/* Adım göstergesi */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            {([1, 2, 3] as const).map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                    style={step === s ? { background: "var(--color-brand-600)", color: "#fff" } : step > s ? { background: "#d0f2ea", color: "var(--color-brand-700)" } : { background: "#f1f5f9", color: "#94a3b8" }}>
                    {step > s ? "✓" : s}
                  </div>
                  <span className={`text-sm font-medium hidden sm:inline ${step === s ? "text-slate-900" : "text-slate-400"}`}>
                    {s === 1 ? "Kişisel" : s === 2 ? "Mesleki" : "Onay"}
                  </span>
                </div>
                {idx < 2 && <div className="w-8 sm:w-16 h-0.5 bg-slate-200" />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-600" />
            <div className="p-7 sm:p-9">

              {/* ── Adım 1 ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Kişisel Bilgiler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ad Soyad <span className="text-red-400">*</span></label>
                      <input type="text" value={form.adSoyad} onChange={(e) => set("adSoyad", e.target.value)} placeholder="Ayşe Kaya" className={inp(errors.adSoyad)} />
                      {errors.adSoyad && <p className="text-xs text-red-500 mt-1">{errors.adSoyad}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Unvan <span className="text-red-400">*</span></label>
                      <select value={form.unvan} onChange={(e) => set("unvan", e.target.value)} className={inp(errors.unvan)}>
                        <option value="">Seçiniz</option>
                        {UNVANLAR.map((u) => <option key={u}>{u}</option>)}
                      </select>
                      {errors.unvan && <p className="text-xs text-red-500 mt-1">{errors.unvan}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta <span className="text-red-400">*</span></label>
                      <input type="email" value={form.eposta} onChange={(e) => set("eposta", e.target.value)} placeholder="ornek@email.com" className={inp(errors.eposta)} />
                      {errors.eposta && <p className="text-xs text-red-500 mt-1">{errors.eposta}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon <span className="text-red-400">*</span></label>
                      <input type="tel" value={form.telefon} onChange={(e) => set("telefon", e.target.value)} placeholder="+90 5xx xxx xx xx" className={inp(errors.telefon)} />
                      {errors.telefon && <p className="text-xs text-red-500 mt-1">{errors.telefon}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Şehir</label>
                      <input type="text" value={form.sehir} onChange={(e) => set("sehir", e.target.value)} className={inp()} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">İlçe <span className="text-red-400">*</span></label>
                      <input type="text" value={form.ilce} onChange={(e) => set("ilce", e.target.value)} placeholder="Meram, Selçuklu..." className={inp(errors.ilce)} />
                      {errors.ilce && <p className="text-xs text-red-500 mt-1">{errors.ilce}</p>}
                    </div>
                  </div>
                  <button onClick={goNext} className="btn-primary mt-2">
                    Devam Et <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              )}

              {/* ── Adım 2 ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Mesleki Bilgiler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mezun Olunan Okul <span className="text-red-400">*</span></label>
                      <input type="text" value={form.okul} onChange={(e) => set("okul", e.target.value)} placeholder="Selçuk Üniversitesi" className={inp(errors.okul)} />
                      {errors.okul && <p className="text-xs text-red-500 mt-1">{errors.okul}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mezuniyet Yılı <span className="text-red-400">*</span></label>
                      <select value={form.mezuniyetYili} onChange={(e) => set("mezuniyetYili", e.target.value)} className={inp(errors.mezuniyetYili)}>
                        <option value="">Seçiniz</option>
                        {YILLAR.map((y) => <option key={y}>{y}</option>)}
                      </select>
                      {errors.mezuniyetYili && <p className="text-xs text-red-500 mt-1">{errors.mezuniyetYili}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mesleki Deneyim <span className="text-red-400">*</span></label>
                    <select value={form.deneyim} onChange={(e) => set("deneyim", e.target.value)} className={inp(errors.deneyim)}>
                      <option value="">Seçiniz</option>
                      {DENEYIM.map((d) => <option key={d}>{d}</option>)}
                    </select>
                    {errors.deneyim && <p className="text-xs text-red-500 mt-1">{errors.deneyim}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Çalışma Alanları <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {ALANLAR.map((a) => {
                        const sel = form.alanlar.includes(a);
                        return (
                          <button key={a} type="button" onClick={() => toggleArr("alanlar", a)}
                            className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all border"
                            style={sel ? { background: "var(--color-brand-600)", color: "#fff", borderColor: "var(--color-brand-600)" } : { background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }}>
                            {a}
                          </button>
                        );
                      })}
                    </div>
                    {errors.alanlar && <p className="text-xs text-red-500 mt-1">{errors.alanlar}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Seans Tipi <span className="text-red-400">*</span></label>
                      <div className="flex gap-2">
                        {["Yüz Yüze", "Online"].map((t) => {
                          const sel = form.seanstipi.includes(t);
                          return (
                            <button key={t} type="button" onClick={() => toggleArr("seanstipi", t)}
                              className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all"
                              style={sel ? { background: "var(--color-brand-600)", color: "#fff", borderColor: "var(--color-brand-600)" } : { background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }}>
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      {errors.seanstipi && <p className="text-xs text-red-500 mt-1">{errors.seanstipi}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seans Ücreti (TL) <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <input type="number" value={form.seansUcreti} onChange={(e) => set("seansUcreti", e.target.value)} placeholder="3000" className={inp(errors.seansUcreti) + " pr-8"} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₺</span>
                      </div>
                      {errors.seansUcreti && <p className="text-xs text-red-500 mt-1">{errors.seansUcreti}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kısa Biyografi <span className="text-slate-400 font-normal">(isteğe bağlı)</span></label>
                    <textarea value={form.bio} onChange={(e) => set("bio", e.target.value.slice(0, 500))} rows={3}
                      placeholder="Uzmanlık alanlarınızı ve yaklaşımınızı kısaca anlatın." className={inp() + " resize-none"} />
                    <p className="text-right text-xs text-slate-300 mt-0.5">{form.bio.length}/500</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline">← Geri</button>
                    <button onClick={goNext} className="btn-primary">
                      Devam Et <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* ── Adım 3 ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Onay & Gönder</h3>

                  {/* Özet */}
                  <div className="bg-cream-50 rounded-2xl p-5 text-sm space-y-2">
                    {[["Ad Soyad", form.adSoyad], ["Unvan", form.unvan], ["E-posta", form.eposta],
                      ["Telefon", form.telefon], ["Konum", `${form.sehir} / ${form.ilce}`],
                      ["Deneyim", form.deneyim], ["Alanlar", form.alanlar.join(", ")],
                      ["Seans", `${form.seanstipi.join(" & ")} — ${form.seansUcreti} ₺`]
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-slate-400 w-24 shrink-0 text-xs">{k}</span>
                        <span className="text-slate-700 font-medium text-xs">{v || "—"}</span>
                      </div>
                    ))}
                    <button onClick={() => setStep(1)} className="text-xs text-brand-600 underline mt-1">Düzenle</button>
                  </div>

                  {/* Süreç */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-800 space-y-1.5">
                    <p className="font-bold text-blue-900 mb-2">Başvuru Sonrası Süreç</p>
                    {["Başvurunuz 48 saat içinde incelenir", "Diploma Sağlık Bakanlığı sicilinden doğrulanır", "Onay sonrası profil görüşmesi için sizi ararız", "Ödeme bağlantısı gönderilir — ödeme sonrası yayın"].map((s, i) => (
                      <p key={i} className="flex gap-2"><span className="font-bold shrink-0">{i + 1}.</span> {s}</p>
                    ))}
                  </div>

                  {/* KVKK */}
                  <div className="space-y-3">
                    <label className={`flex gap-3 items-start cursor-pointer p-4 rounded-2xl border transition-colors ${form.kvkk ? "bg-brand-50 border-brand-200" : "bg-white border-slate-200"}`}>
                      <input type="checkbox" checked={form.kvkk} onChange={(e) => set("kvkk", e.target.checked)} className="mt-0.5 w-4 h-4 accent-brand-500 shrink-0" />
                      <span className="text-sm text-slate-700 leading-relaxed">
                        <Link href="/uzman-ol/kvkk-aydinlatma" target="_blank" className="font-semibold text-brand-600 underline">KVKK Aydınlatma Metni</Link>&apos;ni
                        okudum, kişisel verilerimin işlenmesini kabul ediyorum. <span className="text-red-400">*</span>
                      </span>
                    </label>
                    {errors.kvkk && <p className="text-xs text-red-500 ml-1">{errors.kvkk}</p>}

                    <label className={`flex gap-3 items-start cursor-pointer p-4 rounded-2xl border transition-colors ${form.acikRiza ? "bg-brand-50 border-brand-200" : "bg-white border-slate-200"}`}>
                      <input type="checkbox" checked={form.acikRiza} onChange={(e) => set("acikRiza", e.target.checked)} className="mt-0.5 w-4 h-4 accent-brand-500 shrink-0" />
                      <span className="text-sm text-slate-600">Platform hakkında e-posta/SMS ile bilgilendirilmek istiyorum. <span className="text-slate-400">(İsteğe bağlı)</span></span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline">← Geri</button>
                    <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 sm:flex-none disabled:opacity-50">
                      {loading ? "Gönderiliyor..." : "Başvuruyu Gönder ✓"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            Sorularınız için <a href="mailto:uzman@terapirehberi.com" className="text-brand-600 underline">uzman@terapirehberi.com</a>
          </p>
        </div>
      </section>

    </div>
  );
}
