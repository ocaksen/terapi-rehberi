"use client";

import { useState } from "react";
import Link from "next/link";
import type { PsychTest, ScoreRange } from "@/types";

const SCALE_NAMES: Record<string, string> = {
  "anksiyete-testi":    "GAD-7",
  "depresyon-testi":    "PHQ-9",
  "stres-testi":        "PSS-10",
  "oz-saygi-testi":     "Rosenberg",
  "panik-atak-testi":   "Panik Ölçeği",
  "ofke-kontrolu-testi": "Öfke Ölçeği",
  "baglanti-stili-testi": "Bağlanma Ölçeği",
};

export default function TestClient({ test }: { test: PsychTest }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult]   = useState<ScoreRange | null>(null);
  const [animating, setAnimating] = useState(false);

  const total    = test.questions.length;
  const question = test.questions[current];
  const selected = answers[question?.id];
  const scaleName = SCALE_NAMES[test.slug];

  function calcScore(): number {
    return test.questions.reduce((sum, q) => {
      const raw    = answers[q.id] ?? 0;
      const maxVal = test.options[test.options.length - 1].value;
      return sum + (q.reverse ? maxVal - raw : raw);
    }, 0);
  }

  function handleAnswer(value: number) {
    if (animating) return;
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (current < total - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setAnimating(false);
      }, 350);
    } else {
      // Son soru — hesapla
      const score = test.questions.reduce((sum, q) => {
        const raw    = newAnswers[q.id] ?? 0;
        const maxVal = test.options[test.options.length - 1].value;
        return sum + (q.reverse ? maxVal - raw : raw);
      }, 0);
      const range = test.scoring.find((s) => score >= s.min && score <= s.max)
        ?? test.scoring[test.scoring.length - 1];
      setTimeout(() => {
        setResult(range);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 400);
    }
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  /* ── SONUÇ ─────────────────────────────────────────────────────── */
  if (result) {
    const score    = calcScore();
    const maxScore = total * test.options[test.options.length - 1].value;
    const pct      = Math.round((score / maxScore) * 100);

    const RESULT_TIPS: Record<string, string[]> = {
      "Minimal":         ["Mevcut rutininize devam edin", "Düzenli uyku ve egzersiz koruyucudur", "İhtiyaç duyduğunuzda destek almaktan çekinmeyin"],
      "Hafif":           ["Nefes ve rahatlama egzersizleri deneyin", "Sosyal destek ağınızı güçlendirin", "Uzmanla paylaşmak iyi bir başlangıç olabilir"],
      "Orta":            ["Bir uzmana danışmanızı öneririz", "Günlük stres yönetimi teknikleri faydalı olabilir", "Belirtilerinizi takip edin"],
      "Orta-Ağır":       ["Profesyonel destek almanızı kesinlikle öneririz", "Beklemek belirtileri artırabilir", "İlk adım en zor ama en değerli adımdır"],
      "Ağır":            ["Lütfen en kısa sürede bir uzmana ulaşın", "Yalnız olmadığınızı unutmayın", "Destek almak güç göstergesidir"],
    };

    const tips = RESULT_TIPS[result.level] ?? RESULT_TIPS["Orta"];

    return (
      <div className="min-h-screen bg-cream-50">
        {/* Sonuç hero */}
        <div style={{ background: result.color + "15" }} className="py-14 px-4 border-b border-cream-200">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl shadow-sm"
              style={{ background: result.color + "25" }}
            >
              {test.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: result.color }}>
              {test.title} Sonucu {scaleName && `· ${scaleName}`}
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{result.level}</h2>
            <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
              {result.description}
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 py-8 space-y-5">

          {/* Puan göstergesi */}
          <div className="bg-white rounded-2xl border border-cream-200 p-6">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-slate-500">Toplam Puan</span>
              <span className="font-bold text-slate-900">{score} / {maxScore}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: result.color }}
              />
            </div>
            {/* Seviye legend */}
            <div className="flex gap-1.5 flex-wrap">
              {test.scoring.map((s) => (
                <span
                  key={s.level}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={
                    s.level === result.level
                      ? { background: result.color, color: "#fff" }
                      : { background: s.color + "15", color: s.color }
                  }
                >
                  {s.level}
                </span>
              ))}
            </div>
          </div>

          {/* Öneriler */}
          <div className="bg-white rounded-2xl border border-cream-200 p-6">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>💡</span> Size Özel Öneriler
            </h2>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-[10px] font-bold"
                    style={{ background: result.color }}
                  >
                    {i + 1}
                  </div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-brand-700 rounded-2xl p-6 text-center">
            <p className="font-bold text-white mb-1">Sonucunuzu bir uzmanla değerlendirin</p>
            <p className="text-blue-200/80 text-xs mb-4">Konya&apos;daki lisanslı psikologlarla ücretsiz ön görüşme</p>
            <Link
              href="/konya/psikologlar"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors"
            >
              Psikolog Bul →
            </Link>
          </div>

          {/* Alt linkler */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { setAnswers({}); setResult(null); setCurrent(0); }}
              className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              ↺ Testi Tekrarla
            </button>
            <Link href="/testler" className="text-sm text-slate-400 hover:text-brand-600 transition-colors">
              ← Diğer Testler
            </Link>
          </div>

        </div>
      </div>
    );
  }

  /* ── QUIZ ───────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">

      {/* Üst bar */}
      <div className="bg-white border-b border-cream-200 px-4 py-3 flex items-center gap-4">
        <button onClick={goBack} disabled={current === 0} className="text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.round(((current + (selected !== undefined ? 1 : 0)) / total) * 100)}%`,
              background: test.color,
            }}
          />
        </div>

        <span className="text-xs font-semibold text-slate-500 shrink-0 tabular-nums">
          {current + 1} / {total}
        </span>
      </div>

      {/* Soru alanı */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div
          className="w-full max-w-lg"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.3s, transform 0.3s" }}
        >
          {/* Test adı + soru no */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">{test.icon}</span>
            <span className="text-sm text-slate-400 font-medium">{test.shortTitle}</span>
          </div>

          {/* Soru */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-8">
            {question.text}
          </h2>

          {/* Seçenekler */}
          <div className="flex flex-col gap-3">
            {test.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left px-5 py-4 rounded-2xl border-2 font-medium text-base transition-all duration-200"
                style={
                  selected === opt.value
                    ? { background: test.color, borderColor: test.color, color: "#fff" }
                    : { background: "#fff", borderColor: "#e2e8f0", color: "#334155" }
                }
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alt: gizlilik notu */}
      <div className="py-4 px-4 text-center border-t border-cream-200 bg-white">
        <p className="text-xs text-slate-400">🔒 Yanıtlarınız cihazınızda kalır, hiçbir yerde saklanmaz</p>
      </div>

    </div>
  );
}
