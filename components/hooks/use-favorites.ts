"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "4tbox:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setFavorites(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const toggleFavorite = (id: string) => {
    persist(
      favorites.includes(id)
        ? favorites.filter((x) => x !== id)
        : [...favorites, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
