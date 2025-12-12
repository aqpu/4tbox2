"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Type,
  Code2,
  Binary,
  Network,
  Shield,
  Wand2,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { RotatingToolCta } from "@/components/rotating-tool-cta";

/**
 * HOME PAGE – 4TBOX v2.0
 */
export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* ========== HERO ========== */}
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
        {/* Columna texto */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-3 py-1 border border-slate-700 text-[11px] text-slate-300 shadow-sm shadow-slate-900/40"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-3 w-3 text-sky-400" />
            <span>4TBOX · Your all-in-one toolbox</span>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
              Online tools for developers,
              <br />
              creators and curious minds.
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              4TBOX reúne herramientas online rápidas y minimalistas para
              formatear JSON, probar regex, contar palabras, convertir formatos,
              trabajar con IPs, usar IA y mucho más — todo en un solo sitio.
            </p>
          </div>

          {/* CTA principal */}
          <div className="flex flex-wrap items-center gap-3">
            <RotatingToolCta />

            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs md:text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Explore all tools
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Bullets pequeños */}
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
            <div className="inline-flex items-center gap-1">
              <Zap className="h-3 w-3 text-sky-400" />
              <span>No login for core tools.</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>Minimal UI, no noise.</span>
            </div>
          </div>
        </motion.div>

        {/* Columna visual – nuevo panel "toolbox" en vez de X */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div className="relative w-full max-w-md">
            {/* Glow animado detrás */}
            <motion.div
              className="absolute -inset-10 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.3),transparent_55%)] blur-3xl"
              initial={{ opacity: 0.4, scale: 0.95 }}
              animate={{ opacity: 0.9, scale: 1.02 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />

            {/* Panel principal simulando dashboard de tools */}
            <motion.div
              className="relative rounded-[28px] border border-slate-800 bg-slate-950/95 shadow-[0_0_80px_rgba(15,23,42,0.9)] px-5 py-4 flex flex-col gap-3 overflow-hidden"
              whileHover={{ scale: 1.02, rotate: 0.2 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              {/* Top bar mini */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live toolbox
                </span>
                <span className="text-slate-500">12 core tools</span>
              </div>

              {/* “JSON Formatter” preview */}
              <motion.div
                className="mt-1 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 space-y-2"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 border border-slate-700 font-mono text-[10px]">
                      JSON
                    </span>
                    JSON Formatter
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    Valid ✓
                  </span>
                </div>
                <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2 text-[11px] font-mono text-slate-300">
                  {`{
  "user": "you",
  "role": "dev",
  "tools": ["json", "regex", "ip"]
}`}
                </div>
              </motion.div>

              {/* Pills de categorías */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 space-y-1">
                  <span className="text-slate-400">Text tools</span>
                  <div className="flex flex-wrap gap-1 text-slate-200">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5">
                      Word Counter
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5">
                      Case Converter
                    </span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 space-y-1">
                  <span className="text-slate-400">Developer</span>
                  <div className="flex flex-wrap gap-1 text-slate-200">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5">
                      Regex Tester
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5">
                      JWT Decoder
                    </span>
                  </div>
                </div>
              </div>

              {/* Línea inferior: IP + Reading time */}
              <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1.5 flex flex-col gap-0.5 text-slate-300">
                  <span className="text-[10px] text-slate-500">Network</span>
                  <span>My IP · 192.168.0.1</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1.5 flex flex-col gap-0.5 text-slate-300">
                  <span className="text-[10px] text-slate-500">Content</span>
                  <span>Reading time · 4 min</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========== BANNER ANUNCIO SUPERIOR (HOME) ========== */}
      <section aria-label="Ad banner top" className="mt-2">
        <div className="w-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-4 py-6 text-center text-xs text-slate-500">
          DevHost · Deploy your Next.js apps in seconds.{" "}
          <span className="underline cursor-pointer">Try free →</span>
        </div>
      </section>

      {/* ========== FEATURED TOOLS ========== */}
      <motion.section
        id="featured-tools"
        className="space-y-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-100">
            Featured tools · popular online utilities
          </h2>
          <Link
            href="/tools"
            className="text-[11px] text-slate-500 hover:text-slate-300"
          >
            View all tools →
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <FeaturedCard
            title="Word Counter"
            description="Count words, characters and typing speed in real time."
            href="/tools/text/word-counter"
            badge="Hot"
          />
          <FeaturedCard
            title="JSON Formatter"
            description="Format and validate JSON online instantly."
            href="/tools/dev/json-formatter"
            badge="Hot"
          />
          <FeaturedCard
            title="Regex Tester"
            description="Test and debug regular expressions live."
            href="/tools/dev/regex-tester"
            badge="Beta"
          />
          <FeaturedCard
            title="Text Diff Checker"
            description="Compare two versions of a text and highlight changes."
            href="/tools/text/text-diff"
            badge="New"
          />
          <FeaturedCard
            title="Base64 Encoder"
            description="Encode and decode Base64 quickly."
            href="/tools/encode/base64"
          />
          <FeaturedCard
            title="My IP"
            description="Check your IP address and basic network details."
            href="/tools/network/my-ip"
          />
          <FeaturedCard
            title="JWT Decoder"
            description="Decode and inspect JWT tokens safely in your browser."
            href="/tools/dev/jwt-decoder"
            badge="Beta"
          />
          <FeaturedCard
            title="Reading Time Estimator"
            description="Estimate how long it will take to read your text."
            href="/tools/calculators/reading-time"
          />
        </div>

        <div className="flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 px-4 py-1.5 text-[11px] font-semibold hover:bg-white"
          >
            Browse the full toolbox
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </motion.section>

      {/* ========== WHY 4TBOX ========== */}
      <motion.section
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <WhyCard
          icon={<Zap className="h-4 w-4 text-sky-400" />}
          title="Fast and lightweight"
          description="Open an online tool, paste what you need, and get your result. No dashboards, no friction."
        />
        <WhyCard
          icon={<Sparkles className="h-4 w-4 text-indigo-400" />}
          title="Focused by design"
          description="Each tool does one thing well: count, format, convert, clean or inspect text, JSON and more."
        />
        <WhyCard
          icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
          title="Built for builders"
          description="Designed for developers, makers and creators that live in the browser and need reliable utilities."
        />
      </motion.section>

      {/* ========== TOOLBOX PREVIEW (CATEGORÍAS) ========== */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h2 className="text-sm font-semibold text-slate-100">
          Toolbox preview · categories
        </h2>
        <p className="text-xs text-slate-500 max-w-xl">
          4TBOX agrupa herramientas online por categoría: texto, desarrollo,
          encode / decode, red, seguridad, colores, calculadoras e IA. Salta
          rápido a la categoría que necesitas o explora todo el catálogo más
          abajo.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <CategoryPreview
            icon={Type}
            name="Text tools"
            description="Word counter, text case converter, cleaners and more online text utilities."
          />
          <CategoryPreview
            icon={Code2}
            name="Developer tools"
            description="JSON formatter, regex tester, JWT decoder and developer helpers."
          />
          <CategoryPreview
            icon={Binary}
            name="Encode / Decode"
            description="Base64, URL encode/decode and format conversion tools."
          />
          <CategoryPreview
            icon={Network}
            name="Network & IP"
            description="My IP, user-agent viewer and network helpers."
          />
          <CategoryPreview
            icon={Shield}
            name="Security"
            description="Password generators, hash creators and security utilities."
          />
          <CategoryPreview
            icon={Wand2}
            name="AI tools"
            description="AI rewriters, summarizers and smart assistants for text (coming soon)."
          />
        </div>
      </motion.section>

      {/* ========== BANNER ANUNCIO INTERMEDIO ========== */}
      <section aria-label="Mid content ad banner">
        <div className="w-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-4 py-6 text-center text-xs text-slate-500">
          ProxyGuard · Smart firewall for your API endpoints.{" "}
          <span className="underline cursor-pointer">Secure it now →</span>
        </div>
      </section>

      {/* ========== ALL TOOLS BY CATEGORY (SEO + IMPORTANCIA) ========== */}
      <section className="space-y-4">
        {/* Header de sección reforzado visualmente */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
              <Layers className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                All tools by category · full index
              </h2>
              <p className="text-[11px] text-slate-500 max-w-xl">
                Este es el índice completo de herramientas online de 4TBOX:
                word counter, JSON formatter, regex tester, Base64 encoder,
                URL decoder, IP tools, calculadoras y herramientas con IA.
                Ideal para descubrir utilidades y para SEO.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 border border-slate-700">
              Navega por todas las herramientas sin salir de la home.
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 border border-slate-700/60">
              Palabras clave: JSON formatter online, regex tester, word counter,
              Base64 decoder…
            </span>
          </div>
        </div>

        {/* Contenido + espacio anuncio lateral en desktop */}
        {/* Aquí mantienes tu lógica actual de allToolSections y AdSlot */}
        {/* ... (tu bloque actual de allToolSections tal como lo tienes) */}
      </section>

      {/* ========== SUPPORT / BUY ME A COFFEE ========== */}
      <section className="space-y-3">
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left space-y-1">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">
              Support
            </p>
            <p className="text-sm text-slate-200">
              If 4TBOX saves you time every week, consider buying a coffee to
              keep the toolbox growing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 px-4 py-2 text-xs font-semibold hover:bg-white">
              Buy me a coffee
            </button>
            <span className="text-[11px] text-slate-500 hidden md:inline">
              Helps pay servers, AI credits and new tools.
            </span>
          </div>
        </div>
      </section>

      {/* ========== ABOUT / STORY SECTION – SIN X ========== */}
      <section className="mt-4 rounded-3xl bg-slate-950/80 border border-slate-800 px-5 py-6 md:px-8 md:py-8 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-center">
        {/* Ilustración: cards de herramientas en vez de X */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative w-full max-w-sm"
          >
            <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.3),transparent_55%)] blur-3xl opacity-70" />
            <div className="relative rounded-[28px] border border-slate-800 bg-slate-900/90 px-5 py-5 space-y-3">
              <p className="text-[11px] text-slate-400 uppercase tracking-[0.16em]">
                Snapshot
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>JSON Formatter</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[10px]">
                    JSON
                  </span>
                </div>
                <div className="h-10 rounded-xl bg-slate-950/80 border border-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Word Counter</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[10px]">
                    TXT
                  </span>
                </div>
                <div className="h-6 rounded-xl bg-slate-950/80 border border-slate-800" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>My IP</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[10px]">
                    IP
                  </span>
                </div>
                <div className="h-6 rounded-xl bg-slate-950/80 border border-slate-800" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Texto SEO / historia */}
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
            Best Online All-In-One Toolbox
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Stop jumping between dozens of random online tools.
          </h2>
          <p className="text-sm text-slate-400">
            4TBOX brings the most common online tools together in one clean
            place: JSON formatter, regex tester, word counter, Base64 encoder,
            URL encoder / decoder, IP lookup, AI text helpers and more. Focus
            on your work instead of hunting tools on Google.
          </p>
          <p className="text-sm text-slate-400">
            Every tool is designed to be fast, distraction-free and keyboard
            friendly. Open, paste, get the result and move on. No login is
            required for core tools, and AI / PRO features will be optional.
          </p>
          <p className="text-xs text-slate-500">
            Start using 4TBOX as your daily toolbox for development, content and
            quick checks — and forget about bookmarking one-off websites.
          </p>
        </div>
      </section>

      {/* ========== FOOTER MINI ========== */}
      <section className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p>
          4TBOX is in early access. Tools and UX will keep evolving based on
          what people actually use.
        </p>
        <Link
          href="/changelog"
          className="underline underline-offset-2 hover:text-slate-300"
        >
          View changelog
        </Link>
      </section>
    </main>
  );
}

/* ========= CARDS ========= */

type FeaturedCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: "Hot" | "New" | "Beta";
};

function FeaturedCard({ title, description, href, badge }: FeaturedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <Link
        href={href}
        className="group rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 flex flex-col justify-between hover:border-slate-600 hover:bg-slate-900/80 transition-colors"
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
            {badge && (
              <span
                className={
                  "text-[10px] px-2 py-0.5 rounded-full font-medium " +
                  (badge === "Hot"
                    ? "bg-rose-500/10 text-rose-300 border border-rose-500/40"
                    : badge === "New"
                    ? "bg-sky-500/10 text-sky-300 border border-sky-500/40"
                    : "bg-amber-500/10 text-amber-300 border border-amber-500/40")
                }
              >
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">{description}</p>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Open tool</span>
          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
        </div>
      </Link>
    </motion.div>
  );
}

type WhyCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function WhyCard({ icon, title, description }: WhyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2"
    >
      <div className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400">{description}</p>
    </motion.div>
  );
}

type CategoryPreviewProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  description: string;
};

function CategoryPreview({ icon: Icon, name, description }: CategoryPreviewProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-1"
    >
      <div className="flex items-center gap-2">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-700">
          <Icon className="h-4 w-4 text-slate-100" />
        </div>
        <h3 className="text-sm font-semibold text-slate-100">{name}</h3>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </motion.div>
  );
}
