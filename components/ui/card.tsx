import * as React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white shadow-sm border rounded-lg ${className}`}>
      {children}
    </div>
  );
}
