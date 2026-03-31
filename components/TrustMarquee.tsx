"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { icon: "✓", text: "Kimlik Doğrulandı" },
  { icon: "🔒", text: "Gizlilik Güvencesi" },
  { icon: "📋", text: "Lisanslı Uzmanlar" },
  { icon: "💬", text: "WhatsApp Randevu" },
  { icon: "0₺", text: "Danışana Ücretsiz" },
  { icon: "✓", text: "Diploma Teyit Edildi" },
  { icon: "🌿", text: "Konya'nın Rehberi" },
  { icon: "⭐", text: "Titizlikle Seçildi" },
];

// Listeyi çift kat yap, sorunsuz döngü için
const DOUBLED = [...ITEMS, ...ITEMS];

export default function TrustMarquee() {
  return (
    <div className="bg-brand-900 py-3 overflow-hidden select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm font-medium text-brand-200 shrink-0"
          >
            <span className="text-brand-400">{item.icon}</span>
            {item.text}
            <span className="text-brand-700 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
