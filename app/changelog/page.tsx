const entries = [
  {
    version: "v0.1.4",
    date: "2025-11-30",
    items: [
      "Redesigned /tools into a full catalog page with categories, pills navigation and badges (Hot, Popular, New, Beta, Soon).",
      "Added a roadmap of upcoming tools across all categories, including a global 'Coming next to 4TBOX' section.",
      "Implemented Soon tools with subtle skeleton-style cards and 'Notify me' / 'Ask for priority' links pointing to /request-tool.",
      "Marked key tools as Hot (Word Counter, JSON Formatter, My IP, Password Generator) to highlight what users are most likely to open.",
      "Created product pages: /about, /request-tool, /changelog, /contact, /terms and /privacy with a consistent 4TBOX layout.",
      "Adjusted the AppShell so /tools renders without sidebar, while individual tools under /tools/... still use the toolbox sidebar.",
      "Refined form UIs in /request-tool and /contact to be App Router–friendly without client event handlers.",
    ],
  },
  {
    version: "v0.1.3",
    date: "2025-11-29",
    items: [
      "Initial /tools overview page with grouped categories and basic badges.",
      "Early roadmap concept for future tools inside the toolbox.",
      "Improved consistency between the sidebar navigation and the tools catalog.",
    ],
  },
  {
    version: "v0.1.2",
    date: "2025-11-29",
    items: [
      "Introduced 4TBOX branding, topbar and logo, replacing the old AllToolsHub naming in the UI.",
      "Improved global search UX with inline suggestions while typing.",
      "Refined dark mode styles for core tools and layout surfaces.",
    ],
  },
  {
    version: "v0.1.1",
    date: "2025-11-28",
    items: [
      "Enhanced Word Counter with live metrics, typing speed and test-style usage.",
      "Improved JSON Formatter UX and dark mode integration.",
      "Created a sidebar navigation grouped by category and subcategory for tools.",
    ],
  },
  {
    version: "v0.1.0",
    date: "2025-11-27",
    items: [
      "Initial 4TBOX toolkit foundation and core layout with topbar and content shell.",
      "First tools: Word Counter, Text Reverse, JSON Formatter, UUID Generator, Regex Tester.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Changelog
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            What’s new in 4TBOX.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A simple list of changes as the toolbox grows. No marketing fluff —
            just what actually shipped.
          </p>
        </section>

        <section className="space-y-4">
          {entries.map((entry) => (
            <article
              key={entry.version}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                    {entry.version}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-500">
                  {entry.date}
                </span>
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                {entry.items.map((item, i) => (
                  <li key={i}>· {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            4TBOX is pre-release software. Expect frequent changes while the core toolbox
            and experience are being shaped.
          </p>
        </section>
      </main>
    </div>
  );
}
