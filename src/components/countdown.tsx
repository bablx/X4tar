"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };
type Duration = { days: number; hours: number; minutes: number; seconds: number };

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: diff <= 0 };
}

function durationToMs(d: Duration) {
  return (((d.days * 24 + d.hours) * 60 + d.minutes) * 60 + d.seconds) * 1000;
}

const PLACEHOLDER: Parts = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span key={value} className="digit-flip text-2xl font-extrabold tabular-nums text-foreground sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm font-bold uppercase text-muted">{label}</span>
    </span>
  );
}

export function Countdown({ endsAt, initialDuration }: { endsAt?: string; initialDuration?: Duration }) {
  const [parts, setParts] = useState<Parts>(PLACEHOLDER);

  useEffect(() => {
    const target = initialDuration ? Date.now() + durationToMs(initialDuration) : new Date(endsAt ?? 0).getTime();
    setParts(getParts(target));
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt, initialDuration?.days, initialDuration?.hours, initialDuration?.minutes, initialDuration?.seconds]);

  if (parts.done) {
    return <span className="text-sm font-semibold text-danger">Race ended</span>;
  }

  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <Unit value={parts.days} label="D" />
      <Unit value={parts.hours} label="H" />
      <Unit value={parts.minutes} label="M" />
      <Unit value={parts.seconds} label="S" />
    </div>
  );
}
