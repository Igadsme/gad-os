import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"span"> & {
  tone?: "default" | "blue" | "green" | "violet" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "default" && "bg-surface-muted text-foreground",
        tone === "blue" && "bg-primary-soft text-primary",
        tone === "green" && "bg-success-soft text-success",
        tone === "violet" && "bg-violet-soft text-violet",
        tone === "muted" && "border border-border bg-surface text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  hoverable = false,
  ...props
}: React.ComponentProps<"div"> & { hoverable?: boolean }) {
  return (
    <div
      className={cn(
        "card-surface rounded-xl",
        hoverable && "card-hoverable",
        className,
      )}
      {...props}
    />
  );
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}
