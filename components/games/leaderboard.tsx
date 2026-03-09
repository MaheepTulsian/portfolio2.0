"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  timestamp: number;
  deviceId?: string; // Optional for backward compatibility
}

interface LeaderboardProps {
  game: "tetris" | "snake" | "shooter";
  compact?: boolean;
}

export function Leaderboard({ game, compact = false }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const key = `leaderboard_${game}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // Sort by score descending and take top 5
        const topEntries = data
          .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
          .slice(0, 5);
        setEntries(topEntries);
      } catch {
        setEntries([]);
      }
    }
    setMounted(true);
  }, [game]);

  if (!mounted) return null;

  return (
    <div className={`border border-border rounded-lg bg-muted/10 ${compact ? "p-3" : "p-6"}`}>
      <h4 className={`font-semibold capitalize ${compact ? "text-xs mb-2" : "text-base mb-6"}`}>
        {game} - Top 5
      </h4>

      {entries.length === 0 ? (
        <p className={`text-muted-foreground text-center ${compact ? "text-xs py-4" : "text-sm py-8"}`}>
          No scores yet
        </p>
      ) : (
        <div className={compact ? "space-y-1.5" : "space-y-3"}>
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between rounded border border-border/50 hover:border-border transition-colors ${
                compact
                  ? "p-1.5 text-xs"
                  : "p-3 bg-background/50"
              }`}
            >
              <div className={`flex items-center ${compact ? "gap-1.5" : "gap-4"}`}>
                <span className={`font-mono font-semibold text-muted-foreground ${compact ? "w-4 text-xs" : "w-6 text-xs"}`}>
                  #{index + 1}
                </span>
                {!compact && (
                  <div>
                    <p className="text-sm font-medium">{entry.playerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {compact && (
                  <div className="truncate">
                    <p className="text-xs font-medium truncate">{entry.playerName}</p>
                  </div>
                )}
              </div>
              <span className={`font-mono font-semibold ${compact ? "text-xs" : "text-base"}`}>
                {entry.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
