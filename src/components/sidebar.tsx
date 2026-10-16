"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { KickLoginButton } from "@/components/kick-login-button";
import {
  BookOpen,
  Camera,
  ChevronDown,
  Gamepad2,
  Gift,
  HelpCircle,
  Home as HomeIcon,
  Mail,
  Megaphone,
  Milestone,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Trophy,
  User,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  soon?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const SECTIONS: NavSection[] = [
  {
    title: "Rewards",
    items: [
      { label: "Milestones", icon: Milestone, href: "/milestones" },
      { label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
      { label: "Promotions", icon: Megaphone, soon: true },
      { label: "Bonuses", icon: Gift, href: "/bonuses" },
      { label: "Points Shop", icon: ShoppingBag, soon: true },
      { label: "Raffles", icon: Ticket, soon: true },
      { label: "Guess the Balance", icon: HelpCircle, soon: true },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Games", icon: Gamepad2, soon: true },
      { label: "Streams", icon: Camera, href: "/streams" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "FAQ", icon: BookOpen, href: "/rules" },
      { label: "Contact Us", icon: Mail, href: "/contact" },
      { label: "Fairness", icon: ShieldCheck, soon: true },
      { label: "Points System", icon: Info, soon: true },
    ],
  },
];

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  const content = (
    <>
      <Icon size={17} className={active ? "text-black" : "text-muted"} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.soon && (
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
          Soon
        </span>
      )}
    </>
  );

  const baseClass = clsx(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    item.soon
      ? "cursor-not-allowed text-muted/60"
      : active
        ? "bg-gold text-black"
        : "text-muted hover:bg-surface-2/60 hover:text-foreground",
  );

  if (item.soon || !item.href) {
    return <div className={baseClass}>{content}</div>;
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={baseClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={baseClass}>
      {content}
    </Link>
  );
}

function NavSectionBlock({ section, pathname }: { section: NavSection; pathname: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="px-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted"
      >
        {section.title}
        <ChevronDown size={14} className={clsx("transition-transform", !open && "-rotate-90")} />
      </button>
      {open && (
        <div className="flex flex-col gap-1 pb-2">
          {section.items.map((item) => (
            <NavRow key={item.label} item={item} active={pathname === item.href} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <Image src="/logo.png" alt="X4TAR" width={32} height={32} className="rounded-md" />
        <div>
          <p className="text-sm font-bold leading-tight text-foreground">
            X4<span className="text-accent">TAR</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted">Stake Wager Races</p>
        </div>
      </div>

      <div className="px-3 pt-3">
        <Link
          href="/"
          className={clsx(
            "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition",
            pathname === "/"
              ? "bg-gold text-black hover:opacity-90"
              : "bg-surface-2 text-foreground hover:bg-surface-2/70",
          )}
        >
          <HomeIcon size={16} />
          Home
        </Link>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto py-2">
        {SECTIONS.map((section) => (
          <NavSectionBlock key={section.title} section={section} pathname={pathname} />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        {status === "authenticated" ? (
          <Link
            href="/community"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-muted">
              <User size={15} />
            </span>
            <span className="truncate">{session?.user?.name ?? "Account"}</span>
          </Link>
        ) : (
          <KickLoginButton className="w-full justify-center" />
        )}
      </div>
    </aside>
  );
}
