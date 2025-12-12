"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Share2, Star } from "lucide-react";
import { useFavorites } from "@/components/hooks/use-favorites";

const categoryLabels: Record<string, string> = {
  text: "Text tools",
  dev: "Developer tools",
  encode: "Encode / Decode",
  security: "Security tools",
  network: "Network & IP",
  image: "Image tools",
  color: "Color tools",
  calculators: "Calculators",
  ai: "AI tools",
};

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export function ToolPageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/tools";
  const segments = pathname.split("/").filter(Boolean); // ["tools","text","word-counter"]

  // id único para favoritos
  const id = segments.join("-");

  const slug = segments[segments.length - 1] || "tool";
  const title = toTitle(slug);

  const categorySlug = segments[1] || "tools";
  const categoryLabel =
    categoryLabels[categorySlug] || "Tools";

  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);

  const handleShare = async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : undefined;
    if (!url) return;

    const shareData = {
      title: `${title} · 4TBOX`,
      text: `Online ${title.toLowerCase()} tool by 4TBOX.`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard.");
      } else {
        alert(url);
      }
    } catch {
      // usuario canceló, no pasa nada
    }
  };

  const handleFavorite = () => {
    toggleFavorite(id);
  };

  return (
    <div className="space-y-4">
      {/* Header + acciones (compartido por TODAS las tools) */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 border border-slate-700 text-[10px] uppercase tracking-[0.16em] text-slate-400">
            {categoryLabel}
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
            {title}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Online {title.toLowerCase()} tool by 4TBOX.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-200 hover:bg-slate-800"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={handleFavorite}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] ${
              fav
                ? "border-amber-400 bg-amber-500/10 text-amber-300"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            }`}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                fav ? "fill-amber-300 text-amber-300" : ""
              }`}
            />
            <span>{fav ? "Favorited" : "Favorite"}</span>
          </button>
        </div>
      </div>

      {/* Contenido específico de la herramienta */}
      <div className="mt-2">{children}</div>
    </div>
  );
}
