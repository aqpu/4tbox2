"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function LoremIpsumGenerator() {
  const [paras, setParas] = useState(3);
  const [text, setText] = useState("");

  const generate = () => {
    setText(Array(paras).fill(LOREM).join("\n\n"));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator</h1>
      <Card className="p-4 space-y-4">
        <label className="text-sm">Número de párrafos:</label>
        <input
          type="number"
          min={1}
          max={20}
          className="border p-2 rounded-md w-24"
          value={paras}
          onChange={(e) => setParas(Number(e.target.value))}
        />

        <button
          onClick={generate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
        >
          Generar
        </button>

        <textarea
          className="border p-2 rounded-md w-full h-60 bg-gray-50 text-sm"
          value={text}
          readOnly
        />
      </Card>
    </div>
  );
}
