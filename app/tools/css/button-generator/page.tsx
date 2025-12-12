"use client";

import { useState, useMemo } from "react";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { Copy, RefreshCw, Sparkles } from "lucide-react";

/* ===================== TYPES ===================== */

type ButtonType = "solid" | "outline" | "ghost" | "gradient" | "glass";

type OutputTab = "css" | "tailwind" | "react";

type ButtonState = {
  text: string;
  type: ButtonType;
  fontSize: number;
  fontWeight: number;
  paddingX: number;
  paddingY: number;
  radius: number;
  fullWidth: boolean;
  bg: string;
  textColor: string;
  borderColor: string;
  hoverBg: string;
  hoverText: string;
  hoverBorder: string;
};

/* ===================== DEFAULT STATE ===================== */

const DEFAULT_STATE: ButtonState = {
  text: "Click me",
  type: "solid",
  fontSize: 14,
  fontWeight: 600,
  paddingX: 18,
  paddingY: 9,
  radius: 12,
  fullWidth: false,
  bg: "#3b82f6",
  textColor: "#ffffff",
  borderColor: "#3b82f6",
  hoverBg: "#2563eb",
  hoverText: "#ffffff",
  hoverBorder: "#2563eb",
};



/* ===================== AI SUGGESTION MOCK ===================== */
function aiSuggest(p: string): ButtonState {
  const q = p.toLowerCase();

  if (q.includes("cta") || q.includes("primary")) {
    return {
      ...DEFAULT_STATE,
      type: "solid",
      bg: "#6366f1",
      hoverBg: "#4f46e5",
      text: "Get started",
    };
  }

  if (q.includes("ghost")) {
    return {
      ...DEFAULT_STATE,
      type: "ghost",
      textColor: "#94a3b8",
      hoverText: "#ffffff",
      text: "Learn more",
    };
  }

  if (q.includes("gradient")) {
    return {
      ...DEFAULT_STATE,
      type: "gradient",
      bg: "linear-gradient(135deg,#06b6d4,#3b82f6)",
      hoverBg: "linear-gradient(135deg,#0891b2,#2563eb)",
      text: "Explore",
    };
  }

  return { ...DEFAULT_STATE };
}


/* ===================== MAIN COMPONENT ===================== */

export default function ButtonGeneratorPage() {
  const [state, setState] = useState({ ...DEFAULT_STATE });
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [outputTab, setOutputTab] = useState<OutputTab>("css");
  const [copyLabel, setCopyLabel] = useState("Copy");

  const handle = (patch: any) => setState((s) => ({ ...s, ...patch }));

  /* ------------------ GENERATED CSS ------------------ */

  const cssCode = useMemo(() => {
    const isGradient = state.type === "gradient";
    const isGlass = state.type === "glass";

    return `
button {
  padding: ${state.paddingY}px ${state.paddingX}px;
  font-size: ${state.fontSize}px;
  font-weight: ${state.fontWeight};
  border-radius: ${state.radius}px;
  width: ${state.fullWidth ? "100%" : "auto"};
  border: ${
    state.type === "outline" ? `1px solid ${state.borderColor}` : "none"
  };
  color: ${state.textColor};
  background: ${
    isGradient
      ? state.bg
      : isGlass
      ? "rgba(255,255,255,0.1); backdrop-filter: blur(12px);"
      : state.bg
  };
  transition: all .2s ease;
}
button:hover {
  background: ${isGradient ? state.hoverBg : state.hoverBg};
  color: ${state.hoverText};
  border-color: ${state.hoverBorder};
}
`.trim();
  }, [state]);

  /* ------------------ TAILWIND OUTPUT ------------------ */

  const twCode = `
px-${state.paddingX} py-${state.paddingY} 
text-[${state.fontSize}px] font-${state.fontWeight} 
rounded-[${state.radius}px] 
${state.fullWidth ? "w-full" : ""}
${state.type === "solid" ? `bg-[${state.bg}]` : ""}
${state.type === "outline" ? `border border-[${state.borderColor}]` : ""}
${state.type === "ghost" ? "bg-transparent" : ""}
${state.type === "gradient" ? `bg-[${state.bg.replace(/ /g, "_")}]` : ""}
text-[${state.textColor}]
hover:bg-[${state.hoverBg.replace(/ /g, "_")}]
hover:text-[${state.hoverText}]
`.replace(/\s+/g, " ").trim();

  /* ------------------ REACT OUTPUT ------------------ */

  const reactCode = `
<button
  style={{
    padding: "${state.paddingY}px ${state.paddingX}px",
    fontSize: "${state.fontSize}px",
    fontWeight: ${state.fontWeight},
    borderRadius: "${state.radius}px",
    width: "${state.fullWidth ? "100%" : "auto"}",
    background: "${state.bg}",
    color: "${state.textColor}"
  }}
>
  ${state.text}
</button>
`.trim();

  const outputMap = { css: cssCode, tailwind: twCode, react: reactCode };

  /* ------------------ COPY HANDLER ------------------ */

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputMap[outputTab]);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy"), 1200);
  };

  /* ------------------ AI HANDLER ------------------ */

  const handleAI = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setState(aiSuggest(aiPrompt));
      setAiLoading(false);
    }, 500);
  };

  /* ===================== RENDER ===================== */

  return (
    <>
      <section className="space-y-6">
        {/* AI Row */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 items-start">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <div>
              <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                AI Button Helper
              </div>
              <p className="text-[11px] text-slate-400">
                Describe un estilo y generamos un botón base.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:min-w-[260px]">
            <input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. primary CTA for SaaS"
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] outline-none text-slate-100"
            />
            <button
              onClick={handleAI}
              disabled={aiLoading}
              className="rounded-full bg-sky-600/80 hover:bg-sky-500 text-[11px] py-1.5"
            >
              {aiLoading ? "Generating…" : "Generate style"}
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-4">
          {/* LEFT: PREVIEW */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex justify-center">
              <button
                className="transition-all"
                style={{
                  padding: `${state.paddingY}px ${state.paddingX}px`,
                  fontSize: state.fontSize,
                  fontWeight: state.fontWeight,
                  borderRadius: state.radius,
                  width: state.fullWidth ? "100%" : "auto",
                  background:
                    state.type === "gradient"
                      ? state.bg
                      : state.type === "glass"
                      ? "rgba(255,255,255,0.08)"
                      : state.bg,
                  color: state.textColor,
                  border:
                    state.type === "outline"
                      ? `1px solid ${state.borderColor}`
                      : "none",
                }}
              >
                {state.text}
              </button>
            </div>
          </div>

          {/* RIGHT: SETTINGS */}
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            {/* Text */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Label</label>
              <input
                value={state.text}
                onChange={(e) => handle({ text: e.target.value })}
                className="rounded-lg bg-slate-950 border border-slate-800 px-2 py-1 text-[11px] w-full"
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Type</label>
              <div className="flex gap-2 flex-wrap">
                {(["solid", "outline", "ghost", "gradient", "glass"] as ButtonType[]).map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => handle({ type: t })}
                      className={`px-3 py-1 rounded-full text-[11px] border ${
                        state.type === t
                          ? "bg-sky-600/20 border-sky-500 text-sky-200"
                          : "bg-slate-950 border-slate-700 text-slate-400"
                      }`}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Color pickers */}
            {state.type !== "glass" && (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">
                    Background
                  </label>
                  <input
                    type="color"
                    value={state.bg}
                    onChange={(e) => handle({ bg: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">
                    Text color
                  </label>
                  <input
                    type="color"
                    value={state.textColor}
                    onChange={(e) => handle({ textColor: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Radius */}
            <div>
              <label className="text-[11px] text-slate-400">
                Border radius: {state.radius}px
              </label>
              <input
                type="range"
                min={0}
                max={40}
                value={state.radius}
                onChange={(e) => handle({ radius: +e.target.value })}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Padding */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-400">
                  Padding X: {state.paddingX}px
                </label>
                <input
                  type="range"
                  min={4}
                  max={40}
                  value={state.paddingX}
                  onChange={(e) => handle({ paddingX: +e.target.value })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400">
                  Padding Y: {state.paddingY}px
                </label>
                <input
                  type="range"
                  min={2}
                  max={25}
                  value={state.paddingY}
                  onChange={(e) => handle({ paddingY: +e.target.value })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="inline-flex bg-slate-900 p-1 rounded-full border border-slate-800">
              {(["css", "tailwind", "react"] as OutputTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setOutputTab(t)}
                  className={`px-3 py-1 rounded-full text-[11px] ${
                    outputTab === t
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px]"
            >
              <Copy className="h-3 w-3 inline-block mr-1" />
              {copyLabel}
            </button>
          </div>

          <textarea
            value={outputMap[outputTab]}
            readOnly
            className="w-full min-h-[120px] bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-slate-100"
          />
        </div>
      </section>
    </>
  );
}
