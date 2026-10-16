import type { Metadata } from "next";
import Image from "next/image";
import { Play, Users, Video } from "lucide-react";

export const metadata: Metadata = { title: "Streams | X4TAR" };

const KICK_CHANNEL = "x4tar";

export default function StreamsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="anim-heading mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Live</span>
        <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Watch X4TAR on Kick</h1>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Catch every stream live — slots, races, and community hangouts.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div
          className="flip-in-left overflow-hidden rounded-2xl border border-border bg-black"
          style={{ animationDelay: "250ms" }}
        >
          <iframe
            src={`https://player.kick.com/${KICK_CHANNEL}`}
            title={`${KICK_CHANNEL} on Kick`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="aspect-video w-full"
          />
        </div>

        <div
          className="flip-in-right flex flex-col gap-5 rounded-2xl border border-border card-surface p-6"
          style={{ animationDelay: "450ms" }}
        >
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="X4TAR" width={48} height={48} className="rounded-xl" />
            <div>
              <p className="text-lg font-bold text-foreground">X4TAR</p>
              <p className="text-xs text-muted">kick.com/{KICK_CHANNEL}</p>
            </div>
          </div>

          <a
            href={`https://kick.com/${KICK_CHANNEL}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#53FC18] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#4ae015]"
          >
            <Play size={16} fill="black" />
            Watch on Kick
          </a>

          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
            <div>
              <div className="flex items-center gap-2 text-muted">
                <Users size={15} />
                Followers
              </div>
              <p className="mt-1 font-semibold text-foreground">—</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-muted">
                <Video size={15} />
                Category
              </div>
              <p className="mt-1 font-semibold text-foreground">—</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
