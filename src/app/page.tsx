import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Gem, MessageCircle, Tv } from "lucide-react";
import { fetchLeaderboard } from "@/lib/stake";
import { BONUSES, MILESTONES } from "@/lib/mock-data";
import { TIER_THEME } from "@/lib/milestone-theme";
import { formatCurrency } from "@/lib/format";
import { CountUp } from "@/components/count-up";
import { BonusCard } from "@/components/bonus-card";
import { SectionHeading } from "@/components/section-heading";
import { YouTubeIcon } from "@/components/youtube-icon";

const PARTICLES = [
  { top: "20%", left: "15%", delay: "0s", size: 6 },
  { top: "30%", left: "80%", delay: "0.6s", size: 4 },
  { top: "65%", left: "10%", delay: "1.2s", size: 5 },
  { top: "75%", left: "88%", delay: "0.3s", size: 6 },
  { top: "15%", left: "50%", delay: "1.6s", size: 4 },
  { top: "85%", left: "45%", delay: "0.9s", size: 5 },
];

export default async function Home() {
  const leaderboard = await fetchLeaderboard();
  const topThree = leaderboard.entries.slice(0, 3);
  const previewBonuses = BONUSES;
  const previewMilestones = MILESTONES.slice(0, 3);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
        <span
          className="scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-accent"
          style={{ boxShadow: "0 0 20px 2px rgba(77, 255, 136, 0.8)" }}
        />

        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="float-particle pointer-events-none absolute rounded-full bg-accent/60"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
          />
        ))}

        <span className="eyebrow-slide text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Stake Wager Race
        </span>
        <h1
          className="hero-pop glow-text mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          style={{ animationDelay: "300ms" }}
        >
          X4<span className="text-accent">TAR</span>
        </h1>
        <p className="rise-in mt-4 max-w-xl text-base text-muted sm:text-lg" style={{ animationDelay: "1300ms" }}>
          Wager races, exclusive bonuses, and community rewards for every player riding with X4TAR on Stake.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://stake.com/?offer=x4"
            target="_blank"
            rel="noreferrer"
            className="cta-flip-pulse rounded-md bg-accent px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
          >
            Play on Stake — Code X4
          </a>
          <Link
            href="/leaderboard"
            className="flip-in-right rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
            style={{ animationDelay: "1900ms" }}
          >
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Live Wager Race"
            title={leaderboard.title}
            description={`Top wagerers split a ${formatCurrency(leaderboard.prizePool, leaderboard.currency)} prize pool.`}
          />
          <Link
            href="/leaderboard"
            className="mb-8 flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Full leaderboard <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border card-surface">
          {topThree.map((entry, i) => (
            <div
              key={entry.rank}
              className={clsx(
                "relative flex items-center gap-4 overflow-hidden px-5 py-4",
                i % 2 === 0 ? "row-pop-left" : "row-pop-right",
                i !== topThree.length - 1 && "border-b border-border",
              )}
              style={{ animationDelay: `${300 + i * 180}ms` }}
            >
              <span
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  i === 0 ? "bg-gold text-black" : "bg-surface-2 text-muted",
                )}
              >
                {entry.rank}
              </span>
              <span className="flex-1 truncate font-semibold text-foreground">{entry.username}</span>
              <span className="text-sm text-muted">{formatCurrency(entry.wagered, leaderboard.currency)}</span>
              <span className="w-20 text-right text-sm font-bold text-accent">
                {formatCurrency(entry.prize, leaderboard.currency)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bonuses preview */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Rewards"
              title="Bonuses & Perks"
              description="Exclusive deposit bonuses and rakeback on top of every race prize."
            />
            <Link
              href="/bonuses"
              className="mb-8 flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              All bonuses <ArrowRight size={14} />
            </Link>
          </div>
          {previewBonuses.map((bonus, i) => (
            <BonusCard key={bonus.id} bonus={bonus} delayMs={300 + i * 220} fromSide="left" />
          ))}
        </div>
      </section>

      {/* Milestones preview */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Challenges"
            title="Milestones"
            description="Lifetime wager tiers that pay out on top of race prizes."
          />
          <Link
            href="/milestones"
            className="mb-8 flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            All milestones <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {previewMilestones.map((milestone, i) => {
            const theme = TIER_THEME[i % TIER_THEME.length];
            return (
              <div
                key={milestone.tier}
                className={clsx(
                  "flip-in-left relative flex flex-col gap-3 overflow-hidden rounded-xl border card-surface p-5",
                  theme.border,
                )}
                style={{ animationDelay: `${300 + i * 200}ms` }}
              >
                <span
                  className="badge-bounce-in flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ animationDelay: `${300 + i * 200 + 300}ms` }}
                >
                  <span className={clsx("flex h-full w-full items-center justify-center rounded-xl", theme.icon)}>
                    <Gem size={18} />
                  </span>
                </span>
                <div>
                  <p className={clsx("text-xs font-extrabold uppercase tracking-wider", theme.label)}>
                    {theme.name}
                  </p>
                  <p className="font-bold text-foreground">{formatCurrency(milestone.wagered)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-muted">Reward</span>
                  <span className="font-bold text-accent">
                    <CountUp value={milestone.reward} format="currency" delayMs={300 + i * 200 + 400} />
                  </span>
                </div>
                <span className="shine-sweep" style={{ animationDelay: `${300 + i * 200 + 600}ms` }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Community CTA */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <SectionHeading eyebrow="Community" title="Join the crew" description="Race alerts, bonus drops, and live streams." />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://discord.com/invite/houseofdegens"
              target="_blank"
              rel="noreferrer"
              className="flip-in-left flex items-center gap-2 rounded-md border border-border bg-surface-2 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent-2"
              style={{ animationDelay: "300ms" }}
            >
              <MessageCircle size={16} className="text-accent-2" /> Discord
            </a>
            <a
              href="https://kick.com/x4tar"
              target="_blank"
              rel="noreferrer"
              className="flip-in-right flex items-center gap-2 rounded-md border border-border bg-surface-2 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
              style={{ animationDelay: "450ms" }}
            >
              <Tv size={16} className="text-accent" /> Kick
            </a>
            <a
              href="https://www.youtube.com/@xatargambles"
              target="_blank"
              rel="noreferrer"
              className="flip-in-left flex items-center gap-2 rounded-md border border-border bg-surface-2 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-danger"
              style={{ animationDelay: "600ms" }}
            >
              <YouTubeIcon size={16} className="text-danger" /> YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
