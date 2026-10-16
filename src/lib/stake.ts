import type { LeaderboardData } from "./types";
import { MOCK_LEADERBOARD } from "./mock-data";

/**
 * Single swap point for the real Stake integration.
 *
 * Once STAKE_API_ENDPOINT / STAKE_API_TOKEN / STAKE_RACE_ID are set in the
 * environment, replace the mock branch below with the real `fetch` call
 * against Stake's wager-race endpoint and map the response into
 * `LeaderboardData`. Every page reads leaderboard data through this
 * function, so nothing else needs to change when the real source is wired
 * in.
 */
export async function fetchLeaderboard(): Promise<LeaderboardData> {
  const endpoint = process.env.STAKE_API_ENDPOINT;
  const token = process.env.STAKE_API_TOKEN;
  const raceId = process.env.STAKE_RACE_ID;

  if (!endpoint || !token || !raceId) {
    return MOCK_LEADERBOARD;
  }

  const res = await fetch(`${endpoint}/races/${raceId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return MOCK_LEADERBOARD;
  }

  const raw = await res.json();
  return mapStakeResponse(raw);
}

// Placeholder mapper — update field names once the real Stake response shape is known.
function mapStakeResponse(raw: unknown): LeaderboardData {
  return raw as LeaderboardData;
}
