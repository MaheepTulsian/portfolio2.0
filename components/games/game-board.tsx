"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, ChevronDown } from "lucide-react";
import { TetrisGame } from "./tetris";
import { SnakeGame } from "./snake";
import { LeaderboardModal } from "./leaderboard-modal";
import { Leaderboard } from "./leaderboard";
import { Dropdown } from "@/components/ui/dropdown";

interface GameBoardProps {
  game: "tetris" | "snake" | "shooter";
  onBack: () => void;
}

export function GameBoard({ game, onBack }: GameBoardProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);
  const gameActiveRef = useRef(true);

  useEffect(() => {
    // Scroll to game on mount
    setTimeout(() => {
      gameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    // Load high score from localStorage
    const highScoreKey = `highscore_${game}`;
    const stored = localStorage.getItem(highScoreKey);
    if (stored) {
      // localStorage is client-only, so the high score is read after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighScore(parseInt(stored));
    }
  }, [game]);

  // Handle page unload or tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (gameActiveRef.current && !gameOver) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [gameOver]);

  // Handle back button with confirmation
  const handleBack = () => {
    if (gameActiveRef.current && !gameOver) {
      const confirm = window.confirm(
        "Game in progress! Are you sure you want to leave? You can still save your score."
      );
      if (!confirm) return;
    }
    gameActiveRef.current = false;
    onBack();
  };

  const handleGameOver = (finalScore: number) => {
    gameActiveRef.current = false;
    setScore(finalScore);
    setGameOver(true);

    // Update high score if necessary
    const highScoreKey = `highscore_${game}`;
    const currentHighScore = parseInt(localStorage.getItem(highScoreKey) || "0");
    if (finalScore > currentHighScore) {
      setHighScore(finalScore);
      localStorage.setItem(highScoreKey, finalScore.toString());
    }

    // Ask to save to leaderboard
    setTimeout(() => {
      setShowLeaderboardModal(true);
    }, 500);
  };

  const handleRestart = () => {
    gameActiveRef.current = true;
    setScore(0);
    setGameOver(false);
    setShowLeaderboardModal(false);
    // Increment key to force leaderboard refresh
    setLeaderboardKey(prev => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header - Compact Single Row */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={handleBack}
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                ← Back
              </button>

              {/* spacer */}
              <div className="w-1 sm:w-2 md:w-4" />


              {/* Mobile Leaderboard Dropdown */}
                <div className="lg:hidden">
                <Dropdown
                  trigger={
                  <button className="p-1.5 hover:bg-muted/50 rounded transition-colors flex justify-center items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-muted-foreground" />
                    <h1 className="text-xs sm:text-sm">Leaderboard</h1>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                  }
                >
                  <div className="p-4">
                  <Leaderboard key={leaderboardKey} game={game} compact={false} />
                  </div>
                </Dropdown>
                </div>
            </div>

            {/* Right: Scores */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm flex-shrink-0">
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Score</p>
                <p className="font-mono font-semibold text-sm sm:text-base md:text-lg leading-tight">{score}</p>
              </div>
              <div className="text-right border-l border-border pl-2 sm:pl-4 md:pl-6">
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Best</p>
                <p className="font-mono font-semibold text-sm sm:text-base md:text-lg leading-tight">{highScore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Container with Leaderboard */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center py-4 sm:py-8 px-2 sm:px-6 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <div
          ref={gameRef}
          className="flex-shrink-0 flex justify-center"
        >
          {game === "tetris" ? (
            <TetrisGame
              onGameOver={handleGameOver}
              onScoreChange={setScore}
              gameOver={gameOver}
              onRestart={handleRestart}
            />
          ) : (
            <SnakeGame
              onGameOver={handleGameOver}
              onScoreChange={setScore}
              gameOver={gameOver}
              onRestart={handleRestart}
            />
          )}
        </div>

        {/* Leaderboard - scrolls with page */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <Leaderboard key={leaderboardKey} game={game} compact={true} />
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboardModal && gameOver && (
        <LeaderboardModal
          game={game}
          score={score}
          onClose={() => setShowLeaderboardModal(false)}
          onRestart={handleRestart}
          onSave={() => setLeaderboardKey(prev => prev + 1)}
        />
      )}
    </div>
  );
}
