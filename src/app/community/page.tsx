"use client";

import { ArrowRight, MessageCircle, Tv } from "lucide-react";
import { ConnectCard } from "@/components/connect-card";
import { SectionHeading } from "@/components/section-heading";
import { YouTubeIcon } from "@/components/youtube-icon";

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="anim-heading">
        <SectionHeading
          eyebrow="Community"
          title="Connect your accounts"
          description="Link Discord and Kick to verify your identity, get race alerts, and claim leaderboard prizes."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ConnectCard
          provider="discord"
          label="Discord"
          description="Join the server for race alerts, giveaways, and support."
          Icon={MessageCircle}
          accentClass="bg-accent-2/15 text-accent-2"
          glowShadow="shadow-[0_0_24px_rgba(155,107,255,0.3)]"
          hoverBorderClass="hover:border-accent-2"
          fromSide="left"
          delayMs={400}
        />
        <ConnectCard
          provider="kick"
          label="Kick"
          description="Link your Kick account to verify ownership for payouts."
          Icon={Tv}
          accentClass="bg-accent/15 text-accent"
          glowShadow="shadow-[0_0_24px_rgba(77,255,136,0.3)]"
          hoverBorderClass="hover:border-accent"
          fromSide="right"
          delayMs={700}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="https://discord.com/invite/houseofdegens"
          target="_blank"
          rel="noreferrer"
          className="group stamp-in relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border card-surface p-6 transition hover:-translate-y-1 hover:border-accent-2"
          style={{ animationDelay: "1300ms" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-2/15 text-accent-2 shadow-[0_0_24px_rgba(155,107,255,0.3)]">
            <MessageCircle size={22} />
          </span>
          <div>
            <p className="font-semibold text-foreground">Join the Discord server</p>
            <p className="mt-1 text-sm text-muted">Race alerts, giveaways, and support.</p>
          </div>
          <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-accent-2">
            Open Discord
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1500ms" }} />
        </a>
        <a
          href="https://kick.com/x4tar"
          target="_blank"
          rel="noreferrer"
          className="group stamp-in relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border card-surface p-6 transition hover:-translate-y-1 hover:border-accent"
          style={{ animationDelay: "1450ms" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent shadow-[0_0_24px_rgba(77,255,136,0.3)]">
            <Tv size={22} />
          </span>
          <div>
            <p className="font-semibold text-foreground">Follow on Kick</p>
            <p className="mt-1 text-sm text-muted">Catch every stream live.</p>
          </div>
          <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-accent">
            Open Kick
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1650ms" }} />
        </a>
        <a
          href="https://www.youtube.com/@xatargambles"
          target="_blank"
          rel="noreferrer"
          className="group stamp-in relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border card-surface p-6 transition hover:-translate-y-1 hover:border-danger sm:col-span-2 lg:col-span-1"
          style={{ animationDelay: "1600ms" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger/15 text-danger shadow-[0_0_24px_rgba(255,77,109,0.3)]">
            <YouTubeIcon size={22} />
          </span>
          <div>
            <p className="font-semibold text-foreground">Subscribe on YouTube</p>
            <p className="mt-1 text-sm text-muted">Big win clips and race recaps.</p>
          </div>
          <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-danger">
            Open YouTube
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="shine-sweep" style={{ animationDelay: "1800ms" }} />
        </a>
      </div>
    </div>
  );
}
