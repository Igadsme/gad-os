"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function CommandBar({
  onSearch,
  className,
}: {
  onSearch: () => void;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-md md:px-7",
        className,
      )}
    >
      <button
        type="button"
        onClick={onSearch}
        className="group flex h-10 min-w-0 max-w-2xl flex-1 items-center gap-3 rounded-lg border border-border bg-surface px-3 text-left text-sm text-muted transition-colors hover:border-primary/30"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate">
          Search projects, skills, or experience...
        </span>
        <kbd className="hidden rounded-md border border-border bg-surface-muted px-1.5 py-0.5 text-[11px] font-medium text-muted sm:inline-flex">
          ⌘ K
        </kbd>
      </button>
    </header>
  );
}
