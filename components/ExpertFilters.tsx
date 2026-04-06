"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { Expert, Service } from "@/types";
import ExpertCard from "@/components/ExpertCard";
import Link from "next/link";

interface Props {
  experts: Expert[];
  allCount: number;
  services: Service[];
  citySlug: string;
  selectedServices: string[];
  selectedTypes: string[];
}

const SORT_OPTIONS = [
  { value: "onerilen",  label: "Önerilen" },
  { value: "fiyat-asc", label: "Fiyat (Artan)" },
  { value: "fiyat-desc", label: "Fiyat (Azalan)" },
  { value: "deneyim",   label: "En Deneyimli" },
];

function parseFee(fee: string | null): number {
  if (!fee) return 0;
  return parseInt(fee.replace(/\D/g, ""), 10) || 0;
}

function sortExperts(list: Expert[], sort: string): Expert[] {
  const arr = [...list];
  if (sort === "fiyat-asc")  return arr.sort((a, b) => parseFee(a.sessionFee) - parseFee(b.sessionFee));
  if (sort === "fiyat-desc") return arr.sort((a, b) => parseFee(b.sessionFee) - parseFee(a.sessionFee));
  if (sort === "deneyim")    return arr.sort((a, b) => parseInt(b.experience ?? "0") - parseInt(a.experience ?? "0"));
  return arr; // onerilen = mevcut sıra (featured önce)
}

export default function ExpertFilters({ experts, allCount, services, citySlug, selectedServices, selectedTypes }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("onerilen");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateURL = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.getAll(key);
      params.delete(key);
      if (checked) [...current, value].forEach((v) => params.append(key, v));
      else current.filter((v) => v !== value).forEach((v) => params.append(key, v));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  function clearAll() { router.replace(pathname, { scroll: false }); }

  const hasFilter = selectedServices.length > 0 || selectedTypes.length > 0;
  const sorted = sortExperts(experts, sort);

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Doğrulanmış banner */}
      <div className="flex items-center gap-2 p-3 bg-brand-50 rounded-xl border border-brand-100">
        <svg className="w-4 h-4 text-brand-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <p className="text-xs font-semibold text-brand-800">Tümü Diploma Doğrulanmış</p>
      </div>

      {/* Seans Türü — pill butonlar */}
      <div>
        <p className="font-semibold text-slate-800 text-sm mb-3">Seans Türü</p>
        <div className="flex gap-2">
          {[{ v: "Yüz Yüze", icon: "🏢" }, { v: "Online", icon: "💻" }].map((t) => {
            const checked = selectedTypes.includes(t.v);
            return (
              <button
                key={t.v}
                onClick={() => updateURL("tur", t.v, !checked)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium border transition-all"
                style={checked
                  ? { background: "var(--color-brand-600)", color: "#fff", borderColor: "var(--color-brand-600)" }
                  : { background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }
                }
              >
                {t.icon} {t.v}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-cream-200"/>

      {/* Uzmanlık Alanı */}
      <div>
        <p className="font-semibold text-slate-800 text-sm mb-3">Uzmanlık Alanı</p>
        <div className="flex flex-col gap-0.5">
          {services.map((s) => {
            const checked = selectedServices.includes(s.slug);
            return (
              <label
                key={s.slug}
                onClick={() => updateURL("hizmet", s.slug, !checked)}
                className={`flex items-center gap-2.5 text-sm cursor-pointer rounded-lg px-2 py-2 transition-colors min-h-[40px] ${
                  checked ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 transition-all shrink-0 flex items-center justify-center ${
                  checked ? "bg-brand-500 border-brand-500" : "border-slate-300 bg-white"
                }`}>
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>
                <span>{s.icon}</span>
                <span className="flex-1 leading-snug">{s.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {hasFilter && (
        <>
          <hr className="border-cream-200"/>
          <button onClick={clearAll} className="w-full text-xs text-slate-400 hover:text-red-500 transition-colors py-1 text-center">
            ✕ Filtreleri Temizle
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* ── Masaüstü sidebar ── */}
      <aside className="hidden lg:block lg:w-60 shrink-0">
        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 sticky top-24">
          <p className="font-bold text-slate-900 text-sm mb-4">Filtreler</p>
          <FilterContent />
        </div>
      </aside>

      {/* ── Ana içerik ── */}
      <main className="flex-1 min-w-0">

        {/* Üst bar: sonuç + sıralama + mobil filtre */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-900">{sorted.length}</strong> uzman listeleniyor
            {hasFilter && <span className="text-slate-400"> ({allCount} içinden)</span>}
          </p>

          <div className="flex items-center gap-2">
            {/* Sıralama */}
            <div className="flex items-center gap-2 bg-white border border-cream-200 rounded-xl px-3 py-2">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
              </svg>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Mobil filtre butonu */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white border border-cream-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Filtrele
              {hasFilter && (
                <span className="bg-brand-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {selectedServices.length + selectedTypes.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Aktif filtre badge'leri */}
        {hasFilter && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedServices.map((s) => {
              const svc = services.find((x) => x.slug === s);
              return (
                <button key={s} onClick={() => updateURL("hizmet", s, false)}
                  className="flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-brand-200 transition-colors">
                  {svc?.icon} {svc?.name} ×
                </button>
              );
            })}
            {selectedTypes.map((t) => (
              <button key={t} onClick={() => updateURL("tur", t, false)}
                className="flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-brand-200 transition-colors">
                {t} ×
              </button>
            ))}
          </div>
        )}

        {/* Kart listesi */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-cream-200 p-12 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-slate-900 mb-1">Bu kriterlere uyan uzman bulunamadı</p>
            <p className="text-sm text-slate-500 mb-5">Filtreleri genişletmeyi deneyin.</p>
            <button onClick={clearAll} className="btn-outline text-sm">Tüm Uzmanları Göster</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sorted.map((e) => (
              <ExpertCard key={e.slug} expert={e} citySlug={citySlug} />
            ))}
          </div>
        )}

        {/* Psikolog CTA */}
        <div className="mt-8 bg-brand-50 border border-brand-100 rounded-2xl p-5 flex items-start gap-3">
          <span className="text-2xl">👩‍⚕️</span>
          <div>
            <p className="font-bold text-brand-800 text-sm mb-1">Psikolog musunuz?</p>
            <p className="text-xs text-brand-600 leading-relaxed">
              Profilinizi ekleyin, Konya&apos;da sizi arayan ailelerle buluşun.{" "}
              <Link href="/uzman-ol" className="font-bold underline">Başvurun →</Link>
            </p>
          </div>
        </div>

      </main>

      {/* ── Mobil filtre drawer ── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-slate-900">Filtreler</p>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 hover:text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <FilterContent />
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary w-full mt-6">
              {sorted.length} Uzman Göster
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
