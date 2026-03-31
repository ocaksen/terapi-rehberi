"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqSchema } from "@/lib/schema";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
  title?: string;
}

export default function FaqSection({ items, title = "Sık Sorulan Sorular" }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">SSS</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-400 text-sm mt-3">Merak ettiğiniz soruya tıklayın, cevap hemen gelsin.</p>
        </div>

        {/* Chat container */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-brand-800">
            <div className="w-10 h-10 rounded-full bg-brand-600 border-2 border-brand-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">TerapiRehberi</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-brand-300 text-xs">Çevrimiçi • Hızlı yanıt</p>
              </div>
            </div>
          </div>

          {/* Mesaj alanı */}
          <div className="bg-slate-50 p-5 flex flex-col gap-4 min-h-[200px]">

            {/* Karşılama — asistan (sol, teal ton) */}
            <div className="flex items-end gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 mb-0.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="bg-white border border-slate-200 text-slate-700 text-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-[82%] leading-relaxed shadow-sm">
                Merhaba! Merak ettiğiniz soruya tıklayın, hemen yanıtlayayım. 👋
              </div>
            </div>

            {/* Sorular + cevaplar */}
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">

                {/* Kullanıcı sorusu — sağ, amber */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className={`text-left text-sm font-semibold px-4 py-3 rounded-2xl rounded-br-sm max-w-[82%] leading-snug transition-all duration-200 shadow-sm ${
                      open === i
                        ? "bg-amber-500 text-white shadow-amber-200"
                        : "bg-amber-400 text-white hover:bg-amber-500"
                    }`}
                  >
                    {item.q}
                  </button>
                </div>

                {/* Asistan cevabı — sol, beyaz kart */}
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-end gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 mb-0.5">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div className="bg-white border border-brand-100 text-slate-600 text-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-[82%] leading-relaxed shadow-sm">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                          <span className="text-xs font-semibold text-brand-600">TerapiRehberi</span>
                        </div>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Sahte input */}
          <div className="px-4 py-3 border-t border-slate-200 bg-white flex items-center gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-300 select-none">
              Bir soru sorun...
            </div>
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
