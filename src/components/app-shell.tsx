"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full">
      {/* Mobile topbar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="X4TAR" width={28} height={28} className="rounded-md" />
          <span className="font-bold text-foreground">
            X4<span className="text-accent">TAR</span>
          </span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-foreground">
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative flex h-full">
            <Sidebar />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-[-44px] top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-full flex-1 flex-col pt-14 md:pt-0 md:pl-60">
        {children}
      </div>
    </div>
  );
}
