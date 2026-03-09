interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function GameCard({ title, description, onClick }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative p-8 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 text-left"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Play indicator */}
      <div className="absolute right-6 top-6 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        Play →
      </div>
    </button>
  );
}
