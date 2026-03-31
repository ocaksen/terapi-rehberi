"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Expert, Service } from "@/types";
import ExpertCard from "@/components/ExpertCard";

interface Props {
  experts: Expert[];        // Zaten server'da filtrelenmiş
  allCount: number;         // Toplam uzman sayısı
  services: Service[];
  citySlug: string;
  selectedServices: string[];
  selectedTypes: string[];
}

export default function ExpertFilters({
  experts,
  allCount,
  services,
  citySlug,
  selectedServices,
  selectedTypes,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL'i güncelle — browser geçmişine eklemeden (replace)
  const updateURL = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.getAll(key);

      params.delete(key);
      if (checked) {
        [...current, value].forEach((v) => params.append(key, v));
      } else {
        current.filter((v) => v !== value).forEach((v) => params.append(key, v));
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  const hasFilter = selectedServices.length > 0 || selectedTypes.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filtre sidebar */}
      <aside className="lg:w-56 shrink-0" aria-label="Filtreler">
        <div className="card p-5 sticky top-28 space-y-5">
          {/* Tümü doğrulanmış */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-semibold text-green-800">Tümü Doğrulanmış</p>
          </div>

          {/* Uzmanlık alanı */}
          <div>
            <p className="font-semibold text-brand-900 text-sm mb-3">Uzmanlık Alanı</p>
            <div className="flex flex-col gap-1">
              {services.map((s) => {
                const checked = selectedServices.includes(s.slug);
                return (
                  <label
                    key={s.slug}
                    className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-brand-700 rounded-lg px-2 py-1.5 hover:bg-cream-50 transition-colors min-h-[36px]"
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 transition-all shrink-0 flex items-center justify-center ${
                        checked
                          ? "bg-brand-500 border-brand-500"
                          : "border-cream-300 bg-white"
                      }`}
                      onClick={() => updateURL("hizmet", s.slug, !checked)}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{s.icon}</span>
                    <span onClick={() => updateURL("hizmet", s.slug, !checked)} className="flex-1">
                      {s.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <hr className="border-cream-200" />

          {/* Seans türü */}
          <div>
            <p className="font-semibold text-brand-900 text-sm mb-3">Seans Türü</p>
            <div className="flex flex-col gap-1">
              {[
                { label: "Yüz Yüze", icon: "🏢", value: "Yüz Yüze" },
                { label: "Online", icon: "💻", value: "Online" },
              ].map((t) => {
                const checked = selectedTypes.includes(t.value);
                return (
                  <label
                    key={t.value}
                    className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-brand-700 rounded-lg px-2 py-1.5 hover:bg-cream-50 transition-colors min-h-[36px]"
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 transition-all shrink-0 flex items-center justify-center ${
                        checked
                          ? "bg-brand-500 border-brand-500"
                          : "border-cream-300 bg-white"
                      }`}
                      onClick={() => updateURL("tur", t.value, !checked)}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span>{t.icon}</span>
                    <span onClick={() => updateURL("tur", t.value, !checked)} className="flex-1">
                      {t.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Temizle */}
          {hasFilter && (
            <>
              <hr className="border-cream-200" />
              <button
                onClick={clearAll}
                className="w-full text-xs text-slate-400 hover:text-brand-700 transition-colors py-1 underline text-center"
              >
                Filtreleri temizle
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Liste */}
      <main className="flex-1">
        {/* Aktif filtre badge'leri */}
        {hasFilter && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {selectedServices.map((s) => {
              const svc = services.find((x) => x.slug === s);
              return (
                <button
                  key={s}
                  onClick={() => updateURL("hizmet", s, false)}
                  className="flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-brand-200 transition-colors"
                >
                  {svc?.icon} {svc?.name} ×
                </button>
              );
            })}
            {selectedTypes.map((t) => (
              <button
                key={t}
                onClick={() => updateURL("tur", t, false)}
                className="flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-brand-200 transition-colors"
              >
                {t} ×
              </button>
            ))}
          </div>
        )}

        {experts.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold text-brand-900 mb-2">
              Bu kriterlere uyan uzman bulunamadı
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Filtreleri genişletmeyi deneyin.
            </p>
            <button
              onClick={clearAll}
              className="btn-outline text-sm"
            >
              Tüm Uzmanları Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experts.map((e) => (
              <ExpertCard key={e.slug} expert={e} citySlug={citySlug} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 p-4 bg-brand-50 border border-brand-100 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-brand-800 mb-0.5">Psikolog musunuz?</p>
            <p className="text-xs text-brand-600 leading-relaxed">
              Profilinizi ücretsiz ekleyin ve Konya&apos;da sizi arayan danışanlara ulaşın.{" "}
              <a href="/uzman-ol" className="font-semibold underline hover:no-underline">Başvurun →</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
