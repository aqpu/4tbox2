"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleToggle = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    setTheme(next);
    // guardamos también en cookie 1 año
    document.cookie = `theme=${next}; max-age=31536000; path=/`;
  };

  if (!mounted) return null;

  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md transition"
      aria-label="Toggle theme"
    >
      <span className="text-xs">{isDark ? "☀" : "🌙"}</span>
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
