import clsx from "clsx";
import type { LeaderboardEntry } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { CountUp } from "@/components/count-up";

const AVATAR_COLORS = [
  "bg-rose-500/15 text-rose-300",
  "bg-sky-500/15 text-sky-300",
  "bg-emerald-500/15 text-emerald-300",
  "bg-violet-500/15 text-violet-300",
  "bg-amber-500/15 text-amber-300",
  "bg-cyan-500/15 text-cyan-300",
  "bg-pink-500/15 text-pink-300",
];

const ROW_BASE_DELAY = 5000;
const ROW_STAGGER = 550;

export function RankList({ entries, currency }: { entries: LeaderboardEntry[]; currency: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border card-surface">
      {entries.map((entry, i) => {
        const rowDelay = ROW_BASE_DELAY + i * ROW_STAGGER;
        const fromLeft = i % 2 === 0;

        return (
          <div
            key={entry.rank}
            className={clsx(
              "relative flex items-center gap-4 overflow-hidden px-5 py-4",
              fromLeft ? "row-pop-left" : "row-pop-right",
              i !== entries.length - 1 && "border-b border-border",
            )}
            style={{ animationDelay: `${rowDelay}ms` }}
          >
            <span className="w-5 shrink-0 text-lg font-bold text-foreground">{entry.rank}</span>
            <span
              className={clsx(
                "avatar-spin-in flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                AVATAR_COLORS[i % AVATAR_COLORS.length],
              )}
              style={{ animationDelay: `${rowDelay + 150}ms` }}
            >
              {entry.username.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-foreground">{entry.username}</p>
              <p className="truncate text-sm text-muted">Wagered {formatCurrency(entry.wagered, currency)}</p>
            </div>
            <span className="shrink-0 text-xl font-bold text-accent tabular-nums">
              <CountUp value={entry.prize} format="currency" currency={currency} delayMs={rowDelay + 300} />
            </span>
            <span className="shine-sweep" style={{ animationDelay: `${rowDelay + 600}ms` }} />
          </div>
        );
      })}
    </div>
  );
}
