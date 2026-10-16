import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { AuthSessionProvider } from "@/components/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X4TAR | Stake Leaderboard & Bonuses",
  description:
    "X4TAR's official Stake wager race leaderboard, exclusive bonuses, and community rewards.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full text-foreground">
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-45 [filter:brightness(0.5)_contrast(1.2)_sepia(0.5)_saturate(0.6)]"
            src="/bg.mp4"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="vignette absolute inset-0" />
          <div className="film-grain absolute inset-0" />
        </div>
        <AuthSessionProvider>
          <AppShell>
            <main className="flex-1">{children}</main>
          </AppShell>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
