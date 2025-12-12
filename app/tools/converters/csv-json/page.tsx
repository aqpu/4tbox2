"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

type Mode = "csv-to-json" | "json-to-csv";

export default function Page() {
  const [mode, setMode] = useState<Mode>("csv-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pretty, setPretty] = useState(true);

  const handleConvert = () => {
    try {
      setError(null);
      if (mode === "csv-to-json") {
        const json = csvToJson(input);
        setOutput(JSON.stringify(json, null, pretty ? 2 : 0));
      } else {
        const csv = jsonToCsv(input);
        setOutput(csv);
      }
    } catch (e: any) {
      setError(e?.message || "Error al convertir.");
      setOutput("");
    }
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">CSV ↔ JSON Converter</h1>
      <p className="text-gray-600 text-sm mb-4">
        Convierte fácilmente entre CSV y JSON. Ideal para datos tabulares.
      </p>

      <Card className="p-4 space-y-4">
        {/* Controles */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex rounded-md bg-gray-100 p-1">
            <button
              onClick={() => setMode("csv-to-json")}
              className={`px-3 py-1 rounded-md ${
                mode === "csv-to-json"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500"
              }`}
            >
              CSV → JSON
            </button>
            <button
              onClick={() => setMode("json-to-csv")}
              className={`px-3 py-1 rounded-md ${
                mode === "json-to-csv"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500"
              }`}
            >
              JSON → CSV
            </button>
          </div>

          {mode === "csv-to-json" && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pretty}
                onChange={(e) => setPretty(e.target.checked)}
              />
              <span className="text-xs text-gray-600">JSON formateado</span>
            </label>
          )}
        </div>

        {/* Input / Output */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Entrada ({mode === "csv-to-json" ? "CSV" : "JSON"})
              </span>
              {mode === "csv-to-json" && (
                <span className="text-[11px] text-gray-400">
                  Primera línea = cabeceras
                </span>
              )}
            </div>
            <textarea
              className="w-full h-64 border rounded-md p-2 text-xs font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "csv-to-json"
                  ? "name,age\nAmador,22\nAna,30"
                  : '[{"name":"Amador","age":22},{"name":"Ana","age":30}]'
              }
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Salida ({mode === "csv-to-json" ? "JSON" : "CSV"})
              </span>
              <button
                onClick={copyResult}
                className="px-3 py-1 rounded-md bg-gray-800 text-white text-[11px]"
              >
                Copiar resultado
              </button>
            </div>
            <textarea
              className="w-full h-64 border rounded-md p-2 text-xs font-mono bg-gray-50"
              value={output}
              readOnly
            />
          </div>
        </div>

        {/* Error + botón convertir */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleConvert}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm"
          >
            Convertir
          </button>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md max-w-md">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// CSV -> JSON
function csvToJson(csv: string): any[] {
  const lines = csv
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "");

  if (lines.length === 0) return [];

  const headers = splitCsvLine(lines[0]);
  const rows = lines.slice(1);

  return rows.map((line) => {
    const values = splitCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? "";
    });
    return obj;
  });
}

// JSON -> CSV
function jsonToCsv(jsonStr: string): string {
  let data: any;
  try {
    data = JSON.parse(jsonStr);
  } catch {
    throw new Error("JSON inválido.");
  }

  const arr: any[] = Array.isArray(data) ? data : [data];

  if (arr.length === 0) return "";

  const headers = Array.from(
    arr.reduce((set: Set<string>, item) => {
      Object.keys(item || {}).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );

  const lines = [headers.join(",")];

  for (const item of arr) {
    const row = headers
      .map((h) => {
        const val = item?.[h] ?? "";
        return escapeCsvValue(String(val));
      })
      .join(",");
    lines.push(row);
  }

  return lines.join("\n");
}

// Split de línea CSV respetando comillas
function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function escapeCsvValue(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
