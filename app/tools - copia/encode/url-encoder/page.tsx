"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function URLEncoder() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");

  const encode = () => setOut(encodeURIComponent(input));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">URL Encoder</h1>
      <Card className="p-4 space-y-4">
        <textarea
          className="border p-2 rounded-md w-full h-32"
          placeholder="Texto a codificar para URL..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={encode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
        >
          Codificar
        </button>

        <textarea
          className="border p-2 rounded-md w-full h-32 bg-gray-50"
          value={out}
          readOnly
        />
      </Card>
    </div>
  );
}
