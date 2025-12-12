import type { Metadata } from "next";
import "./globals.css";
import { AppThemeProvider } from "@/components/theme-provider";
import { Topbar } from "@/components/topbar";
import { AppShell } from "@/components/app-shell";

export const metadata = {
  title: "4TBOX · Online toolbox for developers and creators",
  description:
    "4TBOX is an all-in-one online toolbox with JSON formatter, regex tester, word counter, Base64 encoder, URL decoder, IP checker, AI tools and more.",
  metadataBase: new URL("https://tu-dominio.com"),
  openGraph: {
    title: "4TBOX · Online toolbox for developers and creators",
    description:
      "Clean, fast and minimal tools: JSON formatter online, regex tester, word counter, Base64 decoder, URL encoder, IP tools and AI assistants.",
    url: "https://tu-dominio.com",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <AppThemeProvider>
          <Topbar />
          <AppShell>{children}</AppShell>
        </AppThemeProvider>
      </body>
    </html>
  );
}

