import type { ReactNode } from "react";
import { ToolPageShell } from "@/components/tools/ToolPageShell";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <ToolPageShell>{children}</ToolPageShell>;
}
