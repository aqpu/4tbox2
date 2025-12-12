"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [convertTabs, setConvertTabs] = useState(true);
  const [tabSize, setTabSize] = useState(4);
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);

  const [originalLength, setOriginalLength] = useState(0);
  const [cleanLength, setCleanLength] = useState(0);
  const [whitespaceRemoved, setWhitespaceRemoved] = useState(0);

  const process = () => {
    let text = input;
    setOriginalLength(text.length);

    const whitespaceBefore = (text.match(/\s/g) || []).length;

    // 1) Convertir tabs a espacios
    if (convertTabs) {
      const spaces = " ".repeat(tabSize);
      text = text.replace(/\t/g, spaces);
    }

    // 2) Operar por líneas
    let lines = text.split(/\r?\n/);

    lines = lines
      .map((line) => {
        let newLine = line;

        if (trimLines) {
          newLine = newLine.trim();
        }

        if (collapseSpaces) {
          // Colapsar varios espacios en uno, pero sin tocar saltos de línea
          newLine = newLine.replace(/ {2,}/g, " ");
        }

        return newLine;
      })
      .filter((line) => {
        if (!removeEmptyLines) return true;
        return line.trim() !== "";
      });

    text = lines.join("\n");

    const whitespaceAfter = (text.match(/\s/g) || []).length;

    setOutput(text);
    setCleanLength(text.length);
    setWhitespaceRemoved(whitespaceBefore - whitespaceAfter);
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
      <h1 className="text-2xl font-bold mb-1">Whitespace Remover</h1>
      <p className="text-gray-600 text-sm mb-4">
        Limpia espacios sobrantes, tabs y líneas vacías de tu texto.
      </p>

      <Card className="p-4 space-y-4">
        {/* Opciones */}
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500">
              Normalización de espacios
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
              />
              Recortar espacios al inicio y final de cada línea
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={collapseSpaces}
                onChange={(e) => setCollapseSpaces(e.target.checked)}
              />
              Colapsar múltiples espacios en uno
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={removeEmptyLines}
                onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              />
              Eliminar líneas vacías
            </label>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500">
              Tabs y formato
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={convertTabs}
                onChange={(e) => setConvertTabs(e.target.checked)}
              />
              Convertir tabs a espacios
            </label>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600">Tamaño de tabulador:</span>
              <input
                type="number"
                min={2}
                max={8}
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value) || 4)}
                className="border rounded-md px-2 py-1 w-16 text-xs"
                disabled={!convertTabs}
              />
              <span className="text-gray-500">espacios</span>
            </div>
          </div>
        </div>

        {/* Input / Output */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Entrada
              </span>
              <span className="text-[11px] text-gray-400">
                Pega aquí el texto a limpiar
              </span>
            </div>
            <textarea
              className="w-full h-64 p-2 border rounded-md text-xs font-mono"
              placeholder={"Texto   con   espacios   raros...\n\tY tabs mezclados."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Resultado
              </span>
              <button
                onClick={copyResult}
                className="px-3 py-1 rounded-md bg-gray-800 text-white text-[11px]"
              >
                Copiar resultado
              </button>
            </div>
            <textarea
              className="w-full h-64 p-2 border rounded-md text-xs font-mono bg-gray-50"
              placeholder="Aquí verás el texto limpio..."
              value={output}
              readOnly
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="px-3 py-2 bg-gray-100 rounded-md">
            <div className="text-xs text-gray-500">Longitud original</div>
            <div className="text-lg font-semibold">{originalLength}</div>
          </div>
          <div className="px-3 py-2 bg-green-50 border border-green-100 rounded-md">
            <div className="text-xs text-green-700">
              Longitud después de limpiar
            </div>
            <div className="text-lg font-semibold text-green-900">
              {cleanLength}
            </div>
          </div>
          <div className="px-3 py-2 bg-blue-50 border border-blue-100 rounded-md">
            <div className="text-xs text-blue-700">
              Caracteres en blanco eliminados
            </div>
            <div className="text-lg font-semibold text-blue-900">
              {whitespaceRemoved}
            </div>
          </div>
        </div>

        {/* Botón procesar */}
        <div className="flex justify-end">
          <button
            onClick={process}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm"
          >
            Limpiar texto
          </button>
        </div>
      </Card>
    </div>
  );
}
