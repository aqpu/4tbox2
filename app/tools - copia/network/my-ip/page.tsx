"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

type IpState = {
  ip: string | null;
  loading: boolean;
  error: string | null;
};

function detectIpVersion(ip: string | null): "IPv4" | "IPv6" | "desconocido" {
  if (!ip) return "desconocido";
  if (ip.includes(":")) return "IPv6";
  if (ip.includes(".")) return "IPv4";
  return "desconocido";
}

export default function Page() {
  const [state, setState] = useState<IpState>({
    ip: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        if (!res.ok) throw new Error("No se pudo obtener la IP");
        const data = await res.json();
        setState({ ip: data.ip, loading: false, error: null });
      } catch (e) {
        setState({
          ip: null,
          loading: false,
          error: "Error obteniendo la IP. Intenta recargar la página.",
        });
      }
    };

    fetchIp();
  }, []);

  const copyIp = async () => {
    if (!state.ip) return;
    try {
      await navigator.clipboard.writeText(state.ip);
      alert("IP copiada al portapapeles");
    } catch {
      alert("No se pudo copiar la IP");
    }
  };

  const ipVersion = detectIpVersion(state.ip);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">My IP</h1>
      <p className="text-gray-600 text-sm mb-4">
        Consulta tu IP pública de forma rápida y segura.
      </p>

      <Card className="p-4 space-y-4">
        {/* IP principal */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">
              Dirección IP pública
            </div>
            <div className="mt-1 text-xl font-mono">
              {state.loading && "Cargando..."}
              {state.error && (
                <span className="text-sm text-red-600">{state.error}</span>
              )}
              {!state.loading && !state.error && state.ip}
            </div>
          </div>

          <button
            onClick={copyIp}
            disabled={!state.ip || !!state.error || state.loading}
            className={`px-3 py-1.5 rounded-md text-xs ${
              !state.ip || !!state.error || state.loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            Copiar IP
          </button>
        </div>

        {/* Info adicional */}
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="px-3 py-2 bg-gray-100 rounded-md">
            <div className="text-xs text-gray-500">Tipo de IP (estimado)</div>
            <div className="text-lg font-semibold">
              {ipVersion === "desconocido" ? "—" : ipVersion}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              Detectado en base al formato: puntos (IPv4) o dos puntos (IPv6).
            </div>
          </div>

          <div className="px-3 py-2 bg-blue-50 border border-blue-100 rounded-md">
            <div className="text-xs text-blue-700">Privacidad</div>
            <div className="text-[11px] text-blue-900 mt-1">
              Esta es tu IP pública vista desde internet. No almacenamos ni
              enviamos esta IP a ningún sistema tuyo: la petición va directa al
              servicio de IP y se muestra en tu navegador.
            </div>
          </div>
        </div>

        {/* Nota */}
        <div className="text-[11px] text-gray-500">
          Tip: si usas VPN, proxy o estás detrás de una red corporativa, esta
          IP puede ser distinta de la IP local de tu dispositivo.
        </div>
      </Card>
    </div>
  );
}
