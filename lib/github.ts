export interface ContributionDay {
  date: string;
  value: number;
}

/**
 * Fetches real GitHub contribution counts for the last year via a public,
 * token-free proxy of GitHub's contribution graph. Cached for a day.
 * Returns an empty array on any failure so callers can degrade gracefully.
 */
export async function getGitHubContributions(
  username: string
): Promise<ContributionDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const json = (await res.json()) as {
      contributions?: { date: string; count: number }[];
    };
    return (json.contributions ?? []).map((c) => ({
      date: c.date,
      value: c.count,
    }));
  } catch {
    return [];
  }
}
