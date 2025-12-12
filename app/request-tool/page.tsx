import Link from "next/link";

export default function RequestToolPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Request a tool
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Tell us what you’d like to see inside 4TBOX.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            If there’s a tool you use often — or something you keep rebuilding
            from scratch — describe it here. This helps decide what to build
            next and which tools get priority.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-5 space-y-4">
          {/* No onSubmit ni action/method: solo UI por ahora */}
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="tool-name"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Tool name
              </label>
              <input
                id="tool-name"
                name="tool-name"
                type="text"
                placeholder="e.g. CSV to JSON Pro, JWT Inspector..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="tool-details"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                What should this tool do?
              </label>
              <textarea
                id="tool-details"
                name="tool-details"
                rows={4}
                placeholder="Describe the input, the output and what problem it solves for you..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="tool-usage"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                How often would you use it?
              </label>
              <select
                id="tool-usage"
                name="tool-usage"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="">Select an option</option>
                <option>Every day</option>
                <option>A few times a week</option>
                <option>A few times a month</option>
                <option>Rarely, but critical when needed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Email (optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Only if you’d like a follow-up when it ships."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-500">
                We won’t send newsletters. Only occasional updates about your request.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-4 py-2 text-xs font-semibold hover:opacity-90"
            >
              Submit request (UI only for now)
            </button>
          </form>
        </section>

        <section className="text-xs text-slate-500 dark:text-slate-500">
          You can also{" "}
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-slate-300"
          >
            contact directly
          </Link>{" "}
          if your idea needs more context.
        </section>
      </main>
    </div>
  );
}
