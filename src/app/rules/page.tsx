import type { Metadata } from "next";
import clsx from "clsx";
import { FAQ } from "@/lib/mock-data";
import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Rules & FAQ | Pasut" };

const RULES = [
  "You must be signed up to Stake under the Pasut affiliate code during the race period to qualify.",
  "Rankings are based on total wager across eligible games during the race window.",
  "Stake Originals and slots count at 100% toward wager; live casino and sports may count at a reduced rate.",
  "Winners must connect Discord and Kick on the Community page to verify identity before payout.",
  "Prizes are distributed within 72 hours of the race ending. Unclaimed prizes after 14 days are forfeited.",
  "Pasut reserves the right to disqualify suspected bonus abuse, multi-accounting, or wager bots.",
];

const RULES_BASE_DELAY = 400;
const RULES_STAGGER = 260;
const FAQ_BASE_DELAY = RULES_BASE_DELAY + RULES.length * RULES_STAGGER + 400;

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="anim-heading">
        <SectionHeading eyebrow="Fair Play" title="Rules" description="Keep it fair for everyone in the race." />
      </div>

      <ol className="mb-16 flex flex-col gap-3">
        {RULES.map((rule, i) => {
          const delay = RULES_BASE_DELAY + i * RULES_STAGGER;
          return (
            <li
              key={rule}
              className={clsx(
                "relative flex items-center gap-3 overflow-hidden rounded-lg border border-border card-surface p-4 text-sm text-muted",
                i % 2 === 0 ? "unfurl-reveal" : "unfurl-reveal-right",
              )}
              style={{ animationDelay: `${delay}ms` }}
            >
              <span
                className="stamp-in flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent"
                style={{ animationDelay: `${delay + 350}ms` }}
              >
                {i + 1}
              </span>
              <span>{rule}</span>
              <span className="shine-sweep" style={{ animationDelay: `${delay + 500}ms` }} />
            </li>
          );
        })}
      </ol>

      <div className="anim-heading" style={{ animationDelay: `${FAQ_BASE_DELAY - 200}ms` }}>
        <SectionHeading eyebrow="Help" title="FAQ" />
      </div>
      <FaqAccordion items={FAQ} baseDelayMs={FAQ_BASE_DELAY} />
    </div>
  );
}
