"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

type DecodedPart = {
  raw: string;
  json: string | null;
  error: string | null;
};

function base64UrlDecode(input: string): string {
  let base = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base.length % 4 !== 0) {
    base += "=";
  }
  const binary = atob(base);
  let result = "";
  for (let i = 0; i < binary.length; i++) {
    result += String.fromCharCode(binary.charCodeAt(i));
  }
  return result;
}

function decodeJwtPart(part: string): DecodedPart {
  try {
    const decoded = base64UrlDecode(part);
    const parsed = JSON.parse(decoded);
    return {
      raw: decoded,
      json: JSON.stringify(parsed, null, 2),
      error: null,
    };
  } catch (e: any) {
    return {
      raw: "",
      json: null,
      error: "No se pudo decodificar/parsing del JSON.",
    };
  }
}

export default function Page() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<DecodedPart | null>(null);
  const [payload, setPayload] = useState<DecodedPart | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    setHeader(null);
    setPayload(null);
    setSignature(null);

    const parts = token.trim().split(".");

    if (parts.length !== 3) {
      setError("El token JWT debe tener 3 partes separadas por puntos.");
      return;
    }

    const [h, p, s] = parts;

    const decodedHeader = decodeJwtPart(h);
    const decodedPayload = decodeJwtPart(p);

    setHeader(decodedHeader);
    setPayload(decodedPayload);
    setSignature(s);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">JWT Decoder</h1>
      <p className="text-gray-600 text-sm mb-4">
        Decodifica el header y el payload de un JWT. No verifica la firma.
      </p>

      <Card className="p-4 space-y-4">
        {/* Input */}
        <div>
          <label className="text-xs font-semibold text-gray-500">
            Token JWT
          </label>
          <textarea
            className="w-full h-24 border rounded-md p-2 text-xs font-mono"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/* Botón + warning */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleDecode}
            className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm"
          >
            Decodificar JWT
          </button>

          <div className="text-[11px] text-gray-500">
            ⚠️ Solo decodifica el contenido. No verifica la firma ni garantiza
            que el token sea válido o seguro.
          </div>
        </div>

        {error && (
          <div className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Resultados */}
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1">
              Header
            </div>
            <textarea
              className="w-full h-40 border rounded-md p-2 font-mono bg-gray-50"
              value={header?.json ?? ""}
              readOnly
            />
            {header?.error && (
              <div className="text-[11px] text-red-600 mt-1">
                {header.error}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1">
              Payload
            </div>
            <textarea
              className="w-full h-40 border rounded-md p-2 font-mono bg-gray-50"
              value={payload?.json ?? ""}
              readOnly
            />
            {payload?.error && (
              <div className="text-[11px] text-red-600 mt-1">
                {payload.error}
              </div>
            )}
          </div>
        </div>

        {/* Signature */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1">
            Firma (sin decodificar)
          </div>
          <textarea
            className="w-full h-16 border rounded-md p-2 font-mono text-[11px] bg-gray-50"
            value={signature ?? ""}
            readOnly
          />
        </div>
      </Card>
    </div>
  );
}
