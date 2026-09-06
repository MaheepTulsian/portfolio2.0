"use client";

import { useState, useEffect } from "react";
import { getDeviceFingerprint, getStoredPlayerName, storePlayerName } from "@/lib/device-fingerprint";

interface LeaderboardModalProps {
  game: "tetris" | "snake" | "shooter";
  score: number;
  onClose: () => void;
  onRestart: () => void;
  onSave?: () => void;
}

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  timestamp: number;
  deviceId: string; // Track device to prevent duplicates
}

export function LeaderboardModal({
  game,
  score,
  onClose,
  onRestart,
  onSave,
}: LeaderboardModalProps) {
  const [playerName, setPlayerName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved player name when component mounts
  useEffect(() => {
    // Stored player name is client-only and read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedName = getStoredPlayerName();
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleSave = () => {
    if (!playerName.trim()) return;

    setIsSaving(true);

    // Get device fingerprint
    const deviceId = getDeviceFingerprint();

    // Store player name for future use
    storePlayerName(playerName.trim());

    setTimeout(() => {
      const leaderboardKey = `leaderboard_${game}`;
      const existing = localStorage.getItem(leaderboardKey);
      const entries: LeaderboardEntry[] = existing ? JSON.parse(existing) : [];

      // Check if this device already has an entry
      const existingEntryIndex = entries.findIndex(e => e.deviceId === deviceId);

      if (existingEntryIndex !== -1) {
        // Device already has an entry - update if new score is higher
        const existingEntry = entries[existingEntryIndex];
        if (score > existingEntry.score) {
          entries[existingEntryIndex] = {
            id: existingEntry.id,
            playerName: playerName.trim(),
            score,
            timestamp: Date.now(),
            deviceId,
          };
        }
        // If score is lower, keep the old entry but don't add new one
      } else {
        // New device - add new entry
        entries.push({
          id: `${Date.now()}_${Math.random()}`,
          playerName: playerName.trim(),
          score,
          timestamp: Date.now(),
          deviceId,
        });
      }

      localStorage.setItem(leaderboardKey, JSON.stringify(entries));

      setIsSaving(false);
      setSaved(true);

      // Trigger leaderboard refresh immediately
      onSave?.();

      // Close modal after 1 second
      setTimeout(() => {
        onClose();
        onRestart();
      }, 1000);
    }, 300);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background border border-border rounded-lg p-8 shadow-lg">
        {saved ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold mb-2">Score Saved!</p>
            <p className="text-sm text-muted-foreground">
              Your score has been added to the leaderboard.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Game Over!</h3>
              <p className="text-muted-foreground">
                Final Score:{" "}
                <span className="font-mono font-semibold text-foreground">
                  {score}
                </span>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="playerName" className="block text-sm font-medium mb-2">
                  Save to Leaderboard
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Enter your name to save your score. Your name will be remembered for next time.
                </p>
                <input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-muted/30 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && playerName.trim()) {
                      handleSave();
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClose();
                  onRestart();
                }}
                className="flex-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleSave}
                disabled={!playerName.trim() || isSaving}
                className="flex-1 px-4 py-2 text-sm font-medium bg-foreground text-background rounded hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Saving..." : "Save Score"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
