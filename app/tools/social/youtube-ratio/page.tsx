"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [subs, setSubs] = useState<number | "">("");
  const [views, setViews] = useState<number | "">("");
  const [videos, setVideos] = useState<number | "">("");

  const subsNum = typeof subs === "number" ? subs : 0;
  const viewsNum = typeof views === "number" ? views : 0;
  const videosNum = typeof videos === "number" ? videos : 0;

  const viewsPerSub =
    subsNum > 0 ? Number((viewsNum / subsNum).toFixed(2)) : 0;

  const avgViewsPerVideo =
    videosNum > 0 ? Number((viewsNum / videosNum).toFixed(2)) : 0;

  const ratioVideoSubs =
    subsNum > 0 && videosNum > 0
      ? Number((avgViewsPerVideo / subsNum).toFixed(2))
      : 0;

  const classification = classifyChannel(viewsPerSub, ratioVideoSubs, subsNum);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">
        YouTube Views / Subs Ratio
      </h1>
      <p className="text-gray-600 text-sm mb-4">
        Analiza la relación entre vistas, suscriptores y vídeos para estimar el
        engagement de un canal.
      </p>

      <Card className="p-4 space-y-4">
        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div>
            <label className="text-xs text-gray-500 font-semibold">
              Suscriptores
            </label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-md px-2 py-1.5 text-sm"
              value={subs}
              onChange={(e) =>
                setSubs(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ej: 1000"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold">
              Vistas totales del canal
            </label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-md px-2 py-1.5 text-sm"
              value={views}
              onChange={(e) =>
                setViews(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ej: 150000"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-semibold">
              Número de vídeos
            </label>
            <input
              type="number"
              min={0}
              className="w-full border rounded-md px-2 py-1.5 text-sm"
              value={videos}
              onChange={(e) =>
                setVideos(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ej: 120"
            />
          </div>
        </div>

        {/* Métricas */}
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <Metric
            label="Vistas por suscriptor"
            value={isFinite(viewsPerSub) ? viewsPerSub.toFixed(2) : "0.00"}
            helper="views / subs"
          />
          <Metric
            label="Vistas medias por vídeo"
            value={isFinite(avgViewsPerVideo) ? avgViewsPerVideo.toFixed(2) : "0.00"}
            helper="views / vídeos"
          />
          <Metric
            label="Vistas por vídeo vs subs"
            value={isFinite(ratioVideoSubs) ? ratioVideoSubs.toFixed(2) : "0.00"}
            helper="(views/vídeo) / subs"
          />
        </div>

        {/* Clasificación */}
        <div className="px-3 py-3 border rounded-md bg-gray-50 text-xs text-gray-700">
          {subsNum === 0 || viewsNum === 0 ? (
            <>Introduce suscriptores y vistas para analizar el canal.</>
          ) : (
            <>
              <div className="font-semibold mb-1">
                Nivel estimado de rendimiento: {classification.label}
              </div>
              <div>{classification.description}</div>
            </>
          )}
        </div>

        {/* Nota */}
        <div className="text-[11px] text-gray-500">
          Estos cálculos son estimaciones generales. No sustituyen un análisis
          detallado de audiencia, CTR o retención.
        </div>
      </Card>
    </div>
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="px-3 py-2 bg-gray-100 rounded-md">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {helper && (
        <div className="text-[11px] text-gray-400 mt-0.5">{helper}</div>
      )}
    </div>
  );
}

function classifyChannel(
  viewsPerSub: number,
  ratioVideoSubs: number,
  subs: number
): { label: string; description: string } {
  if (subs < 50) {
    return {
      label: "Datos muy limitados",
      description:
        "El canal es muy pequeño. Los ratios pueden variar muchísimo con pocos vídeos o pocos suscriptores.",
    };
  }

  if (viewsPerSub < 1) {
    return {
      label: "Engagement muy bajo",
      description:
        "El canal tiene pocas vistas en relación a los suscriptores. Podría haber suscriptores inactivos o pocas visualizaciones orgánicas.",
    };
  }

  if (viewsPerSub < 10) {
    return {
      label: "Engagement normal",
      description:
        "La relación vistas/suscriptor es razonable. Sigue publicando de forma constante y revisa títulos, miniaturas y retención.",
    };
  }

  if (viewsPerSub < 50) {
    return {
      label: "Engagement alto",
      description:
        "Buen rendimiento. Los vídeos probablemente están atrayendo visitas más allá de los suscriptores (recomendados, búsquedas, etc.).",
    };
  }

  return {
    label: "Engagement muy alto / viral",
    description:
      "Las vistas son muy altas en relación a los suscriptores. Posible contenido viral, muy recomendado por el algoritmo o con alto potencial SEO.",
  };
}
