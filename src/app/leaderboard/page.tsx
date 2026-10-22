import type { Metadata } from "next";
import { fetchLeaderboard } from "@/lib/stake";
import { LeaderboardPodium } from "@/components/leaderboard-podium";
import { RankList } from "@/components/rank-list";
import { SectionHeading } from "@/components/section-heading";
import { Countdown } from "@/components/countdown";

export const metadata: Metadata = { title: "Leaderboard | Pasut" };

export default async function LeaderboardPage() {
  const leaderboard = await fetchLeaderboard();
  const rest = leaderboard.entries.filter((e) => e.rank >= 4 && e.rank <= 10);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="anim-heading">
        <SectionHeading eyebrow="Stake Wager Race" title={leaderboard.title} />
      </div>

      <div
        className="rise-in card-surface mb-10 flex w-fit flex-col gap-3 rounded-2xl border border-border px-5 py-4"
        style={{ animationDelay: "450ms" }}
      >
        <div className="flex items-center gap-2">
          <span className="pulse-live h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Race ends in</span>
        </div>
        <Countdown initialDuration={{ days: 8, hours: 8, minutes: 28, seconds: 0 }} />
      </div>

      <LeaderboardPodium entries={leaderboard.entries} currency={leaderboard.currency} />

      <div className="mt-12">
        <RankList entries={rest} currency={leaderboard.currency} />
      </div>
    </div>
  );
}
