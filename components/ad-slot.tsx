"use client";

type AdSlotProps = {
  id: string;
  label?: string;
  className?: string;
};

export function AdSlot({ id, label = "Ad space", className }: AdSlotProps) {
  return (
    <div
      data-ad-slot-id={id}
      className={`rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 px-3 py-2 text-center text-[11px] text-slate-400 dark:text-slate-500 ${className ?? ""}`}
    >
      {label} · futuro espacio para anuncios
    </div>
  );
}
