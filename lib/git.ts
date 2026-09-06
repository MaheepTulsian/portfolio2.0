import { execSync } from "child_process";

/**
 * Returns the ISO date of the most recent git commit, resolved at build time.
 * Falls back to the current time if git metadata is unavailable (e.g. on a
 * platform that strips the .git directory from the deployment).
 */
export function getLastCommitDate(): string {
  try {
    return execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString();
  }
}
