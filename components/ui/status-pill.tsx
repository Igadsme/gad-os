import { cn } from "@/lib/utils";

const tones = {
  live: "bg-success-soft text-success",
  study: "bg-primary-soft text-primary",
  internal: "bg-surface-muted text-muted",
  archived: "border border-border text-muted",
  proposed: "bg-violet-soft text-violet",
  researching: "bg-primary-soft text-primary",
  prototype: "bg-violet-soft text-violet",
  progress: "bg-primary-soft text-primary",
  completed: "bg-success-soft text-success",
} as const;

export function StatusPill({
  children,
  tone = "study",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(
  status: string,
): keyof typeof tones {
  if (status === "Live") return "live";
  if (status === "Internal System") return "internal";
  if (status === "Archived") return "archived";
  if (status === "Proposed") return "proposed";
  if (status === "Researching") return "researching";
  if (status === "Prototype") return "prototype";
  if (status === "In Progress") return "progress";
  if (status === "Completed") return "completed";
  if (status === "Deployed") return "live";
  if (status === "Private Enterprise Work") return "internal";
  return "study";
}
