"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import clsx from "clsx";
import { Check, LogOut, LogIn } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ConnectCard({
  provider,
  label,
  description,
  Icon,
  accentClass,
  glowShadow,
  hoverBorderClass,
  fromSide = "left",
  delayMs = 0,
}: {
  provider: "discord" | "kick";
  label: string;
  description: string;
  Icon: LucideIcon;
  accentClass: string;
  glowShadow: string;
  hoverBorderClass: string;
  fromSide?: "left" | "right";
  delayMs?: number;
}) {
  const { data: session, status } = useSession();
  const connected = status === "authenticated" && session?.provider === provider;

  return (
    <div
      className={clsx(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border card-surface p-7 transition hover:-translate-y-1",
        hoverBorderClass,
        fromSide === "left" ? "flip-in-left" : "flip-in-right",
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          className={clsx("coin-spin flex h-14 w-14 items-center justify-center rounded-xl", accentClass, glowShadow)}
          style={{ animationDelay: `${delayMs + 400}ms` }}
        >
          <Icon size={26} />
        </span>
        {connected && (
          <span className="pulse-live flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <Check size={12} /> Connected
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">{label}</h3>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      </div>
      {connected ? (
        <button
          onClick={() => signOut()}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-muted transition hover:border-danger hover:text-danger"
        >
          <LogOut size={15} /> Disconnect
        </button>
      ) : (
        <button
          onClick={() => signIn(provider)}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-black transition hover:opacity-90"
        >
          <LogIn size={15} /> Connect {label}
        </button>
      )}
      <span className="shine-sweep" style={{ animationDelay: `${delayMs + 700}ms` }} />
    </div>
  );
}
