"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

type LineDiffStatus = "same" | "added" | "removed" | "changed";

type LineDiff = {
  left: string | null;
  right: string | null;
  status: LineDiffStatus;
  index: number;
};

function computeLineDiff(left: string, right: string): LineDiff[] {
  const leftLines = left.split(/\r?\n/);
  const rightLines = right.split(/\r?\n/);
  const max = Math.max(leftLines.length, rightLines.length);
  const result: LineDiff[] = [];

  for (let i = 0; i < max; i++) {
    const l = leftLines[i] ?? null;
    const r = rightLines[i] ?? null;

    let status: LineDiffStatus = "same";

    if (l === null && r !== null) status = "added";
    else if (l !== null && r === null) status = "removed";
    else if (l !== null && r !== null && l !== r) status = "changed";

    result.push({ left: l, right: r, status, index: i });
  }

  return result;
}

export default function Page() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const diff = useMemo(
    () => computeLineDiff(leftText, rightText),
    [leftText, rightText]
  );

  const totalLeftLines = useMemo(
    () => (leftText === "" ? 0 : leftText.split(/\r?\n/).length),
    [leftText]
  );
  const totalRightLines = useMemo(
    () => (rightText === "" ? 0 : rightText.split(/\r?\n/).length),
    [rightText]
  );

  const sameCount = diff.filter((d) => d.status === "same").length;
  const changedCount = diff.filter((d) => d.status === "changed").length;
  const addedCount = diff.filter((d) => d.status === "added").length;
  const removedCount = diff.filter((d) => d.status === "removed").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Text Compare</h1>
      <p className="text-gray-600 text-sm mb-4">
        Compara dos bloques de texto y detecta diferencias línea por línea.
      </p>

      <Card className="p-4 space-y-4">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Texto A
              </span>
              <span className="text-[11px] text-gray-400">
                {totalLeftLines} líneas
              </span>
            </div>
            <textarea
              className="w-full h-64 border rounded-md p-2 text-xs font-mono"
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Texto original..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">
                Texto B
              </span>
              <span className="text-[11px] text-gray-400">
                {totalRightLines} líneas
              </span>
            </div>
            <textarea
              className="w-full h-64 border rounded-md p-2 text-xs font-mono"
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Texto modificado..."
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          <MetricBox label="Líneas iguales" value={sameCount} tone="gray" />
          <MetricBox label="Líneas cambiadas" value={changedCount} tone="yellow" />
          <MetricBox label="Líneas añadidas" value={addedCount} tone="green" />
          <MetricBox label="Líneas eliminadas" value={removedCount} tone="red" />
        </div>

        {/* Diff */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500">
            Diferencias por líneas
          </div>
          <div className="border rounded-md overflow-hidden text-xs">
            <div className="grid grid-cols-2 bg-gray-100 text-[11px] font-semibold text-gray-500">
              <div className="px-2 py-1 border-r border-gray-200">Texto A</div>
              <div className="px-2 py-1">Texto B</div>
            </div>
            <div className="max-h-72 overflow-auto divide-y divide-gray-100">
              {diff.map((line) => (
                <div
                  key={line.index}
                  className={`grid grid-cols-2 text-xs font-mono`}
                >
                  <div
                    className={`px-2 py-1 border-r border-gray-100 ${
                      line.status === "removed"
                        ? "bg-red-50"
                        : line.status === "changed"
                        ? "bg-yellow-50"
                        : ""
                    }`}
                  >
                    {line.left ?? ""}
                  </div>
                  <div
                    className={`px-2 py-1 ${
                      line.status === "added"
                        ? "bg-green-50"
                        : line.status === "changed"
                        ? "bg-yellow-50"
                        : ""
                    }`}
                  >
                    {line.right ?? ""}
                  </div>
                </div>
              ))}
              {diff.length === 0 && (
                <div className="px-2 py-2 text-gray-500 text-xs">
                  Escribe texto en ambos lados para ver diferencias.
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MetricBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "gray" | "yellow" | "green" | "red";
}) {
  const styles: Record<typeof tone, string> = {
    gray: "bg-gray-100 text-gray-900",
    yellow: "bg-yellow-50 border border-yellow-100 text-yellow-900",
    green: "bg-green-50 border border-green-100 text-green-900",
    red: "bg-red-50 border border-red-100 text-red-900",
  } as const;

  const labelColor: Record<typeof tone, string> = {
    gray: "text-gray-500",
    yellow: "text-yellow-700",
    green: "text-green-700",
    red: "text-red-700",
  } as const;

  return (
    <div className={`px-3 py-2 rounded-md ${styles[tone]}`}>
      <div className={`text-xs ${labelColor[tone]}`}>{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
