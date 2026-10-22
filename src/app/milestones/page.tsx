import type { Metadata } from "next";
import clsx from "clsx";
import { Gem } from "lucide-react";
import { MILESTONES } from "@/lib/mock-data";
import { TIER_THEME } from "@/lib/milestone-theme";
import { SectionHeading } from "@/components/section-heading";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = { title: "Milestones | Pasut" };

const BASE_DELAY = 400;
const STAGGER = 200;

export default function MilestonesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="anim-heading">
        <SectionHeading
          eyebrow="Challenges"
          title="Milestones"
          description="Lifetime wager challenges under the Pasut code. Clear a tier, bank the reward — stacks on top of every race prize."
        />
      </div>

      <div className="flex flex-col gap-4">
        {MILESTONES.map((milestone, i) => {
          const delay = BASE_DELAY + i * STAGGER;
          const theme = TIER_THEME[i % TIER_THEME.length];

          return (
            <div
              key={milestone.tier}
              className={clsx(
                "rise-in relative flex flex-col gap-5 overflow-hidden rounded-2xl border card-surface p-5 sm:flex-row sm:items-center",
                theme.border,
              )}
              style={{ animationDelay: `${delay}ms` }}
            >
              <span
                className="badge-bounce-in flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ animationDelay: `${delay + 300}ms` }}
              >
                <span className={clsx("flex h-full w-full items-center justify-center rounded-2xl", theme.icon)}>
                  <Gem size={28} />
                </span>
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={clsx("text-sm font-extrabold uppercase tracking-wider", theme.label)}>
                    {theme.name}
                  </span>
                  <span className={clsx("rounded-full px-2 py-0.5 text-xs font-bold", theme.pill)}>
                    {formatCurrency(milestone.reward)}
                  </span>
                </div>

                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div className={clsx("h-full w-0 rounded-full", theme.bar)} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>
                      <span className="font-bold text-foreground">$0</span> wagered
                    </span>
                    <span className={clsx("font-semibold", theme.label)}>{formatCurrency(milestone.wagered)}</span>
                  </div>
                </div>
              </div>

              <button
                disabled
                className={clsx(
                  "w-full shrink-0 cursor-not-allowed rounded-lg py-2.5 text-sm font-bold opacity-90 sm:w-32",
                  theme.pill,
                )}
              >
                Locked
              </button>

              <span className="shine-sweep" style={{ animationDelay: `${delay + 700}ms` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
