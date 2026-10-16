import clsx from "clsx";
import type { CSSProperties } from "react";
import { Crown } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/types";
import { formatCurrency } from "@/lib/format";

const RANK_STYLE: Record<
  number,
  {
    block: string;
    crown: string;
    crownGlow: string;
    height: string;
    order: string;
    cardAnim: string;
    cardDelay: number;
    barDelay: number;
    fillLevel: number;
  }
> = {
  // 3rd in from the right first, then 2nd from the left, then 1st drops in last.
  3: { block: "bg-amber-700", crown: "text-amber-600", crownGlow: "anim-crown-glow-bronze", height: "h-24", order: "order-3", cardAnim: "anim-pop-right", cardDelay: 600, barDelay: 1000, fillLevel: 55 },
  2: { block: "bg-slate-300", crown: "text-slate-400", crownGlow: "anim-crown-glow-silver", height: "h-28", order: "order-1", cardAnim: "anim-pop-left", cardDelay: 1400, barDelay: 1800, fillLevel: 75 },
  1: { block: "bg-gold", crown: "text-gold", crownGlow: "anim-crown-glow-gold", height: "h-40", order: "order-2", cardAnim: "anim-drop-top", cardDelay: 2200, barDelay: 2900, fillLevel: 100 },
};

function PodiumCard({ entry, currency }: { entry: LeaderboardEntry; currency: string }) {
  const style = RANK_STYLE[entry.rank];
  const liquidDelay = style.barDelay + 500;
  const settleDelay = liquidDelay + 1200;

  return (
    <div
      className={clsx(style.cardAnim, "flex w-28 flex-col items-center sm:w-32", style.order)}
      style={{ animationDelay: `${style.cardDelay}ms` }}
    >
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-surface-2 text-lg font-bold text-foreground sm:h-20 sm:w-20">
          {entry.username.charAt(0).toUpperCase()}
        </div>
        <span
          className={clsx(
            "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background",
            style.crown,
            style.crownGlow,
          )}
          style={{ animationDelay: `${settleDelay}ms` }}
        >
          <Crown size={13} />
        </span>
      </div>
      <p className="mt-3 max-w-full truncate text-sm font-semibold text-foreground">{entry.username}</p>
      <p className="text-sm text-muted">Wagered {formatCurrency(entry.wagered, currency)}</p>
      <p className="text-sm font-semibold text-accent">Prize {formatCurrency(entry.prize, currency)}</p>
      <div
        className={clsx(
          "grow-up relative mt-3 w-full overflow-hidden rounded-t-xl border border-border/60 bg-surface-2/40 text-2xl font-extrabold text-black",
          style.height,
        )}
        style={{ animationDelay: `${style.barDelay}ms` }}
      >
        <span
          className="absolute inset-x-0 z-10 text-center"
          style={{ bottom: `${style.fillLevel / 2}%`, transform: "translateY(50%)" }}
        >
          {entry.rank}
        </span>
        <div
          className={clsx("liquid-fill", style.block)}
          style={{ animationDelay: `${liquidDelay}ms`, "--fill-level": `${style.fillLevel}%` } as CSSProperties}
        >
          <span className={clsx("liquid-wave", style.block)} />
          <span className={clsx("liquid-wave liquid-wave-2", style.block)} />
        </div>
        <span className="shine-sweep z-20" style={{ animationDelay: `${settleDelay}ms` }} />
      </div>
    </div>
  );
}

export function LeaderboardPodium({ entries, currency }: { entries: LeaderboardEntry[]; currency: string }) {
  const top3 = [1, 2, 3]
    .map((rank) => entries.find((e) => e.rank === rank))
    .filter((e): e is LeaderboardEntry => Boolean(e));

  if (top3.length < 3) return null;

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-6">
      {top3.map((entry) => (
        <PodiumCard key={entry.rank} entry={entry} currency={currency} />
      ))}
    </div>
  );
}
