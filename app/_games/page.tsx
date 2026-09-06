"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <header className="mb-16 max-w-xl animate-fade-in-blur">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Arcade
        </p>
        <h1 className="mb-4 text-4xl md:text-5xl font-semibold tracking-tight">
          <span className="font-heading-italic font-normal">Games</span>
        </h1>
        <p className="leading-relaxed text-secondary">
          Classic arcade games rebuilt from scratch. Each game tracks your high score locally.
        </p>
      </header>

      <div className="flex flex-col gap-3 max-w-2xl">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => game.isLive && setSelectedGame(game.id)}
            type="button"
            disabled={!game.isLive}
            aria-disabled={!game.isLive}
            className={`group relative flex items-center rounded-xl border border-border bg-card overflow-hidden
                 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-left ${
                   game.isLive
                     ? "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
                     : "cursor-not-allowed opacity-60"
                 }`}
          >
            {/* Banner */}
            {game.banner && (
              <div className="relative w-20 aspect-square overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={game.banner}
                  alt={game.title}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col items-start justify-center gap-2 px-4 py-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                  {game.title}
                </h2>

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
        Scores are saved locally on your device. Use the arrow keys to play
        Tetris — more games are on the way.
      </p>
    </PageContainer>
  );
}
