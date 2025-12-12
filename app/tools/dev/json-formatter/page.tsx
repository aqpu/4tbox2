"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Lock, Sparkles } from "lucide-react";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export default function JsonFormatterPage() {
  const [input, setInput] = useState<string>('{ "hello": "world" }');
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);

  const formatJson = () => {
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

  const minifyJson = () => {
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

  const handleInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      formatJson();
    }
  };

  return (
    <ToolPageShell>
      <div className="space-y-8">
        {/* Intro compacto debajo del header genérico del ToolPageShell */}
        <section className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-[9px]">
              {"{ }"}
            </span>
            <span>Online JSON formatter by 4TBOX</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Paste your JSON on the left, click{" "}
            <span className="font-semibold">Format JSON</span> or{" "}
            <span className="font-semibold">Minify</span>, and get a clean
            result on the right. Ideal for debugging API responses, logs and
            configuration files.
          </p>
        </section>

        {/* Main tool */}
        <section className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={formatJson}
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-3 py-1.5 font-semibold hover:opacity-90"
              >
                Format JSON
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={minifyJson}
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
                Ctrl / ⌘ + Enter
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
                <span>{input.trim().length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
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
              <span className="font-semibold">Invalid JSON:</span> {error}
            </div>
          )}
        </section>

        {/* PRO block */}
        <ProUpsellBlock />

        {/* SEO / help content */}
        <JsonFormatterInfoSection />
      </div>
    </ToolPageShell>
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
          PRO will add AI-powered fixes, JSON diff, schema validation and
          export options — without removing anything from the free version.
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
            <span>Validate against schemas &amp; generate types</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>Export formatted JSON to files and snippets</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-start md:items-end gap-2 text-right">
        <p className="text-[11px] text-slate-500 dark:text-slate-500 max-w-xs">
          PRO is optional. Free tools stay free — PRO simply adds more
          firepower for people who need it.
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

/* =================== BLOQUE INFO / SEO =================== */

function JsonFormatterInfoSection() {
  return (
    <section className="mt-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 max-w-3xl">
      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
        What is a JSON formatter?
      </h2>
      <p>
        A JSON formatter is a small utility that takes raw JSON and makes it
        easier to read. It adds indentation, line breaks and consistent
        spacing so you can quickly understand the structure of an object. It
        is especially useful when you are working with API responses, logs or
        configuration files that come in a single long line.
      </p>

      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
        How to use this JSON formatter
      </h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Paste or write your JSON in the input panel on the left.</li>
        <li>
          Choose the indentation size you prefer (2 or 4 spaces) using the
          Indent buttons.
        </li>
        <li>
          Click <span className="font-semibold">Format JSON</span> or press{" "}
          <span className="font-mono text-xs">Ctrl / ⌘ + Enter</span>.
        </li>
        <li>The formatted JSON will appear in the Result panel.</li>
        <li>
          If you need a compact version, click{" "}
          <span className="font-semibold">Minify</span> instead.
        </li>
      </ol>

      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
        Is this JSON formatter secure?
      </h2>
      <p>
        Yes. Everything happens in your browser. Your JSON is never sent to
        any server and never leaves your device. This makes the tool safe to
        use with sensitive payloads, internal APIs or development data, as
        long as you follow your own security policies.
      </p>

      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
        Common use cases
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Inspecting and debugging JSON responses from APIs.</li>
        <li>Pretty-printing JSON logs during development.</li>
        <li>Cleaning up configuration files before committing them.</li>
        <li>Sharing readable examples of JSON with teammates.</li>
      </ul>

      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            What happens if my JSON is invalid?
          </h3>
          <p>
            If the JSON cannot be parsed, you will see an error message below
            the editor indicating what went wrong. Fix the issue in the input
            panel and run the formatter again.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Can I use this tool for very large JSON files?
          </h3>
          <p>
            The formatter runs entirely in your browser, so very large JSON
            files may feel slower depending on your device. For most API
            responses and typical development tasks it should work smoothly.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            Does 4TBOX offer more JSON tools?
          </h3>
          <p>
            Yes. 4TBOX is a full toolbox of online utilities for developers
            and creators. You will find additional JSON tools, text helpers,
            encoders/decoders and AI-powered assistants in the main catalog.
          </p>
        </div>
      </div>
    </section>
  );
}
