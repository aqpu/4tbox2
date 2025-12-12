"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Upload, Download } from "lucide-react";

export function ToolTemplate({
  title,
  subtitle,
  badge,
  description,
  actions = [],
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  actions?: {
    label: string;
    icon?: any;
    onClick?: () => void;
  }[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>

          {badge && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-blue-600/10 text-blue-600 dark:text-blue-300 dark:bg-blue-500/10">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-slate-500 dark:text-slate-500 text-xs">
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {a.icon && <a.icon className="w-4 h-4" />}
              {a.label}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        {children}
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-500 dark:text-slate-500">
        This tool runs fully in your browser — no data is sent to any server.
      </p>
    </div>
  );
}
