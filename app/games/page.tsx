"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { GameBoard } from "@/components/games/game-board";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useHeader } from "@/components/layout/header-provider";

import tetrisImage from "@/public/tetris.png";
import snakeImage from "@/public/snake.png";
import shooterImage from "@/public/shooter.png";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<"tetris" | "snake" | "shooter" | null>(null);
  const { setShowHeader } = useHeader();

  // Hide header when game is selected, show when returning to game selection
  useEffect(() => {
    setShowHeader(selectedGame === null);
  }, [selectedGame, setShowHeader]);

  if (selectedGame) {
    return (
      <GameBoard
        game={selectedGame}
        onBack={() => setSelectedGame(null)}
      />
    );
  }

  const games = [
    {
      id: "tetris" as const,
      title: "Tetris",
      banner: tetrisImage,
      isLive: true,
      remark: "Live!",
      description: "Classic falling blocks puzzle. Stack them right, clear lines, and rack up points.",
    },
    {
      id: "snake" as const,
      title: "Snake",
      banner: snakeImage,
      isLive: false,
      remark: "Coming Soon...",
      description: "Navigate and grow. Eat food, avoid walls and yourself. Simple, addictive.",
    },
    {
      id: "shooter" as const,
      title: "Galaxy Shooter",
      banner: shooterImage,
      isLive: false,
      remark: "Coming Soon...",
      description: "Defend against alien waves. Aim and shoot, dodge incoming fire, survive as long as you can.",
    },
  ];

  return (
    <PageContainer>
      {/* Back Link */}
      <Link
        href="/"
        className="inline-block mb-14 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Home
      </Link>

      {/* Header */}
      <header className="mb-20 max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Games
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Classic arcade games rebuilt from scratch. Each game tracks your high score locally.
        </p>
      </header>

      {/* Game Selection */}
      {/* <div className="flex flex-col gap-6 max-w-xl">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            type="submit"
            className="group flex rounded-xl border border-border overflow-hidden transition-all hover:-translate-y-0.5 hover:border-foreground/30 text-left"
          >
            {game.banner && (
              <div className="relative w-40 aspect-square overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={game.banner.src}
                  alt={game.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}

            <div className="flex flex-col justify-between px-6 py-5">
              <h2 className="text-lg font-medium mb-1 group-hover:text-foreground transition-colors">
                {game.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {game.description}
              </p>
            </div>

            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0" />
          </button>
        ))}
      </div> */}

      <div className="flex flex-col gap-4 max-w-2xl">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            type="button"
            className="group relative flex items-center rounded-lg border border-border bg-background overflow-hidden
                 transition-all hover:-translate-y-0.5 hover:border-foreground/30 text-left"
          >
            {/* Banner */}
            {game.banner && (
              <div className="relative w-20 aspect-square overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={game.banner.src}
                  alt={game.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col items-start justify-center gap-2 px-4 py-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                  {game.title}
                </h1>

                {game.remark && (
                  <Badge
                    variant="secondary"
                    className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0 ${game.isLive
                        ? "border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "border-yellow-600 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${game.isLive
                          ? "bg-green-600 dark:bg-green-400"
                          : "bg-yellow-600 dark:bg-yellow-400"
                        }`}
                    />
                    {game.remark}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {game.description}
              </p>
            </div>

            {/* Arrow */}
            <ArrowUpRight className="mr-4 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Footer Note */}
      <p className="mt-20 text-sm text-muted-foreground max-w-xl">
        Scores are saved locally. Use keyboard arrows for Tetris, arrow keys or on-screen controls for Snake.
      </p>
    </PageContainer>
  );
}
