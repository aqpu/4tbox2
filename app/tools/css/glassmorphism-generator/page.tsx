"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";

/* =============== TYPES =============== */

type Scene = "plain" | "gradient" | "night" | "desk";
type OutputTab = "css" | "tailwind" | "react";

type GlassPreset = {
  id: string;
  name: string;
  backgroundColor: string;
  backgroundOpacity: number;
  blur: number;
  radius: number;
  borderColor: string;
  borderOpacity: number;
  shadowStrength: number;
  highlight: number;
};

const FAVORITES_KEY = "4tbox.glass.favorites";

/* =============== HELPERS =============== */

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

function hexToRgba(hex: string, alpha: number) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return `rgba(15,23,42,${alpha})`;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  if ([r, g, b].some((v) => Number.isNaN(v))) {
    return `rgba(15,23,42,${alpha})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/* =============== BASE PRESETS =============== */

const BASE_PRESETS: GlassPreset[] = [
  {
    id: "mac",
    name: "Frosted macOS",
    backgroundColor: "#0f172a",
    backgroundOpacity: 0.16,
    blur: 18,
    radius: 24,
    borderColor: "#e5e7eb",
    borderOpacity: 0.18,
    shadowStrength: 0.35,
    highlight: 0.45,
  },
  {
    id: "neon",
    name: "Neon panel",
    backgroundColor: "#0b1120",
    backgroundOpacity: 0.2,
    blur: 22,
    radius: 18,
    borderColor: "#38bdf8",
    borderOpacity: 0.4,
    shadowStrength: 0.5,
    highlight: 0.6,
  },
  {
    id: "dashboard",
    name: "Dashboard card",
    backgroundColor: "#020617",
    backgroundOpacity: 0.14,
    blur: 16,
    radius: 18,
    borderColor: "#1f2937",
    borderOpacity: 0.4,
    shadowStrength: 0.25,
    highlight: 0.3,
  },
  {
    id: "minimal",
    name: "Minimal white",
    backgroundColor: "#e5e7eb",
    backgroundOpacity: 0.14,
    blur: 24,
    radius: 24,
    borderColor: "#ffffff",
    borderOpacity: 0.7,
    shadowStrength: 0.18,
    highlight: 0.5,
  },
];

/* =============== MAIN PAGE =============== */

export default function GlassmorphismGeneratorPage() {
  // escena / fondo
  const [scene, setScene] = useState<Scene>("gradient");

  // parámetros del glass
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.18);
  const [blur, setBlur] = useState(18);
  const [radius, setRadius] = useState(18);
  const [borderColor, setBorderColor] = useState("#e5e7eb");
  const [borderOpacity, setBorderOpacity] = useState(0.45);
  const [shadowStrength, setShadowStrength] = useState(0.45);
  const [highlight, setHighlight] = useState(0.5);

  // extras
  const [outputTab, setOutputTab] = useState<OutputTab>("css");
  const [copyLabel, setCopyLabel] = useState<"Copy" | "Copied!">("Copy");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [favorites, setFavorites] = useState<GlassPreset[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as GlassPreset[];
    } catch {
      return [];
    }
  });

  const saveFavorites = (value: GlassPreset[]) => {
    setFavorites(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(value));
    }
  };

  /* =============== DERIVED STYLES =============== */

  const glassBg = useMemo(
    () => hexToRgba(backgroundColor, clamp(backgroundOpacity, 0, 1)),
    [backgroundColor, backgroundOpacity]
  );

  const borderColorRgba = useMemo(
    () => hexToRgba(borderColor, clamp(borderOpacity, 0, 1)),
    [borderColor, borderOpacity]
  );

  const containerBackground = useMemo(() => {
    switch (scene) {
      case "plain":
        return "#020617";
      case "gradient":
        return "radial-gradient(circle at top left, #0f172a 0%, #020617 50%, #020617 100%)";
      case "night":
        return "radial-gradient(circle at top, #0b1120 0%, #020617 45%, #000000 100%)";
      case "desk":
        return "linear-gradient(135deg, #1f2937 0%, #020617 45%, #020617 100%)";
      default:
        return "#020617";
    }
  }, [scene]);

  /* =============== CSS OUTPUTS =============== */

  const cssOutput = `/* Container background */
.container {
  background: ${containerBackground};
  padding: 24px;
}

/* Glass card */
.glass-card {
  background: ${glassBg};
  border-radius: ${radius}px;
  padding: 16px 20px;
  border: 1px solid ${borderColorRgba};
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, ${shadowStrength.toFixed(2)});
  position: relative;
  overflow: hidden;
}

/* Optional highlight */
.glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, ${highlight.toFixed(2)}) 0%,
    rgba(255, 255, 255, 0) 45%
  );
  opacity: 0.25;
  pointer-events: none;
}`;

  const tailwindOutput = `/* Container */
<div className="min-h-[260px] p-6 bg-[radial-gradient(circle_at_top_left,_#0f172a,_#020617_55%,_#020617)] flex items-center justify-center">
  {/* Glass card */}
  <div
    className="relative overflow-hidden rounded-[${radius}px] border px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,${shadowStrength.toFixed(
    2
  )})] border-[${borderColorRgba}]"
    style={{
      background: "${glassBg}",
      backdropFilter: "blur(${blur}px)",
      WebkitBackdropFilter: "blur(${blur}px)",
    }}
  >
    {/* content here */}
  </div>
</div>`;

  const reactOutput = `<div
  className="glass-card"
  style={{
    background: "${glassBg}",
    borderRadius: ${radius},
    border: "1px solid ${borderColorRgba}",
    backdropFilter: "blur(${blur}px)",
    WebkitBackdropFilter: "blur(${blur}px)",
    boxShadow: "0 18px 45px rgba(15,23,42,${shadowStrength.toFixed(2)})",
  }}
>
  {/* children */}
</div>`;

  const outputByTab: Record<OutputTab, string> = {
    css: cssOutput,
    tailwind: tailwindOutput,
    react: reactOutput,
  };

  /* =============== HANDLERS =============== */

  const applyPreset = (preset: GlassPreset) => {
    setBackgroundColor(preset.backgroundColor);
    setBackgroundOpacity(preset.backgroundOpacity);
    setBlur(preset.blur);
    setRadius(preset.radius);
    setBorderColor(preset.borderColor);
    setBorderOpacity(preset.borderOpacity);
    setShadowStrength(preset.shadowStrength);
    setHighlight(preset.highlight);
  };

  const handleRandomize = () => {
    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    setBackgroundOpacity(randomBetween(0.12, 0.32));
    setBlur(Math.round(randomBetween(12, 26)));
    setRadius(Math.round(randomBetween(14, 28)));
    setBorderOpacity(randomBetween(0.18, 0.6));
    setShadowStrength(randomBetween(0.18, 0.55));
    setHighlight(randomBetween(0.3, 0.7));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputByTab[outputTab]);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 1200);
    } catch {
      // ignore
    }
  };

  const handleSaveFavorite = () => {
    if (typeof window === "undefined") return;
    const name =
      window.prompt("Name for this glass preset:", "Glass card")?.trim() ?? "";
    if (!name) return;

    const preset: GlassPreset = {
      id: createId(),
      name,
      backgroundColor,
      backgroundOpacity,
      blur,
      radius,
      borderColor,
      borderOpacity,
      shadowStrength,
      highlight,
    };

    saveFavorites([...favorites, preset]);
  };

  const handleRemoveFavorite = (id: string) => {
    saveFavorites(favorites.filter((f) => f.id !== id));
  };

  const handleAiGenerate = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);

    // "IA" super simple en local basada en palabras clave
    const q = aiPrompt.toLowerCase();

    let base: GlassPreset | null = null;
    if (q.includes("neon") || q.includes("cyber")) {
      base = BASE_PRESETS.find((p) => p.id === "neon")!;
      setScene("gradient");
    } else if (q.includes("dashboard") || q.includes("panel")) {
      base = BASE_PRESETS.find((p) => p.id === "dashboard")!;
      setScene("desk");
    } else if (q.includes("white") || q.includes("minimal")) {
      base = BASE_PRESETS.find((p) => p.id === "minimal")!;
      setScene("plain");
    } else if (q.includes("night") || q.includes("dark")) {
      base = BASE_PRESETS.find((p) => p.id === "mac")!;
      setScene("night");
    } else {
      base = BASE_PRESETS[Math.floor(Math.random() * BASE_PRESETS.length)];
    }

    setTimeout(() => {
      if (base) applyPreset(base);
      setAiLoading(false);
    }, 420);
  };

  const handleDownloadPng = () => {
    if (typeof document === "undefined") return;

    const canvas = document.createElement("canvas");
    const width = 900;
    const height = 520;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // draw background
    if (typeof containerBackground === "string" && containerBackground.startsWith("#")) {
      ctx.fillStyle = containerBackground;
      ctx.fillRect(0, 0, width, height);
    } else {
      // simple gradient fallback
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#020617");
      grad.addColorStop(1, "#000000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    const cardWidth = 420;
    const cardHeight = 230;
    const x = width / 2 - cardWidth / 2;
    const y = height / 2 - cardHeight / 2;

    // shadow
    ctx.save();
    ctx.shadowColor = `rgba(15,23,42,${shadowStrength.toFixed(2)})`;
    ctx.shadowBlur = 45;
    ctx.shadowOffsetY = 24;

    // glass rect
    const r = radius;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + cardWidth - r, y);
    ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + r);
    ctx.lineTo(x + cardWidth, y + cardHeight - r);
    ctx.quadraticCurveTo(
      x + cardWidth,
      y + cardHeight,
      x + cardWidth - r,
      y + cardHeight
    );
    ctx.lineTo(x + r, y + cardHeight);
    ctx.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = glassBg;
    ctx.fill();
    ctx.restore();

    // border
    ctx.strokeStyle = borderColorRgba;
    ctx.lineWidth = 1;
    ctx.stroke();

    // highlight stripe
    ctx.save();
    const gradient = ctx.createLinearGradient(x, y, x + cardWidth, y + cardHeight);
    gradient.addColorStop(0, `rgba(255,255,255,${highlight.toFixed(2)})`);
    gradient.addColorStop(0.4, "rgba(255,255,255,0)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "glass-card-4tbox.png";
    link.click();
  };

  /* =============== RENDER =============== */

  return (
    <>
      <section className="space-y-5">
        {/* AI + PRESETS + SCENES / DOWNLOAD COLUMN */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* AI + presets + favorites */}
          <div className="space-y-3">
            {/* AI helper */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full bg-slate-800 p-1">
                  <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    AI-style glass helper
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Describe un estilo (ej.{" "}
                    <span className="italic">neon dashboard</span>,{" "}
                    <span className="italic">minimal white</span>) y ajustamos
                    automáticamente el blur, borde y sombras.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:min-w-[260px]">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. neon dashboard, minimal white panel, dark night glass…"
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/40"
                />
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="inline-flex items-center justify-center gap-1 rounded-full border border-sky-500/50 bg-sky-600/90 px-3 py-1 text-[11px] font-semibold text-slate-50 hover:bg-sky-500 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {aiLoading ? "Generating…" : "Generate glass style"}
                </button>
              </div>
            </div>

            {/* presets + favorites */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Glass presets
                </span>
                <button
                  type="button"
                  onClick={handleSaveFavorite}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-200 hover:bg-slate-800"
                >
                  <Star className="h-3 w-3" />
                  Save current
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {BASE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {favorites.length > 0 && (
                <div className="pt-2 border-t border-slate-800 mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Saved presets</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {favorites.map((preset) => (
                      <div
                        key={preset.id}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-200"
                      >
                        <button
                          type="button"
                          onClick={() => applyPreset(preset)}
                        >
                          {preset.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFavorite(preset.id)}
                          className="text-slate-500 hover:text-rose-400"
                          aria-label="Remove preset"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scenes + export + randomize */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Background scene
              </span>
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-200 hover:bg-slate-800"
              >
                <RefreshCw className="h-3 w-3" />
                Randomize
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {(["gradient", "night", "desk", "plain"] as Scene[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScene(s)}
                    className={`rounded-xl border px-2.5 py-1.5 text-left ${
                      scene === s
                        ? "border-sky-500 bg-sky-500/10 text-sky-200"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="font-medium capitalize">
                      {s === "plain" ? "Plain dark" : s}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {s === "gradient" && "Soft radial gradient background"}
                      {s === "night" && "Night sky / dashboard vibe"}
                      {s === "desk" && "Diagonal desk / panel background"}
                      {s === "plain" && "Simple dark canvas"}
                    </div>
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:bg-slate-800 w-full"
            >
              <Download className="h-3.5 w-3.5" />
              Export preview as PNG
            </button>
          </div>
        </div>

        {/* PREVIEW + CONTROLS */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
          {/* LEFT: preview + component examples */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Preview</span>
            </div>

            <div
              className="relative rounded-3xl border border-slate-800 overflow-hidden min-h-[250px] flex items-center justify-center"
              style={{ background: containerBackground }}
            >
              {/* gradient glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16)_0,_rgba(15,23,42,0)_45%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.22)_0,_rgba(15,23,42,0)_50%)]" />

              {/* glass card */}
              <div
                className="relative z-10 px-5 py-4 rounded-2xl border min-w-[260px] max-w-[360px]"
                style={{
                  background: glassBg,
                  borderColor: borderColorRgba,
                  borderRadius: radius,
                  boxShadow: `0 18px 45px rgba(15,23,42,${shadowStrength.toFixed(
                    2
                  )})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                }}
              >
                {/* highlight overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(120deg, rgba(255,255,255,${highlight.toFixed(
                      2
                    )}) 0%, rgba(255,255,255,0) 40%)`,
                  }}
                />

                <div className="relative space-y-2 text-xs text-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-300">
                        Snapshot
                      </div>
                      <div className="text-[11px] text-slate-200">
                        Perfecto para cards, modales y paneles de dashboards.
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-200 font-medium">
                        Glass card
                      </span>
                      <span className="text-slate-300/80 text-[10px]">
                        {blur}px blur · soft border · shadow{" "}
                        {Math.round(shadowStrength * 100)}%
                      </span>
                    </div>
                    <button className="rounded-full bg-slate-50/90 text-slate-900 text-[10px] px-3 py-1 font-semibold shadow-sm">
                      CTA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Component previews (button, card, modal) */}
            <ComponentPreviews
              glassBg={glassBg}
              borderColor={borderColorRgba}
              blur={blur}
              radius={radius}
              shadowStrength={shadowStrength}
            />
          </div>

          {/* RIGHT: sliders / controls + output */}
          <div className="space-y-4">
            {/* COLORS / BLUR / BORDER / SHADOW */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                Color & opacity
              </div>

              <div className="space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Background color</span>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-6 w-6 rounded-md border border-slate-700 bg-slate-950"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20">Opacity</span>
                  <input
                    type="range"
                    min={5}
                    max={60}
                    value={Math.round(backgroundOpacity * 100)}
                    onChange={(e) =>
                      setBackgroundOpacity(
                        clamp(parseInt(e.target.value, 10) / 100, 0.05, 0.6)
                      )
                    }
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {Math.round(backgroundOpacity * 100)}%
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-20">Blur</span>
                  <input
                    type="range"
                    min={6}
                    max={32}
                    value={blur}
                    onChange={(e) => setBlur(parseInt(e.target.value, 10) || 0)}
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {blur}px
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20">Radius</span>
                  <input
                    type="range"
                    min={8}
                    max={32}
                    value={radius}
                    onChange={(e) =>
                      setRadius(parseInt(e.target.value, 10) || 0)
                    }
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {radius}px
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span>Border color</span>
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="h-6 w-6 rounded-md border border-slate-700 bg-slate-950"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20">Border opacity</span>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    value={Math.round(borderOpacity * 100)}
                    onChange={(e) =>
                      setBorderOpacity(
                        clamp(parseInt(e.target.value, 10) / 100, 0.05, 0.8)
                      )
                    }
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {Math.round(borderOpacity * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20">Shadow</span>
                  <input
                    type="range"
                    min={10}
                    max={70}
                    value={Math.round(shadowStrength * 100)}
                    onChange={(e) =>
                      setShadowStrength(
                        clamp(parseInt(e.target.value, 10) / 100, 0.1, 0.7)
                      )
                    }
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {Math.round(shadowStrength * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-20">Highlight</span>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    value={Math.round(highlight * 100)}
                    onChange={(e) =>
                      setHighlight(
                        clamp(parseInt(e.target.value, 10) / 100, 0.1, 0.8)
                      )
                    }
                    className="flex-1 accent-sky-500"
                  />
                  <span className="w-10 text-right text-slate-200">
                    {Math.round(highlight * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* OUTPUT TABS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="inline-flex rounded-full bg-slate-900 p-1 border border-slate-800">
                  {(["css", "tailwind", "react"] as OutputTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setOutputTab(tab)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] capitalize ${
                        outputTab === tab
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-200 hover:bg-slate-800"
                >
                  <Copy className="h-3 w-3" />
                  {copyLabel}
                </button>
              </div>

              <textarea
                value={outputByTab[outputTab]}
                readOnly
                spellCheck={false}
                className="w-full min-h-[130px] rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* HELP TEXT */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-[11px] text-slate-400 space-y-1.5">
              <p className="font-semibold text-slate-300">
                How to use this glass card?
              </p>
              <p>
                Copia el snippet de CSS o Tailwind y aplícalo a un div dentro de
                un fondo oscuro. Funciona genial para paneles de dashboards,
                tarjetas de pricing o overlays encima de imágenes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* =============== SUBCOMPONENTS =============== */

type PreviewProps = {
  glassBg: string;
  borderColor: string;
  blur: number;
  radius: number;
  shadowStrength: number;
};

function ComponentPreviews({
  glassBg,
  borderColor,
  blur,
  radius,
  shadowStrength,
}: PreviewProps) {
  const baseStyle: React.CSSProperties = {
    background: glassBg,
    borderColor,
    borderRadius: radius,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    boxShadow: `0 18px 45px rgba(15,23,42,${shadowStrength.toFixed(2)})`,
  } as any;

  return (
    <div className="grid gap-2 md:grid-cols-3 text-[10px] text-slate-400">
      {/* BUTTON */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Button
        </div>
        <button
          type="button"
          className="w-full rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-50 shadow-sm relative overflow-hidden"
          style={baseStyle}
        >
          <span className="relative z-10">Primary glass button</span>
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_40%)] opacity-40" />
        </button>
      </div>

      {/* CARD */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Card
        </div>
        <div
          className="rounded-xl border border-slate-700 px-3 py-3 space-y-2 relative overflow-hidden"
          style={baseStyle}
        >
          <div className="text-[11px] font-semibold text-slate-100">
            Glass dashboard card
          </div>
          <p className="text-[10px] text-slate-300">
            Ideal como panel de métricas o bloque de información encima de un
            fondo con gradient o imagen.
          </p>
        </div>
      </div>

      {/* MODAL */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Modal
        </div>
        <div className="relative rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-3 py-3">
          <div
            className="mx-auto max-w-[220px] rounded-xl border px-3 py-3 space-y-1 text-[11px] text-slate-100"
            style={baseStyle}
          >
            <div className="font-semibold">Glass modal</div>
            <p className="text-[10px] text-slate-300">
              Úsalo como dialog o visor rápido encima de tu app o dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
