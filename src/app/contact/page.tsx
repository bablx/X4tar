import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Headset, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TelegramIcon } from "@/components/telegram-icon";
import { InstagramIcon } from "@/components/instagram-icon";

export const metadata: Metadata = { title: "Contact Us | Pasut" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="anim-heading flex flex-col items-center text-center">
        <span
          className="badge-bounce-in flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-[0_0_30px_rgba(77,255,136,0.25)]"
          style={{ animationDelay: "150ms" }}
        >
          <Headset size={28} />
        </span>
        <div className="mt-5">
          <SectionHeading
            eyebrow="Support"
            title="Contact Us"
            description="Need help with a bonus, payout, or your account? Here's the fastest way to reach the team."
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="https://discord.com/invite/tWDUCy4Dbz"
          target="_blank"
          rel="noreferrer"
          className="flip-in-left group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border card-surface p-7 transition hover:-translate-y-1 hover:border-accent-2"
          style={{ animationDelay: "350ms" }}
        >
          <span
            className="coin-spin flex h-14 w-14 items-center justify-center rounded-xl bg-accent-2/15 text-accent-2 shadow-[0_0_24px_rgba(155,107,255,0.3)]"
            style={{ animationDelay: "800ms" }}
          >
            <MessageCircle size={26} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="pulse-live h-2 w-2 rounded-full bg-accent-2" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-2">~2 hour response</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">Discord Support</h3>
            <p className="mt-1.5 text-sm text-muted">
              Open a ticket in our Discord server. Fastest way to reach the team for anything race or bonus related.
            </p>
          </div>
          <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-accent-2">
            Open Discord
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1150ms" }} />
        </a>

        <a
          href="https://t.me/bobdrop777"
          target="_blank"
          rel="noreferrer"
          className="flip-in-right group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border card-surface p-7 transition hover:-translate-y-1 hover:border-sky-400"
          style={{ animationDelay: "500ms" }}
        >
          <span
            className="coin-spin flex h-14 w-14 items-center justify-center rounded-xl bg-sky-400/15 text-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.3)]"
            style={{ animationDelay: "950ms" }}
          >
            <TelegramIcon size={26} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-muted" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Drops &amp; alerts</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">Telegram</h3>
            <p className="mt-1.5 text-sm text-muted">
              Join the channel for bonus drops, race alerts, and quick announcements.
            </p>
          </div>
          <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-sky-400">
            Open Telegram
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1300ms" }} />
        </a>

        <a
          href="https://www.instagram.com/pasutabstra"
          target="_blank"
          rel="noreferrer"
          className="flip-in-left group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border card-surface p-7 transition hover:-translate-y-1 hover:border-rose-400 sm:col-span-2 lg:col-span-1"
          style={{ animationDelay: "650ms" }}
        >
          <span
            className="coin-spin flex h-14 w-14 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.3)]"
            style={{ animationDelay: "1100ms" }}
          >
            <InstagramIcon size={26} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-muted" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Behind the scenes</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">Instagram</h3>
            <p className="mt-1.5 text-sm text-muted">
              Follow for highlights, announcements, and behind-the-scenes posts.
            </p>
          </div>
          <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-rose-400">
            Open Instagram
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1450ms" }} />
        </a>
      </div>

      <div
        className="stamp-in mt-6 flex flex-col items-center gap-4 rounded-2xl border border-border card-surface px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
        style={{ animationDelay: "1200ms" }}
      >
        <p className="text-sm text-muted">
          Most questions — races, bonuses, payouts — are already answered in the FAQ.
        </p>
        <Link
          href="/rules"
          className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-surface-2 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
        >
          <BookOpen size={16} />
          Check the FAQ
        </Link>
      </div>
    </div>
  );
}
