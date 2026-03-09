"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24;
const LOCK_DELAY = 800; // ms before piece locks, allows sliding into gaps

// Light crayon/pastel colors for each piece
const COLORS: Record<string, { dark: string; light: string }> = {
  I: { dark: "#93c5fd", light: "#3b82f6" }, // Light blue
  O: { dark: "#fde047", light: "#eab308" }, // Yellow
  T: { dark: "#d8b4fe", light: "#a855f7" }, // Purple
  S: { dark: "#86efac", light: "#22c55e" }, // Green
  Z: { dark: "#fca5a5", light: "#ef4444" }, // Red
  J: { dark: "#7dd3fc", light: "#0ea5e9" }, // Sky blue
  L: { dark: "#fdba74", light: "#f97316" }, // Orange
};

const SHAPES: Record<string, number[][][]> = {
  I: [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
  O: [[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]]],
  T: [[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]],
  S: [[[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],[[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]]],
  Z: [[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],[[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]]],
  J: [[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]]],
  L: [[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]],
};

const PIECES = ["I", "O", "T", "S", "Z", "J", "L"];

interface TetrisGameProps {
  onGameOver: (score: number) => void;
  onScoreChange: (score: number) => void;
  gameOver: boolean;
  onRestart: () => void;
}

export function TetrisGame({ onGameOver, onScoreChange, gameOver: externalGameOver }: TetrisGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [nextPiece, setNextPiece] = useState("T");

  // Game state in refs
  const board = useRef<(string | null)[][]>([]);
  const piece = useRef<{ type: string; x: number; y: number; rot: number } | null>(null);
  const next = useRef("T");
  const gameOver = useRef(false);
  const paused = useRef(false);
  const scoreVal = useRef(0);
  const linesVal = useRef(0);
  const levelVal = useRef(1);
  const lastDrop = useRef(0);
  const lockTimer = useRef(0); // Time when piece started touching ground
  const raf = useRef(0);

  // Simple helper functions
  function createBoard() {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
  }

  function randomPiece() {
    return PIECES[Math.floor(Math.random() * PIECES.length)];
  }

  function getShape(type: string, rot: number) {
    return SHAPES[type][rot];
  }

  function collides(type: string, x: number, y: number, rot: number): boolean {
    const shape = getShape(type, rot);
    for (let py = 0; py < shape.length; py++) {
      for (let px = 0; px < shape[py].length; px++) {
        if (shape[py][px] === 1) {
          const boardX = x + px;
          const boardY = y + py;

          // Check boundaries
          if (boardX < 0 || boardX >= COLS) return true;
          if (boardY >= ROWS) return true;

          // Check collision with locked blocks (only check if on board)
          if (boardY >= 0 && board.current[boardY] && board.current[boardY][boardX] !== null) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function lock() {
    if (!piece.current) return;
    const { type, x, y, rot } = piece.current;
    const shape = getShape(type, rot);

    // Add piece to board
    for (let py = 0; py < shape.length; py++) {
      for (let px = 0; px < shape[py].length; px++) {
        if (shape[py][px]) {
          const ny = y + py;
          const nx = x + px;
          if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) {
            board.current[ny][nx] = type;
          }
        }
      }
    }

    // Clear lines
    let cleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board.current[row].every(cell => cell !== null)) {
        board.current.splice(row, 1);
        board.current.unshift(Array(COLS).fill(null));
        cleared++;
        row++; // Check same row again
      }
    }

    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800][cleared] * levelVal.current;
      scoreVal.current += points;
      linesVal.current += cleared;
      levelVal.current = Math.floor(linesVal.current / 10) + 1;
      setScore(scoreVal.current);
      setLines(linesVal.current);
      setLevel(levelVal.current);
      onScoreChange(scoreVal.current);
    }

    // Spawn next
    spawn();
  }

  function spawn() {
    const type = next.current;
    const shape = getShape(type, 0);
    const x = Math.floor((COLS - shape[0].length) / 2);

    if (collides(type, x, 0, 0)) {
      gameOver.current = true;
      setIsGameOver(true);
      onGameOver(scoreVal.current);
      piece.current = null;
      return;
    }

    piece.current = { type, x, y: 0, rot: 0 };
    next.current = randomPiece();
    setNextPiece(next.current);
  }

  function moveDown(): boolean {
    if (!piece.current || gameOver.current || paused.current) return false;
    const { type, x, y, rot } = piece.current;

    if (!collides(type, x, y + 1, rot)) {
      piece.current.y++;
      lockTimer.current = 0; // Reset lock timer when piece moves down
      return true;
    }
    return false;
  }

  function moveLeft() {
    if (!piece.current || gameOver.current || paused.current) return false;
    const { type, x, y, rot } = piece.current;

    // Try normal left move
    if (!collides(type, x - 1, y, rot)) {
      piece.current.x--;
      lockTimer.current = 0;
      return true;
    }

    // Try sliding down-left (tuck into gaps)
    if (!collides(type, x - 1, y + 1, rot)) {
      piece.current.x--;
      piece.current.y++;
      lockTimer.current = 0;
      return true;
    }

    return false;
  }

  function moveRight() {
    if (!piece.current || gameOver.current || paused.current) return false;
    const { type, x, y, rot } = piece.current;

    // Try normal right move
    if (!collides(type, x + 1, y, rot)) {
      piece.current.x++;
      lockTimer.current = 0;
      return true;
    }

    // Try sliding down-right (tuck into gaps)
    if (!collides(type, x + 1, y + 1, rot)) {
      piece.current.x++;
      piece.current.y++;
      lockTimer.current = 0;
      return true;
    }

    return false;
  }

  function rotate() {
    if (!piece.current || gameOver.current || paused.current) return false;
    const { type, x, y, rot } = piece.current;
    const newRot = (rot + 1) % 4;

    // Try rotation, then wall kicks
    const kicks = [[0, 0], [-1, 0], [1, 0], [0, -1], [-1, -1], [1, -1], [0, 1], [-1, 1], [1, 1]];
    for (const [kx, ky] of kicks) {
      if (!collides(type, x + kx, y + ky, newRot)) {
        piece.current.x += kx;
        piece.current.y += ky;
        piece.current.rot = newRot;
        lockTimer.current = 0; // Reset lock timer on successful rotation
        return true;
      }
    }
    return false;
  }

  function hardDrop() {
    if (!piece.current || gameOver.current || paused.current) return;
    const { type, x, rot } = piece.current;

    // Find drop position
    let dropY = piece.current.y;
    while (!collides(type, x, dropY + 1, rot)) {
      dropY++;
    }

    const dropped = dropY - piece.current.y;
    piece.current.y = dropY;

    scoreVal.current += dropped * 2;
    setScore(scoreVal.current);
    onScoreChange(scoreVal.current);

    // Immediately lock on hard drop
    lockTimer.current = 0;
    lock();
  }

  function softDrop() {
    if (!piece.current || gameOver.current || paused.current) return;

    if (moveDown()) {
      scoreVal.current += 1;
      setScore(scoreVal.current);
      onScoreChange(scoreVal.current);
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");
    const bg = isDark ? "#09090b" : "#ffffff";
    const fg = isDark ? "#fff" : "#000";
    const grid = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    // Clear
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = grid;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK_SIZE, 0);
      ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
      ctx.stroke();
    }

    // Board
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = board.current[y][x];
        if (cell) {
          ctx.fillStyle = isDark ? COLORS[cell].dark : COLORS[cell].light;
          ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
        }
      }
    }

    // Ghost piece
    if (piece.current) {
      const { type, x, rot } = piece.current;
      let ghostY = piece.current.y;
      while (!collides(type, x, ghostY + 1, rot)) {
        ghostY++;
      }

      const shape = getShape(type, rot);
      const color = isDark ? COLORS[type].dark : COLORS[type].light;

      // Ghost (transparent version of piece color)
      // Convert hex to rgba for transparency
      const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      ctx.fillStyle = hexToRgba(color, 0.3);
      for (let py = 0; py < shape.length; py++) {
        for (let px = 0; px < shape[py].length; px++) {
          if (shape[py][px] && ghostY + py >= 0) {
            ctx.fillRect((x + px) * BLOCK_SIZE + 1, (ghostY + py) * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
          }
        }
      }

      // Current piece (full color)
      ctx.fillStyle = color;
      for (let py = 0; py < shape.length; py++) {
        for (let px = 0; px < shape[py].length; px++) {
          if (shape[py][px] && piece.current.y + py >= 0) {
            ctx.fillRect((x + px) * BLOCK_SIZE + 1, (piece.current.y + py) * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
          }
        }
      }
    }

    // Border
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  }

  // Initialize and run game
  useEffect(() => {
    board.current = createBoard();
    next.current = randomPiece();
    spawn();
    lastDrop.current = performance.now();

    const loop = (time: number) => {
      if (!gameOver.current && !paused.current && piece.current) {
        const speed = Math.max(100, 1000 - (levelVal.current - 1) * 80);

        if (time - lastDrop.current > speed) {
          if (!moveDown()) {
            // Piece can't move down - start or check lock timer
            if (lockTimer.current === 0) {
              lockTimer.current = time;
            } else if (time - lockTimer.current > LOCK_DELAY) {
              lock();
              lockTimer.current = 0;
            }
          } else {
            // Piece moved down successfully - reset lock timer
            lockTimer.current = 0;
          }
          lastDrop.current = time;
        }
      }
      draw();
      raf.current = requestAnimationFrame(loop);
    };

    const handleKey = (e: KeyboardEvent) => {
      // Don't capture keys when game is over (allow typing in name input)
      if (gameOver.current) return;

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        paused.current = !paused.current;
        setIsPaused(paused.current);
        if (!paused.current) lastDrop.current = performance.now();
        return;
      }

      if (paused.current) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowDown":
          e.preventDefault();
          softDrop();
          break;
        case "ArrowUp":
          e.preventDefault();
          rotate();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Handle restart
  useEffect(() => {
    if (!externalGameOver && isGameOver) {
      board.current = createBoard();
      scoreVal.current = 0;
      linesVal.current = 0;
      levelVal.current = 1;
      gameOver.current = false;
      paused.current = false;
      next.current = randomPiece();

      setScore(0);
      setLines(0);
      setLevel(1);
      setIsGameOver(false);
      setIsPaused(false);

      spawn();
      lastDrop.current = performance.now();
    }
  }, [externalGameOver, isGameOver]);

  const handleMobile = (action: string) => {
    if (gameOver.current || paused.current) return;
    switch (action) {
      case "left": moveLeft(); break;
      case "right": moveRight(); break;
      case "down": softDrop(); break;
      case "rotate": rotate(); break;
      case "drop": hardDrop(); break;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
      <div className="flex flex-col items-center gap-4 relative">
        <div className="relative" style={{ maxWidth: "min(100vw - 2rem, 240px)" }}>
          <canvas
            ref={canvasRef}
            width={COLS * BLOCK_SIZE}
            height={ROWS * BLOCK_SIZE}
            className="border border-border w-full"
            style={{
              imageRendering: "pixelated",
              aspectRatio: `${COLS} / ${ROWS}`
            }}
          />

          {isPaused && !isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <p className="text-xl font-semibold">Paused - Press P</p>
            </div>
          )}
        </div>

        {isGameOver && (
          <p className="text-sm text-muted-foreground">Game Over!</p>
        )}

        {/* Mobile Controls */}
        <div className="md:hidden flex flex-col items-center gap-2">
          <button onClick={() => handleMobile("rotate")} className="w-12 h-12 border rounded">↻</button>
          <div className="flex gap-2">
            <button onClick={() => handleMobile("left")} className="w-12 h-12 border rounded">←</button>
            <button onClick={() => handleMobile("down")} className="w-12 h-12 border rounded">↓</button>
            <button onClick={() => handleMobile("right")} className="w-12 h-12 border rounded">→</button>
          </div>
          <button onClick={() => handleMobile("drop")} className="w-32 h-10 border rounded text-sm">Hard Drop</button>
        </div>
      </div>

      <div className="flex flex-row lg:flex-col gap-4">
        <div className="hidden md:block border rounded p-3 text-xs text-muted-foreground">
          <p className="mb-1">← → Move</p>
          <p className="mb-1">↓ Soft Drop</p>
          <p className="mb-1">↑ Rotate</p>
          <p className="mb-1">Space Hard Drop</p>
          <p>P Pause</p>
        </div>
      </div>
    </div>
  );
}
