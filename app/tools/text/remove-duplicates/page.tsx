"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [sortResult, setSortResult] = useState(false);

  const [originalCount, setOriginalCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);

  const process = () => {
    const rawLines = input.split("\n");

    setOriginalCount(rawLines.length);

    const seen = new Set<string>();
    const result: string[] = [];

    for (let line of rawLines) {
      if (trimLines) {
        line = line.trim();
      }

      if (ignoreEmpty && line === "") {
        continue;
      }

      const key = caseSensitive ? line : line.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    if (sortResult) {
      result.sort((a, b) => a.localeCompare(b));
    }

    setUniqueCount(result.length);
    setOutput(result.join("\n"));
  };

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      alert("Resultado copiado al portapapeles");
    } catch {
      alert("No se pudo copiar el resultado");
    }
  };

  const duplicatesRemoved =
    originalCount > 0 ? originalCount - uniqueCount : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Remove Duplicates</h1>
      <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
        Pega una lista de líneas y elimina duplicados con distintas opciones.
      </p>

      <Card className="p-4 space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Opciones */}
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Opciones de limpieza
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
              />
              Recortar espacios al inicio/fin de cada línea
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={ignoreEmpty}
                onChange={(e) => setIgnoreEmpty(e.target.checked)}
              />
              Ignorar líneas vacías
            </label>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Opciones de comparación
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
              Diferenciar mayúsculas/minúsculas (Case-sensitive)
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={sortResult}
                onChange={(e) => setSortResult(e.target.checked)}
              />
              Ordenar resultado alfabéticamente
            </label>
          </div>
        </div>

        {/* Input / Output */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Entrada
              </span>
              <span className="text-[11px] text-gray-400 dark:text-slate-500">
                Una entrada por línea
              </span>
            </div>
            <textarea
              className="w-full h-64 p-2 border rounded-md text-xs font-mono bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              placeholder={"ejemplo@example.com\notro@example.com\notro@example.com"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                Resultado
              </span>
              <button
                onClick={copyResult}
                className="px-3 py-1 rounded-md bg-gray-800 text-white text-[11px] hover:bg-gray-900 transition"
              >
                Copiar resultado
              </button>
            </div>
            <textarea
              className="w-full h-64 p-2 border rounded-md text-xs font-mono bg-gray-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              placeholder="Aquí aparecerán las líneas únicas..."
              value={output}
              readOnly
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-md">
            <div className="text-xs text-gray-500 dark:text-slate-400">
              Líneas originales
            </div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {originalCount}
            </div>
          </div>
          <div className="px-3 py-2 bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-md">
            <div className="text-xs text-green-700 dark:text-green-300">
              Líneas únicas
            </div>
            <div className="text-lg font-semibold text-green-900 dark:text-green-100">
              {uniqueCount}
            </div>
          </div>
          <div className="px-3 py-2 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-md">
            <div className="text-xs text-blue-700 dark:text-blue-300">
              Duplicados eliminados
            </div>
            <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {duplicatesRemoved}
            </div>
          </div>
        </div>

        {/* Botón de procesar */}
        <div className="flex justify-end">
          <button
            onClick={process}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
          >
            Eliminar duplicados
          </button>
        </div>
      </Card>
    </div>
  );
}
