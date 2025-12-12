export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Terms of use
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Basic terms for using 4TBOX.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            This is a simple, non-legalistic summary of how 4TBOX is intended to
            be used. You can refine or replace this text later with a full policy.
          </p>
        </section>

        <section className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <p>By using 4TBOX you agree that:</p>
          <ul className="space-y-1.5">
            <li>· You use the tools at your own risk.</li>
            <li>· You won’t use 4TBOX for illegal or harmful activities.</li>
            <li>· You won’t try to break, abuse or overload the service.</li>
            <li>
              · You are responsible for any data you paste into the tools
              (especially sensitive or private data).
            </li>
          </ul>

          <p>
            4TBOX is provided “as is”, without guarantees. The goal is to keep it
            fast, useful and reliable, but availability cannot be promised.
          </p>
        </section>

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500">
          You can update this page later with full legal wording if needed.
        </section>
      </main>
    </div>
  );
}
