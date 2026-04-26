"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    slug: "bireysel-terapi",
    name: "Bireysel Terapi",
    desc: "Kendi iç dünyanızı keşfedin",
    color: "bg-sky-100 text-sky-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <rect x="3" y="4" width="15" height="11" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 15l-2 4 4-2" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="8" cy="9.5" r="1.2" fill="currentColor"/>
        <circle cx="12" cy="9.5" r="1.2" fill="currentColor"/>
        <circle cx="16" cy="9.5" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    slug: "cift-terapisi",
    name: "Çift Terapisi",
    desc: "İlişkinizi güçlendirin",
    color: "bg-rose-100 text-rose-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <path d="M12 20S4 15 4 9a5 5 0 018-4 5 5 0 018 4c0 6-8 11-8 11z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: "ergen-psikolojisi",
    name: "Ergen Psikolojisi",
    desc: "Gençlik döneminde destek",
    color: "bg-violet-100 text-violet-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <circle cx="12" cy="7" r="4" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 21c0-5 3-7 7-7s7 2 7 7" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 4l1 2 2 .3-1.5 1.5.4 2-1.9-1-1.9 1 .4-2L15 6.3l2-.3z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    slug: "aile-terapisi",
    name: "Aile Terapisi",
    desc: "Aile bağlarını pekiştirin",
    color: "bg-amber-100 text-amber-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <path d="M3 12l9-9 9 9" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="6" y="12" width="12" height="9" rx="1" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="15" r="2" fill="currentColor" opacity="0.9"/>
        <circle cx="15" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    slug: "kaygi-bozuklugu",
    name: "Kaygı Bozukluğu",
    desc: "Stresinizi yönetin",
    color: "bg-teal-100 text-teal-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <circle cx="12" cy="9" r="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 16 Q6 10 10 16 Q14 22 18 16 Q20 13 22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
  {
    slug: "emdr",
    name: "EMDR Terapisi",
    desc: "Travmayı geride bırakın",
    color: "bg-emerald-100 text-emerald-700",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="13" cy="11" r="1" fill="white"/>
      </svg>
    ),
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setMenuOpen(false), 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-sm"
          : "bg-brand-900/85 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px]">
          {/* Logo mark — filiz/sürgün: büyüme, iyileşme */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0">
            <path
              d="M15 26 C15 26 15 16 15 13"
              stroke={scrolled ? "#167a68" : "white"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M15 13 C15 13 9 17 8 11 C7 6 12 4 15 8"
              fill={scrolled ? "#167a68" : "white"}
              opacity="0.8"
            />
            <path
              d="M15 16 C15 16 21 20 22 14 C23 9 18 7 15 11"
              fill={scrolled ? "#1a9b84" : "white"}
              opacity="0.55"
            />
          </svg>
          <span
            className={`font-bold text-lg tracking-tight transition-colors duration-300 ${
              scrolled ? "text-brand-800" : "text-white"
            }`}
          >
            Terapi<span className={scrolled ? "text-brand-500" : "text-white opacity-80"}>Rehberi</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Hizmetler — mega menü */}
          <div
            className="relative"
            ref={menuRef}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <button
              className={`flex items-center gap-1 py-2 transition-colors duration-200 hover:text-brand-400 ${
                scrolled ? "text-slate-700" : "text-white drop-shadow-sm"
              }`}
            >
              Hizmetler
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Flyout */}
            {menuOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[calc(100vw-32px)] sm:w-[480px] max-w-[480px] bg-white rounded-2xl shadow-2xl border border-cream-200 p-4 grid grid-cols-2 gap-2"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                {/* Ok işareti */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-cream-200 rotate-45" />

                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/konya/${s.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors duration-150"
                  >
                    <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-110`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-none mb-0.5">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.desc}</p>
                    </div>
                  </Link>
                ))}

              </div>
            )}
          </div>

          {[
            { href: "/konya", label: "Konya" },
            { href: "/testler", label: "Psikolojik Testler" },
            { href: "/soru-sor", label: "Soru Sor" },
            { href: "/blog", label: "Blog" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-2 transition-colors duration-200 hover:text-brand-400 ${
                scrolled ? "text-slate-700" : "text-white drop-shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/uzman-ol"
            className="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors min-h-[36px] flex items-center"
          >
            Uzman Ol
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-3 transition-colors -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${
            scrolled ? "text-slate-600" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-cream-100 px-4 py-4 flex flex-col gap-1 text-sm font-medium shadow-lg">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest px-3 pb-1">Hizmetler</p>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/konya/${s.slug}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-slate-700 hover:text-brand-600 hover:bg-cream-50 rounded-lg px-3 py-2.5 transition-colors"
            >
              <div className={`w-7 h-7 rounded-lg ${s.color} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              {s.name}
            </Link>
          ))}
          <div className="mt-2 border-t border-cream-100 pt-2 flex flex-col gap-1">
            {[
              { href: "/konya", label: "Konya" },
              { href: "/testler", label: "Psikolojik Testler" },
              { href: "/soru-sor", label: "Soru Sor" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-700 hover:text-brand-600 hover:bg-cream-50 rounded-lg px-3 py-3 transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/uzman-ol"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-center w-full min-h-[48px]"
              >
                Uzman Olarak Katıl
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
