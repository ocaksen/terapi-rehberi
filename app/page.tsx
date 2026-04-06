"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getFeaturedExperts, getAllBlogPosts, getAllTests } from "@/lib/data";
import FaqSection from "@/components/FaqSection";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/HeroSection";

const CARD_W = 310;
const CARD_GAP = 24;

const HOME_FAQ = [
  {
    q: "Çocuğum için psikolog gerekli mi?",
    a: "Çocuğunuzda davranış değişikliği, okul sorunları, uyku bozuklukları, aşırı öfke veya içe kapanma gibi belirtiler varsa bir uzmanla görüşmek değerli olabilir. Erken destek, uzun vadede çok daha güçlü sonuçlar verir.",
  },
  {
    q: "Aile terapisi ne zaman gerekir?",
    a: "İletişim kopukluğu, boşanma süreci, kayıp, ergen ile yaşanan çatışmalar — aile terapisi bu süreçlerin hepsinde tüm aileyi destekleyen güvenli bir alan oluşturur.",
  },
  {
    q: "Ergen terapiye gitmek istemiyorsa ne yapmalı?",
    a: "Bu çok sık karşılaşılan bir durum. Önce ebeveyn olarak siz bir uzmanla görüşebilir, ergeninize nasıl yaklaşacağınız konusunda rehberlik alabilirsiniz. Zorlamak genellikle geri teper.",
  },
  {
    q: "Online terapi çocuklar için uygun mu?",
    a: "8 yaş ve üzeri çocuklar için online terapi oldukça etkili olabilir. Özellikle ergenler kendi ortamlarında daha rahat konuşabilir. Küçük çocuklar için yüz yüze seans önerilir.",
  },
  {
    q: "Seans ücretleri ne kadar?",
    a: "Konya'da psikolog seans ücretleri 2026 yılında bireysel terapi için 1.500–5.000 TL arasında değişmektedir. Her uzmanın profil sayfasında güncel ücret bilgisi yer almaktadır.",
  },
  {
    q: "Terapirehberi'ndeki uzmanlar nasıl seçiliyor?",
    a: "Her uzman başvurusu kimlik doğrulama ve diploma/lisans kontrolünden geçmektedir. Yalnızca lisanslı, sertifikalı psikolog ve klinik psikologlar platformda yer alır.",
  },
];

export default function HomePage() {
  const featured = getFeaturedExperts();
  const posts = getAllBlogPosts();
  const tests = getAllTests();
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const oneSet = posts.length * (CARD_W + CARD_GAP);
    let paused = false;

    // Sürükleme
    let isDown = false, startX = 0, startScroll = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true; paused = true;
      el.style.cursor = "grabbing";
      startX = e.pageX; startScroll = el.scrollLeft;
    };
    const onUp = () => {
      isDown = false; el.style.cursor = "grab";
      setTimeout(() => { paused = false; }, 800);
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.pageX - startX) * 1.5;
    };
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("mousemove", onMove);

    // Touch / swipe desteği
    let touchStartX = 0, touchStartScroll = 0;
    const onTouchStart = (e: TouchEvent) => {
      paused = true;
      touchStartX = e.touches[0].pageX;
      touchStartScroll = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      el.scrollLeft = touchStartScroll - (e.touches[0].pageX - touchStartX) * 1.2;
    };
    const onTouchEnd = () => {
      setTimeout(() => { paused = false; }, 800);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    // Otomatik geçiş: her 3 sn'de bir kart
    const timer = setInterval(() => {
      if (paused) return;
      if (el.scrollLeft + 1 >= oneSet) {
        el.scrollLeft = 0;
      } else {
        el.scrollBy({ left: CARD_W + CARD_GAP, behavior: "smooth" });
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [posts.length]);

  return (
    <>
      <HeroSection />

      {/* Nasil Calisir */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Sol: Sticky görsel */}
            <div className="hidden md:block md:col-span-7 sticky top-8">
              <div className="relative w-full bg-white rounded-2xl" style={{ paddingBottom: "86.5%" }}>
                {[
                  { src: "/images/how/01-hizmeti-sec.png", alt: "İhtiyacına Uygun Hizmeti Seç", w: 1135, h: 928 },
                  { src: "/images/how/02-uzmaninla-esles.png", alt: "Uzmanınla Eşleş", w: 1110, h: 960 },
                  { src: "/images/how/03-randevunu-planla.png", alt: "Randevunu Planla", w: 1110, h: 960 },
                  { src: "/images/how/04-gorusmeye-katil.png", alt: "Görüşmeye Katıl", w: 1110, h: 960 },
                  { src: "/images/how/05-mesajlas.png", alt: "Uzmanınla İstediğinde Mesajlaş", w: 1110, h: 960 },
                ].map((img, i) => (
                  <Image
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    quality={75}
                    sizes="(max-width: 768px) 0px, 660px"
                    priority={i === 0}
                    className="absolute inset-0 w-full h-full object-contain rounded-2xl transition-opacity duration-500"
                    style={{ opacity: activeStep === i ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Sağ: Adımlar */}
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                TerapiRehberi Nasıl Çalışır?
              </h2>

              {[
                { no: "01", title: "İhtiyacına Uygun Hizmeti Seç", desc: "Başlangıç aşamasında, kendine en uygun sağlık hizmetini seçerek süreci başlatıyorsun." },
                { no: "02", title: "Uzmanınla Eşleş", desc: "İhtiyacına göre en uygun uzmanla sistem tarafından eşleştiriliyor." },
                { no: "03", title: "Randevunu Planla", desc: "Kendi müsaitliğine göre görüşme zamanını belirleyip programlıyor." },
                { no: "04", title: "Görüşmeye Katıl", desc: "Planlanan zamanda uzmanla online görüşmeni gerçekleştiriyor." },
                { no: "05", title: "Uzmanınla İstediğinde Mesajlaş", desc: "Görüşmeniz sonrasında uzmanınla istediğiniz zaman iletişim kurabiliyorsun." },
              ].map((item, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={item.no}
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    className="w-full text-left flex items-center gap-4 py-5 border-b border-slate-100 last:border-0 group cursor-pointer"
                  >
                    <span
                      className="font-bold transition-all duration-300 shrink-0"
                      style={{
                        fontSize: isActive ? "2.5rem" : "1.75rem",
                        color: isActive ? "var(--color-brand-600)" : "#94a3b8",
                      }}
                    >
                      {item.no}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold transition-all duration-300 leading-snug"
                        style={{
                          fontSize: isActive ? "1.125rem" : "0.9375rem",
                          color: isActive ? "#1e3a2e" : "#64748b",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-[0.9375rem] text-slate-600 overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isActive ? "5rem" : "0",
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? "0.25rem" : "0",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                    <div
                      className="shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-300"
                      style={{ opacity: isActive ? 1 : 0.2, transform: isActive ? "scale(1.15)" : "scale(1)" }}
                    >
                      <img src={`/images/how/icons/icon-${item.no}.svg`} alt={item.title} width="32" height="33" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Aile Bolumu */}
      <section className="bg-cream-100 py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div style={{ display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>

            {/* Sol */}
            <div style={{ flex: 1, minWidth: "300px", maxWidth: "500px" }}>

              {/* 3 İkon — yuvarlak, çocuksu & şirin */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                {[
                  {
                    bg: "#e8faf7", border: "#9ae0d0",
                    svg: (
                      /* Oyuncak ayı — çocuk psikolojisi */
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                        <circle cx="10.5" cy="12" r="5" fill="#d0f2ea" stroke="#1e9b83" strokeWidth="1.5"/>
                        <circle cx="29.5" cy="12" r="5" fill="#d0f2ea" stroke="#1e9b83" strokeWidth="1.5"/>
                        <circle cx="10.5" cy="12" r="2.5" fill="#9ae0d0"/>
                        <circle cx="29.5" cy="12" r="2.5" fill="#9ae0d0"/>
                        <circle cx="20" cy="25" r="13" fill="#d0f2ea" stroke="#1e9b83" strokeWidth="1.5"/>
                        <circle cx="15.5" cy="23" r="2" fill="#125e50"/>
                        <circle cx="24.5" cy="23" r="2" fill="#125e50"/>
                        <circle cx="16.2" cy="22.3" r="0.7" fill="white"/>
                        <circle cx="25.2" cy="22.3" r="0.7" fill="white"/>
                        <ellipse cx="20" cy="29.5" rx="4.5" ry="3" fill="#9ae0d0"/>
                        <ellipse cx="20" cy="28" rx="1.8" ry="1.2" fill="#125e50"/>
                        <path d="M16.5 31.5 Q20 34.5 23.5 31.5" stroke="#125e50" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                    )
                  },
                  {
                    bg: "#fffbeb", border: "#fde68a",
                    svg: (
                      /* Yıldız yüz — ergen / gençlik */
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                        <path d="M20 4 L22.9 13.6 L33 13.6 L25 19.4 L27.6 29 L20 23.5 L12.4 29 L15 19.4 L7 13.6 L17.1 13.6 Z" fill="#fde68a" stroke="#f5b84a" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="16.5" cy="17.5" r="1.4" fill="#92400e"/>
                        <circle cx="23.5" cy="17.5" r="1.4" fill="#92400e"/>
                        <path d="M16.5 21 Q20 24 23.5 21" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="5" cy="7" r="1.8" fill="#fde68a" opacity="0.8"/>
                        <circle cx="35" cy="7" r="1.8" fill="#fde68a" opacity="0.8"/>
                        <path d="M5 5.5 L5 8.5 M3.5 7 L6.5 7" stroke="#f5b84a" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M35 5.5 L35 8.5 M33.5 7 L36.5 7" stroke="#f5b84a" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    )
                  },
                  {
                    bg: "#fff1f2", border: "#fecdd3",
                    svg: (
                      /* Ev + kalp — aile */
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                        <path d="M20 5 L36 20 H4 Z" fill="#fecdd3" stroke="#fb7185" strokeWidth="1.5" strokeLinejoin="round"/>
                        <rect x="6" y="19" width="28" height="17" rx="2" fill="#fff1f2" stroke="#fb7185" strokeWidth="1.5"/>
                        <rect x="15" y="25" width="10" height="11" rx="2" fill="#fecdd3" stroke="#fb7185" strokeWidth="1.2"/>
                        <path d="M20 33.5 C20 33.5 17 31 17 29 C17 27.5 18.2 27 20 29 C21.8 27 23 27.5 23 29 C23 31 20 33.5 20 33.5Z" fill="#fb7185"/>
                        <rect x="26" y="7" width="4" height="9" rx="1" fill="#fda4af" stroke="#fb7185" strokeWidth="1.2"/>
                        <path d="M28 6 C28 6 26.2 4.3 26.2 3 C26.2 2 27.2 1.5 28 3 C28.8 1.5 29.8 2 29.8 3 C29.8 4.3 28 6 28 6Z" fill="#f4735a" opacity="0.8"/>
                      </svg>
                    )
                  },
                ].map((item, i) => (
                  <div key={i} style={{ width: 70, height: 70, borderRadius: "50%", background: item.bg, border: `2px solid ${item.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
                    {item.svg}
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "30px", color: "var(--foreground)" }}>
                Çocuğunuz İçin{" "}
                <span style={{ color: "var(--color-brand-600)" }}>TerapiRehberi</span>
              </h2>

              <p style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", lineHeight: 1.4, color: "#4a5568", marginBottom: "40px" }}>
                Lisanslı çocuk psikologları, ergen terapistleri ve aile danışmanlarıyla tanışın. Konya'da doğrulanmış uzmanlar, aileniz için en doğru desteği sunar.
              </p>

              <Link
                href="/konya/psikologlar"
                style={{ background: "var(--color-brand-600)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "24px", fontSize: "13px", fontWeight: 500, textTransform: "uppercase", transition: "all 0.3s", display: "inline-block", textDecoration: "none", letterSpacing: "0.05em" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-700)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 25px rgba(22,122,104,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-600)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                UZMAN BUL
              </Link>
            </div>

            {/* Sağ — görsel + floating bubbles */}
            <div style={{ flex: 1, minWidth: "300px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

              {/* Ana Görsel */}
              <Image
                src="/images/aile-section.png"
                alt="Çocuğunuz İçin TerapiRehberi"
                width={600}
                height={500}
                quality={100}
                style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "20px" }}
              />

              {/* Bubbles overlay — Terappin ile birebir konum */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
                {[
                  { style: { top: "10%", left: "5%" },    label: "Çocuk psikologları" },
                  { style: { top: "15%", right: "10%" },  label: "Ergen terapisi" },
                  { style: { top: "40%", left: "2%" },    label: "Aile terapisi" },
                  { style: { top: "45%", right: "5%" },   label: "Online seans" },
                  { style: { bottom: "20%", left: "8%" }, label: "Doğrulanmış uzmanlar" },
                  { style: { bottom: "25%", right: "15%" }, label: "Ücretsiz platform" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      position: "absolute",
                      ...b.style,
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      borderRadius: "24px",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.7)",
                      maxWidth: "250px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--color-brand-600)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <svg width="16" height="16" fill="none" stroke="var(--color-brand-600)" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Neden TerapiRehberi */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <p className="section-label mb-4">Neden TerapiRehberi?</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
                Çocuğunuz için en iyisini<br />
                <em className="not-italic text-brand-600">güvenle seçin.</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                accent: "bg-teal-500",
                title: "Doğrulanmış Uzmanlar",
                desc: "Her psikolog kimlik ve lisans doğrulamasından geçiyor. Çocuğunuz yalnızca gerçek uzmanlara yönlendiriliyor.",
                icon: (
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                ),
                iconBg: "bg-teal-50 border-teal-100",
              },
              {
                accent: "bg-amber-500",
                title: "Gizlilik Ön Planda",
                desc: "Aile bilgileriniz güvende. Uzmanla doğrudan iletişim kurarsınız, hiçbir bilgi paylaşılmaz.",
                icon: (
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                ),
                iconBg: "bg-amber-50 border-amber-100",
              },
              {
                accent: "bg-rose-500",
                title: "Danışan İçin Ücretsiz",
                desc: "Platform ücreti yok. Sadece terapistin seans ücretini ödersiniz, başka maliyet yok.",
                icon: (
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ),
                iconBg: "bg-rose-50 border-rose-100",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.12} direction="up">
                <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className={`h-1 ${item.accent}`} />
                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-[0.9375rem] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Psikolojik Testler */}
      <section className="py-20 px-4 bg-cream-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Sol — koyu kart */}
            <div className="rounded-3xl overflow-hidden" style={{ background: "#1e3a5f" }}>
              <div className="p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Kendinizi Tanıyın</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  Ücretsiz Psikolojik Testler
                </h2>
                <p className="text-blue-200 text-sm mb-7 leading-relaxed">
                  Bilimsel ölçeklere dayalı testlerle psikolojik durumunuzu değerlendirin. Sonuçlar yalnızca size gösterilir.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {tests.slice(0, 3).map((test) => (
                    <Link
                      key={test.slug}
                      href={`/testler/${test.slug}`}
                      className="group rounded-2xl p-4 text-center flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <span className="text-2xl">{test.icon}</span>
                      <span className="text-white text-sm font-semibold leading-snug">{test.shortTitle} Testi</span>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full mt-1 w-full text-center"
                        style={{ background: "#f59e0b", color: "#1a1a1a" }}
                      >
                        Testi Çöz
                      </span>
                    </Link>
                  ))}

                  {/* Tümü */}
                  <Link
                    href="/testler"
                    className="group rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span className="text-white text-sm font-semibold">Tüm Testler</span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full mt-1 w-full text-center"
                      style={{ background: "#f59e0b", color: "#1a1a1a" }}
                    >
                      Psikolojik Testler
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sağ — platform özellikleri */}
            <div>
              <p className="section-label mb-3">Psikolog Platformu Olarak</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 leading-snug">
                Size Neler Sunuyoruz?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Konumunuza Göre Uzman",
                    desc: "Konya'nın ilçelerinde yüz yüze görüşebileceğiniz terapistlerin listesi ve detaylı bilgileri.",
                  },
                  {
                    icon: "💻",
                    title: "Online veya Yüz Yüze",
                    desc: "Evinizin konforunda online seans ya da klinikte yüz yüze terapi — seçim sizin.",
                  },
                  {
                    icon: "🔬",
                    title: "Ücretsiz Psikolojik Testler",
                    desc: "Anksiyete, depresyon ve stres düzeyinizi bilimsel ölçeklerle ücretsiz değerlendirin.",
                  },
                  {
                    icon: "✅",
                    title: "Doğrulanmış Uzman Profilleri",
                    desc: "Her psikolog kimlik ve diploma kontrolünden geçmiş, platformda yalnızca lisanslı uzmanlar yer alır.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Uzmanlar CTA */}
      <section className="py-16 px-4 bg-cream-50">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <p className="section-label mb-3">Konya</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Konya&apos;daki Tüm Psikologlar
            </h2>
            <p className="text-slate-600 text-sm mb-8 max-w-xl mx-auto">
              Meram, Selçuklu, Karatay ve diğer ilçelerden <strong>{featured.length > 0 ? "50+" : ""}</strong> psikolog ve terapist listemizde yer alıyor.
            </p>
            <Link href="/konya/psikologlar" className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors">
              Psikolog Listesini Gör
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Carousel */}
      <section className="py-20 bg-white">
        {/* Başlık */}
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="section-label mb-2">Rehber İçerik</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Bilmeniz gerekenler</h2>
              </div>
              <Link href="/blog" className="btn-outline shrink-0">Tüm Yazılar</Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Carousel — ok butonları + sürüklenebilir */}
        <div className="max-w-5xl mx-auto px-4">
        <div className="relative">
          {/* Sol ok */}
          <button
            onClick={() => carouselRef.current?.scrollBy({ left: -(CARD_W + CARD_GAP), behavior: "smooth" })}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center hover:bg-brand-50 hover:border-brand-200 transition-colors"
            aria-label="Geri"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Sağ ok */}
          <button
            onClick={() => carouselRef.current?.scrollBy({ left: CARD_W + CARD_GAP, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center hover:bg-brand-50 hover:border-brand-200 transition-colors"
            aria-label="İleri"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        <div
          ref={carouselRef}
          className="flex select-none"
          style={{
            gap: `${CARD_GAP}px`,
            overflowX: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
            {[...posts, ...posts].map((post, i) => {
              const accents = ["#0f766e", "#b45309", "#be123c", "#7c3aed", "#0369a1", "#c2410c"];
              const gradients = [
                "from-teal-50 to-teal-100",
                "from-amber-50 to-amber-100",
                "from-rose-50 to-rose-100",
                "from-violet-50 to-violet-100",
                "from-sky-50 to-sky-100",
                "from-orange-50 to-orange-100",
              ];
              const idx = i % posts.length;
              return (
                <Link
                  key={`${post.slug}-${i}`}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200 shrink-0"
                  style={{ width: `${CARD_W}px`, flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
                >
                  {/* Görsel — 372×209 (16:9) */}
                  <div
                    className={`relative bg-gradient-to-br ${gradients[idx]} overflow-hidden w-full shrink-0`}
                    style={{ height: "191px" }}
                  >
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="310px"
                        quality={75}
                        className="object-cover"
                      />
                    )}
                    <span
                      className="absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full"
                      style={{ background: accents[idx] }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Kart içeriği */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <p className="text-xs text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.author && (
                      <p className="text-xs text-slate-500 mt-auto pt-3 border-t border-slate-100">{post.author}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        </div>{/* /max-w-5xl */}

        {/* Alt buton */}
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-outline">Tüm Yazıları Görüntüleyin</Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={HOME_FAQ} />

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-700">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Psikolog musunuz?
          </h2>
          <p className="text-brand-200 mb-8 leading-relaxed">
            Profilinizi ücretsiz oluşturun, Konya'da sizi arayan ailelere ulaşın.
          </p>
          <Link
            href="/uzman-ol"
            className="inline-flex items-center gap-2.5 bg-white text-brand-800 font-bold px-8 py-4 rounded-xl hover:bg-cream-50 transition-colors text-sm shadow-lg"
          >
            Uzman Olarak Katıl
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
