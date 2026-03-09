interface MobileControlsProps {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

export function MobileControls({
  onLeft,
  onRight,
  onUp,
  onDown,
}: MobileControlsProps) {
  return (
    <div className="md:hidden flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <button
          onClick={onLeft}
          className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
        >
          ←
        </button>
        <button
          onClick={onUp}
          className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
        >
          ↑
        </button>
        <button
          onClick={onRight}
          className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
        >
          →
        </button>
      </div>
      <button
        onClick={onDown}
        className="w-12 h-12 flex items-center justify-center rounded border border-border bg-muted/30 hover:bg-muted/50 active:bg-muted/70 transition-colors"
      >
        ↓
      </button>
    </div>
  );
}
