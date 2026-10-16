"use client";

import { useEffect, useState } from "react";
import { formatCompact, formatCurrency } from "@/lib/format";

export function CountUp({
  value,
  delayMs = 0,
  durationMs = 700,
  format = "compact",
  currency = "USD",
}: {
  value: number;
  delayMs?: number;
  durationMs?: number;
  format?: "compact" | "currency";
  currency?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;

    const timeout = setTimeout(() => {
      function tick(ts: number) {
        if (start === null) start = ts;
        const progress = Math.min(1, (ts - start) / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, delayMs, durationMs]);

  return <>{format === "currency" ? formatCurrency(display, currency) : formatCompact(display)}</>;
}
