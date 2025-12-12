"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type ToolCta = {
  label: string;
  href: string;
};

const TOOLS: ToolCta[] = [
  { label: "Try Word Counter", href: "/tools/text/word-counter" },
  { label: "Try JSON Formatter", href: "/tools/dev/json-formatter" },
  { label: "Try Regex Tester", href: "/tools/dev/regex-tester" },
  { label: "Try Base64 Encoder", href: "/tools/encode/base64" },
  { label: "Try My IP", href: "/tools/network/my-ip" },
];

const HACKER_CHARS = "01^#$_+*/\\=<>-|{}[]";

const ROTATE_EVERY = 2000;       // tiempo entre cambios de mensaje
const SCRAMBLE_DURATION = 300;   // duración del efecto hacker
const SCRAMBLE_STEP = 35;        // intervalo de actualización

export function RotatingToolCta() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(TOOLS[0].label);
  const [currentHref, setCurrentHref] = useState(TOOLS[0].href);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Si está en pausa, no hay animación, solo mostramos el texto limpio actual
    if (isPaused) {
      setDisplayText(TOOLS[index].label);
      setCurrentHref(TOOLS[index].href);
      return;
    }

    const finalText = TOOLS[index].label;
    const href = TOOLS[index].href;
    setCurrentHref(href);

    const length = finalText.length;
    const startTime = Date.now();

    // Efecto hacker
    const scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / SCRAMBLE_DURATION);
      const revealCount = Math.floor(progress * length);

      let txt = "";
      for (let i = 0; i < length; i++) {
        if (i < revealCount) {
          txt += finalText[i];
        } else {
          const r =
            HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)];
          txt += r;
        }
      }

      setDisplayText(txt);

      if (progress >= 1) {
        clearInterval(scrambleInterval);
        setDisplayText(finalText);
      }
    }, SCRAMBLE_STEP);

    // Programar siguiente rotación
    const rotateTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % TOOLS.length);
    }, ROTATE_EVERY);

    // Limpieza al cambiar index / isPaused o al desmontar
    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(rotateTimeout);
    };
  }, [index, isPaused]);

  function handleMouseEnter() {
    setIsPaused(true);
  }

  function handleMouseLeave() {
    setIsPaused(false);
  }

  return (
    <Link
      href={currentHref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-4 py-2 text-xs md:text-sm font-semibold hover:opacity-90 dark:bg-slate-50 dark:text-slate-900 transition"
    >
      <span className="tabular-nums">{displayText}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}
