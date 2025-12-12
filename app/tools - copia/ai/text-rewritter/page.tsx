"use client";

import { useState } from "react";
import { AiToolTemplate } from "@/components/tools/AiToolTemplate";
import { SlidersHorizontal, Loader2 } from "lucide-react";

export default function AiTextRewriterPage() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<"neutral" | "casual" | "formal">("neutral");
  const [length, setLength] = useState<"keep" | "shorter" | "longer">("keep");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Lógica fake de IA de momento
  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    // Simular latencia IA
    await new Promise((r) => setTimeout(r, 700));

    // Simulación tonta: devolver el mismo texto con prefijo
    const prefix =
      tone === "casual"
        ? "[Casual] "
        : tone === "formal"
        ? "[Formal] "
        : "[Neutral] ";

    const lengthTag =
      length === "shorter"
        ? " (slightly shorter)"
        : length === "longer"
        ? " (slightly longer)"
        : "";

    setOutput(prefix + input.trim() + lengthTag);
    setLoading(false);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <AiToolTemplate
      title="AI Text Rewriter"
      subtitle="Rewrite your text with different tones and lengths."
      description="Paste a paragraph, choose a style and let 4TBOX suggest an alternative version. Later this will connect to real AI models."
      aiNote="AI suggestions can be biased or inaccurate. Always review before using."
      outputSlot={
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>AI suggestion</span>
            {output && (
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(output)}
                className="rounded-full border border-slate-700 px-2 py-0.5 hover:bg-slate-800"
              >
                Copy
              </button>
            )}
          </div>

          <div className="min-h-[220px] rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs md:text-sm text-slate-100 whitespace-pre-line">
            {!output && !loading && (
              <span className="text-slate-600">
                The rewritten text will appear here.
              </span>
            )}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating suggestion…
              </div>
            )}
            {!loading && output && output}
          </div>
        </div>
      }
    >
      {/* children → panel de la izquierda: input + controles */}

      {/* Input principal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Original text</span>
          <span>{input.trim().length} chars</span>
        </div>
        <textarea
          className="w-full min-h-[180px] rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs md:text-sm text-slate-100 resize-vertical focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          placeholder="Paste or write a paragraph you want to rewrite..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Controles (tono / longitud) */}
      <div className="mt-3 space-y-3 border-t border-slate-800 pt-3">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 uppercase tracking-[0.16em]">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Style controls</span>
        </div>

        <div className="flex flex-wrap gap-3 text-[11px]">
          {/* Tone */}
          <div className="space-y-1">
            <div className="text-slate-500">Tone</div>
            <div className="inline-flex rounded-full bg-slate-950/60 border border-slate-800 p-1">
              {(["neutral", "casual", "formal"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 rounded-full ${
                    tone === t
                      ? "bg-sky-500 text-slate-950 text-[11px] font-semibold"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {t[0].toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="space-y-1">
            <div className="text-slate-500">Length</div>
            <div className="inline-flex rounded-full bg-slate-950/60 border border-slate-800 p-1">
              {(["keep", "shorter", "longer"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  className={`px-3 py-1 rounded-full ${
                    length === l
                      ? "bg-slate-100 text-slate-950 text-[11px] font-semibold"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {l === "keep"
                    ? "Keep length"
                    : l === "shorter"
                    ? "Shorter"
                    : "Longer"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!input.trim() || loading}
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 text-slate-950 px-4 py-1.5 text-xs font-semibold hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating…
              </>
            ) : (
              <>Generate suggestion</>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-slate-500 hover:text-slate-300"
          >
            Clear
          </button>
        </div>
      </div>
    </AiToolTemplate>
  );
}

