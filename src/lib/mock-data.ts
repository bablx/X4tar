import type { Bonus, FaqItem, LeaderboardData, Milestone } from "./types";

function maskUsername(name: string) {
  if (name.length <= 4) return name;
  return `${name.slice(0, 3)}${"*".repeat(Math.max(2, name.length - 5))}${name.slice(-2)}`;
}

const rawNames = [
  "ShadowWolf99",
  "LuckyDraven",
  "NoirHunter",
  "KittyCrash",
  "BetBaron",
  "VelvetAce",
  "GhostRoller",
  "MidnightSpin",
  "CrimsonFox",
  "ZeroGravity",
  "SilentSniper",
  "RajaRush",
  "EchoPlayz",
  "ObsidianKing",
  "TurboNinja",
];

function makeEntries() {
  const base = 185000;
  return rawNames.map((name, i) => {
    const wagered = Math.round(base - i * (9000 + i * 450) + (i % 3) * 320);
    const prizeTable = [2500, 1200, 800, 500, 350, 250, 180, 150, 120, 100, 80, 60, 50, 40, 30];
    return {
      rank: i + 1,
      username: maskUsername(name),
      wagered,
      prize: prizeTable[i] ?? 25,
    };
  });
}

export const MOCK_LEADERBOARD: LeaderboardData = {
  raceId: "mock-race-001",
  title: "X4TAR Monthly Wager Race",
  prizePool: 6500,
  currency: "USD",
  startsAt: "2026-10-01T00:00:00.000Z",
  endsAt: "2026-10-31T23:59:59.000Z",
  updatedAt: new Date().toISOString(),
  entries: makeEntries(),
};

export const BONUSES: Bonus[] = [
  {
    id: "stake",
    title: "Stake Deposit Bonus + Rakeback",
    description:
      "Sign up with code X4 for a boosted first deposit bonus plus lifetime rakeback on every wager — credited daily.",
    code: "X4",
    tag: "deposit",
    href: "https://stake.com/?offer=x4",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "How do I join the leaderboard?",
    answer:
      "Sign up on Stake using code X4TAR (or switch your existing affiliate code to X4TAR in account settings). Your wager is tracked automatically — no registration needed.",
  },
  {
    question: "How often does the leaderboard update?",
    answer: "Live during an active race, refreshed roughly every 30 seconds once connected to Stake's data.",
  },
  {
    question: "How do I claim my prize?",
    answer:
      "Connect your Discord and Kick accounts on the Community page to verify ownership. Winners are paid out shortly after the race ends and announced in Discord.",
  },
  {
    question: "Why is my username masked?",
    answer: "We partially mask usernames on the public leaderboard for privacy. Your full tag is visible once you connect your account.",
  },
  {
    question: "What games count toward wager?",
    answer: "All Stake Originals and slots count at 100%. Live casino and sports betting may count at a reduced rate per Stake's standard race rules.",
  },
];

export const MILESTONES: Milestone[] = [
  { tier: 1, wagered: 25_000, reward: 25 },
  { tier: 2, wagered: 50_000, reward: 50 },
  { tier: 3, wagered: 100_000, reward: 100 },
  { tier: 4, wagered: 150_000, reward: 150 },
  { tier: 5, wagered: 250_000, reward: 250 },
  { tier: 6, wagered: 350_000, reward: 400 },
  { tier: 7, wagered: 500_000, reward: 600 },
];
