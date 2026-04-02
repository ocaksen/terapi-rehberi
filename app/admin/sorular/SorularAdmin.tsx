"use client";

import { useState } from "react";

interface Soru {
  id: string;
  tarih: string;
  kategori: string;
  soru: string;
  durum?: string;
  cevap?: string;
  uzman?: string;
  begeni?: number;
}

const DURUM_STIL: Record<string, { bg: string; text: string; label: string }> = {
  beklemede:   { bg: "#fef3c7", text: "#92400e", label: "Beklemede" },
  onaylandi:   { bg: "#d1fae5", text: "#065f46", label: "Onaylandı" },
  reddedildi:  { bg: "#fee2e2", text: "#991b1b", label: "Reddedildi" },
};

export default function SorularAdmin({ sorular: initial, adminKey }: { sorular: Soru[]; adminKey: string }) {
  const [sorular, setSorular] = useState(initial);
  const [acik, setAcik] = useState<string | null>(null);
  const [cevap, setCevap] = useState<Record<string, string>>({});
  const [uzman, setUzman] = useState<Record<string, string>>({});
  const [yukleniyor, setYukleniyor] = useState<string | null>(null);

  async function aksiyon(id: string, action: "onayla" | "reddet" | "beklemede") {
    setYukleniyor(id + action);
    try {
      const res = await fetch("/api/admin/soru-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, cevap: cevap[id], uzman: uzman[id], key: adminKey }),
      });
      if (res.ok) {
        setSorular((prev) =>
          prev.map((s) =>
            s.id === id
              ? { ...s, durum: action === "onayla" ? "onaylandi" : action === "reddet" ? "reddedildi" : "beklemede", cevap: cevap[id], uzman: uzman[id] }
              : s
          )
        );
        if (action !== "beklemede") setAcik(null);
      }
    } finally {
      setYukleniyor(null);
    }
  }

  const gruplar = {
    beklemede: sorular.filter((s) => !s.durum || s.durum === "beklemede"),
    onaylandi: sorular.filter((s) => s.durum === "onaylandi"),
    reddedildi: sorular.filter((s) => s.durum === "reddedildi"),
  };

  return (
    <div className="space-y-8">
      {(["beklemede", "onaylandi", "reddedildi"] as const).map((grup) => (
        <div key={grup}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: DURUM_STIL[grup].text }}>
            {DURUM_STIL[grup].label} ({gruplar[grup].length})
          </h2>

          {gruplar[grup].length === 0 && (
            <div className="bg-white rounded-2xl border border-cream-200 p-6 text-center text-slate-400 text-sm">
              Yok
            </div>
          )}

          <div className="space-y-3">
            {gruplar[grup].map((s) => {
              const isAcik = acik === s.id;
              return (
                <div key={s.id} className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
                  {/* Soru başlığı */}
                  <div className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
                          style={{ background: DURUM_STIL[s.durum ?? "beklemede"].bg, color: DURUM_STIL[s.durum ?? "beklemede"].text }}
                        >
                          {s.kategori}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(s.tarih).toLocaleString("tr-TR")}
                        </span>
                        {s.begeni !== undefined && (
                          <span className="text-xs text-slate-400">👍 {s.begeni}</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-800 font-medium leading-snug">{s.soru}</p>
                      {s.cevap && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                          <span className="font-semibold text-brand-700">Cevap:</span> {s.cevap}
                        </p>
                      )}
                    </div>

                    {/* Aksiyon butonları */}
                    <div className="flex items-center gap-2 shrink-0">
                      {s.durum !== "onaylandi" && (
                        <button
                          onClick={() => setAcik(isAcik ? null : s.id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                        >
                          {isAcik ? "Kapat" : "Cevapla"}
                        </button>
                      )}
                      {s.durum !== "reddedildi" && s.durum !== "beklemede" && (
                        <button
                          onClick={() => aksiyon(s.id, "beklemede")}
                          disabled={yukleniyor === s.id + "beklemede"}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
                        >
                          Beklemeye Al
                        </button>
                      )}
                      {s.durum !== "reddedildi" && (
                        <button
                          onClick={() => aksiyon(s.id, "reddet")}
                          disabled={yukleniyor === s.id + "reddet"}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          Reddet
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cevaplama formu */}
                  {isAcik && (
                    <div className="border-t border-cream-100 p-4 bg-cream-50 space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Uzman Adı</label>
                        <input
                          type="text"
                          placeholder="Örn: Psk. Ayşe Kaya"
                          value={uzman[s.id] ?? s.uzman ?? ""}
                          onChange={(e) => setUzman((prev) => ({ ...prev, [s.id]: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Cevap</label>
                        <textarea
                          rows={4}
                          placeholder="Soruya uzman cevabını yaz..."
                          value={cevap[s.id] ?? s.cevap ?? ""}
                          onChange={(e) => setCevap((prev) => ({ ...prev, [s.id]: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 resize-none focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                        />
                      </div>
                      <button
                        onClick={() => aksiyon(s.id, "onayla")}
                        disabled={!cevap[s.id]?.trim() && !s.cevap || yukleniyor === s.id + "onayla"}
                        className="btn-primary text-xs px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {yukleniyor === s.id + "onayla" ? "Kaydediliyor..." : "✓ Onayla ve Yayımla"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
