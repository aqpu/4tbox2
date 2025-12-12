"use client";

import { useState } from "react";
import { ToolTemplate } from "@/components/tools/ToolTemplate";

export default function Page() {
  const [text, setText] = useState("");

  return (
    <ToolTemplate
      title="Text Reverse"
      subtitle="Reverse text instantly as you type."
      badge="New"
      description="Paste or type text and see the reversed output live."
      actions={[
        { label: "Clear", onClick: () => setText("") },
        { label: "Copy", onClick: () => navigator.clipboard.writeText(text) },
      ]}
    >
      <textarea
        className="w-full h-40 p-3 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
        value={text}
        onChange={(e) => setText(e.target.value.split("").reverse().join(""))}
      />
    </ToolTemplate>
  );
}
