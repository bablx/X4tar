import type { Metadata } from "next";
import { BONUSES } from "@/lib/mock-data";
import { BonusCard } from "@/components/bonus-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Bonuses | Pasut" };

export default function BonusesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="anim-heading">
        <SectionHeading
          eyebrow="Rewards"
          title="Bonuses & Perks"
          description="Everything you can claim as part of the Pasut community, stacked on top of the leaderboard prizes."
        />
      </div>
      {BONUSES.map((bonus, i) => (
        <BonusCard key={bonus.id} bonus={bonus} delayMs={400 + i * 220} fromSide="left" />
      ))}
    </div>
  );
}
