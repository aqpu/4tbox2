import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <section className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            Contact
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Reach out about 4TBOX.
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Feedback, bug reports, ideas or collaboration — a short message is enough.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-5 space-y-4">
            {/* Form solo UI, sin onSubmit */}
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Name (optional)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="How should we call you?"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="We’ll reply here."
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                  placeholder="Share your feedback, ideas or issues..."
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-4 py-2 text-xs font-semibold hover:opacity-90"
              >
                Send message (UI only for now)
              </button>
            </form>
          </div>

          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-4 space-y-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Direct email
              </h2>
              <p className="text-sm">
                Prefer your email client? You can write directly to:
              </p>
              <a
                href="mailto:hello@4tbox.app"
                className="text-sm font-medium text-slate-900 dark:text-slate-50 underline underline-offset-2"
              >
                hello@4tbox.app
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 p-4 space-y-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Feature ideas
              </h2>
              <p className="text-sm">
                If your message is about a new tool or feature, using the{" "}
                <Link
                  href="/request-tool"
                  className="underline underline-offset-2"
                >
                  request form
                </Link>{" "}
                makes it easier to track.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
