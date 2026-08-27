import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  detail,
  className,
}: {
  title: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-surface rounded-2xl px-5 py-8 text-center",
        className,
      )}
    >
      <p className="text-sm font-medium">{title}</p>
      {detail ? <p className="mt-1 text-sm text-muted">{detail}</p> : null}
    </div>
  );
}
