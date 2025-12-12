"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import { Search, Sparkles, ArrowRight, Inbox } from "lucide-react";
import { toolsIndex, type ToolMeta } from "@/lib/tools-index";

type SearchResult = ToolMeta;

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Configuración de Fuse (búsqueda difusa)
  const fuse = useMemo(
    () =>
      new Fuse(toolsIndex, {
        keys: [
          "name",
          "description",
          "category",
          "subcategory",
          "keywords",
          "aliases",
        ],
        includeScore: true,
        threshold: 0.32,
        ignoreLocation: true,
      }),
    []
  );

  const trimmedQuery = query.trim();

  const results: SearchResult[] = useMemo(() => {
    if (!trimmedQuery) {
      // Por defecto: populares primero
      return toolsIndex
        .filter((t) => t.popular)
        .slice(0, 8);
    }

    const raw = fuse.search(trimmedQuery);
    return raw.slice(0, 12).map((r) => r.item);
  }, [trimmedQuery, fuse]);

  // Atajos de teclado: Ctrl+K / Cmd+K, navegación, Enter, Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Abrir / enfocar con Ctrl+K o Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev + 1 >= results.length ? 0 : prev + 1
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev - 1 < 0 ? results.length - 1 : prev - 1
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const selected = results[activeIndex];
        if (selected) {
          router.push(selected.path);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, results, activeIndex, router]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (tool: ToolMeta) => {
    router.push(tool.path);
    setIsOpen(false);
  };

  const showDropdown = isOpen && (results.length > 0 || !!trimmedQuery);

  const isEmptyState = isOpen && !!trimmedQuery && results.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input principal en la topbar */}
      <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 px-3 py-1 text-[13px] shadow-sm hover:shadow-md transition focus-within:ring-1 focus-within:ring-blue-200/70 dark:focus-within:ring-blue-900/40">
        <Search className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          placeholder="Search tools (Ctrl + K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <span className="hidden md:inline-flex rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 dark:text-slate-500">
          Ctrl + K
        </span>
      </div>

      {/* Dropdown de resultados */}
      <AnimatePresence>
        {showDropdown && !isEmptyState && (
          <motion.div
            className="absolute left-0 mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-20 overflow-hidden"
            initial={{ opacity: 0, y: 4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.15 }}
          >
            <div className="px-3 pt-2 pb-1 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {trimmedQuery
                  ? `Results for “${trimmedQuery}”`
                  : "Popular tools"}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                ↑ ↓ · Enter · Esc
              </span>
            </div>

            <ul className="py-1 max-h-72 overflow-auto">
              {results.map((tool, idx) => {
                const active = idx === activeIndex;
                return (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(tool)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left px-3 py-2 text-sm flex flex-col gap-1 ${
                        active
                          ? "bg-blue-50 dark:bg-blue-950 text-slate-900 dark:text-slate-50"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">
                          {tool.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                          <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5">
                            {tool.category}
                          </span>
                          <span className="hidden sm:inline text-[10px]">
                            {tool.subcategory}
                          </span>
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {tool.description}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {results.length} result{results.length === 1 ? "" : "s"}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                <Sparkles className="h-3 w-3" />
                <span>More tools coming soon</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {isEmptyState && (
          <motion.div
            className="absolute left-0 mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-20 overflow-hidden"
            initial={{ opacity: 0, y: 4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.99 }}
            transition={{ duration: 0.15 }}
          >
            <div className="px-4 py-4 flex flex-col items-center text-center gap-2">
              <Inbox className="h-6 w-6 text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                No tools found for “{trimmedQuery}”.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Maybe this should exist inside 4TBOX. You can request it.
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/request-tool");
                }}
                className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 px-3 py-1.5 text-[11px] font-semibold hover:bg-slate-800 dark:hover:bg-slate-200"
              >
                Request a new tool
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
