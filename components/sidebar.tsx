"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Type,
  Code2,
  Binary,
  Network,
  Shield,
  Calculator,
} from "lucide-react";

import {
  TOOLS,
  type ToolDefinition,
  type ToolCategoryId,
  getToolsByCategory,
} from "@/data/tools";

/* ========== META CATEGORÍAS ========== */

type CategoryMeta = {
  id: ToolCategoryId;
  name: string;
  icon: ReactNode;
};

const CATEGORIES: CategoryMeta[] = [
  {
    id: "text",
    name: "Text tools",
    icon: <Type className="h-3 w-3" />,
  },
  {
    id: "dev",
    name: "Developer tools",
    icon: <Code2 className="h-3 w-3" />,
  },
  {
    id: "encode",
    name: "Encode / Decode",
    icon: <Binary className="h-3 w-3" />,
  },
  {
    id: "network",
    name: "Network & IP",
    icon: <Network className="h-3 w-3" />,
  },
  {
    id: "security",
    name: "Security",
    icon: <Shield className="h-3 w-3" />,
  },
  {
    id: "calculators",
    name: "Calculators",
    icon: <Calculator className="h-3 w-3" />,
  },
];

/* ========== COMPONENTE REUTILIZABLE: NAV ========== */

function SidebarNav({
  pathname,
  onItemClick,
}: {
  pathname: string;
  onItemClick?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
      {CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (tools.length === 0) return null;

        return (
          <div key={category.id} className="space-y-1.5">
            {/* Header categoría */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.16em]">
                <span className="inline-flex items-center justify-center rounded-md bg-slate-100 dark:bg-slate-900 h-5 w-5 border border-slate-200/80 dark:border-slate-700">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </div>
              <span className="h-px flex-1 ml-2 bg-slate-200/80 dark:bg-slate-800" />
            </div>

            {/* Lista de tools */}
            <div className="space-y-0.5">
              {tools.map((tool) => {
                const active =
                  pathname === tool.slug ||
                  (pathname.startsWith(tool.slug) && tool.slug !== "/");

                const isSoon = tool.status === "soon";

                const content = (
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={[
                      "flex items-center justify-between rounded-xl px-3 py-1.5 text-[13px] border transition-colors",
                      active
                        ? "bg-slate-900 text-slate-50 border-slate-700 dark:bg-slate-50 dark:text-slate-900 dark:border-slate-300 shadow-sm"
                        : "border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/70 hover:border-slate-200/70 dark:hover:border-slate-700/70",
                      isSoon && !active
                        ? "opacity-60 cursor-not-allowed hover:bg-transparent hover:border-transparent"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate">{tool.name}</span>
                      {tool.status === "beta" && (
                        <span className="text-[9px] uppercase rounded-full px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/40">
                          Beta
                        </span>
                      )}
                      {tool.status === "soon" && (
                        <span className="text-[9px] uppercase rounded-full px-1.5 py-0.5 bg-sky-500/10 text-sky-400 border border-sky-500/40">
                          Soon
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                      {tool.tag && (
                        <span
                          className={[
                            "rounded-full border px-1.5 py-0.5 text-[9px] font-mono",
                            active
                              ? "border-slate-500/60 bg-slate-800/60 text-slate-200 dark:bg-slate-200 dark:text-slate-900"
                              : "border-slate-200/70 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400",
                          ].join(" ")}
                        >
                          {tool.tag}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );

                if (isSoon) {
                  // Herramientas marcadas como "Soon" no son clicables
                  return (
                    <div key={tool.id} className="cursor-default">
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={tool.id}
                    href={tool.slug}
                    onClick={onItemClick}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

/* ========== SIDEBAR ESCRITORIO ========== */

export function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/95 backdrop-blur-sm">
      <div className="px-4 pt-4 pb-3 border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em]">
          Toolbox
        </div>
        <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-600">
          Browse tools by category
        </div>
      </div>

      <SidebarNav pathname={pathname} />

      <div className="px-4 py-3 border-t border-slate-200/70 dark:border-slate-800/70 text-[11px] text-slate-400 dark:text-slate-600">
        <div className="font-medium text-slate-500 dark:text-slate-400">
          4TBOX · v0.1
        </div>
        <div className="text-[10px]">New tools are added regularly.</div>
      </div>
    </aside>
  );
}

/* ========== SIDEBAR MÓVIL (OVERLAY) ========== */

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname() || "/";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* fondo */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* panel lateral */}
      <div className="relative h-full w-72 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            4TBOX
          </span>
          <button
            onClick={onClose}
            className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Close
          </button>
        </div>

        <SidebarNav pathname={pathname} onItemClick={onClose} />
      </div>
    </div>
  );
}
