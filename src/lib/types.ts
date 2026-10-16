export type LeaderboardEntry = {
  rank: number;
  username: string;
  wagered: number;
  prize: number;
  avatarUrl?: string;
};

export type LeaderboardData = {
  raceId: string;
  title: string;
  prizePool: number;
  currency: string;
  startsAt: string;
  endsAt: string;
  updatedAt: string;
  entries: LeaderboardEntry[];
};

export type Bonus = {
  id: string;
  title: string;
  description: string;
  code?: string;
  tag: "deposit" | "rakeback" | "reload" | "exclusive";
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Milestone = {
  tier: number;
  wagered: number;
  reward: number;
};
