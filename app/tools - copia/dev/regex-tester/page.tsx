"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

type FlagKey = "g" | "i" | "m" | "s" | "u";

export default function Page() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState<FlagKey[]>(["g"]);
  const [text, setText] = useState("Prueba 123 y luego 456.\nLínea 2: 789.");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleFlag = (flag: FlagKey) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const runTest = () => {
    try {
      setError(null);
      const flagString = flags.join("");
      const regex = new RegExp(pattern, flagString || undefined);

      const allMatches: RegExpMatchArray[] = [];
      if (flagString.includes("g")) {
        let match: RegExpExecArray | null;
        const globalRegex = new RegExp(pattern, flagString); // nueva instancia para reset
        while ((match = globalRegex.exec(text)) !== null) {
          allMatches.push(match as unknown as RegExpMatchArray);
          if (match[0] === "") {
            globalRegex.lastIndex++;
          }
        }
      } else {
        const single = text.match(regex);
        if (single) {
          allMatches.push(single as RegExpMatchArray);
        }
      }

      setMatches(allMatches);
    } catch (e: any) {
      setError(e?.message || "Expresión regular inválida.");
      setMatches([]);
    }
  };

  const highlightText = () => {
    if (!pattern) return text;
    try {
      const flagString = flags.join("") || "g";
      const effectiveFlags = flagString.includes("g")
        ? flagString
        : flagString + "g";
      const regex = new RegExp(pattern, effectiveFlags);

      let lastIndex = 0;
      const parts: React.ReactNode[] = [];
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        if (match.index == null) {
          continue;
        }

        const start = match.index;
        const end = start + match[0].length;

        if (start > lastIndex) {
          parts.push(text.slice(lastIndex, start));
        }

        parts.push(
          <mark
            key={start + "-" + end + "-" + match[0]}
            className="bg-yellow-200 text-black rounded-sm px-0.5"
          >
            {text.slice(start, end)}
          </mark>
        );

        lastIndex = end;

        if (match[0] === "") {
          regex.lastIndex++;
        }
      }

      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      return parts;
    } catch {
      return text;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Regex Tester</h1>
      <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
        Prueba expresiones regulares con flags, resultados y texto resaltado.
      </p>

      <Card className="p-4 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Configuración */}
        <div className="grid md:grid-cols-[2fr,1fr] gap-3">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 dark:text-slate-400 font-semibold">
              Expresión regular
            </label>
            <input
              className="w-full border rounded-md px-2 py-1.5 text-sm font-mono bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Ej: \\d+"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-500 dark:text-slate-400 font-semibold">
              Flags
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {(["g", "i", "m", "s", "u"] as FlagKey[]).map((flag) => {
                const active = flags.includes(flag);
                return (
                  <button
                    key={flag}
                    onClick={() => toggleFlag(flag)}
                    className={`px-2 py-1 rounded-md border ${
                      active
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white dark:bg-slate-950 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-700"
                    }`}
                  >
                    {flag}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-gray-400 dark:text-slate-500">
              g=global, i=ignore case, m=multiline, s=dotAll, u=unicode
            </div>
          </div>
        </div>

        {/* Texto de entrada */}
        <div>
          <label className="text-xs text-gray-500 dark:text-slate-400 font-semibold">
            Texto donde buscar
          </label>
          <textarea
            className="w-full h-32 border rounded-md p-2 text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Botón + error */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={runTest}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
          >
            Probar expresión
          </button>

          {error && (
            <div className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 px-3 py-2 rounded-md max-w-md">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Resultados */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Resultados ({matches.length})
            </div>
            <div className="border rounded-md p-2 h-40 overflow-auto text-xs bg-gray-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700">
              {matches.length === 0 ? (
                <div className="text-gray-500 dark:text-slate-400">
                  Sin coincidencias.
                </div>
              ) : (
                <ul className="space-y-1">
                  {matches.map((m, idx) => (
                    <li
                      key={idx}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1"
                    >
                      <div>
                        <span className="font-semibold">#{idx + 1}</span> —{" "}
                        <span className="font-mono">{m[0]}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-slate-400">
                        Índice: {m.index ?? "N/A"}
                        {m.length > 1 && (
                          <>
                            {" · "}Grupos:{" "}
                            {m.slice(1).map((g, gi) => (
                              <span key={gi} className="font-mono">
                                {gi > 0 && ", "}
                                {g === undefined ? "undefined" : `"${g}"`}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Texto resaltado */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Texto con coincidencias resaltadas
            </div>
            <div className="border rounded-md p-2 h-40 overflow-auto text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700">
              <pre className="whitespace-pre-wrap break-words text-slate-900 dark:text-slate-100">
                {highlightText()}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
