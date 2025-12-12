import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            About 4TBOX
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            A focused toolbox for developers and makers.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            4TBOX is a collection of small, focused tools designed to help you
            ship faster: text utilities, developer helpers, encoders, converters
            and more — all in one place, without distractions.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-4 space-y-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Why 4TBOX exists
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Instead of opening ten different websites every time you need a
              tiny utility, 4TBOX puts them all under one clean interface.
              Consistent design, predictable behavior, and tools that feel fast.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-4 space-y-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Built for everyday use
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Whether you write, code, design or manage content, 4TBOX gives you
              quick tools for the boring parts: counting, formatting, encoding,
              checking and converting.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            What you can expect
          </h2>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
            <li>· Clean, distraction-free interfaces.</li>
            <li>· Tools that open fast and work in the browser.</li>
            <li>· No login required for the core toolbox.</li>
            <li>· New tools added regularly based on requests.</li>
          </ul>
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Have an idea for a tool that should live inside 4TBOX?
          </p>
          <Link
            href="/request-tool"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Request a tool
          </Link>
        </section>
      </main>
    </div>
  );
}
