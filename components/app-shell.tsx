"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "";

  // Solo mostrar sidebar en rutas que empiezan por /tools/
  const isToolPage =
    pathname.startsWith("/tools/") && pathname !== "/tools";

  if (isHome) {
    // Home tipo landing, sin sidebar
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
        {children}
      </main>
    );
  }

  if (isToolPage) {
    // Layout de páginas individuales de herramientas
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-5xl mx-auto w-full px-4 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Para el resto de páginas — sin sidebar
  return (
    <main className="max-w-5xl mx-auto w-full px-4 py-6 md:py-10 min-h-[calc(100vh-3.5rem)]">
      {children}
    </main>
  );
}
