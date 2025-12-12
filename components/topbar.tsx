"use client";

import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  Sun,
  Moon,
  Github,
  ChevronDown,
  ChevronUp,
  Grid2X2,
  Sparkles,
  MessageCircle,
  History,
  Shield,
  Info,
  Mail,
  Scale,
  Eye,
  FileText,
} from "lucide-react";
import { useTheme } from "next-themes";
import { GlobalSearch } from "@/components/global-search";
import { MobileSidebar } from "@/components/sidebar";
import { MenuDropdownV2 } from "@/components/menu-dropdown-v2";


/* ================= TOPBAR ================= */

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme ?? theme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Cierre al hacer click fuera o pulsar Esc
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logo 4TBOX navbar */}
          <Link href="/" className="flex items-center select-none">
            <motion.div
              whileHover={{ scale: 1.03, x: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center cursor-pointer"
            >
              <Image
                src={isDark ? "/logo-4tbox-nav-dark.png" : "/logo-4tbox-nav.png"}
                alt="4TBOX logo"
                width={90}
                height={24}
                priority
                className="select-none pointer-events-none"
              />
            </motion.div>
          </Link>

          {/* Botón menú móvil (abre sidebar de tools) */}
          <button
            className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Buscador global centrado y compacto */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-sm">
              <GlobalSearch />
            </div>
          </div>

          {/* Zona derecha – md+ */}
          <div className="hidden md:flex items-center gap-2 text-[11px]">
            {/* Toggle theme */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-7 w-7 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/4tbox"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-7 w-7 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>

            {/* Botón de menú + dropdown centrado debajo */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 text-slate-50 px-3 py-1 text-[11px] font-medium hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span>Menu</span>
                {menuOpen ? (
                  <ChevronUp className="h-3 w-3 text-slate-300 dark:text-slate-600" />
                ) : (
                  <ChevronDown className="h-3 w-3 text-slate-300 dark:text-slate-600" />
                )}
              </button>

                  <MenuDropdownV2 open={menuOpen} onSelect={closeMenu} />
            </div>

            {/* Versión */}
            <span className="hidden lg:inline-flex rounded-full bg-slate-100 dark:bg-slate-900 px-2 py-1 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
              v0.1 · Early access
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar móvil de tools */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ========= DATA DEL MENÚ ========= */

type MenuItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  status?: "soon";
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const MENU_GROUPS: MenuGroup[] = [
  {
    title: "Toolbox",
    items: [
      {
        label: "Explore all tools",
        href: "/tools",
        icon: <Grid2X2 className="h-3.5 w-3.5" />,
      },
      {
        label: "Featured tools",
        href: "/#featured-tools",
        icon: <Sparkles className="h-3.5 w-3.5" />,
      },
      {
        label: "Request a tool",
        href: "/request-tool",
        icon: <MessageCircle className="h-3.5 w-3.5" />,
      },
      {
        label: "Changelog",
        href: "/changelog",
        icon: <History className="h-3.5 w-3.5" />,
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        label: "4TBOX PRO",
        href: "/pro",
        icon: <Shield className="h-3.5 w-3.5" />,
      },
      {
        label: "Roadmap",
        href: "/roadmap",
        icon: <FileText className="h-3.5 w-3.5" />,
        status: "soon",
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        label: "About 4TBOX",
        href: "/about",
        icon: <Info className="h-3.5 w-3.5" />,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: <Mail className="h-3.5 w-3.5" />,
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        label: "Terms of use",
        href: "/terms",
        icon: <Scale className="h-3.5 w-3.5" />,
      },
      {
        label: "Privacy policy",
        href: "/privacy",
        icon: <Eye className="h-3.5 w-3.5" />,
      },
    ],
  },
];

/* ========= DROPDOWN MENU ========= */

function MenuDropdown({
  open,
  onSelect,
}: {
  open: boolean;
  onSelect: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 8, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 
            bg-white/95 dark:bg-slate-950/95 shadow-xl shadow-slate-900/40 backdrop-blur-sm z-50 overflow-hidden"
          role="menu"
        >
          {/* Header mini */}
          <div className="px-3 pt-2 pb-1 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400">
                Quick navigation
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Jump to tools, product pages and more.
              </span>
            </div>
            <span className="rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 text-[10px] text-slate-500 dark:text-slate-400">
              Esc to close
            </span>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800" />

          {/* Contenido */}
          <div className="max-h-[360px] overflow-y-auto py-1">
            {MENU_GROUPS.map((group, groupIndex) => (
              <div key={group.title}>
                {groupIndex > 0 && (
                  <div className="my-1 border-t border-slate-100 dark:border-slate-900" />
                )}

                <div className="px-3 py-1.5">
                  <p className="mb-1 text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-500">
                    {group.title}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <DropdownItem
                        key={item.label}
                        href={item.href}
                        onSelect={onSelect}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon && (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                              {item.icon}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[11px] text-slate-800 dark:text-slate-100">
                            {item.label}
                            {item.status === "soon" && (
                              <span className="text-[9px] uppercase text-sky-500">
                                Soon
                              </span>
                            )}
                          </span>
                        </div>
                      </DropdownItem>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA inferior */}
          <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-3">
            <Link
              href="/tools/dev/json-formatter"
              onClick={onSelect}
              className="flex items-center justify-between rounded-xl bg-slate-900 text-slate-50 px-3 py-2 text-[11px] font-semibold hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <span>Start with JSON Formatter</span>
              <Menu className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ========= ITEM ========= */

function DropdownItem({
  href,
  onSelect,
  children,
}: {
  href: string;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="block px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
    >
      {children}
    </Link>
  );
}
