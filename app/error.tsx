"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl mb-6">⚠️</p>
      <h1 className="text-2xl font-black text-brand-900 mb-2">Bir hata oluştu</h1>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">
        Sayfa yüklenirken beklenmedik bir sorun oluştu. Lütfen tekrar deneyin.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-800 transition-colors"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="border border-brand-200 text-brand-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-50 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
