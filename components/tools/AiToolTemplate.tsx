"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Info, AlertTriangle } from "lucide-react";

type AiToolTemplateProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  /** Panel principal de la herramienta (inputs, sliders, etc.) */
  children: ReactNode;
  /** Panel de salida (resultado IA) */
  outputSlot: ReactNode;
  /** Texto pequeño de ayuda / contexto IA */
  aiNote?: string;
};

export function AiToolTemplate({
  title,
  subtitle,
  badge = "AI",
  description,
  children,
  outputSlot,
  aiNote = "AI can be wrong. Double-check important results.",
}: AiToolTemplateProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-slate-50">
            {title}
          </h1>

          {badge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/40">
              <Sparkles className="h-3 w-3" />
              <span>{badge}</span>
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-sm text-slate-400 max-w-2xl">{subtitle}</p>
        )}

        {description && (
          <p className="text-xs text-slate-500 max-w-2xl">{description}</p>
        )}
      </header>

      {/* Aviso IA */}
      <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2">
        <Info className="h-3.5 w-3.5 mt-[1px]" />
        <p>
          {aiNote}{" "}
          <span className="inline-flex items-center gap-1 text-slate-500">
            <AlertTriangle className="h-3 w-3" /> No sensitive or private data.
          </span>
        </p>
      </div>

      {/* Layout principal: izquierda config + entrada, derecha salida */}
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {/* Columna izquierda: inputs / controles */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          {children}
        </div>

        {/* Columna derecha: resultado */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          {outputSlot}
        </div>
      </motion.div>

      {/* Footer pequeño */}
      <p className="text-[11px] text-slate-500">
        4TBOX AI tools run requests through external models. Don&apos;t paste
        secrets, passwords or private data.
      </p>
    </div>
  );
}
