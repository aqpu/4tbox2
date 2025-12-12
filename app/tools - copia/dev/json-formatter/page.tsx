"use client";

import { useState } from "react";
import { ArrowRight, Check, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>("{\n  \"hello\": \"world\"\n}");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Invalid JSON");
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-[9px]">
            {`{ }`}
          </span>
          <span>JSON Formatter</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">
          Format, validate and clean JSON.
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Paste JSON on the left, format or minify it, and copy the result.
          Perfect for debugging payloads, API responses and configs.
        </p>
      </section>

      {/* Main tool */}
      <section className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleFormat}
              className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-3 py-1.5 font-semibold hover:opacity-90"
            >
              Format JSON
              <ArrowRight className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleMinify}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Minify
            </button>

            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-500">
              <span>Indent:</span>
              {[2, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setIndent(n)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] ${
                    indent === n
                      ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 border-slate-900 dark:border-slate-50"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {n} spaces
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            Tip: paste JSON and press{" "}
            <span className="rounded bg-slate-100 dark:bg-slate-900 px-1">
              Format
            </span>{" "}
            to pretty-print.
          </p>
        </div>

        {/* Editor grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
              <span>Input JSON</span>
              <span>
                {input.trim().length} chars
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="min-h-[260px] w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3 py-2 text-xs md:text-sm font-mono text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical"
              placeholder='{"key": "value"}'
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
              <span>Result</span>
              {output && (
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="rounded-full border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              spellCheck={false}
              className="min-h-[260px] w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 px-3 py-2 text-xs md:text-sm font-mono text-slate-900 dark:text-slate-50 focus:outline-none resize-vertical"
              placeholder="Formatted JSON will appear here."
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/40 px-3 py-2 text-[11px] text-rose-700 dark:text-rose-200">
            Invalid JSON: {error}
          </div>
        )}
      </section>

      {/* Bloque PRO dentro de la herramienta */}
      <ProUpsellBlock />
    </div>
  );
}

/* =================== BLOQUE PRO =================== */

function ProUpsellBlock() {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 px-4 py-4 md:px-5 md:py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-2 py-0.5 text-[10px] font-semibold">
          <Sparkles className="h-3 w-3" />
          <span>4TBOX PRO · Preview</span>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Turn JSON Formatter into a proper debugging workstation.
        </p>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-lg">
          PRO will add AI-powered fixes, JSON diff, schema validation and export
          options — without removing anything from the free version.
        </p>

        <ul className="mt-2 grid gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 md:grid-cols-2">
          <li className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-emerald-500" />
            <span>Auto-fix malformed JSON with a single click</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>Compare two JSON payloads side-by-side (diff view)</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>Validate against schemas & generate types</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>Export formatted JSON to files and snippets</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start md:items-end gap-2 text-right">
        <p className="text-[11px] text-slate-500 dark:text-slate-500 max-w-xs">
          PRO is optional. Free tools stay free — PRO simply adds more firepower
          for people who need it.
        </p>
        <Link
          href="/pro"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-4 py-2 text-[11px] font-semibold hover:opacity-90"
        >
          Learn more about 4TBOX PRO
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
    </div>
  );
}
