"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";


export default function WordDensity() {
  const [text, setText] = useState("");
  const [out, setOut] = useState<any[]>([]);

  const calculate = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    setOut(sorted);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Word Density Calculator</h1>
      <Card className="p-4 space-y-4">
        <textarea
          className="border p-2 rounded-md w-full h-40"
          placeholder="Pega un texto..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={calculate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
        >
          Calcular densidad
        </button>

        <div className="space-y-1">
          {out.length === 0 && (
            <p className="text-gray-500 text-sm">No hay datos todavía.</p>
          )}

          {out.map(([word, count], i) => (
            <div key={i} className="p-2 bg-gray-100 rounded-md text-sm">
              <strong>{word}</strong>: {count}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
