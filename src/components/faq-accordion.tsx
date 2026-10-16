"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { FaqItem } from "@/lib/types";

export function FaqAccordion({ items, baseDelayMs = 0 }: { items: FaqItem[]; baseDelayMs?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-xl border border-border card-surface">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="stamp-in" style={{ animationDelay: `${baseDelayMs + i * 150}ms` }}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-foreground">{item.question}</span>
              <ChevronDown
                size={18}
                className={clsx("shrink-0 text-muted transition-transform", open && "rotate-180 text-accent")}
              />
            </button>
            {open && <p className="px-5 pb-4 text-sm text-muted">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
