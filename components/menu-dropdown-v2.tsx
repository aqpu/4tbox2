/* ========= MENU 2.0 — SUPER PROFESIONAL ========== */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Type,
  Code2,
  Binary,
  Network,
  Shield,
  Calculator,
  Sparkles,
  Star,
  Layers,
  Wand2,
  PlusCircle,
  BookOpen,
  Info,
} from "lucide-react";
import {
  TOOLS,
  getFeaturedTools,
  type ToolDefinition,
} from "@/data/tools";

const CATEGORY_ICONS: Record<string, any> = {
  text: Type,
  dev: Code2,
  encode: Binary,
  network: Network,
  security: Shield,
  calculators: Calculator,
  ai: Wand2, // por si en el futuro añades categoría "ai"
};

export function MenuDropdownV2({
  open,
  onSelect,
}: {
  open: boolean;
  onSelect: () => void;
}) {
  if (!open) return null;

  // Lista de tools destacadas (featured)
  const featured: ToolDefinition[] = getFeaturedTools().slice(0, 4);

  // Categorías reales presentes en TOOLS
  const categories = Array.from(
    new Set(TOOLS.map((t) => t.category))
  ) as ToolDefinition["category"][];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 8, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="
        absolute left-1/2 top-full -translate-x-1/2 mt-3 
        w-[420px] md:w-[520px]
        rounded-2xl border border-slate-200 
        dark:border-slate-700 
        bg-white dark:bg-slate-900 
        shadow-2xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Menu
        </span>
        <Layers className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
      </div>

      {/* GRID INTERNO */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* LEFT SIDE */}
        <div className="p-4 space-y-4">
          {/* Popular tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Popular tools
            </h4>
            <div className="space-y-1">
              {featured.map((tool: ToolDefinition) => (
                <Link
                  key={tool.id}
                  href={tool.slug}
                  onClick={onSelect}
                  className="
                    flex items-center justify-between px-3 py-1.5 
                    text-sm rounded-lg
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    transition"
                >
                  {tool.name}
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Quick actions
            </h4>
            <div className="space-y-1 text-sm">
              <Link
                href="/request-tool"
                onClick={onSelect}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <PlusCircle className="h-4 w-4" /> Request a tool
              </Link>

              <Link
                href="/changelog"
                onClick={onSelect}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4" /> Changelog
              </Link>

              <Link
                href="/about"
                onClick={onSelect}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Info className="h-4 w-4" /> About 4TBOX
              </Link>

              <button
                onClick={() => {
                  onSelect();
                  alert("AI Panel coming soon 🚀");
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-left"
              >
                <Sparkles className="h-4 w-4 text-pink-400" /> AI Panel (soon)
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-4 space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Browse by category
          </h4>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] ?? Calculator; // fallback por seguridad
              return (
                <Link
                  key={cat}
                  href={`/tools/${cat}`}
                  onClick={onSelect}
                  className="
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    border border-slate-200 dark:border-slate-700
                    bg-slate-50 dark:bg-slate-900/40
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    text-sm transition"
                >
                  <Icon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                  <span className="capitalize">{cat}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 flex justify-between">
        <span>4TBOX · Early Access</span>
        <span>v0.1</span>
      </div>
    </motion.div>
  );
}
