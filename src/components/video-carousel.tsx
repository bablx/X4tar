"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Eye, Play, Video } from "lucide-react";
import { formatCompact, formatDuration, formatRelativeTime } from "@/lib/format";
import type { KickVideo } from "@/lib/kick";

export function VideoCarousel({ videos, channel }: { videos: KickVideo[]; channel: string }) {
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    if (next < 0 || next >= videos.length) return;
    setIndex(next);
  }

  const video = videos[index];
  if (!video) return null;

  const watchUrl = `https://kick.com/${channel}/videos/${video.uuid}`;

  return (
    <div className="relative">
      <div
        key={index}
        className="reel-stop reel-glow-flash grid gap-5 overflow-hidden rounded-2xl border border-border card-surface p-5 sm:grid-cols-[1.3fr_1fr] sm:items-center"
      >
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative aspect-video w-full overflow-hidden rounded-xl bg-surface-2"
        >
          {video.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <Video size={32} />
            </div>
          )}
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
            {formatDuration(video.durationMs)}
          </span>
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#53FC18] text-black opacity-0 transition group-hover:opacity-100">
              <Play size={24} fill="black" />
            </span>
          </span>
          <span className="shine-sweep" style={{ animationDelay: "500ms" }} />
        </a>

        <div className="info-fade-up flex flex-col gap-3">
          {video.category && (
            <span className="w-fit rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {video.category}
            </span>
          )}
          <h3 className="text-xl font-bold leading-snug text-foreground">{video.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Eye size={15} /> {formatCompact(video.views)} views
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {formatRelativeTime(video.createdAt)}
            </span>
          </div>
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="badge-bounce-in mt-2 flex w-fit items-center gap-2 rounded-lg bg-[#53FC18] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#4ae015]"
            style={{ animationDelay: "350ms" }}
          >
            <Play size={15} fill="black" />
            Watch Video
          </a>
        </div>
      </div>

      {videos.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous video"
            className="flex items-center justify-center rounded-full border border-border bg-surface-2 p-2 text-foreground shadow-lg transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-semibold text-muted">
            {index + 1} / {videos.length}
          </span>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === videos.length - 1}
            aria-label="Next video"
            className="flex items-center justify-center rounded-full border border-border bg-surface-2 p-2 text-foreground shadow-lg transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
