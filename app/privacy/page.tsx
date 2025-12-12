export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Privacy
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            How 4TBOX handles your data.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            This is a simple summary. You can refine it into a full privacy policy
            later, depending on analytics, logging and accounts you add.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <ul className="space-y-1.5">
            <li>
              · Tools are designed to run in the browser. Avoid pasting highly
              sensitive information unless you trust the environment.
            </li>
            <li>
              · If analytics are added in the future, they will focus on
              anonymous usage patterns, not personal identities.
            </li>
            <li>
              · If accounts or paid features are introduced, this page will be
              updated to reflect how account data is stored and used.
            </li>
          </ul>

          <p>
            For now, 4TBOX is a pre-release project focused on utility. The goal
            is to keep data handling minimal and transparent.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500">
          When you know exactly which services (analytics, auth, payments) you’ll
          use, you can expand this page with precise details.
        </section>
      </main>
    </div>
  );
}
