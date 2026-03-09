"use client";

import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 20;
const BLOCK_SIZE = 24;

type Direction = "up" | "down" | "left" | "right";
type Position = { x: number; y: number };

interface SnakeGameProps {
  onGameOver: (score: number) => void;
  onScoreChange: (score: number) => void;
  gameOver: boolean;
  onRestart: () => void;
}

export function SnakeGame({
  onGameOver,
  onScoreChange,
  gameOver,
  onRestart,
}: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("right");
  const [nextDirection, setNextDirection] = useState<Direction>("right");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: "right" as Direction,
    nextDirection: "right" as Direction,
    score: 0,
    gameOver: false,
  });

  // Generate random food position
  const generateFood = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  // Initialize game
  useEffect(() => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: "right",
      nextDirection: "right",
      score: 0,
      gameOver: false,
    };
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("right");
    setScore(0);
    setIsGameOver(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGameOver) return;

      const directionMap: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const newDir = directionMap[e.key];
      if (newDir) {
        e.preventDefault();
        const opposites = {
          up: "down",
          down: "up",
          left: "right",
          right: "left",
        };

        // Prevent 180 degree turns
        if (opposites[gameStateRef.current.direction] !== newDir) {
          setNextDirection(newDir);
          gameStateRef.current.nextDirection = newDir;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGameOver]);

  // Game loop
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      gameStateRef.current.direction = gameStateRef.current.nextDirection;

      const head = gameStateRef.current.snake[0];
      let newHead = { ...head };

      switch (gameStateRef.current.direction) {
        case "up":
          newHead.y -= 1;
          break;
        case "down":
          newHead.y += 1;
          break;
        case "left":
          newHead.x -= 1;
          break;
        case "right":
          newHead.x += 1;
          break;
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        gameStateRef.current.gameOver = true;
        setIsGameOver(true);
        onGameOver(gameStateRef.current.score);
        return;
      }

      // Check self collision
      if (
        gameStateRef.current.snake.some(
          (seg) => seg.x === newHead.x && seg.y === newHead.y
        )
      ) {
        gameStateRef.current.gameOver = true;
        setIsGameOver(true);
        onGameOver(gameStateRef.current.score);
        return;
      }

      const newSnake = [newHead, ...gameStateRef.current.snake];

      // Check food collision
      if (
        newHead.x === gameStateRef.current.food.x &&
        newHead.y === gameStateRef.current.food.y
      ) {
        const newScore = gameStateRef.current.score + 10;
        const newFood = generateFood();

        gameStateRef.current.snake = newSnake;
        gameStateRef.current.food = newFood;
        gameStateRef.current.score = newScore;

        setSnake(newSnake);
        setFood(newFood);
        setScore(newScore);
        onScoreChange(newScore);
      } else {
        newSnake.pop();
        gameStateRef.current.snake = newSnake;
        setSnake(newSnake);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isGameOver, onGameOver, onScoreChange]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "hsl(var(--background))";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "hsl(var(--border) / 0.2)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * BLOCK_SIZE, 0);
      ctx.lineTo(i * BLOCK_SIZE, GRID_SIZE * BLOCK_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * BLOCK_SIZE);
      ctx.lineTo(GRID_SIZE * BLOCK_SIZE, i * BLOCK_SIZE);
      ctx.stroke();
    }

    // Draw border
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, GRID_SIZE * BLOCK_SIZE, GRID_SIZE * BLOCK_SIZE);

    // Draw snake
    ctx.fillStyle = "hsl(var(--foreground))";
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head
        ctx.fillRect(
          segment.x * BLOCK_SIZE + 2,
          segment.y * BLOCK_SIZE + 2,
          BLOCK_SIZE - 4,
          BLOCK_SIZE - 4
        );
      } else {
        // Body
        ctx.fillRect(
          segment.x * BLOCK_SIZE + 4,
          segment.y * BLOCK_SIZE + 4,
          BLOCK_SIZE - 8,
          BLOCK_SIZE - 8
        );
      }
    });

    // Draw food
    ctx.fillStyle = "hsl(var(--foreground) / 0.6)";
    ctx.beginPath();
    ctx.arc(
      food.x * BLOCK_SIZE + BLOCK_SIZE / 2,
      food.y * BLOCK_SIZE + BLOCK_SIZE / 2,
      BLOCK_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food]);

  const handleMobileControl = (dir: Direction) => {
    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    if (opposites[gameStateRef.current.direction] !== dir) {
      setNextDirection(dir);
      gameStateRef.current.nextDirection = dir;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ maxWidth: "min(100vw - 2rem, 480px)" }}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * BLOCK_SIZE}
          height={GRID_SIZE * BLOCK_SIZE}
          className="border border-border bg-muted/10 w-full"
          style={{
            imageRendering: "pixelated",
            aspectRatio: "1 / 1"
          }}
        />
      </div>

      {isGameOver && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Game Over! Use the modal to save your score.
          </p>
        </div>
      )}

      {/* Mobile Controls - Snake */}
      <div className="md:hidden flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleMobileControl("left")}
            className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => handleMobileControl("up")}
            className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
          >
            ↑
          </button>
          <button
            onClick={() => handleMobileControl("right")}
            className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
          >
            →
          </button>
        </div>
        <button
          onClick={() => handleMobileControl("down")}
          className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
