"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

function generateUUID() {
  return crypto.randomUUID();
}

export default function UUIDGenerator() {
  const [uuid, setUUID] = useState("");

  const copy = () => navigator.clipboard.writeText(uuid);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">UUID Generator</h1>
      <Card className="p-4 space-y-4">
        <button
          onClick={() => setUUID(generateUUID())}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
        >
          Generar UUID
        </button>

        <div className="p-3 border bg-gray-50 rounded-md text-sm break-all">
          {uuid || "Haz clic para generar un UUID."}
        </div>

        {uuid && (
          <button
            onClick={copy}
            className="px-3 py-1 text-xs bg-gray-800 text-white rounded-md"
          >
            Copiar
          </button>
        )}
      </Card>
    </div>
  );
}
