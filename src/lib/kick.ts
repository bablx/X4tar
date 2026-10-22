export type KickChannelInfo = {
  followers: number | null;
  isLive: boolean;
  category: string | null;
};

// Kick's public (undocumented) channel endpoint — no auth required. If Kick
// changes or rate-limits this, every field falls back to null and the UI
// shows "—" rather than guessing.
export async function fetchKickChannel(slug: string): Promise<KickChannelInfo> {
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${slug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return { followers: null, isLive: false, category: null };
    }

    const data = await res.json();
    const isLive = Boolean(data?.livestream);
    const category = isLive
      ? (data?.livestream?.categories?.[0]?.name ?? null)
      : (data?.recent_categories?.[0]?.name ?? null);
    const followers = Number(data?.followers_count);

    return {
      followers: Number.isFinite(followers) ? followers : null,
      isLive,
      category,
    };
  } catch {
    return { followers: null, isLive: false, category: null };
  }
}

export type KickVideo = {
  id: number;
  uuid: string;
  title: string;
  thumbnail: string | null;
  durationMs: number;
  views: number;
  createdAt: string;
  category: string | null;
};

export async function fetchKickVideos(slug: string, limit = 6): Promise<KickVideo[]> {
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${slug}/videos`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.slice(0, limit).map(
      (entry: {
        id: number;
        session_title: string;
        duration: number;
        views: number;
        created_at: string;
        thumbnail?: { src?: string };
        video?: { uuid?: string };
        categories?: { name?: string }[];
      }) => ({
        id: entry.id,
        uuid: entry.video?.uuid ?? "",
        title: entry.session_title,
        thumbnail: entry.thumbnail?.src ?? null,
        durationMs: entry.duration,
        views: entry.views,
        createdAt: entry.created_at,
        category: entry.categories?.[0]?.name ?? null,
      }),
    );
  } catch {
    return [];
  }
}
