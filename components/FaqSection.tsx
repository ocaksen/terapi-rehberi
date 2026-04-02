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
  const [selected, setSelected] = useState<number>(0);

  return (
    <section className="py-20 px-4 bg-cream-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="mb-12">
          <p className="section-label mb-3">SSS</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Sol — soru listesi (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`group w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 ${
                  selected === i
                    ? "bg-brand-700 shadow-lg shadow-brand-200"
                    : "bg-white border border-cream-200 hover:border-brand-200 hover:bg-brand-50"
                }`}
              >
                <span className={`text-sm font-semibold leading-snug ${
                  selected === i ? "text-white" : "text-slate-700"
                }`}>
                  {item.q}
                </span>
                <svg
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    selected === i ? "text-brand-300 rotate-90" : "text-slate-300 group-hover:text-brand-400"
                  }`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Sağ — cevap paneli (3/5) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden"
              >
                {/* Renkli üst şerit */}
                <div className="h-1.5 bg-gradient-to-r from-brand-400 via-amber-400 to-rose-400" />

                <div className="p-8">
                  {/* Soru numarası */}
                  <span className="text-5xl font-black text-brand-100 leading-none select-none" aria-hidden="true">
                    0{selected + 1}
                  </span>

                  {/* Soru */}
                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-5 leading-snug">
                    {items[selected].q}
                  </h3>

                  {/* Cevap */}
                  <p className="text-slate-600 leading-relaxed text-[0.9375rem]">
                    {items[selected].a}
                  </p>

                  {/* Alt navigasyon */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-100">
                    <button
                      onClick={() => setSelected(Math.max(0, selected - 1))}
                      disabled={selected === 0}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Önceki
                    </button>

                    {/* Nokta göstergesi — min 44px touch hedefi için wrapper */}
                    <div className="flex gap-1" role="tablist" aria-label="Soru navigasyonu">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelected(i)}
                          role="tab"
                          aria-selected={i === selected}
                          aria-label={`Soru ${i + 1}`}
                          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-brand-50"
                        >
                          <span className={`rounded-full transition-all duration-200 block ${
                            i === selected
                              ? "w-5 h-2 bg-brand-700"
                              : "w-2 h-2 bg-slate-400 hover:bg-slate-500"
                          }`} />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelected(Math.min(items.length - 1, selected + 1))}
                      disabled={selected === items.length - 1}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2"
                    >
                      Sonraki
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
