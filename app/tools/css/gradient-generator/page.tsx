"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Copy,
  RefreshCw,
  Sparkles,
  Download,
  Star,
  Trash2,
} from "lucide-react";

/* ===================== TYPES ===================== */

type GradientType = "linear" | "radial";

type AnimationType = "none" | "drift" | "pulse" | "diagonal" | "rainbow";

type ColorStop = {
  id: string;
  color: string;
  position: number; // 0-100
};

type Preset = {
  id: string;
  name: string;
  type: GradientType;
  angle: number;
  stops: ColorStop[];
};

type OutputTab = "css" | "tailwind" | "react" | "cssvars" | "svg";

/* ===================== PRESETS ===================== */

const BASE_PRESETS: Preset[] = [
  {
    id: "sunset",
    name: "Sunset",
    type: "linear",
    angle: 160,
    stops: [
      { id: "s1", color: "#ff7a18", position: 0 },
      { id: "s2", color: "#af002d", position: 50 },
      { id: "s3", color: "#319197", position: 100 },
    ],
  },
  {
    id: "ice",
    name: "Ice",
    type: "linear",
    angle: 135,
    stops: [
      { id: "s1", color: "#a5f3fc", position: 0 },
      { id: "s2", color: "#38bdf8", position: 40 },
      { id: "s3", color: "#0f172a", position: 100 },
    ],
  },
  {
    id: "forest",
    name: "Forest",
    type: "radial",
    angle: 120,
    stops: [
      { id: "s1", color: "#022c22", position: 0 },
      { id: "s2", color: "#16a34a", position: 45 },
      { id: "s3", color: "#bbf7d0", position: 100 },
    ],
  },
  {
    id: "neon",
    name: "Neon",
    type: "linear",
    angle: 120,
    stops: [
      { id: "s1", color: "#22d3ee", position: 0 },
      { id: "s2", color: "#a855f7", position: 50 },
      { id: "s3", color: "#f97316", position: 100 },
    ],
  },
  {
    id: "minimal-dark",
    name: "Minimal dark",
    type: "linear",
    angle: 135,
    stops: [
      { id: "s1", color: "#020617", position: 0 },
      { id: "s2", color: "#1e293b", position: 50 },
      { id: "s3", color: "#020617", position: 100 },
    ],
  },
];

const FAVORITES_STORAGE_KEY = "4tbox.gradient.favorites";

/* ===================== HELPERS ===================== */

function createId() {
  return Math.random().toString(36).slice(2, 9);
}

function sortStops(stops: ColorStop[]): ColorStop[] {
  return [...stops].sort((a, b) => a.position - b.position);
}

function buildGradient(type: GradientType, angle: number, stops: ColorStop[]) {
  const ordered = sortStops(stops);
  const stopsStr = ordered
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  if (type === "linear") {
    return `linear-gradient(${angle}deg, ${stopsStr})`;
  }
  return `radial-gradient(circle at center, ${stopsStr})`;
}

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return null;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/* “AI” muy básica: mapeamos palabras a presets  */
function aiSuggestPreset(prompt: string): Preset {
  const q = prompt.toLowerCase();

  if (q.includes("sunset") || q.includes("atardecer")) {
    return BASE_PRESETS.find((p) => p.id === "sunset")!;
  }
  if (q.includes("ocean") || q.includes("mar") || q.includes("sea")) {
    return {
      id: "ai-ocean",
      name: "AI · Ocean",
      type: "linear",
      angle: 135,
      stops: [
        { id: createId(), color: "#0ea5e9", position: 0 },
        { id: createId(), color: "#0369a1", position: 40 },
        { id: createId(), color: "#022c22", position: 100 },
      ],
    };
  }
  if (q.includes("neon")) {
    return BASE_PRESETS.find((p) => p.id === "neon")!;
  }
  if (q.includes("forest") || q.includes("bosque")) {
    return BASE_PRESETS.find((p) => p.id === "forest")!;
  }

  // fallback: gradiente aleatorio
  const randomColor = () =>
    "#" +
    Array.from({ length: 6 })
      .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
      .join("");

  return {
    id: "ai-random",
    name: "AI · Random",
    type: Math.random() > 0.5 ? "linear" : "radial",
    angle: Math.floor(Math.random() * 360),
    stops: [
      { id: createId(), color: randomColor(), position: 0 },
      { id: createId(), color: randomColor(), position: 50 },
      { id: createId(), color: randomColor(), position: 100 },
    ],
  };
}

/* =============== MAIN PAGE COMPONENT =============== */

export default function CssGradientGeneratorPage() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: createId(), color: "#0ea5e9", position: 0 },
    { id: createId(), color: "#6366f1", position: 100 },
  ]);

  const [animation, setAnimation] = useState<AnimationType>("none");
  const [outputTab, setOutputTab] = useState<OutputTab>("css");
  const [copyLabel, setCopyLabel] = useState<"Copy" | "Copied!">("Copy");

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [favorites, setFavorites] = useState<Preset[]>([]);

  // cargar favoritos de localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Preset[];
      setFavorites(parsed);
    } catch {
      // ignore
    }
  }, []);

  const gradientCss = useMemo(
    () => buildGradient(type, angle, stops),
    [type, angle, stops]
  );

  /* ------------ EXPORT FORMATS ------------ */

  const cssOutput = `background: ${gradientCss};`;
  const tailwindOutput = `bg-[${gradientCss.replace(/ /g, "_")}]`;
  const reactOutput = `style={{ background: "${gradientCss}" }}`;
  const cssVarsOutput = `--grad-1: ${stops[0]?.color ?? "#0ea5e9"};
--grad-2: ${stops[1]?.color ?? "#6366f1"};
background: linear-gradient(${angle}deg, var(--grad-1), var(--grad-2));`;

  const svgOutput = `<svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      ${sortStops(stops)
        .map(
          (s, i) =>
            `<stop offset="${s.position}%" stop-color="${s.color}" stop-opacity="1" />`
        )
        .join("\n      ")}
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="400" height="250" fill="url(#g)" />
</svg>`;

  const outputByTab: Record<OutputTab, string> = {
    css: cssOutput,
    tailwind: tailwindOutput,
    react: reactOutput,
    cssvars: cssVarsOutput,
    svg: svgOutput,
  };

  /* ------------ HANDLERS ------------ */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputByTab[outputTab]);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 1400);
    } catch {
      // ignore
    }
  };

  const handleRandomize = () => {
    const randomColor = () =>
      "#" +
      Array.from({ length: 6 })
        .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
        .join("");

    const randomStops: ColorStop[] = [
      { id: createId(), color: randomColor(), position: 0 },
      { id: createId(), color: randomColor(), position: 50 },
      { id: createId(), color: randomColor(), position: 100 },
    ];

    setType(Math.random() > 0.5 ? "linear" : "radial");
    setAngle(Math.floor(Math.random() * 360));
    setStops(randomStops);
  };

  const applyPreset = (preset: Preset) => {
    setType(preset.type);
    setAngle(preset.angle);
    // clonamos los stops para nuevos ids
    setStops(
      preset.stops.map((s) => ({
        ...s,
        id: createId(),
      }))
    );
  };

  const handleAddStop = () => {
    const last = sortStops(stops)[stops.length - 1];
    const pos = last ? Math.min(last.position + 10, 100) : 50;
    setStops([
      ...stops,
      {
        id: createId(),
        color: "#ffffff",
        position: pos,
      },
    ]);
  };

  const handleUpdateStop = (id: string, patch: Partial<ColorStop>) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const handleRemoveStop = (id: string) => {
    if (stops.length <= 2) return; // al menos 2
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    // Simulamos llamada a IA (en el futuro puedes cambiar esto por API real)
    setTimeout(() => {
      const preset = aiSuggestPreset(aiPrompt);
      applyPreset(preset);
      setAiLoading(false);
    }, 450);
  };

  const handleSaveFavorite = () => {
    if (typeof window === "undefined") return;
    const name =
      window.prompt("Name for this gradient preset:", "My gradient")?.trim() ??
      "";
    if (!name) return;

    const preset: Preset = {
      id: createId(),
      name,
      type,
      angle,
      stops,
    };

    const updated = [...favorites, preset];
    setFavorites(updated);
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const handleRemoveFavorite = (id: string) => {
    if (typeof window === "undefined") return;
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const handleDownloadPng = () => {
    if (typeof document === "undefined") return;

    const canvas = document.createElement("canvas");
    const width = 800;
    const height = 450;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (type === "linear") {
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad);
      const y = Math.sin(rad);
      const cx = width / 2;
      const cy = height / 2;
      const max = Math.max(width, height);
      const x0 = cx - x * max;
      const y0 = cy - y * max;
      const x1 = cx + x * max;
      const y1 = cy + y * max;

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      sortStops(stops).forEach((s) =>
        grad.addColorStop(s.position / 100, s.color)
      );
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );
      sortStops(stops).forEach((s) =>
        grad.addColorStop(s.position / 100, s.color)
      );
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "gradient-4tbox.png";
    link.click();
  };

  /* =============== RENDER =============== */

  return (
    <>
      <section className="space-y-5">
        {/* AI PANEL + PRESETS + FAVORITES */}
        <div className="grid gap-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          {/* AI + presets */}
          <div className="space-y-3">
            {/* AI row */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 rounded-full bg-slate-800 p-1">
                  <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    AI-style gradient helper
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Describe un estilo y generamos un gradiente base. En el
                    futuro puedes conectar aquí tu propia API de IA.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:min-w-[260px]">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. sunset orange purple, neon cyberpunk, ocean blue…"
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-[11px] text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/40"
                />
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="inline-flex items-center justify-center gap-1 rounded-full border border-sky-500/40 bg-sky-600/90 px-3 py-1 text-[11px] font-semibold text-slate-50 hover:bg-sky-500 disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {aiLoading ? "Generating…" : "Generate gradient"}
                </button>
              </div>
            </div>

            {/* Presets */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Quick presets
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

          {/* Animation selector + download */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Animation
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
              {(["none", "drift", "pulse", "diagonal", "rainbow"] as AnimationType[]).map(
                (mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setAnimation(mode)}
                    className={`rounded-xl border px-2.5 py-1.5 text-left ${
                      animation === mode
                        ? "border-sky-500 bg-sky-500/10 text-sky-200"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="font-medium capitalize">
                      {mode === "none" ? "No animation" : mode}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {mode === "none" && "Static background"}
                      {mode === "drift" && "Slow gradient movement"}
                      {mode === "pulse" && "Soft zoom in/out"}
                      {mode === "diagonal" && "Diagonal shifting"}
                      {mode === "rainbow" && "Strong color cycling"}
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
              Export as PNG
            </button>
          </div>
        </div>

        {/* MAIN GRID: PREVIEW + EDITOR */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          {/* Preview side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Gradient preview</span>
              <AngleCompass angle={angle} show={type === "linear"} />
            </div>

            <div
              className="relative rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden min-h-[230px] md:min-h-[260px] flex items-center justify-center"
              style={{
                backgroundImage: gradientCss,
                backgroundSize:
                  animation === "drift" || animation === "diagonal"
                    ? "200% 200%"
                    : "100% 100%",
              }}
            >
              {/* Animación via class */}
              <div
                className={`absolute inset-0 ${
                  animation === "drift"
                    ? "animate-gradient-drift"
                    : animation === "pulse"
                    ? "animate-gradient-pulse"
                    : animation === "diagonal"
                    ? "animate-gradient-diagonal"
                    : animation === "rainbow"
                    ? "animate-gradient-rainbow"
                    : ""
                }`}
                style={{ backgroundImage: gradientCss }}
              />

              {/* overlay para legibilidad */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0)_0,rgba(15,23,42,0.5)_80%)] pointer-events-none" />

              <div className="relative z-10 px-4 py-3 rounded-2xl bg-slate-950/70 border border-slate-800/70 backdrop-blur-sm text-xs text-slate-200 flex flex-col gap-1 min-w-[230px] max-w-[260px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-200">
                    Gradient snapshot
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {type === "linear"
                      ? `${angle}° · Linear`
                      : "Radial gradient"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {sortStops(stops).map((s) => (
                    <span
                      key={s.id}
                      className="h-5 w-5 rounded-full border border-slate-700"
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-slate-400">
                  Tip: copia el CSS, Tailwind o React snippet y pégalo en tu
                  componente, layout o hero section.
                </p>
              </div>
            </div>

            {/* Component previews */}
            <ComponentPreviews gradient={gradientCss} />
          </div>

          {/* Editor side */}
          <div className="space-y-4">
            {/* TYPE + ANGLE + COLOR STOPS */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-[0.16em]">
                  Gradient settings
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setType("linear")}
                  className={`inline-flex items-center rounded-full px-3 py-1 border text-[11px] ${
                    type === "linear"
                      ? "border-sky-500 bg-sky-500/10 text-sky-200"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  Linear
                </button>
                <button
                  type="button"
                  onClick={() => setType("radial")}
                  className={`inline-flex items-center rounded-full px-3 py-1 border text-[11px] ${
                    type === "radial"
                      ? "border-sky-500 bg-sky-500/10 text-sky-200"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  Radial
                </button>

                {type === "linear" && (
                  <div className="flex items-center gap-2 ml-auto text-[11px] text-slate-400">
                    <span>Angle</span>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={angle}
                      onChange={(e) =>
                        setAngle(parseInt(e.target.value, 10) || 0)
                      }
                      className="w-28 accent-sky-500"
                    />
                    <span className="w-9 text-right text-slate-200">
                      {angle}°
                    </span>
                  </div>
                )}
              </div>

              {/* Multi-stop editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Color stops</span>
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-200 hover:bg-slate-900"
                  >
                    + Add stop
                  </button>
                </div>

                <div className="space-y-1">
                  {sortStops(stops).map((stop, idx) => {
                    const rgb = hexToRgb(stop.color);
                    const hsl =
                      rgb && rgbToHsl(rgb.r, rgb.g, rgb.b);

                    return (
                      <div
                        key={stop.id}
                        className="rounded-xl border border-slate-800 bg-slate-950 px-2 py-2 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>
                            Stop {idx + 1} · {stop.position}%
                          </span>
                          <button
                            type="button"
                            disabled={stops.length <= 2}
                            onClick={() => handleRemoveStop(stop.id)}
                            className="text-[10px] text-slate-500 hover:text-rose-400 disabled:opacity-40"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={stop.color}
                            onChange={(e) =>
                              handleUpdateStop(stop.id, {
                                color: e.target.value,
                              })
                            }
                            className="h-8 w-8 rounded-lg border border-slate-700 bg-slate-900 p-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={stop.color}
                            onChange={(e) =>
                              handleUpdateStop(stop.id, {
                                color: e.target.value,
                              })
                            }
                            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-100 font-mono outline-none focus:ring-2 focus:ring-sky-500/40"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={stop.position}
                              onChange={(e) =>
                                handleUpdateStop(stop.id, {
                                  position:
                                    parseInt(e.target.value, 10) || 0,
                                })
                              }
                              className="w-24 accent-sky-500"
                            />
                          </div>
                        </div>

                        {/* Color info */}
                        {rgb && hsl && (
                          <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 pt-1">
                            <span>
                              RGB: {rgb.r}, {rgb.g}, {rgb.b}
                            </span>
                            <span>
                              HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* OUTPUT TABS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="inline-flex rounded-full bg-slate-900 p-1 border border-slate-800">
                  {(["css", "tailwind", "react", "cssvars", "svg"] as OutputTab[]).map(
                    (tab) => (
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
                    )
                  )}
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
                className="w-full min-h-[110px] rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* HELP TEXT */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-[11px] text-slate-400 space-y-1.5">
              <p className="font-semibold text-slate-300">
                How to use this CSS gradient?
              </p>
              <p>
                Copia el snippet y pégalo en tu hoja de estilos, componente o
                override de Tailwind. Puedes exportar el gradiente como PNG para
                usarlo como background de imágenes, thumbnails o assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframes para animaciones (Tailwind no sabe de esto por defecto) */}
      <style jsx global>{`
        @keyframes gradient-drift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes gradient-diagonal {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes gradient-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
        @keyframes gradient-rainbow {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        .animate-gradient-drift {
          animation: gradient-drift 12s ease-in-out infinite;
        }
        .animate-gradient-diagonal {
          animation: gradient-diagonal 14s ease-in-out infinite;
        }
        .animate-gradient-pulse {
          animation: gradient-pulse 6s ease-in-out infinite;
        }
        .animate-gradient-rainbow {
          animation: gradient-rainbow 10s linear infinite;
        }
      `}</style>
    </>
  );
}

/* ===================== SUBCOMPONENTS ===================== */

function ComponentPreviews({ gradient }: { gradient: string }) {
  return (
    <div className="grid gap-2 md:grid-cols-3 text-[10px] text-slate-400">
      {/* Button */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Button
        </div>
        <button
          type="button"
          className="w-full rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-50 shadow-sm"
          style={{ backgroundImage: gradient }}
        >
          Primary action
        </button>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Card
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div
            className="h-10"
            style={{ backgroundImage: gradient }}
          />
          <div className="p-2 space-y-1">
            <div className="text-[11px] font-semibold text-slate-100">
              Gradient header
            </div>
            <p className="text-[10px] text-slate-400">
              Ideal para dashboards, layouts o secciones destacadas.
            </p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Hero
        </div>
        <div
          className="rounded-xl border border-slate-800 px-3 py-4 flex flex-col gap-1 justify-center"
          style={{ backgroundImage: gradient }}
        >
          <div className="text-[11px] font-semibold text-slate-50">
            Hero section
          </div>
          <p className="text-[10px] text-slate-100/80">
            Usa este gradiente como fondo de tu landing o cabecera principal.
          </p>
        </div>
      </div>
    </div>
  );
}

function AngleCompass({ angle, show }: { angle: number; show: boolean }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 text-[10px] text-slate-500">
      <span>Angle map</span>
      <div className="relative h-7 w-7 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        <div
          className="absolute left-1/2 top-1/2 origin-bottom h-3/4 w-[1px] bg-sky-400"
          style={{
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          }}
        />
      </div>
    </div>
  );
}
