"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { RotatingToolCta } from "@/components/rotating-tool-cta";

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
              The modern toolbox
              <br />
              for the internet.
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              Fast, clean and powerful tools for developers, creators and
              curious minds. Format, inspect, convert and debug — all in one
              place.
            </p>
          </div>

          {/* CTA principal */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Botón animado hacker */}
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

        {/* Columna visual X */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div className="relative">
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
            {/* Tarjeta principal */}
            <motion.div
              className="relative rounded-[32px] border border-slate-800 bg-slate-900/80 shadow-[0_0_80px_rgba(15,23,42,0.9)] flex items-center justify-center px-10 py-12"
              whileHover={{ scale: 1.02, rotate: 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <Image
                src="/icon-x.png" // tu X grande
                alt="4TBOX hero mark"
                width={160}
                height={160}
                className="select-none pointer-events-none drop-shadow-[0_0_35px_rgba(56,189,248,0.65)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========== FEATURED TOOLS ========== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-100">
            Featured tools
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
            description="Clean, format and validate JSON instantly."
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
            title="Text Reverse"
            description="Reverse text instantly as you type."
            href="/tools/text/text-reverse"
            badge="New"
          />
          <FeaturedCard
            title="Base64 Encoder"
            description="Encode and decode Base64 easily."
            href="/tools/encode/base64"
          />
          <FeaturedCard
            title="My IP"
            description="Discover your IP and basic network details."
            href="/tools/network/my-ip"
          />
          {/* Nueva featured IA */}
          <FeaturedCard
            title="AI Text Rewriter"
            description="Rewrite your text with different tones using AI."
            href="/tools/ai/text-rewriter"
            badge="Beta"
          />
        </div>
      </section>

      {/* ========== WHY 4TBOX ========== */}
      <section className="grid gap-4 md:grid-cols-3">
        <WhyCard
          icon={<Zap className="h-4 w-4 text-sky-400" />}
          title="Fast and lightweight"
          description="Open a tool, paste what you need, get your result. No dashboards or friction."
        />
        <WhyCard
          icon={<Sparkles className="h-4 w-4 text-indigo-400" />}
          title="Focused by design"
          description="Each tool does one thing well: count, format, convert, clean or inspect."
        />
        <WhyCard
          icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
          title="Made for builders"
          description="Built with developers and creators in mind, with keyboard shortcuts in mind."
        />
      </section>

      {/* ========== CATEGORY PREVIEW ========== */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-100">Toolbox preview</h2>
        <p className="text-xs text-slate-500 max-w-xl">
          A quick glimpse of what&apos;s inside. Browse by category on the tools
          page when you need something specific.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <CategoryPreview
            icon={Type}
            name="Text tools"
            description="Counters, cleaners, converters and text utilities."
          />
          <CategoryPreview
            icon={Code2}
            name="Developer tools"
            description="JSON, UUIDs, regex, hashes and more."
          />
          <CategoryPreview
            icon={Binary}
            name="Encode / Decode"
            description="Base64, URL, minifiers and format converters."
          />
          <CategoryPreview
            icon={Network}
            name="Network & IP"
            description="IP info, DNS and basic network helpers."
          />
          <CategoryPreview
            icon={Shield}
            name="Security"
            description="Passwords, strength checks and safety helpers."
          />
          {/* Ahora esta tarjeta representa IA en vez de Generators */}
          <CategoryPreview
            icon={Wand2}
            name="AI tools"
            description="Rewriters, summarizers and smart assistants."
          />
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
