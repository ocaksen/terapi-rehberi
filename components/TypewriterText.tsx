"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "Çocuğunuz",
  "Ergeniniz",
  "Aileniz",
  "Kendiniz",
  "İlişkiniz",
  "Travma",
];

export default function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1800);
      return () => clearTimeout(t);
    }

    const current = WORDS[wordIndex];

    if (!deleting && displayed === current) {
      setPaused(true);
      setDeleting(true);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    const speed = deleting ? 50 : 90;
    const t = setTimeout(() => {
      setDisplayed((prev) =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, paused, wordIndex]);

  return (
    <span className="text-brand-500 font-extrabold inline-flex items-center gap-0.5 min-w-[2ch]">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-brand-400 ml-1 animate-pulse rounded-full" />
    </span>
  );
}
