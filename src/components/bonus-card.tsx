"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, Check, Copy, Gift } from "lucide-react";
import type { Bonus } from "@/lib/types";

const TAG_LABEL: Record<Bonus["tag"], string> = {
  deposit: "Deposit Bonus",
  rakeback: "Rakeback",
  reload: "Reload",
  exclusive: "Exclusive",
};

export function BonusCard({
  bonus,
  delayMs = 0,
  fromSide = "left",
}: {
  bonus: Bonus;
  delayMs?: number;
  fromSide?: "left" | "right";
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!bonus.code) return;
    try {
      await navigator.clipboard.writeText(bonus.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div
      className={clsx(
        "group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-accent/30 card-surface p-8 shadow-[0_0_40px_rgba(77,255,136,0.08)] transition hover:border-accent/60",
        fromSide === "left" ? "flip-in-left" : "flip-in-right",
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start justify-between">
        <span
          className="coin-spin flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent shadow-[0_0_30px_rgba(77,255,136,0.3)]"
          style={{ animationDelay: `${delayMs + 400}ms` }}
        >
          <Gift size={30} />
        </span>
        <span
          className="drop-label rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent"
          style={{ animationDelay: `${delayMs + 600}ms` }}
        >
          {TAG_LABEL[bonus.tag]}
        </span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-foreground">{bonus.title}</h3>
        <p className="mt-2 max-w-lg text-sm text-muted sm:text-base">{bonus.description}</p>
      </div>

      <div className="flex flex-col items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
        {bonus.code && (
          <button
            onClick={copyCode}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-5 py-3 text-base font-mono font-bold text-accent transition hover:border-accent"
          >
            Code: {bonus.code}
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
        <a
          href={bonus.href}
          target={bonus.href.startsWith("http") ? "_blank" : undefined}
          rel={bonus.href.startsWith("http") ? "noreferrer" : undefined}
          className="group/cta flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-black transition hover:opacity-90 sm:ml-auto"
        >
          Claim on Stake
          <ArrowRight size={16} className="transition-transform group-hover/cta:translate-x-1" />
        </a>
      </div>

      <span className="shine-sweep" style={{ animationDelay: `${delayMs + 800}ms` }} />
    </div>
  );
}
