"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TypewriterText from "@/components/TypewriterText";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_CINEMA: [number, number, number, number] = [0.76, 0, 0.24, 1];

const GRADIENTS = [
  "linear-gradient(135deg, #d0f2ea 0%, #fffaf7 45%, #fde8d8 100%)",
  "linear-gradient(135deg, #fde8d8 0%, #fff3ec 45%, #e8f8ff 100%)",
  "linear-gradient(135deg, #f3eeff 0%, #fffaf7 45%, #d0f2ea 100%)",
  "linear-gradient(135deg, #fff8e1 0%, #fffaf7 45%, #f3eeff 100%)",
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

// Sürekli yüzen animasyon
function Float({
  children,
  duration = 4,
  y = 10,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  y?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -y, 0] }}
      transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((i) => (i + 1) % GRADIENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden -mt-16">

      {/* Animasyonlu gradient arka plan */}
      <AnimatePresence mode="sync">
        <motion.div
          key={gradientIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: GRADIENTS[gradientIndex] }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.5),transparent)]" />

      {/* Elle çizilmiş dekoratif elementler */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Sol üst — yıldız */}
        <svg className="absolute top-24 left-2 sm:left-6 w-8 sm:w-10 h-8 sm:h-10 text-amber-300 opacity-70" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 2l4.5 13H38l-11 8 4 13-11-8-11 8 4-13L2 15h13.5z"/>
        </svg>
        {/* Sağ üst — nokta grubu */}
        <svg className="absolute top-32 right-2 sm:right-10 w-12 sm:w-16 h-12 sm:h-16 opacity-40" viewBox="0 0 60 60" fill="none">
          <circle cx="10" cy="10" r="5" fill="#30b49a"/>
          <circle cx="30" cy="6" r="3" fill="#f4735a"/>
          <circle cx="50" cy="14" r="6" fill="#f5b84a"/>
          <circle cx="20" cy="28" r="4" fill="#a78bfa"/>
          <circle cx="46" cy="34" r="3" fill="#30b49a"/>
        </svg>
        {/* Sol alt — spiral/dalga */}
        <svg className="absolute bottom-20 left-2 sm:left-8 w-16 sm:w-20 h-10 sm:h-12 opacity-30" viewBox="0 0 80 40" fill="none">
          <path d="M0 20 Q10 0 20 20 Q30 40 40 20 Q50 0 60 20 Q70 40 80 20" stroke="#30b49a" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Sağ orta — küçük kalp */}
        <svg className="absolute top-1/2 right-2 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 text-rose-300 opacity-60" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 28S2 20 2 10a7 7 0 0112-4.9A7 7 0 0130 10c0 10-14 18-14 18z"/>
        </svg>
        {/* Alt orta — üçgen/balon */}
        <svg className="absolute bottom-28 right-4 sm:right-20 w-7 sm:w-8 h-7 sm:h-8 opacity-40" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="13" r="11" fill="#60a5fa" opacity="0.6"/>
          <path d="M13 24l3 6 3-6" fill="#60a5fa" opacity="0.6"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-[100svh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full pt-20 sm:pt-24 pb-12 sm:pb-16">

          {/* ── SOL: Metin ── */}
          <div className="flex flex-col gap-7">
            <FadeUp delay={0.05}>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold text-brand-600 uppercase tracking-[0.2em]">
                <span className="w-6 h-px bg-brand-400" />
                Türkiye&apos;nin Psikolog Rehberi
              </span>
            </FadeUp>

            <FadeUp delay={0.18}>
              <h1 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold text-slate-900 leading-[1.15]">
                <TypewriterText />{" "}
                <span className="text-slate-900">için</span>
                <br />
                <em className="not-italic text-amber-500">güvenilir</em> bir
                <br />
                psikolog bulun.
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-lg text-slate-600 leading-relaxed max-w-sm">
                Bilimsel temelli yaklaşımlar ve lisanslı uzman kadromuzla, Konya&apos;da ruhsal dönüşüm yolculuğunuzda yanınızdayız.
              </p>
            </FadeUp>

            <FadeUp delay={0.42}>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/konya/psikologlar"
                  className="inline-flex items-center justify-center gap-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold px-7 py-4 rounded-xl transition-colors text-sm shadow-lg shadow-brand-200"
                >
                  Konya Psikologlarını Gör
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/konya"
                  className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors px-4 py-4"
                >
                  Konya Hakkında
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.54}>
              <div className="flex items-center gap-4 pt-1">
                <div className="flex -space-x-2.5">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                  ].map((src, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm">
                      <Image src={src} alt="Uzman" width={36} height={36} className="object-cover w-full h-full" />
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-brand-100 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-brand-700">+</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Kimlik &amp; Lisans Doğrulamalı</p>
                  <p className="text-xs text-slate-400">Her uzman teyit edilmiştir</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── SAĞ: Floating kompozisyon ── */}
          <div className="relative hidden lg:flex items-center justify-center h-[560px]">

            {/* Ana fotoğraf — clip-path wipe + hafif eğim */}
            <motion.div
              initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", rotate: 0 }}
              animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", rotate: 2 }}
              transition={{ duration: 1.2, ease: EASE_CINEMA, delay: 0.2 }}
              className="absolute w-72 h-96 rounded-3xl overflow-hidden shadow-2xl"
              style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" } as React.CSSProperties}
            >
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=85&fit=crop"
                  alt="Mutlu çocuk oynuyor"
                  fill
                  sizes="300px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* İkinci fotoğraf — sol altta, ters eğim */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.8 }}
              className="absolute bottom-8 left-0 w-44 h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Float duration={5} y={8} delay={0.5} className="w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&q=85&fit=crop"
                    alt="Aile birlikte"
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              </Float>
            </motion.div>

            {/* Doğrulanmış uzman kartı — sağ üst */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.1 }}
              className="absolute top-10 right-0"
            >
              <Float duration={4} y={9} delay={0} className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 w-48">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Uzman"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Uzm. Psk.</p>
                    <p className="text-xs text-slate-500">8 yıl deneyim</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 bg-green-50 rounded-lg px-2 py-1.5">
                  <svg className="w-3 h-3 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-semibold text-green-700">Kimlik Doğrulandı</span>
                </div>
              </Float>
            </motion.div>

            {/* İstatistik badge — sol üst */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.4 }}
              className="absolute top-16 left-4"
            >
              <Float duration={3.5} y={7} delay={1} className="bg-brand-700 text-white rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-2xl font-bold leading-none">%100</p>
                <p className="text-[10px] text-brand-200 mt-1">Lisans Doğrulamalı</p>
              </Float>
            </motion.div>

            {/* WhatsApp randevu badge — alt orta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.7 }}
              className="absolute bottom-12 right-4"
            >
              <Float duration={4.5} y={6} delay={0.7} className="bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.845L.057 23.997l6.304-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.368l-.359-.213-3.722.976.994-3.632-.234-.373A9.818 9.818 0 1112 21.818z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-800">WhatsApp</p>
                  <p className="text-[9px] text-slate-400">Randevu al</p>
                </div>
              </Float>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Aşağı ok */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  );
}
